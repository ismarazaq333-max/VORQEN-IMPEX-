import type { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

interface InquiryPayload {
  fullName?: string;
  companyName?: string;
  email?: string;
  country?: string;
  phoneOrWhatsApp?: string;
  subject?: string;
  message?: string;
  productCategory?: string;
  productName?: string;
  estimatedQuantity?: string;
  materials?: string;
  colors?: string;
  sizes?: string;
  brandingRequirements?: string;
  packagingRequirements?: string;
  additionalNotes?: string;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json',
};

export const handler: Handler = async (event, _context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: '',
    };
  }

  // Handle GET /api/inquiries (summary info)
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        platform: 'Netlify Serverless Function',
        officialEmail: 'vorqenimpex@gmail.com',
        status: 'Operational',
      }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' }),
    };
  }

  try {
    const data: InquiryPayload = event.body ? JSON.parse(event.body) : {};

    const fullName = (data.fullName || '').trim();
    const companyName = (data.companyName || '').trim();
    const email = (data.email || '').trim();
    const country = (data.country || 'International').trim();
    const phoneOrWhatsApp = (data.phoneOrWhatsApp || 'Not provided').trim();
    const subject = (data.subject || 'Product Inquiry for VORQEN').trim();
    const message = (data.message || data.additionalNotes || '').trim();

    if (!fullName) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: false, error: 'Full name is required' }),
      };
    }
    if (!companyName) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: false, error: 'Company name is required' }),
      };
    }
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: false, error: 'A valid email address is required' }),
      };
    }
    if (!message) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: false, error: 'Message or inquiry details are required' }),
      };
    }

    const inquiryId = 'VRQ-' + Date.now().toString(36).toUpperCase();
    const targetEmail = process.env.INQUIRY_RECIPIENT_EMAIL || 'vorqenimpex@gmail.com';

    // Direct WhatsApp and mailto links for immediate escalation
    const whatsappText = `*NEW VORQEN EXPORT INQUIRY [${inquiryId}]*
---------------------------------------
*Sender:* ${fullName}
*Company:* ${companyName}
*Country:* ${country}
*Email:* ${email}
*Phone:* ${phoneOrWhatsApp}
*Subject:* ${subject}
*Product/Specs:* ${data.productName || data.productCategory || 'Custom Gear'} (Qty: ${data.estimatedQuantity || 'N/A'})
*Message:*
${message}`;

    const directWhatsAppUrl = `https://wa.me/923224853236?text=${encodeURIComponent(whatsappText)}`;
    const mailtoSubject = encodeURIComponent(`[${inquiryId}] ${subject} - ${companyName}`);
    const mailtoBody = encodeURIComponent(`Inquiry ID: ${inquiryId}\nName: ${fullName}\nCompany: ${companyName}\nEmail: ${email}\nPhone: ${phoneOrWhatsApp}\nCountry: ${country}\n\nMessage:\n${message}`);
    const directMailtoUrl = `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpSecure = process.env.SMTP_SECURE !== 'false';
    const smtpUser = process.env.SMTP_USER || 'vorqenimpex@gmail.com';
    const smtpPass = process.env.SMTP_PASS || '';

    // If SMTP password is not set on Netlify yet, provide graceful response with direct links
    if (!smtpPass) {
      console.log(`[Netlify Function] Inquiry ${inquiryId} received. SMTP_PASS environment variable not set on Netlify.`);
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: true,
          inquiryId,
          emailDelivered: false,
          pendingSmtpConfig: true,
          message: 'Inquiry received. Configure Netlify environment variables (SMTP_PASS) for direct automated SMTP email forwarding, or utilize instant WhatsApp/email links below.',
          directLinks: {
            whatsapp: directWhatsAppUrl,
            mailto: directMailtoUrl,
            email: targetEmail,
          },
        }),
      };
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 10000,
    });

    const receivedTime = new Date().toUTCString();

    // 1. Send inquiry notification to vorqenimpex@gmail.com
    const notificationHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f0d; color: #f1f5f9; margin: 0; padding: 24px; }
    .card { background-color: #121915; border: 1px solid #1e2c24; border-radius: 8px; max-width: 650px; margin: 0 auto; overflow: hidden; }
    .header { background: linear-gradient(135deg, #123D2A 0%, #0a2016 100%); padding: 24px; border-bottom: 2px solid #22c55e; }
    .title { margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: 0.05em; }
    .subtitle { margin: 6px 0 0; font-size: 13px; color: #86efac; }
    .content { padding: 24px; }
    .badge { display: inline-block; background-color: #1b3d2b; color: #4ade80; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600; font-family: monospace; }
    .grid { width: 100%; border-collapse: collapse; margin: 16px 0; }
    .grid td { padding: 10px 12px; border-bottom: 1px solid #1f2b23; font-size: 14px; }
    .label { color: #94a3b8; width: 35%; font-weight: 500; }
    .value { color: #f8fafc; font-weight: 600; }
    .message-box { background-color: #0a0f0c; border: 1px solid #23352b; border-radius: 6px; padding: 16px; margin: 16px 0; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap; }
    .footer { padding: 16px 24px; background-color: #0d1310; border-top: 1px solid #1a251f; font-size: 12px; color: #64748b; text-align: center; }
    .cta-btn { display: inline-block; background-color: #22c55e; color: #000000 !important; font-weight: 700; text-decoration: none; padding: 10px 18px; border-radius: 6px; margin-top: 12px; font-size: 13px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="badge">REFERENCE ID: ${inquiryId}</div>
      <h1 class="title" style="margin-top: 10px;">New B2B Inquiry &bull; VORQEN International</h1>
      <p class="subtitle">Direct submission via VORQEN Website (Netlify)</p>
    </div>
    <div class="content">
      <table class="grid">
        <tr><td class="label">Client Name:</td><td class="value">${fullName}</td></tr>
        <tr><td class="label">Company / Brand:</td><td class="value">${companyName}</td></tr>
        <tr><td class="label">Email Address:</td><td class="value"><a href="mailto:${email}" style="color: #4ade80;">${email}</a></td></tr>
        <tr><td class="label">Phone / WhatsApp:</td><td class="value">${phoneOrWhatsApp}</td></tr>
        <tr><td class="label">Country / Region:</td><td class="value">${country}</td></tr>
        <tr><td class="label">Subject:</td><td class="value">${subject}</td></tr>
        ${data.productName ? `<tr><td class="label">Product Name:</td><td class="value">${data.productName}</td></tr>` : ''}
        ${data.productCategory ? `<tr><td class="label">Category:</td><td class="value">${data.productCategory}</td></tr>` : ''}
        ${data.estimatedQuantity ? `<tr><td class="label">Estimated Quantity:</td><td class="value">${data.estimatedQuantity}</td></tr>` : ''}
        <tr><td class="label">Submission Time:</td><td class="value">${receivedTime}</td></tr>
      </table>

      <div style="font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-top: 16px;">Message & Specifications:</div>
      <div class="message-box">${message}</div>

      <div style="text-align: center; margin-top: 20px;">
        <a href="mailto:${email}?subject=Re:%20[${inquiryId}]%20${encodeURIComponent(subject)}%20-%20VORQEN" class="cta-btn">Reply Directly to Client (${email})</a>
      </div>
    </div>
    <div class="footer">
      VORQEN Official Factory Inbox &bull; Supported by FLAKES IMPEX (Sialkot, Pakistan)<br>
      Timely Shipping &bull; Private Label Samples &bull; International Export
    </div>
  </div>
</body>
</html>
`;

    await transporter.sendMail({
      from: `"VORQEN Website Portal" <${smtpUser}>`,
      replyTo: `"${fullName}" <${email}>`,
      to: targetEmail,
      subject: `[INQUIRY ${inquiryId}] ${subject} - ${companyName} (${country})`,
      text: `NEW INQUIRY Ref: ${inquiryId}\nName: ${fullName}\nCompany: ${companyName}\nEmail: ${email}\nPhone: ${phoneOrWhatsApp}\nCountry: ${country}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: notificationHtml,
    });

    // 2. Send buyer confirmation acknowledgment
    let buyerConfirmationSent = false;
    try {
      const buyerHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
    .card { background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 600px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: #123D2A; padding: 24px; color: #ffffff; text-align: center; }
    .content { padding: 24px; }
    .badge { display: inline-block; background-color: rgba(255,255,255,0.15); color: #86efac; padding: 4px 12px; border-radius: 4px; font-size: 13px; font-weight: 600; font-family: monospace; }
    .footer { padding: 16px; background-color: #f1f5f9; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="badge">REFERENCE: ${inquiryId}</div>
      <h2 style="margin: 10px 0 0; color: #ffffff;">Thank You for Contacting VORQEN</h2>
      <p style="margin: 4px 0 0; font-size: 13px; color: #cbd5e1;">Supported by FLAKES IMPEX (Sialkot, Pakistan)</p>
    </div>
    <div class="content">
      <p>Dear <strong>${fullName}</strong>,</p>
      <p>We have successfully received your inquiry for <strong>${companyName}</strong> regarding: <em>"${subject}"</em>.</p>
      <p>Our international export desk is reviewing your requirements. We will provide pricing, minimum order quantities (MOQ), and sample dispatch schedules within 12 to 24 hours.</p>
      
      <div style="background-color: #f1f5f9; border-radius: 6px; padding: 14px; margin: 16px 0; font-size: 13px;">
        <strong>Immediate Factory Escalation:</strong><br>
        Direct WhatsApp: <a href="https://wa.me/923224853236" style="color: #123D2A; font-weight: 600;">+92 322 4853236</a><br>
        Official Email: <a href="mailto:vorqenimpex@gmail.com" style="color: #123D2A; font-weight: 600;">vorqenimpex@gmail.com</a>
      </div>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} VORQEN &bull; FLAKES IMPEX &bull; Sialkot, Pakistan<br>
      Contact for catalog samples &bull; Timely shipping
    </div>
  </div>
</body>
</html>
`;
      await transporter.sendMail({
        from: `"VORQEN & FLAKES IMPEX" <${smtpUser}>`,
        to: email,
        subject: `Inquiry Received: VORQEN & FLAKES IMPEX (Ref: ${inquiryId})`,
        text: `Thank you for contacting VORQEN & FLAKES IMPEX. Your inquiry ${inquiryId} has been received. Our export team will respond within 12-24 hours. Direct WhatsApp: +92 322 4853236`,
        html: buyerHtml,
      });
      buyerConfirmationSent = true;
    } catch (buyerErr) {
      console.warn('[Netlify Function] Could not send buyer acknowledgment email:', buyerErr);
    }

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        inquiryId,
        emailDelivered: true,
        recipientEmail: targetEmail,
        buyerConfirmationSent,
        message: `Your inquiry has been successfully delivered to ${targetEmail}. A confirmation email has been dispatched to ${email}.`,
      }),
    };
  } catch (err: any) {
    console.error('[Netlify Function] Error handling inquiry:', err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        error: err?.message || 'Serverless inquiry processing error',
      }),
    };
  }
};
