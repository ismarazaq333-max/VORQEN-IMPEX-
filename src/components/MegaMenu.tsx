import React from 'react';
import { PRODUCT_CATEGORIES } from '../data/products';
import { ShieldCheck, Crosshair, Dumbbell, Award, Shirt, Settings, ArrowRight } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryId: string) => void;
  onViewAll: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'work-safety-gloves': <ShieldCheck className="w-5 h-5 text-[#B8BEC3]" />,
  'tactical-motorcycle-gloves': <Crosshair className="w-5 h-5 text-[#B8BEC3]" />,
  'sports-fitness-gloves': <Dumbbell className="w-5 h-5 text-[#B8BEC3]" />,
  'leather-collection': <Award className="w-5 h-5 text-[#B8BEC3]" />,
  'sportswear-apparel': <Shirt className="w-5 h-5 text-[#B8BEC3]" />,
  'custom-oem': <Settings className="w-5 h-5 text-[#B8BEC3]" />,
};

export const MegaMenu: React.FC<MegaMenuProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onViewAll,
}) => {
  if (!isOpen) return null;

  const categories = PRODUCT_CATEGORIES.filter((c) => c.id !== 'all');

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-[#141414] border-b border-[#262626] shadow-2xl py-8 px-6 z-40 animate-in fade-in slide-in-from-top-2 duration-150"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#222222]">
          <div>
            <h3 className="text-base font-bold text-white tracking-wide font-heading">
              VORQEN PRODUCT CATEGORIES
            </h3>
            <p className="text-xs text-[#B8BEC3] mt-0.5">
              Engineered sports equipment and protective apparel manufactured by FLAKES IMPEX
            </p>
          </div>
          <button
            onClick={() => {
              onViewAll();
              onClose();
            }}
            className="text-xs font-semibold text-[#B8BEC3] hover:text-white flex items-center gap-1.5 transition-colors group"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onClose();
              }}
              className="text-left p-4 rounded-xl bg-[#191919] hover:bg-[#202020] border border-[#2A2A2A] hover:border-[#123D2A] transition-all group flex items-start gap-4"
            >
              <div className="p-2.5 rounded-lg bg-[#111111] border border-[#2E2E2E] group-hover:border-[#123D2A] group-hover:text-white transition-colors shrink-0">
                {CATEGORY_ICONS[cat.id] || <ShieldCheck className="w-5 h-5 text-[#B8BEC3]" />}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-white transition-colors font-heading flex items-center gap-1.5">
                  {cat.label}
                  <span className="text-[#123D2A] opacity-0 group-hover:opacity-100 transition-opacity">
                    &rarr;
                  </span>
                </h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Manufacturing Note Footnote */}
        <div className="mt-8 pt-4 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between text-xs text-[#B8BEC3] gap-2">
          <span>
            OEM & Private-Label available across all product lines. Custom tech-packs & samples welcomed.
          </span>
          <span className="font-semibold text-white">
            Manufacturing Partner: FLAKES IMPEX (Sialkot, Pakistan)
          </span>
        </div>
      </div>
    </div>
  );
};
