import React, { useState } from 'react';
import { PageType } from '../types';
import { BrandLogo } from './BrandLogo';
import { MegaMenu } from './MegaMenu';
import { Menu, X, ChevronDown, FileText, ShoppingBag, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType, categoryId?: string) => void;
  onRequestQuote: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onRequestQuote,
  cartCount,
  onOpenCart,
}) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageType; hasDropdown?: boolean }[] = [
    { label: 'HOME', page: 'home' },
    { label: 'SHOP', page: 'shop' },
    { label: 'PRODUCTS', page: 'products', hasDropdown: true },
    { label: 'WORKSHOP', page: 'workshop' },
    { label: 'ABOUT US', page: 'about' },
    { label: 'CUSTOM MANUFACTURING', page: 'custom-manufacturing' },
    { label: 'QUALITY', page: 'quality' },
    { label: 'GALLERY', page: 'gallery' },
    { label: 'CONTACT', page: 'contact' },
  ];

  const handleLinkClick = (page: PageType) => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
    onNavigate(page);
  };

  const handleCategorySelect = (categoryId: string) => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    onNavigate('shop', categoryId);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#111111]/95 backdrop-blur-md border-b border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <button
          onClick={() => handleLinkClick('home')}
          className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#123D2A] rounded-lg"
          aria-label="VORQEN Homepage"
        >
          <BrandLogo size="md" variant="dark" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold tracking-wider text-[#B8BEC3]">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            if (link.hasDropdown) {
              return (
                <div
                  key={link.label}
                  className="relative py-2"
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                >
                  <button
                    onClick={() => handleLinkClick('shop')}
                    className={`flex items-center gap-1 hover:text-white transition-colors uppercase whitespace-nowrap ${
                      isActive ? 'text-white border-b-2 border-[#123D2A] pb-1' : ''
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
              );
            }

            return (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.page)}
                className={`hover:text-white transition-colors uppercase whitespace-nowrap ${
                  isActive ? 'text-white border-b-2 border-[#123D2A] pb-1 font-bold' : ''
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Cart / Inquiry Drawer button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-lg bg-[#191919] hover:bg-[#222222] text-[#B8BEC3] hover:text-white border border-[#2E2E2E] transition-colors flex items-center gap-1.5"
            aria-label="View quotation inquiry bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-medium">Quote Bag</span>
            {cartCount > 0 && (
              <span className="bg-[#123D2A] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4 text-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary Action Button: REQUEST A QUOTE */}
          <button
            onClick={onRequestQuote}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#123D2A] hover:bg-[#184e36] rounded-lg transition-all shadow-md hover:shadow-[#123D2A]/30 border border-[#265e43] whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>REQUEST A QUOTE</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-lg bg-[#191919] hover:bg-[#222222] text-white border border-[#2E2E2E] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onSelectCategory={handleCategorySelect}
        onViewAll={() => handleLinkClick('shop')}
      />

      {/* Mobile Slide-Out Navigation */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#141414] border-b border-[#2A2A2A] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.page)}
                className={`text-left py-2 text-sm font-semibold tracking-wider transition-colors uppercase ${
                  currentPage === link.page
                    ? 'text-white border-l-2 border-[#123D2A] pl-3'
                    : 'text-[#B8BEC3] hover:text-white pl-1'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#262626] flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="w-full py-3 text-center text-xs font-bold uppercase tracking-wider text-white bg-[#123D2A] hover:bg-[#184e36] rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>REQUEST A QUOTE</span>
            </button>

            <button
              onClick={() => handleLinkClick('admin')}
              className="text-left text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1.5 pt-2"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin Management Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
