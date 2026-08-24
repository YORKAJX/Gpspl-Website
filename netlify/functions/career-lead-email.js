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
    const looksValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
    return looksValid && domain.length >= 3 && local.length >= 2;
};

const sendResendEmail = async ({ to, from, subject, html, replyTo, attachments }) => {
    const payload = {
        from,
        to,
        subject,
        html,
        reply_to: replyTo
    };
    if (attachments && attachments.length > 0) {
        payload.attachments = attachments;
    }

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
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

    if (!process.env.RESEND_API_KEY) {
        return json(200, { configured: false, skipped: true }, baseHeaders);
    }

    let app;
    try {
        app = JSON.parse(event.body || '{}');
    } catch (error) {
        return json(400, { error: 'Invalid request' }, baseHeaders);
    }

    if (clean(app.botField, 100)) return json(200, { skipped: true }, baseHeaders);
    if (!isGenuineEmail(app.email)) return json(400, { error: 'Invalid email' }, baseHeaders);

    const from = process.env.CAREER_MAIL_FROM || process.env.MAIL_FROM || 'GPSPL Careers <careers@gpspl.co.in>';
    const defaultCareerEmails = 'itsdivesh221@gmail.com, karan@gpspl.co.in, support@gpspl.co.in, khurana.s@gpspl.co.in, khanna.g@gpspl.co.in';
    const team = (process.env.CAREER_TEAM_EMAILS || process.env.LEAD_NOTIFICATION_EMAILS || defaultCareerEmails)
        .split(',')
        .map((email) => email.trim())
        .filter(Boolean);

    const candidateName = clean(app.fullName, 120) || 'Candidate';
    const email = clean(app.email, 180);
    const phone = clean(app.phone, 40);
    const city = clean(app.city, 120);
    const jobTitle = clean(app.jobTitle, 160) || 'General Application';
    const qualification = clean(app.highestQualification, 120);
    const specialization = clean(app.courseSpecialization, 140);
    const candidateStatus = clean(app.candidateStatus, 80);
    const totalExp = clean(app.totalExperience, 80);
    const currentCompany = clean(app.currentCompany, 140);
    const noticePeriod = clean(app.noticePeriod, 80);
    const expectedSalary = clean(app.expectedSalary, 80);
    const linkedin = clean(app.linkedinProfile, 240);
    const selectedSkills = clean(app.selectedSkills, 500);

    const attachments = [];
    if (app.resumeFileBase64 && app.resumeFileName) {
        attachments.push({
            filename: clean(app.resumeFileName, 120),
            content: app.resumeFileBase64
        });
    }

    const teamHtml = `
        <div style="font-family:Arial,sans-serif;color:#071123;line-height:1.6;max-width:680px;margin:0 auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px;">
            <div style="background:#071526;color:#ffffff;padding:16px 20px;border-radius:8px 8px 0 0;">
                <h2 style="margin:0;font-size:20px;color:#ffffff;">New Job Application: ${jobTitle}</h2>
                <p style="margin:4px 0 0;font-size:13px;color:#ff8b8f;">GPSPL Careers Portal Submission</p>
            </div>
            <div style="padding:20px 0;">
                <h3 style="color:#0f172a;border-bottom:2px solid #ef3438;padding-bottom:6px;margin-top:0;">Candidate Overview</h3>
                <table style="width:100%;border-collapse:collapse;font-size:14px;">
                    <tr><td style="padding:6px 0;width:180px;color:#64748b;"><strong>Full Name:</strong></td><td style="color:#0f172a;font-weight:bold;">${candidateName}</td></tr>
                    <tr><td style="padding:6px 0;color:#64748b;"><strong>Email Address:</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
                    <tr><td style="padding:6px 0;color:#64748b;"><strong>Mobile Number:</strong></td><td><a href="tel:${phone}">${phone}</a></td></tr>
                    <tr><td style="padding:6px 0;color:#64748b;"><strong>Current City:</strong></td><td>${city}</td></tr>
                    <tr><td style="padding:6px 0;color:#64748b;"><strong>Applied Position:</strong></td><td style="color:#ef3438;font-weight:bold;">${jobTitle}</td></tr>
                </table>

                <h3 style="color:#0f172a;border-bottom:2px solid #0056b3;padding-bottom:6px;margin-top:24px;">Education &amp; Experience</h3>
                <table style="width:100%;border-collapse:collapse;font-size:14px;">
                    <tr><td style="padding:6px 0;width:180px;color:#64748b;"><strong>Highest Qualification:</strong></td><td>${qualification} ${specialization ? `(${specialization})` : ''}</td></tr>
                    <tr><td style="padding:6px 0;color:#64748b;"><strong>Status / Experience:</strong></td><td>${candidateStatus} ${totalExp ? `• ${totalExp}` : ''}</td></tr>
                    <tr><td style="padding:6px 0;color:#64748b;"><strong>Current Company:</strong></td><td>${currentCompany || 'Not specified'}</td></tr>
                    <tr><td style="padding:6px 0;color:#64748b;"><strong>Notice Period:</strong></td><td>${noticePeriod || 'Immediate'}</td></tr>
                    <tr><td style="padding:6px 0;color:#64748b;"><strong>Expected Salary / CTC:</strong></td><td>${expectedSalary || 'Negotiable'}</td></tr>
                    ${linkedin ? `<tr><td style="padding:6px 0;color:#64748b;"><strong>LinkedIn:</strong></td><td><a href="${linkedin}" target="_blank">${linkedin}</a></td></tr>` : ''}
                    ${selectedSkills ? `<tr><td style="padding:6px 0;color:#64748b;"><strong>Skills:</strong></td><td>${selectedSkills}</td></tr>` : ''}
                </table>

                ${attachments.length > 0 ? `
                    <div style="margin-top:20px;padding:12px 16px;background:#f1f5f9;border-left:4px solid #10b981;border-radius:6px;">
                        <strong>📎 Resume Attached:</strong> ${clean(app.resumeFileName, 120)} (Attached to this email)
                    </div>
                ` : `
                    <div style="margin-top:20px;padding:12px 16px;background:#fff1f2;border-left:4px solid #ef3438;border-radius:6px;">
                        <strong>Note:</strong> Resume file was submitted via form.
                    </div>
                `}
            </div>
            <div style="border-top:1px solid #e2e8f0;padding-top:14px;font-size:12px;color:#94a3b8;text-align:center;">
                GPSPL Recruitment System • Global Peripheral Solutions Pvt. Ltd.
            </div>
        </div>
    `;

    try {
        await sendResendEmail({
            to: team,
            from,
            subject: `[Career Application] ${jobTitle} - ${candidateName}`,
            html: teamHtml,
            replyTo: email,
            attachments
        });

        return json(200, { sent: true }, baseHeaders);
    } catch (error) {
        return json(200, { sent: false, error: error.message }, baseHeaders);
    }
};
