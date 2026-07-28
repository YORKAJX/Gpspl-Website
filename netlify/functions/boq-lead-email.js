const ALLOWED_ORIGINS = new Set([
    'https://gpspl.co.in',
    'https://www.gpspl.co.in'
]);

const securityHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
};

const json = (statusCode, body, headers = {}) => ({
    statusCode,
    headers: { ...securityHeaders, ...headers },
    body: JSON.stringify(body)
});

const corsHeaders = (event) => {
    const origin = event.headers.origin || event.headers.Origin || '';
    if (ALLOWED_ORIGINS.has(origin)) return { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' };
    return {};
};

const clean = (value, max = 800) => String(value || '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, max);

const isGenuineEmail = (email) => {
    const value = String(email || '').trim().toLowerCase();
    const [local = '', domain = ''] = value.split('@');
    const weakNames = new Set(['test', 'demo', 'user', 'admin', 'mail', 'email', 'abc', 'abcd', 'qwerty', 'asdf']);
    const compactLocal = local.replace(/[._%+-]/g, '');
    const looksValid = /^(?=.{8,254}$)(?=[^@]*[a-z])[a-z0-9._%+-]{4,}@[a-z0-9.-]+\.[a-z]{2,}$/.test(value);
    const repeatedOnly = /^([a-z0-9])\1+$/i.test(compactLocal);
    const numericHeavy = (local.match(/\d/g) || []).length > Math.max(3, local.length - 2);
    return looksValid && /[a-z]{2,}/i.test(local) && /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(domain) && !repeatedOnly && !numericHeavy && !weakNames.has(local);
};

const sendResendEmail = async ({ to, from, subject, html, replyTo }) => {
    const response = await fetch('https://api.resend.com/emails', {
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

    if (!response.ok) throw new Error(`Resend failed: ${response.status}`);
};

exports.handler = async (event) => {
    const baseHeaders = corsHeaders(event);

    if (event.httpMethod === 'OPTIONS') {
        return json(204, {}, {
            ...baseHeaders,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
    }

    if (event.httpMethod !== 'POST') {
        return json(405, { error: 'Method not allowed' }, { ...baseHeaders, Allow: 'POST, OPTIONS' });
    }

    if (!process.env.ENABLE_BOQ_AUTO_EMAIL || process.env.ENABLE_BOQ_AUTO_EMAIL !== 'true') {
        return json(200, { configured: false, skipped: true }, baseHeaders);
    }

    if (!process.env.RESEND_API_KEY) {
        return json(200, { configured: false, skipped: true }, baseHeaders);
    }

    if (Number(event.headers['content-length'] || 0) > 50000) {
        return json(413, { error: 'Payload too large' }, baseHeaders);
    }

    let lead;
    try {
        lead = JSON.parse(event.body || '{}');
    } catch (error) {
        return json(400, { error: 'Invalid request' }, baseHeaders);
    }

    if (clean(lead.botField, 100)) return json(200, { skipped: true }, baseHeaders);
    if (!isGenuineEmail(lead.email)) return json(400, { error: 'Invalid email' }, baseHeaders);

    const from = process.env.BOQ_MAIL_FROM || process.env.MAIL_FROM || 'GPSPL <no-reply@gpspl.co.in>';
    const team = (process.env.BOQ_TEAM_EMAILS || process.env.LEAD_NOTIFICATION_EMAILS || 'support@gpspl.co.in')
        .split(',')
        .map((email) => email.trim())
        .filter(Boolean);

    const clientName = clean(lead.name, 120) || 'there';
    const company = clean(lead.company, 160) || 'Not shared';
    const phone = clean(lead.phone, 40);
    const location = clean(lead.city, 160);
    const estimate = clean(lead.estimateRange, 120);
    const roomCount = clean(lead.roomCount, 20);
    const boqSummary = clean(lead.boqSummary, 2600).replace(/\n/g, '<br>');
    const remarks = clean(lead.projectDescription, 900);

    const clientHtml = `
        <div style="font-family:Arial,sans-serif;color:#071123;line-height:1.55">
            <h2 style="color:#071a31">Thank you for downloading the GPSPL AV BOQ Estimate</h2>
            <p>Hi ${clientName},</p>
            <p>We have received your AV BOQ requirement. Our team will review the room details, estimate range and selected configuration before sharing the next guidance.</p>
            <p><strong>Planning estimate:</strong> ${estimate || 'Shared in downloaded proposal'}<br>
            <strong>Rooms:</strong> ${roomCount || 'As selected in calculator'}</p>
            <p>For final pricing, GPSPL will validate site condition, equipment selection, cable routes, mounting, warranty and installation scope.</p>
            <p style="margin-top:18px"><strong>GPSPL</strong><br>www.gpspl.co.in<br>info@gpspl.co.in<br>+91 93100 92963</p>
        </div>
    `;

    const teamHtml = `
        <div style="font-family:Arial,sans-serif;color:#071123;line-height:1.55">
            <h2>New AV BOQ Download Lead</h2>
            <p><strong>Name:</strong> ${clientName}<br>
            <strong>Email:</strong> ${clean(lead.email, 180)}<br>
            <strong>Phone:</strong> ${phone}<br>
            <strong>Company:</strong> ${company}<br>
            <strong>Location:</strong> ${location}<br>
            <strong>Rooms:</strong> ${roomCount}<br>
            <strong>Estimate:</strong> ${estimate}</p>
            <p><strong>Remarks:</strong><br>${remarks || 'Not shared'}</p>
            <p><strong>BOQ Summary:</strong><br>${boqSummary || 'Not available'}</p>
        </div>
    `;

    try {
        await Promise.all([
            sendResendEmail({
                to: [lead.email],
                from,
                subject: 'Thank you for downloading GPSPL AV BOQ Estimate',
                html: clientHtml,
                replyTo: team[0] || 'support@gpspl.co.in'
            }),
            team.length ? sendResendEmail({
                to: team,
                from,
                subject: `New AV BOQ lead: ${clientName}`,
                html: teamHtml,
                replyTo: lead.email
            }) : Promise.resolve()
        ]);

        return json(200, { sent: true }, baseHeaders);
    } catch (error) {
        return json(200, { sent: false }, baseHeaders);
    }
};
