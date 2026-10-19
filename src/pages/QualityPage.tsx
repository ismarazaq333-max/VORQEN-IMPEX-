import React from 'react';
import { BRAND_INFO } from '../data/brandData';
import { 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck, 
  Layers, 
  Eye, 
  PackageCheck, 
  AlertCircle,
  ArrowRight,
  FileText
} from 'lucide-react';

interface QualityPageProps {
  onRequestQuote: () => void;
}

export const QualityPage: React.FC<QualityPageProps> = ({ onRequestQuote }) => {
  const inspectionStages = [
    {
      title: '01. Raw Material Specification Review',
      detail: 'Inspection of incoming leather hides for grain consistency, tensile thickness (gauge caliper check), and color-lot uniformity. Synthetic textiles, elastic webbing, and threads are verified against tech-pack tensile and tear requirements before cutting.'
    },
    {
      title: '02. Pre-Cut Component Dimension Verification',
      detail: 'Die-cut patterns and laser-cut panels are checked against master dimensional acrylic templates to ensure exact symmetry and size-grading tolerance prior to sewing assembly.'
    },
    {
      title: '03. In-Line Stitching & Seam Strength Review',
      detail: 'Active seamstresses follow calibrated needle gauges, bounded thread tensions, and stitch-per-inch (SPI) guidelines. Critical load points, finger crotches, and zipper ends receive double-needle reinforcement.'
    },
    {
      title: '04. Hardware, Armor & Closure Fastener Checks',
      detail: 'Molded TPR protectors, carbon knuckles, Velcro loop adhesion, and YKK zipper glides undergo functional cycle testing to guarantee secure mechanical attachment.'
    },
    {
      title: '05. Aesthetic Finishing & Branding Alignment',
      detail: 'Embroidery tension, silicone badge registration, screen-printed clarity, and loose thread trimming are manually reviewed piece-by-piece under high-lumen workshop inspection lamps.'
    },
    {
      title: '06. Export Packaging & Barcode Verification',
      detail: 'Verification of polybag barcodes, size stickers, hangtags, and moisture-absorbing desiccant placement before sealing in reinforced 5-ply export master cartons.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. HEADER */}
      <div className="border-b border-[#222222] pb-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B8BEC3]">
          <ShieldCheck className="w-4 h-4 text-[#123D2A]" />
          <span>Quality Assurance & Inspection Protocols &bull; FLAKES IMPEX</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading">
          OUR QUALITY & INSPECTION APPROACH
        </h1>
        <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
          At VORQEN and FLAKES IMPEX, quality is maintained through disciplined multi-stage manual inspection and adherence to approved buyer tech-packs. We do not rely on automated shortcuts or unverified marketing badges—every batch is inspected to agreed physical standards.
        </p>
      </div>

      {/* 2. HONEST REPRESENTATION CALLOUT */}
      <div className="bg-[#181818] rounded-xl p-6 border border-[#2B2B2B] flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-gray-300">
        <div className="p-3 bg-[#111111] rounded-lg text-[#B8BEC3] shrink-0 border border-[#222222]">
          <FileCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-white text-sm">Transparent Quality Philosophy</h4>
          <p className="text-gray-400 leading-relaxed">
            Specific test ratings (such as EN 388 mechanical levels, CE motorcycle PPE categories, or chemical compliance) depend on buyer-requested laboratory testing and specific material selections. We facilitate third-party laboratory evaluations (e.g. SGS / Intertek) upon buyer arrangement and agreement.
          </p>
        </div>
      </div>

      {/* 3. THE 6 INSPECTION STAGES */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#B8BEC3]">
            Inspection Framework
          </span>
          <h2 className="text-2xl font-bold text-white font-heading mt-1">
            Six-Stage Workshop Quality Checks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inspectionStages.map((stage, idx) => (
            <div
              key={idx}
              className="bg-[#161616] p-6 rounded-xl border border-[#262626] space-y-3"
            >
              <h3 className="text-sm font-bold text-white font-heading">
                {stage.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {stage.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. PRE-SHIPMENT APPROVAL & BUYER INSPECTIONS */}
      <div className="bg-[#141414] rounded-2xl p-8 sm:p-12 border border-[#262626] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B8BEC3]">
            Pre-Shipment Sign-Off
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Third-Party Inspection & Sample Verification Welcomed
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Prior to balance payment and shipping release, we furnish detailed high-resolution pre-shipment photographs and dimensional checklists. Importers are also welcomed to appoint third-party inspection agencies in Pakistan to conduct on-site AQL sampling at our Sialkot facility.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>High-Res Photo & Video Dispatch</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>On-Site Buyer Inspection Supported</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Clear AQL 2.5 / 4.0 Tolerance Adherence</span>
            </span>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-3">
          <button
            onClick={onRequestQuote}
            className="w-full py-3.5 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 border border-[#235b3e] shadow-md"
          >
            <FileText className="w-4 h-4" />
            <span>Discuss Quality Requirements</span>
          </button>
        </div>
      </div>
    </div>
  );
};
