import React, { useState } from 'react';
import { BRAND_INFO, WORKSHOP_PROCESS_STEPS } from '../data/brandData';
import { 
  Scissors, 
  Layers, 
  ShieldCheck, 
  Package, 
  Truck, 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  FileText, 
  MessageSquare, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';

interface WorkshopPageProps {
  onRequestQuote: () => void;
}

export const WorkshopPage: React.FC<WorkshopPageProps> = ({ onRequestQuote }) => {
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [visitSubmitted, setVisitSubmitted] = useState(false);
  const [visitForm, setVisitForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    tentativeDates: '',
    productsOfInterest: '',
  });

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVisitSubmitted(true);
  };

  const workmanshipPoints = [
    {
      title: 'Precision Needlework & Seam Articulation',
      description: 'Heavy bonded threads and synchronized needle feeds guarantee seam tensile strength under severe shear and torsion stress in tactical and motorcycling environments.'
    },
    {
      title: 'Ergonomic Anatomical Grading',
      description: 'Pre-curved finger designs and articulated shoulder action-backs prevent hand fatigue and allow full range of athletic movement.'
    },
    {
      title: 'Tanned Leather Grain Consistency',
      description: 'Drum-dyed naked cowhide and supple goatskins are inspected hide-by-hide for uniform thickness, grain texture, and natural resilience.'
    },
    {
      title: 'Integrated Thermo-Rubber & Reinforcement',
      description: 'Sonic welding and mechanical stitching anchor protective TPR armor directly into the glove substrate without compromising glove breathability.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      {/* 1. WORKSHOP HERO & INTRO */}
      <div className="relative rounded-2xl overflow-hidden bg-[#141414] border border-[#262626]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B8BEC3]">
              <Scissors className="w-4 h-4 text-[#123D2A]" />
              <span>SIALKOT WORKSHOP & PRODUCTION</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading leading-tight">
              BEHIND THE CRAFT. BUILT FOR QUALITY.
            </h1>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
              Discover the manufacturing and workmanship behind our product categories, supported by <strong className="text-white">FLAKES IMPEX</strong> in Sialkot, Pakistan. Established in 2001, our facility operates in the world's most distinguished manufacturing cluster for technical sporting goods and fine leathercraft.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onRequestQuote}
                className="px-6 py-3 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 border border-[#235b3e] shadow-md"
              >
                <span>DISCUSS YOUR MANUFACTURING REQUIREMENTS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowVisitModal(true)}
                className="px-5 py-3 bg-[#1F1F1F] hover:bg-[#282828] text-white text-xs font-semibold rounded-lg transition-colors border border-[#333333]"
              >
                Inquire About Factory Visit
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full bg-[#111111]">
            <img
              src="/src/assets/images/workshop_craftsmanship_1792345108466.jpg"
              alt="FLAKES IMPEX craftsman stitching leather in Sialkot workshop"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </div>

      {/* 2. THE 9-STEP MANUFACTURING PROCESS */}
      <div className="space-y-8">
        <div className="border-b border-[#222222] pb-4">
          <span className="text-xs font-semibold text-[#B8BEC3] uppercase tracking-widest">
            Production Lifecycle
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-1">
            Standard 9-Step Manufacturing Process
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            General workflow followed at FLAKES IMPEX. Specific manufacturing protocols are tailored to individual buyer tech-packs and material selections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKSHOP_PROCESS_STEPS.map((stepItem) => (
            <div
              key={stepItem.step}
              className="bg-[#181818] p-6 rounded-xl border border-[#262626] hover:border-[#123D2A] transition-all space-y-3"
            >
              <div className="w-8 h-8 rounded-lg bg-[#111111] border border-[#2B2B2B] text-white font-mono font-bold text-xs flex items-center justify-center text-[#B8BEC3]">
                {stepItem.step}
              </div>
              <h3 className="text-sm font-bold text-white font-heading">
                {stepItem.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {stepItem.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. WORKMANSHIP & TECHNICAL DETAILS */}
      <div className="bg-[#161616] rounded-2xl p-8 sm:p-12 border border-[#262626] space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold text-[#B8BEC3] uppercase tracking-widest">
            Artisanal Integrity
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Workmanship Standards in Sialkot
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Every millimeter of stitching, reinforcement gusset, and closure strap is executed by tradesmen with years of specialized practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workmanshipPoints.map((point, idx) => (
            <div
              key={idx}
              className="bg-[#1C1C1C] p-6 rounded-xl border border-[#262626] space-y-2"
            >
              <h3 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{point.title}</span>
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed pl-6">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CUSTOMIZATION WORKSHOP */}
      <div className="bg-[#131313] rounded-2xl p-8 sm:p-12 border border-[#262626] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <span className="text-xs font-semibold text-[#B8BEC3] uppercase tracking-widest">
            OEM & Private Label Services
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Tailored Development in Our Workshop
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            We partner with independent brands, corporate uniform suppliers, motorcycle racing teams, and sports equipment distributors worldwide. Send us your vector art, dimensional patterns, or physical master samples to initiate engineering reviews.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#B8BEC3]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Pantone Dye Matching</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Custom Rubber / Silicone Molds</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tailored Export Packaging</span>
            </span>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-3">
          <button
            onClick={onRequestQuote}
            className="w-full py-3.5 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 border border-[#215a3c] shadow-md"
          >
            <FileText className="w-4 h-4" />
            <span>Request Custom Batch Quote</span>
          </button>
          <a
            href={BRAND_INFO.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-[#1C1C1C] hover:bg-[#262626] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 border border-[#333333]"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Chat Directly on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* 5. FACTORY VISIT INQUIRY MODAL */}
      {showVisitModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#161616] border border-[#2A2A2A] rounded-2xl shadow-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#242424]">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#123D2A]" />
                <h3 className="text-base font-bold text-white font-heading">
                  Factory Visit Inquiry (Sialkot, Pakistan)
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowVisitModal(false);
                  setVisitSubmitted(false);
                }}
                className="text-gray-400 hover:text-white text-xs"
              >
                Close
              </button>
            </div>

            {visitSubmitted ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Visit Inquiry Received</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Thank you. Ali from our export management desk will review your scheduled travel dates and communicate directly via email/WhatsApp regarding meeting arrangements in Sialkot.
                </p>
                <button
                  onClick={() => {
                    setShowVisitModal(false);
                    setVisitSubmitted(false);
                  }}
                  className="px-5 py-2 bg-[#123D2A] text-white text-xs font-semibold rounded-lg"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleVisitSubmit} className="space-y-3">
                <p className="text-xs text-gray-400">
                  We welcome verified international buyers and brand representatives interested in touring our glove and apparel workshop lines in Sialkot, Pakistan.
                </p>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={visitForm.name}
                    onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })}
                    className="w-full bg-[#111111] border border-[#2B2B2B] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#123D2A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Company & Country *</label>
                  <input
                    type="text"
                    required
                    value={visitForm.company}
                    onChange={(e) => setVisitForm({ ...visitForm, company: e.target.value })}
                    className="w-full bg-[#111111] border border-[#2B2B2B] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#123D2A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={visitForm.email}
                      onChange={(e) => setVisitForm({ ...visitForm, email: e.target.value })}
                      className="w-full bg-[#111111] border border-[#2B2B2B] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#123D2A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">WhatsApp / Phone *</label>
                    <input
                      type="text"
                      required
                      value={visitForm.phone}
                      onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value })}
                      className="w-full bg-[#111111] border border-[#2B2B2B] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#123D2A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Tentative Dates of Visit</label>
                  <input
                    type="text"
                    placeholder="e.g. Next month / Q3 2026"
                    value={visitForm.tentativeDates}
                    onChange={(e) => setVisitForm({ ...visitForm, tentativeDates: e.target.value })}
                    className="w-full bg-[#111111] border border-[#2B2B2B] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#123D2A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Products of Primary Interest</label>
                  <input
                    type="text"
                    placeholder="e.g. Tactical gloves, Biker leather jackets, Teamwear"
                    value={visitForm.productsOfInterest}
                    onChange={(e) => setVisitForm({ ...visitForm, productsOfInterest: e.target.value })}
                    className="w-full bg-[#111111] border border-[#2B2B2B] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#123D2A]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowVisitModal(false)}
                    className="px-4 py-2 text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-bold rounded-lg"
                  >
                    Submit Visit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
