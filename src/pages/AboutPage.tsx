import React from 'react';
import { BRAND_INFO } from '../data/brandData';
import { 
  Building2, 
  Globe2, 
  Award, 
  ShieldCheck, 
  FileText, 
  MessageSquare, 
  MapPin, 
  ExternalLink,
  Layers,
  CheckCircle2
} from 'lucide-react';

interface AboutPageProps {
  onRequestQuote: () => void;
  onNavigateWorkshop: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onRequestQuote,
  onNavigateWorkshop,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. HERO HEADER */}
      <div className="border-b border-[#222222] pb-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B8BEC3]">
          <span>Corporate Heritage & Manufacturing Alliance</span>
          <span aria-hidden="true">&bull;</span>
          <span>Sialkot, Pakistan</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading">
          FROM SIALKOT, PAKISTAN TO GLOBAL MARKETS.
        </h1>
        <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
          {BRAND_INFO.businessStructureNote} We welcome business inquiries for product customization, private-label projects, samples, and wholesale or bulk orders, subject to product specifications and production requirements.
        </p>
      </div>

      {/* 2. THE BRAND & MANUFACTURING STRUCTURE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 bg-[#161616] rounded-2xl p-8 sm:p-10 border border-[#262626] space-y-5">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B8BEC3]">
            Our Business Structure
          </span>
          <h2 className="text-2xl font-bold text-white font-heading">
            A Purpose-Built Brand Powered by Two Decades of Industrial Export Experience
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            <strong className="text-white">VORQEN</strong> is our consumer and commercial product brand, engineered to represent modern design, anatomical ergonomics, and international athletic aesthetics.
          </p>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            <strong className="text-white">FLAKES IMPEX</strong> is the foundational manufacturing and export company, established in 2001 in Sialkot, Pakistan. Operating within the historic epicentre of global sports manufacturing, FLAKES IMPEX supplies technical production capabilities, export licensing, skilled labor, and raw material procurement channels.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
            <a
              href={BRAND_INFO.parentCompanyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white font-semibold hover:underline"
            >
              <span>Visit FLAKES IMPEX Corporate Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="text-gray-600">|</span>
            <button
              onClick={onNavigateWorkshop}
              className="inline-flex items-center gap-1.5 text-white font-semibold hover:underline"
            >
              <span>View Workshop Machinery & Seaming</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#121212] rounded-2xl p-8 border border-[#2A2A2A] flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B8BEC3] mb-4">
              <Building2 className="w-4 h-4 text-[#123D2A]" />
              <span>Verified Entity Facts</span>
            </div>
            <ul className="space-y-3 text-xs">
              <li className="flex justify-between border-b border-[#222222] pb-2">
                <span className="text-gray-400">Brand Name:</span>
                <span className="text-white font-bold">VORQEN</span>
              </li>
              <li className="flex justify-between border-b border-[#222222] pb-2">
                <span className="text-gray-400">Manufacturing Exporter:</span>
                <span className="text-white font-bold">FLAKES IMPEX</span>
              </li>
              <li className="flex justify-between border-b border-[#222222] pb-2">
                <span className="text-gray-400">Year Established:</span>
                <span className="text-white font-bold">2001</span>
              </li>
              <li className="flex justify-between border-b border-[#222222] pb-2">
                <span className="text-gray-400">Headquarters:</span>
                <span className="text-white font-bold">Sialkot, Pakistan</span>
              </li>
              <li className="flex justify-between border-b border-[#222222] pb-2">
                <span className="text-gray-400">Commercial Contact:</span>
                <span className="text-white font-bold">Ali</span>
              </li>
              <li className="flex justify-between pb-1">
                <span className="text-gray-400">Direct Export Desk:</span>
                <span className="text-white font-bold">+92 322 4853236</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-[#181818] rounded-xl border border-[#262626] text-xs text-gray-400 space-y-1">
            <span className="text-white font-semibold block">Commitment to Honest Representation</span>
            <p className="text-[11px] leading-relaxed">
              We present only verified corporate information. We do not claim unverified certifications, exaggerated factory metrics, or synthetic third-party awards.
            </p>
          </div>
        </div>
      </div>

      {/* 3. SIALKOT HERITAGE */}
      <div className="bg-[#141414] rounded-2xl p-8 sm:p-12 border border-[#262626] space-y-6">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B8BEC3] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#123D2A]" />
            <span>Industrial Geography</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Why Sialkot, Pakistan Matters for Global Sports & Leather
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Sialkot produces a significant majority of the world's hand-stitched soccer balls, high-performance motorcycle gloves, combat sports equipment, and tactical apparel. This concentrated industrial ecosystem provides direct access to experienced master leather tanners, skilled seamstresses, precision mold makers, and international freight handlers within hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="bg-[#191919] p-5 rounded-xl border border-[#262626] space-y-2">
            <h4 className="text-sm font-bold text-white font-heading">Tanning & Leather Craft</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Immediate access to full-grain cowhides, sheepskins, goatskins, and specialized drum-dyed finishes with precise thickness and temper control.
            </p>
          </div>

          <div className="bg-[#191919] p-5 rounded-xl border border-[#262626] space-y-2">
            <h4 className="text-sm font-bold text-white font-heading">Specialized Assembly Lines</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Decades of institutional hand-sewing and machine-sewing know-how passed through artisan families and precision trade schools.
            </p>
          </div>

          <div className="bg-[#191919] p-5 rounded-xl border border-[#262626] space-y-2">
            <h4 className="text-sm font-bold text-white font-heading">Direct Export Infrastructure</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Dedicated Sialkot International Airport (SKT) and dry-port customs facilities ensure streamlined dispatch to Europe, the Americas, and Asia.
            </p>
          </div>
        </div>
      </div>

      {/* 4. CUSTOMER SERVICE & PARTNERSHIP ETHOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#161616] p-8 sm:p-12 rounded-2xl border border-[#262626]">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B8BEC3]">
            International B2B Relationships
          </span>
          <h2 className="text-2xl font-bold text-white font-heading">
            Transparent Quotations, Realistic Timelines & Sample Verification
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            We value long-term commercial relationships over one-off transactional orders. Our export desk works with you through direct messaging, phone calls, and video walkthroughs so your purchasing department receives clear status updates at every stage.
          </p>
          <ul className="space-y-2 text-xs text-gray-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct factory communication with Ali (no intermediaries)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Pre-production sample evaluation before bulk cutting</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Packaging customized with your barcodes and branding</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#1A1A1A] p-6 sm:p-8 rounded-xl border border-[#2C2C2C] space-y-4 text-center sm:text-left">
          <h3 className="text-base font-bold text-white font-heading">
            Initiate a Direct Manufacturing Conversation
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Contact Ali at FLAKES IMPEX / VORQEN to discuss product requirements, tech-packs, or evaluation sample orders.
          </p>
          <div className="space-y-2 text-xs pt-1">
            <p className="text-gray-300">
              <strong className="text-white">Phone / WhatsApp:</strong> +92 322 4853236
            </p>
            <p className="text-gray-300">
              <strong className="text-white">Email:</strong> {BRAND_INFO.email}
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onRequestQuote}
              className="px-5 py-2.5 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-bold rounded-lg transition-colors border border-[#215a3c]"
            >
              Request Formal Quote
            </button>
            <a
              href={BRAND_INFO.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#242424] hover:bg-[#303030] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
