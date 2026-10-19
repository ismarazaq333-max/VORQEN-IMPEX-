import React from 'react';
import { BRAND_INFO } from '../data/brandData';
import { Phone, Mail, Globe } from 'lucide-react';

interface AnnouncementBarProps {
  onNavigateContact?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onNavigateContact }) => {
  return (
    <div className="bg-[#123D2A] text-[#F3F5F4] text-xs py-2 px-4 border-b border-[#1b5a3d]/50 tracking-wider font-medium">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="text-[#B8BEC3] uppercase tracking-widest text-[11px] font-semibold">
            VORQEN
          </span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span className="text-white font-bold text-[11px] sm:text-xs tracking-wider">
            CONTACT FOR CATALOG SAMPLES &bull; TIMELY SHIPPING
          </span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span className="text-[#B8BEC3] text-[11px] font-semibold">
            MADE IN PAKISTAN
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-[#B8BEC3]">
          <span className="hidden md:inline">
            Exported Globally by FLAKES IMPEX (Est. {BRAND_INFO.establishedYear})
          </span>
          <a
            href={BRAND_INFO.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <Phone className="w-3 h-3 text-[#B8BEC3]" />
            <span>+92 322 4853236</span>
          </a>
          <button
            onClick={onNavigateContact}
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <Mail className="w-3 h-3 text-[#B8BEC3]" />
            <span className="hidden sm:inline">{BRAND_INFO.email}</span>
            <span className="sm:hidden">Inquire</span>
          </button>
        </div>
      </div>
    </div>
  );
};
