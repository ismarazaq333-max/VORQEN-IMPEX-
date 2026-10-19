import type { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json',
};

export const handler: Handler = async (event, _context) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
  const smtpSecure = process.env.SMTP_SECURE !== 'false';
  const smtpUser = process.env.SMTP_USER || 'vorqenimpex@gmail.com';
  const smtpPass = process.env.SMTP_PASS || '';
  const recipientEmail = process.env.INQUIRY_RECIPIENT_EMAIL || 'vorqenimpex@gmail.com';

  const hasPassword = Boolean(smtpPass);
  let connectionVerified = false;
  let verificationError: string | null = null;

  if (hasPassword) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        connectionTimeout: 5000,
      });

      await transporter.verify();
      connectionVerified = true;
    } catch (err: any) {
      verificationError = err?.message || 'Verification failed';
    }
  }

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      success: true,
      environment: 'Netlify Serverless',
      recipientEmail,
      smtpHost,
      smtpPort,
      smtpUser,
      hasPassword,
      connectionVerified,
      verificationError,
      stats: {
        platform: 'Netlify',
        formsBackupAvailable: true,
      },
      spfDkimDmarc: {
        domain: 'flakesimpex.com',
        spfRecord: 'v=spf1 include:_spf.google.com ~all',
        dmarcRecord: 'v=DMARC1; p=quarantine; rua=mailto:vorqenimpex@gmail.com',
        dkimGuide: 'Enable DKIM in Google Workspace / DNS settings.',
      },
      netlifyGuide: {
        requiredEnvVars: ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'INQUIRY_RECIPIENT_EMAIL'],
        netlifyForms: 'Enabled on form "vorqen-inquiries"',
      },
    }),
  };
};
