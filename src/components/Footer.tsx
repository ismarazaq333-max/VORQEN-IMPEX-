import React, { useState } from 'react';
import { PageType } from '../types';
import { BRAND_INFO } from '../data/brandData';
import { BrandLogo } from './BrandLogo';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType, categoryId?: string) => void;
  onRequestQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRequestQuote }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterConsent, setNewsletterConsent] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterConsent) return;
    setNewsletterSubscribed(true);
  };

  return (
    <footer className="bg-[#0B0B0B] text-[#B8BEC3] border-t border-[#1F1F1F] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1C1C1C]">
          {/* Brand & Factory column (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" variant="dark" />
            <p className="text-xs leading-relaxed text-gray-400 max-w-sm mt-3">
              VORQEN is a modern performance sports gear, protective glove, and apparel brand supported by{' '}
              <strong className="text-white font-medium">FLAKES IMPEX</strong>, a manufacturer and exporter established in 2001 in Sialkot, Pakistan.
            </p>
            <div className="text-xs text-gray-400 space-y-1 pt-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#123D2A] shrink-0" />
                <span>Sialkot, Pakistan (World Center for Sports & Leather)</span>
              </p>
              <p className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-[#123D2A] shrink-0" />
                <span>Manufacturing Partner: </span>
                <a
                  href={BRAND_INFO.parentCompanyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline font-medium"
                >
                  flakesimpex.com
                </a>
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onRequestQuote}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-semibold rounded-lg transition-colors border border-[#1e583c]"
              >
                <span>Request B2B Export Quotation</span>
              </button>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4 font-heading">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('shop', 'work-safety-gloves')}
                  className="hover:text-white transition-colors"
                >
                  Work & Safety Gloves
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'tactical-motorcycle-gloves')}
                  className="hover:text-white transition-colors"
                >
                  Tactical & Motorcycle Gloves
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'sports-fitness-gloves')}
                  className="hover:text-white transition-colors"
                >
                  Sports & Fitness Gloves
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'leather-collection')}
                  className="hover:text-white transition-colors"
                >
                  Leather Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'sportswear-apparel')}
                  className="hover:text-white transition-colors"
                >
                  Sportswear & Apparel
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', 'custom-oem')}
                  className="hover:text-white transition-colors"
                >
                  Custom OEM Solutions
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Craft */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4 font-heading">
              Manufacturing
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('workshop')} className="hover:text-white transition-colors">
                  Workshop & Craftsmanship
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('custom-manufacturing')} className="hover:text-white transition-colors">
                  Private-Label & OEM
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quality')} className="hover:text-white transition-colors">
                  Quality & Inspection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About VORQEN & FLAKES IMPEX
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors">
                  Visual Media Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Direct Export Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Direct B2B Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase font-heading">
              Global Inquiries
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-white font-medium">Ali &bull; Export Inquiries</p>
              <a
                href={BRAND_INFO.whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#123D2A]" />
                <span>+92 322 4853236</span>
              </a>
              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors break-all"
              >
                <Mail className="w-3.5 h-3.5 text-[#123D2A]" />
                <span>{BRAND_INFO.email}</span>
              </a>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-[11px] text-gray-400 mb-2">
                Subscribe for product announcements & catalog updates:
              </p>
              {newsletterSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-2 rounded-lg border border-emerald-900/50">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Thank you. We have recorded your subscription interest.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="flex gap-1.5">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="business@company.com"
                      className="w-full bg-[#161616] border border-[#2B2B2B] rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#123D2A]"
                    />
                    <button
                      type="submit"
                      disabled={!newsletterConsent}
                      className="bg-[#123D2A] hover:bg-[#184e36] disabled:opacity-50 text-white px-3 py-1.5 rounded-lg text-xs transition-colors"
                      title={!newsletterConsent ? 'Please check consent box' : 'Subscribe'}
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <label className="flex items-start gap-2 text-[10px] text-gray-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newsletterConsent}
                      onChange={(e) => setNewsletterConsent(e.target.checked)}
                      className="mt-0.5 rounded bg-[#161616] border-[#2B2B2B] text-[#123D2A] focus:ring-0"
                    />
                    <span>I consent to receive occasional product updates according to the privacy policy.</span>
                  </label>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Verified Statement */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} VORQEN. All rights reserved. Manufactured and exported by FLAKES IMPEX, Sialkot, Pakistan (Est. {BRAND_INFO.establishedYear}).
          </p>
          <div className="flex items-center gap-6 text-xs">
            <button onClick={() => onNavigate('privacy')} className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('terms')} className="hover:text-gray-300 transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => onNavigate('admin')} className="hover:text-gray-300 transition-colors">
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
