import React, { useState } from 'react';
import { Product } from '../types';
import { BRAND_INFO } from '../data/brandData';
import { X, CheckCircle2, MessageSquare, FileText, Plus, Shield, Clock, PackageCheck, Layers } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onRequestQuote: (product: Product) => void;
  onAddToQuoteBag: (product: Product) => void;
  isInQuoteBag?: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestQuote,
  onAddToQuoteBag,
  isInQuoteBag = false,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.image);

  const handleWhatsAppProductInquiry = () => {
    const text = `Hello VORQEN & FLAKES IMPEX team,
I am interested in acquiring bulk quotation / sample for:
*${product.name}* (${product.categoryLabel})
Article ID: ${product.id}

Please share:
1. Minimum Order Quantity (MOQ) terms
2. Sample turnaround & pricing
3. Custom private-label & branding options
4. Production lead time to our destination country

Thank you!`;
    window.open(`${BRAND_INFO.whatsAppUrl}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#161616] border border-[#2B2B2B] rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Modal Top Bar */}
        <div className="bg-[#121212] px-6 py-4 border-b border-[#242424] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#B8BEC3]">
            <span className="font-semibold text-white uppercase">{product.categoryLabel}</span>
            <span aria-hidden="true">&bull;</span>
            <span>Article: {product.id.toUpperCase()}</span>
            <span aria-hidden="true">&bull;</span>
            <span className="text-gray-400">FLAKES IMPEX (Est. {BRAND_INFO.establishedYear})</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-[#222222] transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image Gallery (5 cols) */}
          <div className="lg:col-span-5 p-6 bg-[#131313] border-b lg:border-b-0 lg:border-r border-[#242424] flex flex-col gap-4">
            {/* Active Big Showcase Image */}
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#181818] border border-[#2A2A2A] relative">
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Gallery Thumbnail Selector */}
            {product.galleryImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border shrink-0 transition-all ${
                      activeImage === img ? 'border-[#123D2A] ring-2 ring-[#123D2A]' : 'border-[#262626] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Manufacturing Highlights */}
            <div className="bg-[#181818] rounded-xl p-4 border border-[#242424] space-y-2.5 text-xs text-gray-300 mt-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#123D2A] shrink-0" />
                <span>
                  <strong>MOQ:</strong> {product.moq}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#123D2A] shrink-0" />
                <span>
                  <strong>Production Lead Time:</strong> {product.leadTime}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-[#123D2A] shrink-0" />
                <span>
                  <strong>Sample Prototype:</strong> Available upon specification review
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#123D2A] shrink-0" />
                <span>
                  <strong>Inspection:</strong> 100% pre-shipment multi-point QC
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Product Specs & Purchase Module (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#123D2A] text-emerald-200 border border-[#216140] rounded-lg px-3 py-1 text-[11px] font-bold tracking-wide uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Contact for catalog samples &bull; timely shipping</span>
              </div>
              <h2 className="text-2xl font-bold text-white font-heading mt-1 leading-tight">
                {product.name}
              </h2>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Engineered Key Features */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2.5 font-heading">
                Key Performance Features
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-[#1B1B1B] p-2.5 rounded-lg border border-[#242424]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Materials, Colors, Sizes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#242424]">
              {/* Materials */}
              <div>
                <h5 className="text-[11px] font-bold uppercase text-[#B8BEC3] mb-1.5">
                  Available Materials
                </h5>
                <ul className="text-xs text-gray-300 space-y-1">
                  {product.materials.map((m, idx) => (
                    <li key={idx} className="text-gray-300">&bull; {m}</li>
                  ))}
                </ul>
              </div>

              {/* Colors */}
              <div>
                <h5 className="text-[11px] font-bold uppercase text-[#B8BEC3] mb-1.5">
                  Standard Colorways
                </h5>
                <ul className="text-xs text-gray-300 space-y-1">
                  {product.colors.map((c, idx) => (
                    <li key={idx} className="text-gray-300">&bull; {c}</li>
                  ))}
                </ul>
              </div>

              {/* Sizes */}
              <div>
                <h5 className="text-[11px] font-bold uppercase text-[#B8BEC3] mb-1.5">
                  Size Grading
                </h5>
                <ul className="text-xs text-gray-300 space-y-1">
                  {product.sizes.map((s, idx) => (
                    <li key={idx} className="text-gray-300">&bull; {s}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Branding & Packaging Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#242424]">
              <div className="bg-[#181818] p-3 rounded-lg border border-[#242424]">
                <h5 className="text-[11px] font-bold uppercase text-white mb-1">
                  Branding & Logo Placement
                </h5>
                <p className="text-xs text-gray-400">
                  {product.brandingOptions.join(' &bull; ')}
                </p>
              </div>

              <div className="bg-[#181818] p-3 rounded-lg border border-[#242424]">
                <h5 className="text-[11px] font-bold uppercase text-white mb-1">
                  Packaging & Export Formats
                </h5>
                <p className="text-xs text-gray-400">
                  {product.packagingOptions.join(' &bull; ')}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-[#242424] flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onRequestQuote(product);
                }}
                className="w-full sm:w-auto px-6 py-3 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 border border-[#265e43] shadow-md flex-1"
              >
                <FileText className="w-4 h-4" />
                <span>Request B2B Quotation</span>
              </button>

              <button
                onClick={handleWhatsAppProductInquiry}
                className="w-full sm:w-auto px-5 py-3 bg-[#1E1E1E] hover:bg-[#282828] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 border border-[#333333] shrink-0"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Inquire on WhatsApp</span>
              </button>

              <button
                onClick={() => onAddToQuoteBag(product)}
                className="w-full sm:w-auto px-4 py-3 bg-[#1A1A1A] hover:bg-[#222222] text-[#B8BEC3] hover:text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-[#2E2E2E] shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{isInQuoteBag ? 'In Quote Bag' : 'Add to Bag'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
