import React from 'react';
import { CartItem } from '../types';
import { BRAND_INFO } from '../data/brandData';
import { X, Trash2, FileText, MessageSquare, ArrowRight, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onProceedToQuote: () => void;
  onBrowseProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onProceedToQuote,
  onBrowseProducts,
}) => {
  if (!isOpen) return null;

  const handleSendAllViaWhatsApp = () => {
    if (items.length === 0) return;
    let message = `*VORQEN B2B BULK QUOTATION BAG*
---------------------------------------
Hello VORQEN & FLAKES IMPEX export team,
I would like to request an official manufacturing quote for the following items:

`;
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}*
   - Article ID: ${item.product.id}
   - Category: ${item.product.categoryLabel}
   - Estimated Batch Size: ${item.quantity} units/pairs
   - Default MOQ: ${item.product.moq}
   
`;
    });

    message += `Please provide your formal FOB/CIF pricing, lead time, and sample availability for these articles. Thank you!`;
    window.open(`${BRAND_INFO.whatsAppUrl}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#161616] border-l border-[#262626] h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="p-5 bg-[#121212] border-b border-[#222222] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#123D2A]" />
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                B2B Quotation Bag
              </h3>
              <p className="text-[11px] text-[#B8BEC3]">
                {items.length} {items.length === 1 ? 'Article' : 'Articles'} Selected
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

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-gray-400">
              <div className="w-16 h-16 rounded-full bg-[#1F1F1F] flex items-center justify-center text-gray-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-semibold text-white">Your Quotation Bag is Empty</h4>
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                Explore the VORQEN catalog of safety gloves, tactical equipment, leather jackets, and athletic apparel to assemble your batch inquiry.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBrowseProducts();
                }}
                className="px-5 py-2.5 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <span>Browse Product Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="bg-[#1C1C1C] rounded-xl p-3.5 border border-[#262626] flex gap-3 items-center"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#121212] shrink-0 border border-[#2B2B2B]">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-[#B8BEC3] uppercase font-semibold">
                    {item.product.categoryLabel}
                  </span>
                  <h4 className="text-xs font-bold text-white truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    MOQ: {item.product.moq}
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center bg-[#121212] border border-[#2B2B2B] rounded-md px-2 py-0.5 text-xs text-white">
                      <span className="text-[10px] text-gray-400 mr-2">Qty:</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          onUpdateQuantity(item.product.id, Math.max(1, parseInt(e.target.value) || 1))
                        }
                        className="w-12 bg-transparent text-xs text-white focus:outline-none text-center font-mono"
                      />
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-gray-500 hover:text-red-400 p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-5 bg-[#121212] border-t border-[#222222] space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-300 pb-1">
              <span>Selected Products:</span>
              <span className="font-mono font-semibold text-white">{items.length} Articles</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400 pb-2">
              <span>Manufacturing Partner:</span>
              <span className="font-semibold text-white">FLAKES IMPEX, Sialkot</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToQuote();
              }}
              className="w-full py-3 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 border border-[#23583d] shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>Proceed to B2B Quotation</span>
            </button>

            <button
              onClick={handleSendAllViaWhatsApp}
              className="w-full py-2.5 bg-[#1F1F1F] hover:bg-[#282828] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 border border-[#333333]"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Send Bag via WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
