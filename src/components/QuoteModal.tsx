import React, { useState, useEffect } from 'react';
import { Product, QuoteRequest } from '../types';
import { BRAND_INFO } from '../data/brandData';
import { PRODUCT_CATEGORIES } from '../data/products';
import { X, Send, CheckCircle2, MessageSquare, AlertCircle, FileText, Mail } from 'lucide-react';
import { submitInquiry, SubmitInquiryResult } from '../services/inquiryApi';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProduct?: Product | null;
  onSaveInquiry: (inquiry: QuoteRequest) => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  prefilledProduct,
  onSaveInquiry,
}) => {
  const [formData, setFormData] = useState<QuoteRequest>({
    fullName: '',
    companyName: '',
    email: '',
    country: '',
    phoneOrWhatsApp: '',
    productCategory: 'work-safety-gloves',
    productName: '',
    estimatedQuantity: '500',
    materials: '',
    colors: '',
    sizes: '',
    brandingRequirements: '',
    packagingRequirements: '',
    targetDeliveryDate: '',
    additionalNotes: '',
    privacyConsent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmitInquiryResult | null>(null);

  useEffect(() => {
    if (prefilledProduct) {
      setFormData((prev) => ({
        ...prev,
        productCategory: prefilledProduct.category,
        productName: prefilledProduct.name,
        materials: prefilledProduct.materials.join(', '),
        colors: prefilledProduct.colors.join(', '),
        sizes: prefilledProduct.sizes.join(', '),
      }));
    }
  }, [prefilledProduct]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid business email is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.phoneOrWhatsApp.trim()) newErrors.phoneOrWhatsApp = 'Phone or WhatsApp number is required';
    if (!formData.estimatedQuantity.trim()) newErrors.estimatedQuantity = 'Estimated quantity is required';
    if (!formData.privacyConsent) newErrors.privacyConsent = 'You must accept the privacy policy to proceed';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionResult(null);

    const payload = {
      fullName: formData.fullName,
      companyName: formData.companyName,
      email: formData.email,
      country: formData.country,
      phoneOrWhatsApp: formData.phoneOrWhatsApp,
      subject: `B2B Quotation: ${formData.productName || formData.productCategory} (${formData.estimatedQuantity} Units)`,
      message: formData.additionalNotes || 'Quotation request submitted via VORQEN export catalog.',
      productCategory: formData.productCategory,
      productName: formData.productName,
      estimatedQuantity: formData.estimatedQuantity,
      materials: formData.materials,
      colors: formData.colors,
      sizes: formData.sizes,
      brandingRequirements: formData.brandingRequirements,
      packagingRequirements: formData.packagingRequirements,
      additionalNotes: formData.additionalNotes,
    };

    const result = await submitInquiry(payload);
    setIsSubmitting(false);
    setSubmissionResult(result);
    setSubmitted(true);

    const savedRecord = {
      ...formData,
      id: result.inquiryId || ('REQ-' + Date.now().toString(36).toUpperCase()),
      createdAt: new Date().toISOString(),
    };

    onSaveInquiry(savedRecord);
  };

  const handleSendViaWhatsApp = () => {
    const text = `*VORQEN B2B QUOTATION INQUIRY*
----------------------------
*Name:* ${formData.fullName}
*Company:* ${formData.companyName}
*Country:* ${formData.country}
*Email:* ${formData.email}
*Phone/WhatsApp:* ${formData.phoneOrWhatsApp}

*Product Line:* ${formData.productCategory}
*Product / Item:* ${formData.productName || 'Custom Specification'}
*Estimated Qty:* ${formData.estimatedQuantity}
*Materials:* ${formData.materials || 'Standard Specification'}
*Colors:* ${formData.colors || 'Standard'}
*Sizes:* ${formData.sizes || 'Assorted'}
*Branding Requirements:* ${formData.brandingRequirements || 'Custom Private Label'}
*Packaging:* ${formData.packagingRequirements || 'Standard Export Carton'}
*Target Delivery Date:* ${formData.targetDeliveryDate || 'Flexible'}
*Additional Notes:* ${formData.additionalNotes || 'N/A'}`;

    window.open(`${BRAND_INFO.whatsAppUrl}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#161616] border border-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-[#121212] px-6 py-5 border-b border-[#242424] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#123D2A] rounded-lg text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                International B2B Quotation Request
              </h3>
              <p className="text-xs text-[#B8BEC3]">
                Direct export inquiry to FLAKES IMPEX (Est. {BRAND_INFO.establishedYear}, Sialkot, Pakistan)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-[#222222] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="py-8 space-y-4 text-left">
              {submissionResult?.emailDelivered ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white font-heading">
                        Quotation Request Successfully Delivered
                      </h4>
                      <p className="text-xs text-emerald-400 font-medium">
                        Transmitted to {submissionResult?.recipientEmail || 'vorqenimpex@gmail.com'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#1D1D1D] p-4 rounded-xl border border-[#2B2B2B] text-xs text-gray-300 space-y-2">
                    <div className="flex justify-between border-b border-[#2B2B2B] pb-1.5">
                      <span className="text-gray-400">Reference Number:</span>
                      <span className="font-mono font-bold text-white">{submissionResult?.inquiryId}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#2B2B2B] pb-1.5">
                      <span className="text-gray-400">Article Requested:</span>
                      <span className="text-white font-medium">{formData.productName || formData.productCategory} ({formData.estimatedQuantity} Units)</span>
                    </div>
                    <div className="flex justify-between border-b border-[#2B2B2B] pb-1.5">
                      <span className="text-gray-400">Export Management:</span>
                      <span className="text-white">Ali &bull; FLAKES IMPEX (Sialkot, Pakistan)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Automated Receipt:</span>
                      <span className="text-emerald-400">Sent to {formData.email}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    Thank you, {formData.fullName}. Our factory desk has received your exact specifications. Export Manager Ali will prepare formal quotation terms, freight options, and sample schedules within 12&ndash;24 hours.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      onClick={handleSendViaWhatsApp}
                      className="w-full sm:w-auto px-6 py-2.5 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors border border-[#255f41]"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>Chat on WhatsApp (+92 322 4853236)</span>
                    </button>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        onClose();
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#222222] hover:bg-[#2B2B2B] text-gray-300 hover:text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white font-heading">
                        Quotation Request Registered
                      </h4>
                      <p className="text-xs text-amber-400 font-medium">
                        Ref: {submissionResult?.inquiryId} &bull; Recorded in Factory Database
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#1D1D1D] p-4 rounded-xl border border-[#2B2B2B] text-xs text-gray-300 space-y-2 leading-relaxed">
                    <p>
                      Your quotation request for <strong>{formData.productName || formData.productCategory}</strong> has been saved with Reference ID <strong className="text-white font-mono">{submissionResult?.inquiryId}</strong>.
                    </p>
                    <p className="text-gray-400 text-[11px]">
                      To ensure expedited review and sample scheduling without delay, transmit your request directly to our official factory WhatsApp or email desk below:
                    </p>
                  </div>

                  {submissionResult?.error && (
                    <div className="p-3 bg-red-950/30 border border-red-900/50 rounded-lg text-xs text-red-300">
                      <strong>Delivery Notice:</strong> {submissionResult.error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      onClick={handleSendViaWhatsApp}
                      className="w-full sm:w-auto px-6 py-2.5 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors border border-[#255f41]"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>Transmit to WhatsApp Desk</span>
                    </button>
                    <a
                      href={submissionResult?.directLinks?.mailto || `mailto:${BRAND_INFO.email}`}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 border border-[#3A3A3A]"
                    >
                      <Mail className="w-4 h-4 text-[#B8BEC3]" />
                      <span>Open in Email App ({BRAND_INFO.email})</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        onClose();
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 bg-[#222222] text-gray-400 hover:text-white text-xs font-semibold rounded-lg"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Notice Banner */}
              <div className="bg-[#123D2A]/50 border border-[#235d3f] p-3 rounded-xl flex items-center gap-2.5 text-xs text-gray-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span>
                  <strong className="text-white">Contact for Catalog Samples & Timely Shipping:</strong> Counter-sample prototypes and physical material catalogs dispatched worldwide via express courier.
                </span>
              </div>

              {/* Client Information */}
              <div>
                <h4 className="text-xs uppercase font-bold text-[#B8BEC3] tracking-wider mb-3">
                  01. Client & Company Profile
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. John Henderson"
                      className="w-full bg-[#111111] border border-[#2B2B2B] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                    />
                    {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Apex Tactical Gear Ltd."
                      className="w-full bg-[#111111] border border-[#2B2B2B] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                    />
                    {errors.companyName && <p className="text-[11px] text-red-400 mt-1">{errors.companyName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. procurement@apextactical.com"
                      className="w-full bg-[#111111] border border-[#2B2B2B] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                    />
                    {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Destination Country / Port *
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. United States / Port of Houston"
                      className="w-full bg-[#111111] border border-[#2B2B2B] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                    />
                    {errors.country && <p className="text-[11px] text-red-400 mt-1">{errors.country}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Phone Number or WhatsApp (with Country Code) *
                    </label>
                    <input
                      type="text"
                      value={formData.phoneOrWhatsApp}
                      onChange={(e) => setFormData({ ...formData, phoneOrWhatsApp: e.target.value })}
                      placeholder="e.g. +1 555 123 4567"
                      className="w-full bg-[#111111] border border-[#2B2B2B] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                    />
                    {errors.phoneOrWhatsApp && <p className="text-[11px] text-red-400 mt-1">{errors.phoneOrWhatsApp}</p>}
                  </div>
                </div>
              </div>

              {/* Product Specifications */}
              <div className="pt-4 border-t border-[#242424]">
                <h4 className="text-xs uppercase font-bold text-[#B8BEC3] tracking-wider mb-3">
                  02. Product & Order Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Product Category
                    </label>
                    <select
                      value={formData.productCategory}
                      onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                      className="w-full bg-[#111111] border border-[#2B2B2B] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      {PRODUCT_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Target Product Name / Article Code
                    </label>
                    <input
                      type="text"
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      placeholder="e.g. VORQEN Pro-Impact TPR Safety Glove"
                      className="w-full bg-[#111111] border border-[#2B2B2B] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Estimated Production Quantity (Units / Pairs) *
                    </label>
                    <input
                      type="text"
                      value={formData.estimatedQuantity}
                      onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                      placeholder="e.g. 500 pairs (Sample evaluation first)"
                      className="w-full bg-[#111111] border border-[#2B2B2B] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                    />
                    {errors.estimatedQuantity && <p className="text-[11px] text-red-400 mt-1">{errors.estimatedQuantity}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Target Delivery / Shipment Date
                    </label>
                    <input
                      type="date"
                      value={formData.targetDeliveryDate}
                      onChange={(e) => setFormData({ ...formData, targetDeliveryDate: e.target.value })}
                      className="w-full bg-[#111111] border border-[#2B2B2B] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Materials Desired
                    </label>
                    <input
                      type="text"
                      value={formData.materials}
                      onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                      placeholder="e.g. Top grain cowhide, Kevlar, or Custom"
                      className="w-full bg-[#111111] border border-[#2B2B2B] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Colorways & Sizes
                    </label>
                    <input
                      type="text"
                      value={formData.colors}
                      onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                      placeholder="e.g. Black / Hi-Vis Orange, Sizes S-2XL"
                      className="w-full bg-[#111111] border border-[#2B2B2B] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Branding & Labeling Requirements
                    </label>
                    <input
                      type="text"
                      value={formData.brandingRequirements}
                      onChange={(e) => setFormData({ ...formData, brandingRequirements: e.target.value })}
                      placeholder="e.g. Private-label silicone badge, woven neck label"
                      className="w-full bg-[#111111] border border-[#2B2B2B] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Packaging Specifications
                    </label>
                    <input
                      type="text"
                      value={formData.packagingRequirements}
                      onChange={(e) => setFormData({ ...formData, packagingRequirements: e.target.value })}
                      placeholder="e.g. Barcoded polybags, retail box, or bulk"
                      className="w-full bg-[#111111] border border-[#2B2B2B] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Additional Tech-Pack / Notes / Special Instructions
                    </label>
                    <textarea
                      rows={3}
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                      placeholder="Describe target market standards, sample timing, stitch tolerance or specific requirements..."
                      className="w-full bg-[#111111] border border-[#2B2B2B] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Privacy Consent */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.privacyConsent}
                    onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                    className="mt-0.5 rounded bg-[#111111] border-[#333333] text-[#123D2A] focus:ring-0"
                  />
                  <span>
                    I confirm that the provided company information is accurate and agree to receive factory direct quotations and commercial communication from FLAKES IMPEX / VORQEN.
                  </span>
                </label>
                {errors.privacyConsent && (
                  <p className="text-[11px] text-red-400 mt-1">{errors.privacyConsent}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#242424] flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#123D2A] hover:bg-[#184e36] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 border border-[#23583d]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Quotation Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
