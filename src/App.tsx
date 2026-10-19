/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageType, Product, CartItem, QuoteRequest } from './types';
import { INITIAL_PRODUCTS } from './data/products';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { QuoteModal } from './components/QuoteModal';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { WorkshopPage } from './pages/WorkshopPage';
import { AboutPage } from './pages/AboutPage';
import { CustomManufacturingPage } from './pages/CustomManufacturingPage';
import { QualityPage } from './pages/QualityPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { LegalPage } from './pages/LegalPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [shopCategory, setShopCategory] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  
  // Modals & Drawers state
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quotePrefillProduct, setQuotePrefillProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Quotation bag items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Session stored inquiries
  const [inquiries, setInquiries] = useState<QuoteRequest[]>([]);

  // Smooth scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: PageType, categoryId?: string) => {
    if (page === 'products') {
      setCurrentPage('shop');
      if (categoryId) setShopCategory(categoryId);
    } else {
      setCurrentPage(page);
      if (categoryId) setShopCategory(categoryId);
    }
  };

  const handleOpenQuote = (product?: Product) => {
    setQuotePrefillProduct(product || null);
    setIsQuoteOpen(true);
  };

  const handleAddToQuoteBag = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 100 }
            : item
        );
      }
      return [...prev, { product, quantity: 500 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromQuoteBag = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleSaveInquiry = (inquiry: QuoteRequest) => {
    setInquiries((prev) => [inquiry, ...prev]);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const quoteBagProductIds = cartItems.map((item) => item.product.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-[#F3F5F4]">
      {/* 1. ANNOUNCEMENT BAR */}
      <AnnouncementBar onNavigateContact={() => handleNavigate('contact')} />

      {/* 2. MAIN HEADER & NAVBAR */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onRequestQuote={() => handleOpenQuote()}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 3. MAIN PAGE CONTENT */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            products={products}
            onNavigate={handleNavigate}
            onRequestQuote={handleOpenQuote}
            onViewProductDetails={(p) => setSelectedProduct(p)}
            onAddToQuoteBag={handleAddToQuoteBag}
            quoteBagProductIds={quoteBagProductIds}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            products={products}
            initialCategory={shopCategory}
            onViewProductDetails={(p) => setSelectedProduct(p)}
            onRequestQuote={handleOpenQuote}
            onAddToQuoteBag={handleAddToQuoteBag}
            quoteBagProductIds={quoteBagProductIds}
          />
        )}

        {currentPage === 'workshop' && (
          <WorkshopPage onRequestQuote={() => handleOpenQuote()} />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onRequestQuote={() => handleOpenQuote()}
            onNavigateWorkshop={() => handleNavigate('workshop')}
          />
        )}

        {currentPage === 'custom-manufacturing' && (
          <CustomManufacturingPage
            onOpenGeneralQuote={() => handleOpenQuote()}
          />
        )}

        {currentPage === 'quality' && (
          <QualityPage onRequestQuote={() => handleOpenQuote()} />
        )}

        {currentPage === 'gallery' && <GalleryPage />}

        {currentPage === 'contact' && (
          <ContactPage
            onSaveInquiry={handleSaveInquiry}
            onRequestFormalQuote={() => handleOpenQuote()}
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard
            products={products}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            inquiries={inquiries}
          />
        )}

        {(currentPage === 'privacy' || currentPage === 'terms') && (
          <LegalPage type={currentPage} />
        )}
      </main>

      {/* 4. FOOTER */}
      <Footer
        onNavigate={handleNavigate}
        onRequestQuote={() => handleOpenQuote()}
      />

      {/* 5. FLOATING WHATSAPP BUTTON (ON ALL PAGES) */}
      <FloatingWhatsApp />

      {/* 6. MODALS & DRAWERS */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        prefilledProduct={quotePrefillProduct}
        onSaveInquiry={handleSaveInquiry}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRequestQuote={handleOpenQuote}
        onAddToQuoteBag={handleAddToQuoteBag}
        isInQuoteBag={selectedProduct ? quoteBagProductIds.includes(selectedProduct.id) : false}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromQuoteBag}
        onUpdateQuantity={handleUpdateQuantity}
        onProceedToQuote={() => {
          setIsCartOpen(false);
          handleOpenQuote();
        }}
        onBrowseProducts={() => handleNavigate('shop')}
      />
    </div>
  );
}
