import React, { useState } from 'react';
import { BRAND_INFO } from '../data/brandData';
import { 
  Settings, 
  Layers, 
  Tag, 
  Package, 
  FileCheck, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CustomManufacturingPageProps {
  onOpenGeneralQuote: () => void;
}

export const CustomManufacturingPage: React.FC<CustomManufacturingPageProps> = ({
  onOpenGeneralQuote,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    productType: 'Tactical & Work Protective Gloves',
    targetMarket: 'United States & Canada',
    materials: '',
    quantity: '500',
    brandingType: 'Silicone 3D + Woven Labels',
    packaging: 'Custom Retail Box with Barcode',
    budgetRange: '',
    deliveryDate: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppForward = () => {
    const text = `*CUSTOM OEM / PRIVATE-LABEL PROJECT INQUIRY*
---------------------------------------
*Client:* ${formData.name} (${formData.company})
*Email:* ${formData.email}
*Phone/WhatsApp:* ${formData.phone}
*Target Market:* ${formData.targetMarket}

*Product Line:* ${formData.productType}
*Target Quantity:* ${formData.quantity}
*Materials Desired:* ${formData.materials || 'To be recommended by factory'}
*Branding Requirements:* ${formData.brandingType}
*Packaging:* ${formData.packaging}
*Target Timeline:* ${formData.deliveryDate || 'Flexible'}
*Budget Target:* ${formData.budgetRange || 'Market Competitive'}

*Project Details / Tech-Pack Notes:*
${formData.notes || 'Interested in prototype sample and quotation.'}`;

    window.open(`${BRAND_INFO.whatsAppUrl}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const capabilities = [
    {
      title: 'Custom Patterns & 3D Ergonomics',
      desc: 'Send us your vector illustrations, physical samples, or sketches. We digitize and grade multi-size patterns for snug anatomical fit.'
    },
    {
      title: 'Material & Leather Selection',
      desc: 'Top-grain cowhide, goatskin, suede, Kevlar® knits, Spandex, Cordura®, Neoprene, and specialty fire-resistant or cut-resistant textiles.'
    },
    {
      title: 'Branding & Identification',
      desc: 'Direct silicone micro-injection, sonic-welded TPR logos, 3D embroidery, laser engraving, hot debossing, and woven jacquard tags.'
    },
    {
      title: 'Custom Packaging & Barcodes',
      desc: 'Full-color printed retail display cartons, recyclable frosted slider zipper bags, header cards, and master shipping cartons with UPC labels.'
    },
    {
      title: 'Pre-Production Prototyping',
      desc: 'We construct physical pre-production sample pairs for your team to evaluate feel, fit, stitching, and finishing before authorizing bulk production.'
    },
    {
      title: 'Flexible MOQs by Category',
      desc: 'Typical initial batches range from 300 to 500 units/pairs, with lower trial prototype minimums available upon technical review.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. HERO HEADER */}
      <div className="border-b border-[#222222] pb-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B8BEC3]">
          <Settings className="w-4 h-4 text-[#123D2A]" />
          <span>OEM & ODM Turnkey Manufacturing &bull; Sialkot, Pakistan</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading">
          YOUR DESIGN. YOUR BRAND. OUR MANUFACTURING PARTNER.
        </h1>
        <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
          Partner directly with FLAKES IMPEX to engineer custom sports gear, protective gloves, motorcycle wear, and technical apparel under your own brand identity. Every project is reviewed for feasibility, material availability, and sample scheduling.
        </p>
      </div>

      {/* 2. CAPABILITIES GRID */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#B8BEC3]">
            What We Customize
          </span>
          <h2 className="text-2xl font-bold text-white font-heading mt-1">
            End-to-End Private-Label Production Scope
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="bg-[#181818] p-6 rounded-xl border border-[#262626] hover:border-[#123D2A] transition-colors space-y-3"
            >
              <div className="text-xs font-mono font-bold text-[#123D2A]">
                0{idx + 1}.
              </div>
              <h3 className="text-sm font-bold text-white font-heading">
                {cap.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. PROJECT INQUIRY FORM */}
      <div className="bg-[#151515] rounded-2xl p-8 sm:p-12 border border-[#262626] space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B8BEC3]">
            Direct Factory Brief
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Submit Your Custom Project Specifications
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Fill in the details below. Our export engineering team will review your specifications and reply with preliminary feasibility, minimum quantity suggestions, and sample cost estimates.
          </p>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4 bg-[#1A1A1A] rounded-xl border border-[#2B2B2B] p-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white font-heading">
              Custom Project Brief Recorded
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
              Your inquiry has been stored in our export management log. Ali (+92 322 4853236) from FLAKES IMPEX will review your materials and target quantity.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleWhatsAppForward}
                className="px-6 py-2.5 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-bold rounded-lg flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Forward Brief to WhatsApp Now</span>
              </button>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 bg-[#252525] text-gray-300 text-xs font-semibold rounded-lg"
              >
                Submit Another Project
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. David Vance"
                  className="w-full bg-[#111111] border border-[#2E2E2E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#123D2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Company / Brand Name *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. IronClad Athletics"
                  className="w-full bg-[#111111] border border-[#2E2E2E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#123D2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Business Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. purchasing@ironclad.com"
                  className="w-full bg-[#111111] border border-[#2E2E2E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#123D2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Phone or WhatsApp *</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +1 416 555 8920"
                  className="w-full bg-[#111111] border border-[#2E2E2E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#123D2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Product Category</label>
                <select
                  value={formData.productType}
                  onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                  className="w-full bg-[#111111] border border-[#2E2E2E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#123D2A]"
                >
                  <option value="Work & Safety Gloves">Work & Safety Gloves</option>
                  <option value="Tactical & Military Gloves">Tactical & Military Gloves</option>
                  <option value="Motorcycle Leather Gloves">Motorcycle Leather Gloves</option>
                  <option value="Sports & Fitness Gloves">Sports & Fitness Gloves</option>
                  <option value="Leather Jackets & Outerwear">Leather Jackets & Outerwear</option>
                  <option value="Leather Accessories & Bags">Leather Accessories & Bags</option>
                  <option value="Sportswear, Hoodies & Teamwear">Sportswear, Hoodies & Teamwear</option>
                  <option value="Other Bespoke Sporting Gear">Other Bespoke Sporting Gear</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Target Geographic Market</label>
                <input
                  type="text"
                  value={formData.targetMarket}
                  onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
                  placeholder="e.g. United States, Germany, UK, Australia"
                  className="w-full bg-[#111111] border border-[#2E2E2E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#123D2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Estimated Initial Batch Qty *</label>
                <input
                  type="text"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="e.g. 500 units"
                  className="w-full bg-[#111111] border border-[#2E2E2E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#123D2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Preferred Materials</label>
                <input
                  type="text"
                  value={formData.materials}
                  onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                  placeholder="e.g. Full-grain cowhide, Kevlar palm, Spandex"
                  className="w-full bg-[#111111] border border-[#2E2E2E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#123D2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Branding Requirements</label>
                <input
                  type="text"
                  value={formData.brandingType}
                  onChange={(e) => setFormData({ ...formData, brandingType: e.target.value })}
                  placeholder="e.g. Silicone rubber badge, woven label, debossing"
                  className="w-full bg-[#111111] border border-[#2E2E2E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#123D2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Packaging Specifications</label>
                <input
                  type="text"
                  value={formData.packaging}
                  onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
                  placeholder="e.g. Custom retail printed box, polybag with barcode"
                  className="w-full bg-[#111111] border border-[#2E2E2E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#123D2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Target Delivery Date</label>
                <input
                  type="text"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  placeholder="e.g. 60 days from approved sample"
                  className="w-full bg-[#111111] border border-[#2E2E2E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#123D2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Target Budget Range (Optional)</label>
                <input
                  type="text"
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  placeholder="e.g. $12 - $18 per pair FOB"
                  className="w-full bg-[#111111] border border-[#2E2E2E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#123D2A]"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Project Description & Technical Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Describe your design specifications, reference dimensions, stitch requirements, or any specific compliance standards required in your jurisdiction..."
                  className="w-full bg-[#111111] border border-[#2E2E2E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#123D2A] resize-none"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#262626]">
              <p className="text-[11px] text-gray-400 max-w-md">
                Production feasibility, exact unit costs, sample prototyping fees, and freight options are confirmed in writing prior to any order confirmation.
              </p>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 border border-[#22573d] shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Custom Project Brief</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
