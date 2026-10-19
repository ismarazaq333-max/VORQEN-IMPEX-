import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Path for storing persistent inquiries and email delivery logs
const DATA_DIR = path.resolve(__dirname, 'server-data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const EMAIL_LOGS_FILE = path.join(DATA_DIR, 'email-logs.json');
const SMTP_CONFIG_FILE = path.join(DATA_DIR, 'smtp-config.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helpers for data persistence
function readJsonSafe<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return fallback;
}

function writeJsonSafe(filePath: string, data: any) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

interface SmtpSettings {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  recipientEmail: string;
}

function getSmtpSettings(): SmtpSettings {
  // Check persisted config file first, then environment variables
  const savedConfig = readJsonSafe<Partial<SmtpSettings>>(SMTP_CONFIG_FILE, {});
  return {
    host: savedConfig.host || process.env.SMTP_HOST || 'smtp.gmail.com',
    port: savedConfig.port || parseInt(process.env.SMTP_PORT || '465', 10),
    secure: savedConfig.secure !== undefined ? savedConfig.secure : (process.env.SMTP_SECURE !== 'false'),
    user: savedConfig.user || process.env.SMTP_USER || 'vorqenimpex@gmail.com',
    pass: savedConfig.pass || process.env.SMTP_PASS || '',
    recipientEmail: savedConfig.recipientEmail || process.env.INQUIRY_RECIPIENT_EMAIL || 'vorqenimpex@gmail.com',
  };
}

function createTransporter(config: SmtpSettings) {
  if (!config.user || !config.pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

interface InquiryRecord {
  id: string;
  createdAt: string;
  fullName: string;
  companyName: string;
  email: string;
  country: string;
  phoneOrWhatsApp: string;
  subject: string;
  message: string;
  productCategory?: string;
  productName?: string;
  estimatedQuantity?: string;
  materials?: string;
  colors?: string;
  sizes?: string;
  brandingRequirements?: string;
  packagingRequirements?: string;
  status: 'DELIVERED' | 'STORED_PENDING_CONFIG' | 'FAILED_DELIVERY';
  deliveryError?: string;
  messageId?: string;
  buyerConfirmationSent?: boolean;
}

interface EmailLogEntry {
  id: string;
  timestamp: string;
  type: 'INQUIRY_NOTIFICATION' | 'BUYER_CONFIRMATION' | 'SYSTEM_TEST';
  to: string;
  subject: string;
  status: 'SUCCESS' | 'FAILED' | 'CONFIG_REQUIRED';
  details: string;
  error?: string;
}

function logEmailAction(entry: Omit<EmailLogEntry, 'id' | 'timestamp'>) {
  const logs = readJsonSafe<EmailLogEntry[]>(EMAIL_LOGS_FILE, []);
  const newEntry: EmailLogEntry = {
    id: 'LOG-' + Date.now().toString(36).toUpperCase(),
    timestamp: new Date().toISOString(),
    ...entry,
  };
  logs.unshift(newEntry);
  if (logs.length > 200) logs.pop();
  writeJsonSafe(EMAIL_LOGS_FILE, logs);
  return newEntry;
}

// -------------------------------------------------------------
// API ROUTES
// -------------------------------------------------------------

// 1. Submit Inquiry
app.post('/api/inquiries', async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      companyName,
      email,
      country,
      phoneOrWhatsApp,
      subject,
      message,
      productCategory,
      productName,
      estimatedQuantity,
      materials,
      colors,
      sizes,
      brandingRequirements,
      packagingRequirements,
      additionalNotes,
    } = req.body;

    // Strict validation
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, error: 'Full name is required' });
    }
    if (!companyName || !companyName.trim()) {
      return res.status(400).json({ success: false, error: 'Company name is required' });
    }
    if (!email || !email.trim() || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'A valid email address is required' });
    }
    const finalMessage = message || additionalNotes || '';
    if (!finalMessage.trim()) {
      return res.status(400).json({ success: false, error: 'Inquiry details or message is required' });
    }

    const inquiryId = 'VRQ-' + Date.now().toString(36).toUpperCase();
    const config = getSmtpSettings();
    const targetEmail = config.recipientEmail || 'vorqenimpex@gmail.com';

    const newInquiry: InquiryRecord = {
      id: inquiryId,
      createdAt: new Date().toISOString(),
      fullName: fullName.trim(),
      companyName: companyName.trim(),
      email: email.trim(),
      country: (country || 'International').trim(),
      phoneOrWhatsApp: (phoneOrWhatsApp || 'Not provided').trim(),
      subject: (subject || `Product Inquiry for VORQEN`).trim(),
      message: finalMessage.trim(),
      productCategory,
      productName,
      estimatedQuantity,
      materials,
      colors,
      sizes,
      brandingRequirements,
      packagingRequirements,
      status: 'STORED_PENDING_CONFIG',
    };

    // Store in persistent inquiries file immediately so it is NEVER lost
    const inquiries = readJsonSafe<InquiryRecord[]>(INQUIRIES_FILE, []);
    inquiries.unshift(newInquiry);
    writeJsonSafe(INQUIRIES_FILE, inquiries);

    // Prepare direct escalation links for fallback / instant communication
    const whatsappText = `*NEW VORQEN INQUIRY [${inquiryId}]*
---------------------------------------
*Name:* ${newInquiry.fullName}
*Company:* ${newInquiry.companyName}
*Country:* ${newInquiry.country}
*Email:* ${newInquiry.email}
*Phone:* ${newInquiry.phoneOrWhatsApp}
*Subject:* ${newInquiry.subject}
*Product/Specs:* ${productName || productCategory || 'Custom inquiry'} (Qty: ${estimatedQuantity || 'N/A'})
*Message:*
${newInquiry.message}`;

    const directWhatsAppUrl = `https://wa.me/923224853236?text=${encodeURIComponent(whatsappText)}`;
    const mailtoSubject = encodeURIComponent(`[${inquiryId}] ${newInquiry.subject} - ${newInquiry.companyName}`);
    const mailtoBody = encodeURIComponent(`Inquiry ID: ${inquiryId}\nName: ${newInquiry.fullName}\nCompany: ${newInquiry.companyName}\nEmail: ${newInquiry.email}\nPhone: ${newInquiry.phoneOrWhatsApp}\nCountry: ${newInquiry.country}\n\nMessage:\n${newInquiry.message}`);
    const directMailtoUrl = `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    const transporter = createTransporter(config);

    if (!transporter) {
      // SMTP password not configured yet in environment or admin settings
      logEmailAction({
        type: 'INQUIRY_NOTIFICATION',
        to: targetEmail,
        subject: newInquiry.subject,
        status: 'CONFIG_REQUIRED',
        details: `Inquiry ${inquiryId} safely recorded in local database. SMTP_PASS is not configured yet.`,
      });

      return res.status(200).json({
        success: true,
        inquiryId,
        emailDelivered: false,
        pendingSmtpConfig: true,
        message: 'Your inquiry has been safely registered in the VORQEN factory export system. Direct links are provided below to reach our export desk immediately.',
        directLinks: {
          whatsapp: directWhatsAppUrl,
          mailto: directMailtoUrl,
          email: targetEmail,
        },
      });
    }

    // Try sending email via SMTP
    try {
      // 1. Notification Email to Official Inbox
      const notificationHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f5; margin: 0; padding: 20px; color: #111111; }
    .container { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background-color: #123D2A; color: #ffffff; padding: 24px; text-align: left; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 1px; }
    .header p { margin: 4px 0 0 0; font-size: 12px; color: #B8BEC3; }
    .content { padding: 28px; }
    .tag { display: inline-block; background: #123D2A; color: #ffffff; padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 4px; text-transform: uppercase; margin-bottom: 16px; }
    .buyer-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 18px; margin-bottom: 20px; }
    .buyer-card table { width: 100%; border-collapse: collapse; }
    .buyer-card td { padding: 6px 0; font-size: 13px; }
    .buyer-card td.label { width: 130px; font-weight: 600; color: #64748b; }
    .buyer-card td.value { color: #0f172a; font-weight: 500; }
    .message-box { background: #ffffff; border-left: 4px solid #123D2A; padding: 14px 18px; margin: 20px 0; background-color: #f7faf8; }
    .message-box p { margin: 0; font-size: 14px; line-height: 1.6; color: #1f2937; white-space: pre-wrap; }
    .btn { display: inline-block; background-color: #123D2A; color: #ffffff !important; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-size: 13px; font-weight: bold; margin-top: 10px; }
    .btn-wa { display: inline-block; background-color: #128C7E; color: #ffffff !important; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-size: 13px; font-weight: bold; margin-top: 10px; margin-left: 10px; }
    .footer { background: #0f172a; color: #94a3b8; padding: 16px 24px; font-size: 11px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>VORQEN &bull; NEW EXPORT INQUIRY</h1>
      <p>FLAKES IMPEX Export Management Desk &bull; Sialkot, Pakistan (Est. 2001)</p>
    </div>
    <div class="content">
      <span class="tag">Ref: ${inquiryId}</span>
      <h2 style="margin: 0 0 16px 0; font-size: 18px; color: #0f172a;">${newInquiry.subject}</h2>

      <div class="buyer-card">
        <table>
          <tr>
            <td class="label">Full Name:</td>
            <td class="value"><strong>${newInquiry.fullName}</strong></td>
          </tr>
          <tr>
            <td class="label">Company Name:</td>
            <td class="value">${newInquiry.companyName}</td>
          </tr>
          <tr>
            <td class="label">Email Address:</td>
            <td class="value"><a href="mailto:${newInquiry.email}">${newInquiry.email}</a></td>
          </tr>
          <tr>
            <td class="label">Phone / WhatsApp:</td>
            <td class="value">${newInquiry.phoneOrWhatsApp}</td>
          </tr>
          <tr>
            <td class="label">Country:</td>
            <td class="value">${newInquiry.country}</td>
          </tr>
          ${productCategory ? `<tr><td class="label">Category:</td><td class="value">${productCategory}</td></tr>` : ''}
          ${productName ? `<tr><td class="label">Article:</td><td class="value">${productName}</td></tr>` : ''}
          ${estimatedQuantity ? `<tr><td class="label">Est. Quantity:</td><td class="value">${estimatedQuantity}</td></tr>` : ''}
          ${materials ? `<tr><td class="label">Materials:</td><td class="value">${materials}</td></tr>` : ''}
          ${brandingRequirements ? `<tr><td class="label">Branding:</td><td class="value">${brandingRequirements}</td></tr>` : ''}
          ${packagingRequirements ? `<tr><td class="label">Packaging:</td><td class="value">${packagingRequirements}</td></tr>` : ''}
        </table>
      </div>

      <div style="font-size: 13px; font-weight: bold; color: #475569; text-transform: uppercase;">Message Content:</div>
      <div class="message-box">
        <p>${newInquiry.message}</p>
      </div>

      <div style="margin-top: 24px;">
        <a href="mailto:${newInquiry.email}?subject=Re:%20[${inquiryId}]%20${encodeURIComponent(newInquiry.subject)}" class="btn">Reply Directly to Buyer</a>
        ${newInquiry.phoneOrWhatsApp && newInquiry.phoneOrWhatsApp !== 'Not provided' ? `<a href="https://wa.me/${newInquiry.phoneOrWhatsApp.replace(/\D/g, '')}" class="btn-wa" target="_blank">Chat on WhatsApp</a>` : ''}
      </div>
    </div>
    <div class="footer">
      Delivered directly to ${targetEmail} by VORQEN Website Email Inquiry System.<br/>
      FLAKES IMPEX &bull; Sialkot, Pakistan &bull; WhatsApp: +92 322 4853236
    </div>
  </div>
</body>
</html>
`;

      const notificationResult = await transporter.sendMail({
        from: `"VORQEN Export Inquiry" <${config.user}>`,
        to: targetEmail,
        replyTo: newInquiry.email,
        subject: `[INQUIRY ${inquiryId}] ${newInquiry.companyName} (${newInquiry.country}) - ${newInquiry.subject}`,
        text: `NEW VORQEN INQUIRY [${inquiryId}]\n\nSender: ${newInquiry.fullName}\nCompany: ${newInquiry.companyName}\nEmail: ${newInquiry.email}\nPhone: ${newInquiry.phoneOrWhatsApp}\nCountry: ${newInquiry.country}\nSubject: ${newInquiry.subject}\n\nMessage:\n${newInquiry.message}`,
        html: notificationHtml,
      });

      // Update inquiry record
      newInquiry.status = 'DELIVERED';
      newInquiry.messageId = notificationResult.messageId;

      logEmailAction({
        type: 'INQUIRY_NOTIFICATION',
        to: targetEmail,
        subject: newInquiry.subject,
        status: 'SUCCESS',
        details: `Message ID: ${notificationResult.messageId}`,
      });

      // 2. Automatic Buyer Confirmation Email
      let buyerConfirmationSent = false;
      try {
        const buyerHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f5; margin: 0; padding: 20px; color: #111111; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background-color: #123D2A; color: #ffffff; padding: 24px; text-align: left; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 1px; }
    .header p { margin: 4px 0 0 0; font-size: 12px; color: #B8BEC3; }
    .content { padding: 28px; }
    .summary-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 20px 0; font-size: 13px; }
    .footer { background: #0f172a; color: #94a3b8; padding: 20px; font-size: 11px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>VORQEN</h1>
      <p>BUILT FOR PERFORMANCE. MADE FOR THE WORLD.</p>
    </div>
    <div class="content">
      <h2 style="font-size: 18px; color: #123D2A; margin-top: 0;">Thank You for Your Inquiry, ${newInquiry.fullName}</h2>
      <p style="font-size: 14px; line-height: 1.6; color: #334155;">
        We have successfully received your inquiry regarding <strong>${newInquiry.subject}</strong>. Your request has been assigned reference number <strong>${inquiryId}</strong> and forwarded directly to our factory export desk in Sialkot, Pakistan.
      </p>

      <div class="summary-box">
        <strong>Inquiry Summary:</strong><br/>
        &bull; <strong>Company:</strong> ${newInquiry.companyName}<br/>
        &bull; <strong>Reference ID:</strong> ${inquiryId}<br/>
        &bull; <strong>Status:</strong> Under Review by Export Manager Ali<br/>
        &bull; <strong>Target Response Time:</strong> Within 12-24 Hours
      </div>

      <p style="font-size: 13px; line-height: 1.6; color: #334155;">
        If you require urgent sample dispatch or immediate tech-pack consultation, please reach out to our export desk directly on WhatsApp:
      </p>

      <div style="margin: 20px 0;">
        <a href="https://wa.me/923224853236?text=Hello%20Ali,%20following%20up%20on%20VORQEN%20Inquiry%20${inquiryId}" style="display: inline-block; background-color: #123D2A; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 13px; font-weight: bold;">
          Connect on WhatsApp (+92 322 4853236)
        </a>
      </div>

      <p style="font-size: 12px; color: #64748b;">
        Official Commercial Email: <a href="mailto:${targetEmail}">${targetEmail}</a><br/>
        Manufacturing & Export Company: FLAKES IMPEX, Sialkot, Pakistan (Est. 2001)
      </p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} VORQEN &bull; FLAKES IMPEX &bull; All Rights Reserved.<br/>
      Sialkot, Pakistan &bull; Contact for catalog samples &bull; Timely shipping
    </div>
  </div>
</body>
</html>
`;

        await transporter.sendMail({
          from: `"VORQEN & FLAKES IMPEX" <${config.user}>`,
          to: newInquiry.email,
          subject: `Inquiry Received: VORQEN & FLAKES IMPEX (Ref: ${inquiryId})`,
          text: `Thank you for contacting VORQEN & FLAKES IMPEX. Your inquiry ${inquiryId} has been received. Export Manager Ali will respond within 12-24 hours. For instant escalation, contact WhatsApp: +92 322 4853236`,
          html: buyerHtml,
        });

        buyerConfirmationSent = true;
        newInquiry.buyerConfirmationSent = true;

        logEmailAction({
          type: 'BUYER_CONFIRMATION',
          to: newInquiry.email,
          subject: `Inquiry Confirmation (Ref: ${inquiryId})`,
          status: 'SUCCESS',
          details: `Confirmation dispatched to buyer ${newInquiry.email}`,
        });
      } catch (buyerErr: any) {
        console.warn('Could not send buyer confirmation email:', buyerErr?.message);
        logEmailAction({
          type: 'BUYER_CONFIRMATION',
          to: newInquiry.email,
          subject: `Inquiry Confirmation (Ref: ${inquiryId})`,
          status: 'FAILED',
          details: 'Buyer confirmation failed',
          error: buyerErr?.message || 'Unknown error',
        });
      }

      // Save updated inquiry status
      writeJsonSafe(INQUIRIES_FILE, inquiries);

      return res.status(200).json({
        success: true,
        inquiryId,
        emailDelivered: true,
        recipientEmail: targetEmail,
        buyerConfirmationSent,
        message: `Your inquiry has been successfully delivered to ${targetEmail}. A confirmation email has been sent to ${newInquiry.email}.`,
      });
    } catch (smtpErr: any) {
      console.error('SMTP Delivery error:', smtpErr);
      const errMsg = smtpErr?.message || 'SMTP connection failed';

      newInquiry.status = 'FAILED_DELIVERY';
      newInquiry.deliveryError = errMsg;
      writeJsonSafe(INQUIRIES_FILE, inquiries);

      logEmailAction({
        type: 'INQUIRY_NOTIFICATION',
        to: targetEmail,
        subject: newInquiry.subject,
        status: 'FAILED',
        details: 'SMTP delivery attempt threw exception',
        error: errMsg,
      });

      return res.status(500).json({
        success: false,
        inquiryId,
        emailDelivered: false,
        error: `Email transmission to ${targetEmail} failed (${errMsg}). However, your inquiry has been recorded in our factory system. Please use the direct WhatsApp link or email client below to ensure immediate contact.`,
        directLinks: {
          whatsapp: directWhatsAppUrl,
          mailto: directMailtoUrl,
          email: targetEmail,
        },
      });
    }
  } catch (err: any) {
    console.error('Unexpected server error on inquiry:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Internal server error processing inquiry',
    });
  }
});

// 2. Fetch Inquiries for Admin Portal
app.get('/api/inquiries', (_req: Request, res: Response) => {
  const inquiries = readJsonSafe<InquiryRecord[]>(INQUIRIES_FILE, []);
  res.json({ success: true, count: inquiries.length, inquiries });
});

// 3. Fetch Email Logs for Diagnostics
app.get('/api/email/logs', (_req: Request, res: Response) => {
  const logs = readJsonSafe<EmailLogEntry[]>(EMAIL_LOGS_FILE, []);
  res.json({ success: true, count: logs.length, logs });
});

// 4. Get Current Email Configuration & Status
app.get('/api/email/status', async (_req: Request, res: Response) => {
  const config = getSmtpSettings();
  const inquiries = readJsonSafe<InquiryRecord[]>(INQUIRIES_FILE, []);
  const logs = readJsonSafe<EmailLogEntry[]>(EMAIL_LOGS_FILE, []);

  const hasConfig = Boolean(config.user && config.pass);
  let connectionVerified = false;
  let verificationError: string | null = null;

  if (hasConfig) {
    try {
      const transporter = createTransporter(config);
      if (transporter) {
        await transporter.verify();
        connectionVerified = true;
      }
    } catch (err: any) {
      verificationError = err?.message || 'Connection verification failed';
    }
  }

  const deliveredCount = inquiries.filter((i) => i.status === 'DELIVERED').length;
  const pendingCount = inquiries.filter((i) => i.status === 'STORED_PENDING_CONFIG').length;
  const failedCount = inquiries.filter((i) => i.status === 'FAILED_DELIVERY').length;

  res.json({
    success: true,
    recipientEmail: config.recipientEmail || 'vorqenimpex@gmail.com',
    smtpHost: config.host,
    smtpPort: config.port,
    smtpUser: config.user,
    hasPassword: Boolean(config.pass),
    connectionVerified,
    verificationError,
    stats: {
      totalInquiries: inquiries.length,
      delivered: deliveredCount,
      pendingConfig: pendingCount,
      failed: failedCount,
    },
    spfDkimDmarc: {
      domain: 'flakesimpex.com',
      spfRecord: 'v=spf1 include:_spf.google.com ~all',
      dmarcRecord: 'v=DMARC1; p=quarantine; rua=mailto:vorqenimpex@gmail.com',
      dkimGuide: 'Enable DKIM in Google Workspace Admin Console under Apps > Google Workspace > Gmail > Authenticate email.',
    },
    latestLogs: logs.slice(0, 10),
  });
});

// 5. Test Email Dispatch to vorqenimpex@gmail.com
app.post('/api/email/test', async (_req: Request, res: Response) => {
  const config = getSmtpSettings();
  const targetEmail = config.recipientEmail || 'vorqenimpex@gmail.com';

  if (!config.user || !config.pass) {
    return res.status(400).json({
      success: false,
      error: 'SMTP user or password not set. Please provide Gmail App Password or SMTP credentials.',
      recipientEmail: targetEmail,
    });
  }

  try {
    const transporter = createTransporter(config);
    if (!transporter) {
      throw new Error('Transporter creation failed');
    }

    const testTime = new Date().toLocaleString();
    const result = await transporter.sendMail({
      from: `"VORQEN System Diagnostic" <${config.user}>`,
      to: targetEmail,
      subject: `[SYSTEM TEST] VORQEN Email System Verification (${testTime})`,
      text: `This is an automated test message from the VORQEN website email inquiry system verifying delivery to ${targetEmail}.\n\nTime: ${testTime}\nHost: ${config.host}:${config.port}\nStatus: Operational`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #123D2A; border-radius: 8px;">
          <h2 style="color: #123D2A; margin-top: 0;">VORQEN Email Delivery System &bull; Test Successful</h2>
          <p style="color: #334155; font-size: 14px; line-height: 1.6;">
            Your VORQEN email inquiry system is properly connected and successfully delivering messages to <strong>${targetEmail}</strong>.
          </p>
          <div style="background: #f1f5f9; padding: 12px; border-radius: 6px; font-size: 13px; font-family: monospace;">
            &bull; Server Time: ${testTime}<br/>
            &bull; SMTP Server: ${config.host}:${config.port}<br/>
            &bull; Sender Account: ${config.user}<br/>
            &bull; Target Inbox: ${targetEmail}<br/>
            &bull; Status: VERIFIED OPERATIONAL
          </div>
          <p style="font-size: 12px; color: #64748b; margin-top: 16px;">
            Inquiries submitted through the VORQEN website will now be delivered reliably to this inbox.
          </p>
        </div>
      `,
    });

    logEmailAction({
      type: 'SYSTEM_TEST',
      to: targetEmail,
      subject: 'VORQEN Email System Verification',
      status: 'SUCCESS',
      details: `Test email sent successfully. Message ID: ${result.messageId}`,
    });

    return res.json({
      success: true,
      messageId: result.messageId,
      deliveredTo: targetEmail,
      message: `Test email successfully transmitted to ${targetEmail}! Message ID: ${result.messageId}`,
    });
  } catch (err: any) {
    console.error('Test email error:', err);
    logEmailAction({
      type: 'SYSTEM_TEST',
      to: targetEmail,
      subject: 'VORQEN Email System Verification',
      status: 'FAILED',
      details: 'Test email failed',
      error: err?.message || 'Unknown error',
    });

    return res.status(500).json({
      success: false,
      error: err?.message || 'Failed to send test email',
      troubleshooting: [
        'For Gmail accounts (vorqenimpex@gmail.com), you MUST generate a 16-character App Password at https://myaccount.google.com/apppasswords.',
        'Normal account passwords will be blocked by Google security policy.',
        'Ensure 2-Step Verification is enabled on vorqenimpex@gmail.com.',
        'Use host: smtp.gmail.com, port: 465 (SSL) or port: 587 (TLS).',
      ],
    });
  }
});

// 6. Update SMTP Credentials from Admin Desk
app.post('/api/email/config', async (req: Request, res: Response) => {
  try {
    const { host, port, secure, user, pass, recipientEmail } = req.body;

    const current = getSmtpSettings();
    const updated: SmtpSettings = {
      host: host || current.host || 'smtp.gmail.com',
      port: port ? parseInt(port, 10) : (current.port || 465),
      secure: secure !== undefined ? Boolean(secure) : current.secure,
      user: user || current.user || 'vorqenimpex@gmail.com',
      pass: pass !== undefined ? pass : current.pass,
      recipientEmail: recipientEmail || current.recipientEmail || 'vorqenimpex@gmail.com',
    };

    writeJsonSafe(SMTP_CONFIG_FILE, updated);

    // Verify connection immediately
    let verified = false;
    let verifyError: string | null = null;
    if (updated.user && updated.pass) {
      try {
        const transporter = createTransporter(updated);
        if (transporter) {
          await transporter.verify();
          verified = true;
        }
      } catch (vErr: any) {
        verifyError = vErr?.message || 'Verification failed';
      }
    }

    return res.json({
      success: true,
      message: 'SMTP settings updated successfully',
      verified,
      verifyError,
      recipientEmail: updated.recipientEmail,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message });
  }
});

// -------------------------------------------------------------
// VITE DEV MIDDLEWARE OR PRODUCTION STATIC SERVING
// -------------------------------------------------------------
async function setupServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`> VORQEN Full-Stack server running at http://0.0.0.0:${PORT}`);
    console.log(`> Target Inquiry Email: vorqenimpex@gmail.com`);
  });
}

setupServer();
