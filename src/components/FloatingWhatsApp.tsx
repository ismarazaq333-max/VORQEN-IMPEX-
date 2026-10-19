import React, { useState } from 'react';
import { BRAND_INFO } from '../data/brandData';
import { MessageSquare, X, Send } from 'lucide-react';

interface FloatingWhatsAppProps {
  customMessage?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ customMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');

  const defaultMsg = customMessage || 
    `Hello VORQEN & FLAKES IMPEX team, I am interested in your sports gear and manufacturing services. Please share specifications, MOQ, pricing and sample details.`;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMsg = userQuery.trim() ? `${defaultMsg}\n\nClient note: ${userQuery}` : defaultMsg;
    const encoded = encodeURIComponent(finalMsg);
    window.open(`${BRAND_INFO.whatsAppUrl}?text=${encoded}`, '_blank');
    setIsOpen(false);
    setUserQuery('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-[#181818] border border-[#2A2A2A] rounded-xl shadow-2xl p-4 text-white overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2A]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#123D2A] flex items-center justify-center text-white font-bold text-xs border border-[#1b5a3d]">
                VQ
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white leading-tight">VORQEN Export Desk</h4>
                <p className="text-[11px] text-[#B8BEC3]">FLAKES IMPEX &bull; Sialkot, Pakistan</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-md transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-3 bg-[#111111] p-3 rounded-lg text-xs text-gray-300 border border-[#222222]">
            <p className="font-medium text-white mb-1">Direct Factory Inquiry</p>
            <p className="text-gray-400">
              Speak directly with Ali ({BRAND_INFO.phone}) regarding bulk quotations, OEM customization, and samples.
            </p>
          </div>

          <form onSubmit={handleSend} className="space-y-2">
            <textarea
              rows={2}
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Type your inquiry or product requirement here..."
              className="w-full bg-[#111111] border border-[#333333] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#123D2A] focus:ring-1 focus:ring-[#123D2A] resize-none"
            />
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] text-gray-400">Opens WhatsApp app or web</span>
              <button
                type="submit"
                className="bg-[#123D2A] hover:bg-[#184e36] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Start Chat</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Primary Floating WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 bg-[#123D2A] hover:bg-[#184e36] text-white px-4 py-3 rounded-full shadow-xl transition-all duration-300 hover:shadow-[#123D2A]/40 border border-[#2a684a]"
        aria-label="Contact VORQEN on WhatsApp"
      >
        <MessageSquare className="w-5 h-5 text-white fill-white/20 transition-transform group-hover:scale-110" />
        <span className="text-xs font-semibold tracking-wider whitespace-nowrap">
          WHATSAPP EXPORT DESK
        </span>
      </button>
    </div>
  );
};
