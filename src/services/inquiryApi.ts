import { QuoteRequest } from '../types';
import { BRAND_INFO } from '../data/brandData';

export interface SubmitInquiryPayload {
  fullName: string;
  companyName: string;
  email: string;
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

export interface SubmitInquiryResult {
  success: boolean;
  inquiryId?: string;
  emailDelivered?: boolean;
  pendingSmtpConfig?: boolean;
  recipientEmail?: string;
  buyerConfirmationSent?: boolean;
  message?: string;
  error?: string;
  directLinks?: {
    whatsapp: string;
    mailto: string;
    email: string;
  };
}

export async function submitInquiry(payload: SubmitInquiryPayload): Promise<SubmitInquiryResult> {
  const targetEmail = BRAND_INFO.email || 'vorqenimpex@gmail.com';
  const inquiryRef = 'VRQ-' + Date.now().toString(36).toUpperCase();

  // Pre-generate fallback WhatsApp and mailto links in case of any failure
  const whatsappText = `*VORQEN EXPORT INQUIRY [${inquiryRef}]*
---------------------------------------
*Sender:* ${payload.fullName}
*Company:* ${payload.companyName}
*Email:* ${payload.email}
*Phone:* ${payload.phoneOrWhatsApp || 'N/A'}
*Country:* ${payload.country || 'International'}
*Subject:* ${payload.subject || 'Product Inquiry'}
*Details:* ${payload.productName || payload.productCategory || 'Custom Gear'} (Qty: ${payload.estimatedQuantity || 'N/A'})

*Message:*
${payload.message || payload.additionalNotes || 'Please provide quotation and catalog.'}`;

  const fallbackWhatsAppUrl = `https://wa.me/923224853236?text=${encodeURIComponent(whatsappText)}`;
  const mailtoSubject = encodeURIComponent(`[${inquiryRef}] ${payload.subject || 'Product Inquiry'} - ${payload.companyName}`);
  const mailtoBody = encodeURIComponent(`Inquiry Ref: ${inquiryRef}\nName: ${payload.fullName}\nCompany: ${payload.companyName}\nEmail: ${payload.email}\nPhone: ${payload.phoneOrWhatsApp || 'N/A'}\nCountry: ${payload.country || 'International'}\n\nMessage:\n${payload.message || payload.additionalNotes}`);
  const fallbackMailtoUrl = `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

  // Netlify Forms backup dispatch (ensures Netlify Dashboard & Netlify form alerts capture inquiry)
  try {
    const netlifyFormData = new URLSearchParams();
    netlifyFormData.append('form-name', 'vorqen-inquiries');
    netlifyFormData.append('fullName', payload.fullName);
    netlifyFormData.append('companyName', payload.companyName);
    netlifyFormData.append('email', payload.email);
    if (payload.country) netlifyFormData.append('country', payload.country);
    if (payload.phoneOrWhatsApp) netlifyFormData.append('phoneOrWhatsApp', payload.phoneOrWhatsApp);
    if (payload.subject) netlifyFormData.append('subject', payload.subject);
    if (payload.productCategory) netlifyFormData.append('productCategory', payload.productCategory);
    if (payload.productName) netlifyFormData.append('productName', payload.productName);
    if (payload.estimatedQuantity) netlifyFormData.append('estimatedQuantity', payload.estimatedQuantity);
    if (payload.message || payload.additionalNotes) {
      netlifyFormData.append('message', payload.message || payload.additionalNotes || '');
    }

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: netlifyFormData.toString(),
    }).catch((err) => {
      // Quiet background backup notice
      console.log('Netlify forms background sync note:', err?.message);
    });
  } catch (e) {
    // Non-blocking
  }

  try {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return {
      success: res.ok && data.success,
      inquiryId: data.inquiryId || inquiryRef,
      emailDelivered: data.emailDelivered,
      pendingSmtpConfig: data.pendingSmtpConfig,
      recipientEmail: data.recipientEmail || targetEmail,
      buyerConfirmationSent: data.buyerConfirmationSent,
      message: data.message,
      error: data.error,
      directLinks: data.directLinks || {
        whatsapp: fallbackWhatsAppUrl,
        mailto: fallbackMailtoUrl,
        email: targetEmail,
      },
    };
  } catch (networkErr: any) {
    console.error('Network request to /api/inquiries failed:', networkErr);
    return {
      success: false,
      inquiryId: inquiryRef,
      emailDelivered: false,
      error: 'Could not connect to the local email dispatch server. Please transmit your inquiry directly via WhatsApp or standard email using the quick buttons below.',
      directLinks: {
        whatsapp: fallbackWhatsAppUrl,
        mailto: fallbackMailtoUrl,
        email: targetEmail,
      },
    };
  }
}
