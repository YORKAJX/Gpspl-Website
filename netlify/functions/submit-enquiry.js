import crypto from 'crypto';

const ALLOWED_ORIGINS = new Set([
    'https://gpspl.co.in',
    'https://www.gpspl.co.in',
    'http://localhost:8888',
    'http://localhost:3000',
    'http://127.0.0.1:8888',
    'http://127.0.0.1:5500'
]);

const securityHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN'
};

const json = (statusCode, body, headers = {}) => ({
    statusCode,
    headers: { ...securityHeaders, ...headers },
    body: JSON.stringify(body)
});

const corsHeaders = (event) => {
    const origin = event.headers.origin || event.headers.Origin || '';
    if (ALLOWED_ORIGINS.has(origin) || origin.endsWith('.netlify.app')) {
        return {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            Vary: 'Origin'
        };
    }
    return {};
};

// In-memory rate limiting and deduplication stores (persists across warm lambdas)
const ipRateMap = new Map(); // ip -> [timestamps]
const recentLeadHashes = new Map(); // hash -> timestamp

const DISPOSABLE_EMAIL_DOMAINS = new Set([
    'tempmail.com', 'mailinator.com', '10minutemail.com', 'guerrillamail.com',
    'throwawaymail.com', 'yopmail.com', 'fake.com', 'fakeinbox.com', 'sharklasers.com',
    'getnada.com', 'burnermail.io', 'dispostable.com', 'trashmail.com', 'temp-mail.org',
    'mohmal.com', 'generator.email', 'crazymailing.com', 'armyspy.com', 'cuvox.de'
]);

const DUMMY_PHONE_PATTERNS = new Set([
    '1234567890', '0123456789', '9876543210', '8765432109',
    '9898989898', '9090909090', '1212121212', '9000000000',
    '9999900000', '9876500000', '1122334455', '9988776655',
    '9999999999', '8888888888', '7777777777', '6666666666'
]);

const SPAM_KEYWORDS = [
    'casino', 'crypto', 'bitcoin', 'forex', 'loan offer', 'viagra',
    'betting', 'telegram promo', 'seo backlink', 'guest post service',
    'porn', 'dating service', 'hack service', 'ranking guarantee'
];

const clean = (val, max = 500) =>
    String(val || '')
        .replace(/[<>]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, max);

function checkRateLimit(ip) {
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxRequests = 5;

    // Clean old entries
    for (const [key, timestamps] of ipRateMap.entries()) {
        const fresh = timestamps.filter(t => now - t < windowMs);
        if (fresh.length === 0) ipRateMap.delete(key);
        else ipRateMap.set(key, fresh);
    }

    const currentTimestamps = ipRateMap.get(ip) || [];
    const freshTimestamps = currentTimestamps.filter(t => now - t < windowMs);

    if (freshTimestamps.length >= maxRequests) {
        return false;
    }

    freshTimestamps.push(now);
    ipRateMap.set(ip, freshTimestamps);
    return true;
}

function checkDuplicate(phone, email) {
    const key = `${phone}_${email.toLowerCase()}`;
    const now = Date.now();
    const cooldownMs = 5 * 60 * 1000; // 5 minutes

    // Clean old hashes
    for (const [k, timestamp] of recentLeadHashes.entries()) {
        if (now - timestamp > cooldownMs) recentLeadHashes.delete(k);
    }

    if (recentLeadHashes.has(key)) {
        return true; // Is duplicate
    }
    recentLeadHashes.set(key, now);
    return false;
}

async function verifyTurnstile(token, ip) {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) return true; // If key not set in environment, pass through
    if (!token) return false;

    try {
        const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                secret,
                response: token,
                remoteip: ip
            })
        });
        const data = await res.json();
        return !!data.success;
    } catch (err) {
        console.error('Turnstile verification error:', err);
        return true; // Fail open on Cloudflare connection error so genuine leads aren't lost
    }
}

async function sendResendEmail({ to, from, subject, html, replyTo }) {
    if (!process.env.RESEND_API_KEY) return;
    try {
        await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from,
                to,
                subject,
                html,
                reply_to: replyTo
            })
        });
    } catch (e) {
        console.error('Resend email error:', e);
    }
}

export const handler = async (event) => {
    const baseHeaders = corsHeaders(event);

    if (event.httpMethod === 'OPTIONS') {
        return json(204, {}, {
            ...baseHeaders,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
        });
    }

    if (event.httpMethod !== 'POST') {
        return json(405, { error: 'Method not allowed' }, { ...baseHeaders, Allow: 'POST, OPTIONS' });
    }

    const clientIp = event.headers['x-forwarded-for']?.split(',')[0].trim() ||
                     event.headers['client-ip'] ||
                     event.headers['x-nf-client-connection-ip'] ||
                     'unknown';

    // 1. Enforce payload size limit (max 50KB)
    if (Number(event.headers['content-length'] || 0) > 50000) {
        return json(413, { error: 'Payload too large' }, baseHeaders);
    }

    // 2. Parse request body (JSON or URL-encoded form)
    let body = {};
    try {
        if (event.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
            const params = new URLSearchParams(event.body || '');
            for (const [k, v] of params.entries()) {
                body[k] = v;
            }
        } else {
            body = JSON.parse(event.body || '{}');
        }
    } catch (e) {
        return json(400, { error: 'Invalid submission data' }, baseHeaders);
    }

    // 3. MULTI-LAYER HONEYPOT CHECK
    // If bot filled any honeypot field, silently return 200 so bots think they succeeded
    const botField = body['bot-field'] || body.botField || '';
    const websiteHp = body.website_url_hp || body.b_field_honey || body.hp_url || '';
    if (clean(botField) || clean(websiteHp)) {
        console.warn(`[Spam Trapped] Honeypot tripped from IP ${clientIp}`);
        return json(200, { success: true, message: 'Thank you for your enquiry. We will get back to you shortly.', skipped: true }, baseHeaders);
    }

    // 4. SUBMISSION SPEED / TIME TOKEN VERIFICATION
    const timeToken = body.form_time_token || body._time_token || '';
    if (timeToken) {
        try {
            const decoded = Buffer.from(timeToken, 'base64').toString('utf8');
            const tokenData = JSON.parse(decoded);
            const elapsed = Date.now() - Number(tokenData.t || 0);

            // If filled in under 2.5 seconds, it is an automated machine submission
            if (elapsed < 2500) {
                console.warn(`[Spam Trapped] Super-fast submission (${elapsed}ms) from IP ${clientIp}`);
                return json(200, { success: true, message: 'Thank you for your enquiry.', skipped: true }, baseHeaders);
            }

            // If token older than 24 hours
            if (elapsed > 24 * 60 * 60 * 1000) {
                return json(400, { error: 'Form session expired. Please refresh the page and try again.' }, baseHeaders);
            }
        } catch (e) {
            // Tampered token
            console.warn(`[Spam Trapped] Malformed time token from IP ${clientIp}`);
            return json(200, { success: true, message: 'Thank you for your enquiry.', skipped: true }, baseHeaders);
        }
    }

    // 5. EXTRACT & SANITIZE FIELDS
    const name = clean(body.name || body.full_name || '', 80);
    const email = clean(body.email || '', 120).toLowerCase();
    const phoneRaw = clean(body.phone || body.mobile || '', 30);
    const phone = phoneRaw.replace(/\D/g, '').slice(-10); // Extract last 10 digits
    const company = clean(body.company || body.organization || '', 100);
    const location = clean(body.location || body.city || '', 100);
    const requirement = clean(body.requirement || body.service || body.category || 'General AV Enquiry', 120);
    const message = clean(body.message || body.details || '', 2000);
    const leadSource = clean(body.lead_source || body.source || 'Website Contact Form', 100);
    const turnstileToken = body['cf-turnstile-response'] || '';

    // 6. SERVER-SIDE STRICT VALIDATION
    // Name validation
    if (!name || name.length < 2 || !/[a-zA-Z]/.test(name)) {
        return json(400, { error: 'Please enter a valid full name.' }, baseHeaders);
    }
    if (/^(.)\1{4,}$/.test(name.toLowerCase())) {
        return json(400, { error: 'Please enter a genuine name.' }, baseHeaders);
    }

    // Mobile Number validation (Strict Indian 10-digit mobile)
    if (!phone || phone.length !== 10 || !/^[6-9]\d{9}$/.test(phone)) {
        return json(400, { error: 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.' }, baseHeaders);
    }
    if (/^(.)\1{9}$/.test(phone) || DUMMY_PHONE_PATTERNS.has(phone)) {
        return json(400, { error: 'Please enter a genuine, active mobile number.' }, baseHeaders);
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!email || !emailRegex.test(email)) {
        return json(400, { error: 'Please enter a valid business email address.' }, baseHeaders);
    }
    const emailDomain = email.split('@')[1];
    if (DISPOSABLE_EMAIL_DOMAINS.has(emailDomain)) {
        return json(400, { error: 'Temporary or disposable email addresses are not accepted. Please provide your business or personal email.' }, baseHeaders);
    }

    // Content / Spam keyword check
    const contentToInspect = `${name} ${company} ${message}`.toLowerCase();
    for (const kw of SPAM_KEYWORDS) {
        if (contentToInspect.includes(kw)) {
            console.warn(`[Spam Trapped] Keyword "${kw}" triggered from IP ${clientIp}`);
            return json(200, { success: true, message: 'Thank you for your enquiry.', skipped: true }, baseHeaders);
        }
    }

    // 7. RATE LIMITING & DEDUPLICATION
    if (!checkRateLimit(clientIp)) {
        return json(429, { error: 'Too many submissions from your connection. Please wait a few minutes or call us directly at +91 89208 30377.' }, baseHeaders);
    }

    if (checkDuplicate(phone, email)) {
        return json(200, { success: true, message: 'We have already received your enquiry. Our team is reviewing it and will call you shortly.', isDuplicate: true }, baseHeaders);
    }

    // 8. TURNSTILE BOT CHALLENGE CHECK (if configured)
    const turnstileOk = await verifyTurnstile(turnstileToken, clientIp);
    if (!turnstileOk) {
        return json(400, { error: 'Bot verification check failed. Please refresh the page and try again.' }, baseHeaders);
    }

    // 9. DISPATCH ALERTS TO TEAM
    const istTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
    const defaultTeamEmails = 'global@gpspl.co.in, karan@gpspl.co.in, itsdivesh221@gmail.com';
    const recipientEmails = (process.env.LEAD_NOTIFICATION_EMAILS || defaultTeamEmails)
        .split(',')
        .map(e => e.trim())
        .filter(Boolean);

    const emailSubject = `⚡ NEW VERIFIED LEAD: [${requirement}] ${name} - ${company || 'Individual'}`;
    const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            <div style="background: #0f172a; color: #ffffff; padding: 18px 24px;">
                <h2 style="margin: 0; font-size: 20px;">⚡ New Verified GPSPL Project Lead</h2>
                <p style="margin: 4px 0 0; color: #94a3b8; font-size: 13px;">Received via website enquiry desk (${istTime})</p>
            </div>
            <div style="padding: 24px; background: #ffffff;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 10px 0; color: #64748b; font-weight: bold; width: 140px;">Client Name</td>
                        <td style="padding: 10px 0; color: #0f172a; font-weight: bold;">${name}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Mobile / Phone</td>
                        <td style="padding: 10px 0; color: #0284c7; font-weight: bold;"><a href="tel:+91${phone}" style="color: #0284c7; text-decoration: none;">+91 ${phone}</a> &nbsp;|&nbsp; <a href="https://wa.me/91${phone}" target="_blank" style="color: #16a34a; text-decoration: none;">WhatsApp</a></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Email Address</td>
                        <td style="padding: 10px 0; color: #0f172a;"><a href="mailto:${email}">${email}</a></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Organization</td>
                        <td style="padding: 10px 0; color: #0f172a;">${company || 'Not Specified'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Project Location</td>
                        <td style="padding: 10px 0; color: #0f172a;">${location || 'Not Specified'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Requirement Type</td>
                        <td style="padding: 10px 0; color: #ef3438; font-weight: bold;">${requirement}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Lead Source</td>
                        <td style="padding: 10px 0; color: #475569;">${leadSource}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; color: #64748b; font-weight: bold; vertical-align: top;">Project Scope</td>
                        <td style="padding: 12px 0; color: #1e293b; line-height: 1.5; white-space: pre-wrap;">${message || 'No additional notes provided.'}</td>
                    </tr>
                </table>
            </div>
            <div style="background: #f8fafc; padding: 12px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
                Global Peripheral Solution Pvt. Ltd. | 304, Padma Palace, Nehru Place, New Delhi - 110019 | Phone: +91 89208 30377
            </div>
        </div>
    `;

    const mailFrom = process.env.MAIL_FROM || 'GPSPL Leads <no-reply@gpspl.co.in>';
    await sendResendEmail({
        to: recipientEmails,
        from: mailFrom,
        subject: emailSubject,
        html: emailHtml,
        replyTo: email
    });

    return json(200, {
        success: true,
        message: 'Thank you for contacting GPSPL! Your enquiry has been routed to our project engineering desk. Our team will contact you within 2 business hours.'
    }, baseHeaders);
};
