import React from 'react';
import { BRAND_INFO } from '../data/brandData';
import { Shield, FileText } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-[#222222] pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B8BEC3]">
          {type === 'privacy' ? <Shield className="w-4 h-4 text-[#123D2A]" /> : <FileText className="w-4 h-4 text-[#123D2A]" />}
          <span>Legal & Compliance Documentation</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white font-heading">
          {type === 'privacy' ? 'Privacy & Data Protection Policy' : 'Terms & Commercial Conditions'}
        </h1>
        <p className="text-xs text-gray-400">
          Last updated: October 2026 &bull; VORQEN & FLAKES IMPEX (Sialkot, Pakistan)
        </p>
      </div>

      <div className="bg-[#161616] rounded-2xl p-8 sm:p-10 border border-[#262626] text-xs sm:text-sm text-gray-300 space-y-6 leading-relaxed">
        {type === 'privacy' ? (
          <>
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white font-heading">1. Introduction & Entity Structure</h2>
              <p>
                This Privacy Policy explains how <strong>VORQEN</strong> and its manufacturing and export parent company <strong>FLAKES IMPEX</strong> (established 2001 in Sialkot, Pakistan) collect, process, and protect corporate and personal information obtained through our international web portal and quotation desks.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white font-heading">2. Information We Collect</h2>
              <p>
                We collect information strictly necessary to prepare commercial quotations, evaluate tech-packs, process sample orders, and manage export logistics. This includes:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-400">
                <li>Client full name, business title, and corporate name</li>
                <li>Commercial email address and phone or WhatsApp contact number</li>
                <li>Destination port and country for freight calculation</li>
                <li>Product specifications, estimated batch quantities, and custom artwork provided by the buyer</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white font-heading">3. Use of Information</h2>
              <p>
                Your information is used solely to respond to your specific inquiries, generate commercial invoices, schedule factory production, and coordinate dispatch with approved international freight forwarders. We do not sell or lease your commercial data to third parties.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white font-heading">4. Proprietary Designs & Non-Disclosure (NDA)</h2>
              <p>
                Custom patterns, tech-packs, brand emblems, and proprietary artwork provided by private-label clients remain the exclusive property of the client. We uphold strict manufacturing confidentiality across our production lines.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white font-heading">5. Contact Regarding Privacy</h2>
              <p>
                For data privacy requests or removal of your contact information from our logs, contact our export compliance desk at: <a href={`mailto:${BRAND_INFO.email}`} className="text-white underline">{BRAND_INFO.email}</a> or phone <strong className="text-white">{BRAND_INFO.phone}</strong>.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white font-heading">1. Commercial Inquiries & Quotations</h2>
              <p>
                All quotations generated via this portal or through direct correspondence are formal offers based on specified materials, estimated batch quantities, and current raw leather / freight indexes. Quotations remain valid for 30 calendar days unless otherwise stated in writing.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white font-heading">2. Minimum Order Quantities (MOQ) & Sampling</h2>
              <p>
                Standard production runs require minimum batch quantities (typically 300 to 500 units/pairs depending on category). Pre-production sample prototypes are provided for physical inspection upon agreed sampling terms.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white font-heading">3. International Delivery & Shipping Terms</h2>
              <p>
                Standard export contracts operate under Incoterms (FOB Sialkot / Lahore / Karachi, CFR, or CIF to destination port) or door-to-door courier via DHL / FedEx for samples. Title and risk of loss transfer in accordance with agreed Incoterms.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white font-heading">4. Quality Acceptance & Pre-Shipment Inspection</h2>
              <p>
                Buyers may inspect goods prior to dispatch or appoint an independent third-party inspection agency (e.g., SGS, Intertek, Bureau Veritas) at our Sialkot facility. All goods are produced in conformity with approved golden counter-samples.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white font-heading">5. Governing Law</h2>
              <p>
                Commercial agreements are established with FLAKES IMPEX, Sialkot, Pakistan, and subject to international trade standards and contracts agreed upon with the purchasing entity.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};
