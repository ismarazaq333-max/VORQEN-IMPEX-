import React, { useState } from 'react';
import { BRAND_INFO } from '../data/brandData';
import { QuoteRequest } from '../types';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  MapPin, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  Building2,
  FileText
} from 'lucide-react';

import { submitInquiry, SubmitInquiryResult } from '../services/inquiryApi';

interface ContactPageProps {
  onSaveInquiry: (inquiry: QuoteRequest) => void;
  onRequestFormalQuote: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onSaveInquiry,
  onRequestFormalQuote,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    country: '',
    phone: '',
    subject: 'VORQEN Product Inquiry',
    message: '',
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmitInquiryResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.company.trim()) errs.company = 'Company is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.message.trim()) errs.message = 'Please provide details of your inquiry';
    if (!formData.consent) errs.consent = 'Consent is required to submit';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionResult(null);

    const payload = {
      fullName: formData.name,
      companyName: formData.company,
      email: formData.email,
      country: formData.country || 'International',
      phoneOrWhatsApp: formData.phone || 'N/A',
      subject: formData.subject,
      message: formData.message,
      productCategory: 'General Contact Inquiry',
    };

    const result = await submitInquiry(payload);
    setIsSubmitting(false);
    setSubmissionResult(result);
    setSubmitted(true);

    onSaveInquiry({
      id: result.inquiryId || ('MSG-' + Date.now().toString(36).toUpperCase()),
      fullName: formData.name,
      companyName: formData.company,
      email: formData.email,
      country: formData.country || 'International',
      phoneOrWhatsApp: formData.phone || 'N/A',
      productCategory: 'General Contact Inquiry',
      estimatedQuantity: 'N/A',
      materials: '',
      colors: '',
      sizes: '',
      brandingRequirements: '',
      packagingRequirements: '',
      additionalNotes: `${formData.subject}: ${formData.message}`,
      privacyConsent: true,
      createdAt: new Date().toISOString(),
    });
  };

  const handleSendViaWhatsApp = () => {
    const inquiryId = submissionResult?.inquiryId || 'MSG-DIRECT';
    const text = `*VORQEN & FLAKES IMPEX EXPORT INQUIRY [${inquiryId}]*
---------------------------------------
*Sender:* ${formData.name || 'Website Visitor'}
*Company:* ${formData.company || 'N/A'}
*Country:* ${formData.country || 'International'}
*Email:* ${formData.email || 'N/A'}
*Phone:* ${formData.phone || 'N/A'}

*Subject:* ${formData.subject}
*Message:*
${formData.message || 'Hello Ali, I would like to inquire about VORQEN manufacturing services.'}`;

    window.open(`${BRAND_INFO.whatsAppUrl}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendViaMailto = () => {
    const inquiryId = submissionResult?.inquiryId || 'MSG-DIRECT';
    const subject = encodeURIComponent(`[${inquiryId}] ${formData.subject} - ${formData.company}`);
    const body = encodeURIComponent(`Inquiry Ref: ${inquiryId}\nName: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCountry: ${formData.country}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${BRAND_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. HEADER */}
      <div className="border-b border-[#222222] pb-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B8BEC3]">
          <MapPin className="w-4 h-4 text-[#123D2A]" />
          <span>Export Office &bull; Sialkot, Pakistan</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading">
          CONNECT WITH VORQEN & FLAKES IMPEX
        </h1>
        <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
          Direct communication with our manufacturing management desk. We respond promptly to international importers, brand managers, and procurement officers regarding bulk orders, custom samples, and OEM production.
        </p>
      </div>

      {/* 2. DIRECT CONTACT CHANNELS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* WhatsApp Card */}
        <div className="bg-[#181818] p-6 rounded-xl border border-[#262626] hover:border-[#123D2A] transition-colors space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#123D2A]/30 border border-[#1b5a3d] flex items-center justify-center text-emerald-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white font-heading">Official WhatsApp</h3>
          <p className="text-xs text-gray-400">Fastest response for technical specs and sample requests.</p>
          <a
            href={BRAND_INFO.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-white hover:underline block pt-1"
          >
            {BRAND_INFO.whatsAppNumber} &rarr;
          </a>
        </div>

        {/* Direct Phone Card */}
        <div className="bg-[#181818] p-6 rounded-xl border border-[#262626] hover:border-[#123D2A] transition-colors space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#123D2A]/30 border border-[#1b5a3d] flex items-center justify-center text-emerald-400">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white font-heading">Direct Phone / Call</h3>
          <p className="text-xs text-gray-400">Speak directly with export manager Ali.</p>
          <a
            href={`tel:${BRAND_INFO.phone.replace(/\s+/g, '')}`}
            className="text-xs font-bold text-white hover:underline block pt-1"
          >
            {BRAND_INFO.phone} &rarr;
          </a>
        </div>

        {/* Business Email Card */}
        <div className="bg-[#181818] p-6 rounded-xl border border-[#262626] hover:border-[#123D2A] transition-colors space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#123D2A]/30 border border-[#1b5a3d] flex items-center justify-center text-emerald-400">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white font-heading">Commercial Email</h3>
          <p className="text-xs text-gray-400">Send tech-packs, purchase orders, and NDA documents.</p>
          <a
            href={`mailto:${BRAND_INFO.email}?subject=VORQEN%20Product%20Inquiry`}
            className="text-xs font-bold text-white hover:underline block pt-1 break-all"
          >
            {BRAND_INFO.email} &rarr;
          </a>
        </div>

        {/* Manufacturing Headquarters Card */}
        <div className="bg-[#181818] p-6 rounded-xl border border-[#262626] hover:border-[#123D2A] transition-colors space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#123D2A]/30 border border-[#1b5a3d] flex items-center justify-center text-emerald-400">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white font-heading">Factory & Exporter</h3>
          <p className="text-xs text-gray-400">FLAKES IMPEX (Established in 2001).</p>
          <span className="text-xs font-medium text-white block pt-1">
            Sialkot, Pakistan
          </span>
        </div>
      </div>

      {/* 3. INTERACTIVE CONTACT FORM & LOCATION CONTEXT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column (7 cols) */}
        <div className="lg:col-span-7 bg-[#161616] rounded-2xl p-8 sm:p-10 border border-[#262626] space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white font-heading">
              Send an Export Message
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              For comprehensive multi-item quotations, you can also use our formal{' '}
              <button
                type="button"
                onClick={onRequestFormalQuote}
                className="text-white underline font-semibold"
              >
                Request a Quote Form
              </button>
              .
            </p>
          </div>

          {submitted ? (
            <div className="py-8 space-y-4 bg-[#1C1C1C] rounded-xl p-6 border border-[#2B2B2B] text-left">
              {submissionResult?.emailDelivered ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Inquiry Successfully Delivered</h3>
                      <p className="text-xs text-emerald-400 font-medium">
                        Transmitted directly to {submissionResult?.recipientEmail || 'vorqenimpex@gmail.com'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#141414] p-4 rounded-lg border border-[#262626] space-y-2 text-xs">
                    <div className="flex justify-between border-b border-[#222222] pb-1.5">
                      <span className="text-gray-400">Inquiry Reference ID:</span>
                      <span className="font-mono font-bold text-white">{submissionResult?.inquiryId}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#222222] pb-1.5">
                      <span className="text-gray-400">Sender:</span>
                      <span className="text-white">{formData.name} ({formData.company})</span>
                    </div>
                    <div className="flex justify-between border-b border-[#222222] pb-1.5">
                      <span className="text-gray-400">Recipient Inbox:</span>
                      <span className="font-semibold text-emerald-400">{submissionResult?.recipientEmail || 'vorqenimpex@gmail.com'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Automated Receipt:</span>
                      <span className="text-gray-300">Sent to {formData.email}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    Thank you. Export Desk Manager Ali will review your requirements and respond within 12&ndash;24 hours. For urgent sample requests, you can also connect directly on WhatsApp:
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={handleSendViaWhatsApp}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 border border-[#216140]"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>Chat on WhatsApp (+92 322 4853236)</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-[#252525] hover:bg-[#303030] text-gray-300 text-xs font-semibold rounded-lg text-center"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Inquiry Registered in Factory Ledger</h3>
                      <p className="text-xs text-amber-400 font-medium">
                        Ref: {submissionResult?.inquiryId} &bull; Recorded in Sialkot Factory Database
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#141414] p-4 rounded-lg border border-[#262626] text-xs space-y-2 text-gray-300 leading-relaxed">
                    <p>
                      Your inquiry has been safely saved in the factory export inquiry system with reference <strong className="text-white font-mono">{submissionResult?.inquiryId}</strong>.
                    </p>
                    <p className="text-gray-400 text-[11px]">
                      To guarantee instantaneous review by Export Manager Ali without delay, please transmit your inquiry directly via WhatsApp or your preferred email application below:
                    </p>
                  </div>

                  {submissionResult?.error && (
                    <div className="p-3 bg-red-950/30 border border-red-900/50 rounded-lg text-xs text-red-300">
                      <strong>Delivery Notice:</strong> {submissionResult.error}
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={handleSendViaWhatsApp}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 border border-[#216140]"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>Transmit to WhatsApp (+92 322 4853236)</span>
                    </button>
                    <button
                      onClick={handleSendViaMailto}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 border border-[#3A3A3A]"
                    >
                      <Mail className="w-4 h-4 text-[#B8BEC3]" />
                      <span>Open in Email App ({BRAND_INFO.email})</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-[#252525] text-gray-300 text-xs font-semibold rounded-lg text-center"
                    >
                      Edit Message
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Michael Ross"
                    className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  {errors.name && <p className="text-[11px] text-red-400 mt-0.5">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Tactical Gear"
                    className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  {errors.company && <p className="text-[11px] text-red-400 mt-0.5">{errors.company}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Business Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. m.ross@apextactical.com"
                    className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  {errors.email && <p className="text-[11px] text-red-400 mt-0.5">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Country / Destination</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. United States, Germany, UK"
                    className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-300 mb-1">Phone or WhatsApp</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +1 555 342 9801"
                    className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-300 mb-1">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-300 mb-1">Message / Requirements *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your desired products, target quantity, or custom private label questions..."
                    className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white focus:outline-none resize-none"
                  />
                  {errors.message && <p className="text-[11px] text-red-400 mt-0.5">{errors.message}</p>}
                </div>
              </div>

              <div>
                <label className="flex items-start gap-2 text-xs text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 rounded bg-[#111111] border-[#333333] text-[#123D2A] focus:ring-0"
                  />
                  <span>I agree to allow FLAKES IMPEX / VORQEN to contact me regarding this product inquiry.</span>
                </label>
                {errors.consent && <p className="text-[11px] text-red-400 mt-0.5">{errors.consent}</p>}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="w-full sm:w-auto px-4 py-2.5 bg-[#1F1F1F] hover:bg-[#282828] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 border border-[#333333]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Send via WhatsApp</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-2.5 bg-[#123D2A] hover:bg-[#184e36] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 border border-[#215a3c]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Location & Timezone Context (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#181818] rounded-2xl p-6 sm:p-8 border border-[#262626] space-y-4">
            <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#123D2A]" />
              <span>Sialkot Export Desk Working Hours</span>
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Our factory management operates in Pakistan Standard Time (PKT, UTC+5). WhatsApp inquiries are typically responded to within 1-3 business hours.
            </p>
            <div className="space-y-2 text-xs border-t border-[#242424] pt-3">
              <div className="flex justify-between text-gray-300">
                <span>Monday &ndash; Friday:</span>
                <span className="font-medium text-white">9:00 AM &ndash; 7:00 PM PKT</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Saturday:</span>
                <span className="font-medium text-white">9:00 AM &ndash; 4:00 PM PKT</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Sunday:</span>
                <span>By appointment / urgent quotes</span>
              </div>
            </div>
          </div>

          <div className="bg-[#141414] rounded-2xl p-6 sm:p-8 border border-[#262626] space-y-4">
            <h3 className="text-base font-bold text-white font-heading">
              Export Shipping & Logistics
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Shipments depart via:
            </p>
            <ul className="text-xs text-gray-300 space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>Air Courier:</strong> DHL, FedEx, UPS (Express samples 4-7 days)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>Air Cargo:</strong> Sialkot International Airport (SKT)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>Ocean Freight:</strong> FCL / LCL via Port Qasim / Karachi</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
