import type { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

export const handler: Handler = async (event, _context) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' }),
    };
  }

  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
  const smtpSecure = process.env.SMTP_SECURE !== 'false';
  const smtpUser = process.env.SMTP_USER || 'vorqenimpex@gmail.com';
  const smtpPass = process.env.SMTP_PASS || '';
  const recipientEmail = process.env.INQUIRY_RECIPIENT_EMAIL || 'vorqenimpex@gmail.com';

  if (!smtpPass) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        error: 'Netlify environment variable SMTP_PASS is not set. Go to Netlify Dashboard > Site configuration > Environment variables to add it.',
        recipientEmail,
      }),
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 8000,
    });

    const testTime = new Date().toLocaleString();
    const result = await transporter.sendMail({
      from: `"VORQEN Netlify Test" <${smtpUser}>`,
      to: recipientEmail,
      subject: `[NETLIFY TEST] VORQEN Email System Verification (${testTime})`,
      text: `Automated test message from VORQEN Netlify serverless deployment verifying inbox delivery to ${recipientEmail}.\n\nTime: ${testTime}\nHost: ${smtpHost}:${smtpPort}\nPlatform: Netlify Functions`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #123D2A; border-radius: 8px;">
          <h2 style="color: #123D2A; margin-top: 0;">Netlify Email System &bull; Test Successful</h2>
          <p style="color: #334155; font-size: 14px; line-height: 1.6;">
            Your Netlify serverless email dispatch function is active and successfully delivering messages to <strong>${recipientEmail}</strong>.
          </p>
          <div style="background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 6px; padding: 12px; margin-top: 16px; font-size: 13px; color: #166534;">
            &check; Verified SMTP server: ${smtpHost}:${smtpPort}<br>
            &check; Authenticated Sender: ${smtpUser}<br>
            &check; Message ID: ${Date.now().toString(36)}
          </div>
        </div>
      `,
    });

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        message: `Test email successfully dispatched to ${recipientEmail}.`,
        messageId: result.messageId,
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        error: err?.message || 'Failed to dispatch test email through Netlify',
      }),
    };
  }
};
