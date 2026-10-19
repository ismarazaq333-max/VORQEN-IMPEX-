import React from 'react';
import { PageType, Product } from '../types';
import { BRAND_INFO } from '../data/brandData';
import { ProductCard } from '../components/ProductCard';
import { 
  ArrowRight, 
  ShieldCheck, 
  Crosshair, 
  Dumbbell, 
  Award, 
  Shirt, 
  Settings, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  Factory, 
  Globe2, 
  Scissors, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface HomePageProps {
  products: Product[];
  onNavigate: (page: PageType, categoryId?: string) => void;
  onRequestQuote: (product?: Product) => void;
  onViewProductDetails: (product: Product) => void;
  onAddToQuoteBag: (product: Product) => void;
  quoteBagProductIds: string[];
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onNavigate,
  onRequestQuote,
  onViewProductDetails,
  onAddToQuoteBag,
  quoteBagProductIds,
}) => {
  // Curate showcase featuring safety gloves, racing, gym, driving, dressing gloves, sports gear suit, shirts, hoodies, caps, and pants
  const featuredProductIds = [
    'vq-safe-04', // ArmorGuard cut-resistant TPR safety glove
    'vq-safe-05', // VulcanSplit heavy welding glove
    'vq-safe-06', // TitanGrip construction & rigging glove
    'vq-moto-02', // Track-Pro leather motorcycle racing glove
    'vq-sport-01', // Pro-Grip gym weightlifting glove
    'vq-drive-01', // Perforated lambskin driving glove
    'vq-dress-01', // Cashmere-lined nappa leather dress glove
    'vq-app-04',  // Apex-Pro technical sports gear training suit
    'vq-app-01',  // Fleece hoodie streetwear
    'vq-app-05',  // Aero-Dry performance athletic training t-shirt
    'vq-app-06',  // Elite 6-panel performance athletic sports cap
    'vq-app-07'   // Tapered articulated athletic training pants
  ];
  const featuredProducts = products.filter((p) => featuredProductIds.includes(p.id));

  const featuredCategories = [
    {
      id: 'work-safety-gloves',
      title: 'Work & Safety Gloves',
      description: 'Heavy cut-resistant sandy nitrile dipped palms, TPR impact dorsal protection, and rigging gloves.',
      image: '/src/assets/images/safety_gloves_industrial_1792347428425.jpg',
      icon: <ShieldCheck className="w-5 h-5 text-[#B8BEC3]" />
    },
    {
      id: 'tactical-motorcycle-gloves',
      title: 'Tactical & Motorcycle Racing Gloves',
      description: 'Carbon knuckle track racing gauntlets, combat assault gloves, and ventilated riding gear.',
      image: '/src/assets/images/motorcycle_racing_gloves_1792347773122.jpg',
      icon: <Crosshair className="w-5 h-5 text-[#B8BEC3]" />
    },
    {
      id: 'sports-fitness-gloves',
      title: 'Sports & Gym Gloves',
      description: 'Integrated wrist-wrap gym weightlifting grips, road cycling gloves, and athletic fitness gear.',
      image: '/src/assets/images/gym_fitness_gloves_1792347771538.jpg',
      icon: <Dumbbell className="w-5 h-5 text-[#B8BEC3]" />
    },
    {
      id: 'leather-collection',
      title: 'Leather Collection',
      description: '100% naked drum-dyed cowhide café racer jackets, weekend duffles, and accessories.',
      image: '/src/assets/images/leather_jacket_biker_1792345107459.jpg',
      icon: <Award className="w-5 h-5 text-[#B8BEC3]" />
    },
    {
      id: 'sportswear-apparel',
      title: 'Sportswear & Training Gear Suits',
      description: '2-piece technical windproof training suits, 340 GSM thermal grid hoodies, and compression sets.',
      image: '/src/assets/images/sports_gear_suit_1792347428517.jpg',
      icon: <Shirt className="w-5 h-5 text-[#B8BEC3]" />
    },
    {
      id: 'custom-oem',
      title: 'Custom OEM & Private-Label',
      description: 'Custom pattern development, Pantone color matching, private molds, and bespoke packaging.',
      image: '/src/assets/images/workshop_craftsmanship_1792345108466.jpg',
      icon: <Settings className="w-5 h-5 text-[#B8BEC3]" />
    }
  ];

  const verifiedStrengths = [
    {
      title: 'Established Manufacturing Base',
      detail: 'FLAKES IMPEX has been operating from Sialkot, Pakistan since 2001, providing continuous production and export expertise.'
    },
    {
      title: 'Multi-Category Product Scope',
      detail: 'Specialized tooling and sewing lines for protective gloves, leather goods, and high-performance technical apparel.'
    },
    {
      title: 'Custom Tech-Packs & Prototyping',
      detail: 'In-house pattern grading, embroidery, silicone molding, and material sourcing to match buyer specifications.'
    },
    {
      title: 'Sample Evaluation Protocols',
      detail: 'Pre-production prototypes provided for sizing, material feel, and functional stress evaluation prior to bulk runs.'
    },
    {
      title: 'Precision Workmanship & Finishing',
      detail: 'Rigorous manual inspection of seams, thread tension, hardware alignment, and clean packaging.'
    },
    {
      title: 'Global Export Coordination',
      detail: 'International air freight and ocean container arrangements with transparent documentation and tracking.'
    }
  ];

  return (
    <div className="space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center bg-[#111111] overflow-hidden border-b border-[#222222]">
        {/* Hero Background Image with Measured Luxury Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_vorqen_collection_1792345106994.jpg"
            alt="VORQEN Performance Gloves & Leather Jacket Showcase"
            className="w-full h-full object-cover object-center brightness-60 contrast-110"
          />
          {/* Measured multi-stop gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/85 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl space-y-6">
            {/* Unboxed Brand Sub-Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#B8BEC3] uppercase">
              <span>VORQEN INTERNATIONAL</span>
              <span aria-hidden="true">&bull;</span>
              <span>FLAKES IMPEX SIALKOT</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] font-heading text-balance">
              ENGINEERED FOR PERFORMANCE. DESIGNED FOR YOUR BRAND.
            </h1>

            {/* Slogan & Supporting Description */}
            <div className="space-y-3">
              <p className="text-sm font-semibold tracking-widest text-[#B8BEC3] uppercase">
                {BRAND_INFO.tagline}
              </p>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
                Discover <strong className="text-white">VORQEN</strong> — a modern product brand supported by <strong className="text-white">FLAKES IMPEX</strong>, a manufacturer and exporter based in Sialkot, Pakistan. Explore sports gear, protective gloves, leather products, and apparel with customization opportunities for international businesses.
              </p>
            </div>

            {/* Hero Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('shop')}
                className="px-6 py-3.5 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg hover:shadow-[#123D2A]/30 border border-[#235c3f] flex items-center gap-2"
              >
                <span>SHOP COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onRequestQuote()}
                className="px-6 py-3.5 bg-[#1A1A1A]/90 hover:bg-[#252525] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all border border-white/20 flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>REQUEST A QUOTE</span>
              </button>

              <a
                href={BRAND_INFO.whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-black/60 hover:bg-black/80 text-white text-xs font-semibold rounded-lg transition-colors border border-white/10 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WHATSAPP DESK</span>
              </a>
            </div>

            {/* Heritage Micro Trust Strip */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Manufacturer Est. {BRAND_INFO.establishedYear}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sialkot Export Hub</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Custom OEM / ODM</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PROMINENT TIMELY SHIPPING & CATALOG SAMPLES BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#123D2A] via-[#164732] to-[#121212] rounded-2xl p-6 sm:p-8 border border-[#216140] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>International Wholesale & OEM Protocol</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-heading tracking-wide">
              CONTACT FOR CATALOG SAMPLES &bull; TIMELY SHIPPING
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 max-w-2xl leading-relaxed">
              Receive complete physical material swatches, prototype counter-samples, and high-resolution technical product catalogs. Rapid worldwide dispatch via DHL & FedEx Express air courier with guaranteed on-schedule production batches.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onRequestQuote()}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-gray-100 text-[#111111] text-xs font-black uppercase tracking-wider rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#123D2A]" />
              <span>Request Catalog & Samples</span>
            </button>
            <a
              href={BRAND_INFO.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 bg-black/70 hover:bg-black text-white text-xs font-bold rounded-lg transition-all border border-white/20 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Instant WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. BRAND INTRODUCTION & RELATIONSHIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#181818] rounded-2xl p-8 sm:p-12 border border-[#262626] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs uppercase tracking-widest font-semibold text-[#B8BEC3]">
                ONE BRAND. MULTIPLE POSSIBILITIES.
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                International Sportswear, Protective Gloves & Leather Manufacturing
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                {BRAND_INFO.businessStructureNote} With over two decades of craftsmanship in Sialkot — the globally renowned epicenter for sporting goods and leather excellence — we specialize in turning conceptual designs into field-tested, export-ready gear for distributors, retailers, and private-label brands across North America, Europe, the UK, and beyond.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
                <button
                  onClick={() => onNavigate('about')}
                  className="font-semibold text-white hover:text-[#B8BEC3] flex items-center gap-1.5 transition-colors"
                >
                  <span>Learn About Our Manufacturing Roots</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-gray-600">|</span>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="font-semibold text-white hover:text-[#B8BEC3] flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore The Sialkot Workshop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#121212] p-6 rounded-xl border border-[#2B2B2B] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                <Factory className="w-4 h-4 text-[#123D2A]" />
                <span>Manufacturing Profile</span>
              </div>
              <ul className="text-xs text-gray-400 space-y-2">
                <li className="flex justify-between border-b border-[#222222] pb-1.5">
                  <span>Parent Exporter:</span>
                  <span className="text-white font-medium">FLAKES IMPEX</span>
                </li>
                <li className="flex justify-between border-b border-[#222222] pb-1.5">
                  <span>Founded:</span>
                  <span className="text-white font-medium">2001</span>
                </li>
                <li className="flex justify-between border-b border-[#222222] pb-1.5">
                  <span>City / Country:</span>
                  <span className="text-white font-medium">Sialkot, Pakistan</span>
                </li>
                <li className="flex justify-between pb-0.5">
                  <span>Export Desk:</span>
                  <span className="text-white font-medium">Ali (+92 322 4853236)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#222222] pb-4">
          <div>
            <span className="text-xs font-semibold text-[#B8BEC3] uppercase tracking-widest">
              Engineered Product Lines
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-1">
              Featured Product Categories
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-semibold text-[#B8BEC3] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('shop', cat.id)}
              className="group cursor-pointer bg-[#181818] rounded-xl border border-[#262626] hover:border-[#123D2A] overflow-hidden transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#111111]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4 p-2.5 rounded-lg bg-[#111111]/80 backdrop-blur-sm border border-white/10">
                  {cat.icon}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-base font-bold text-white group-hover:text-white font-heading flex items-center justify-between">
                  <span>{cat.title}</span>
                  <ArrowRight className="w-4 h-4 text-[#123D2A] opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="mt-4 pt-4 border-t border-[#242424] flex items-center justify-between text-xs font-semibold text-[#B8BEC3]">
                  <span>VIEW COLLECTION</span>
                  <span className="text-[#123D2A] group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#222222] pb-4">
          <div>
            <span className="text-xs font-semibold text-[#B8BEC3] uppercase tracking-widest">
              Selected Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mt-1">
              Engineered Articles & Equipment
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-semibold text-[#B8BEC3] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>Explore Entire Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProductDetails}
              onRequestQuote={onRequestQuote}
              onAddToQuoteBag={onAddToQuoteBag}
              isInQuoteBag={quoteBagProductIds.includes(product.id)}
            />
          ))}
        </div>
      </section>

      {/* 5. WORKSHOP FEATURE (AUTHENTIC CRAFTSMANSHIP) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#141414] rounded-2xl border border-[#262626] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-widest font-semibold text-[#B8BEC3] flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-[#123D2A]" />
                  <span>BEHIND THE CRAFT. BUILT FOR QUALITY.</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading leading-tight">
                  Hand-Cut Leathers, Heavy-Gauge Stitching & Industrial Assembly
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Every VORQEN glove, jacket, and technical sportswear article reflects over 23 years of specialized manufacturing experience from FLAKES IMPEX in Sialkot, Pakistan. From manual hide inspection to precision pattern grading and tensile-tested seam joining, our workshop prioritizes anatomical fit and long-term durability over shortcuts.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs text-gray-300">
                  <div className="bg-[#1C1C1C] p-3 rounded-lg border border-[#2B2B2B]">
                    <span className="block text-white font-bold font-mono">01.</span>
                    <span>Direct Material Selection</span>
                  </div>
                  <div className="bg-[#1C1C1C] p-3 rounded-lg border border-[#2B2B2B]">
                    <span className="block text-white font-bold font-mono">02.</span>
                    <span>Anatomical Patterns</span>
                  </div>
                  <div className="bg-[#1C1C1C] p-3 rounded-lg border border-[#2B2B2B]">
                    <span className="block text-white font-bold font-mono">03.</span>
                    <span>100% Pre-Ship QC</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('workshop')}
                  className="px-6 py-3 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 border border-[#215a3c]"
                >
                  <span>EXPLORE OUR WORKSHOP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onRequestQuote()}
                  className="px-5 py-3 bg-[#1F1F1F] hover:bg-[#282828] text-white text-xs font-semibold rounded-lg transition-colors border border-[#333333]"
                >
                  Discuss Workshop Specifications
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full bg-[#111111] overflow-hidden">
              <img
                src="/src/assets/images/workshop_craftsmanship_1792345108466.jpg"
                alt="FLAKES IMPEX artisan leather stitching on industrial sewing machine in Sialkot"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md p-3 rounded-lg border border-white/10 text-xs text-gray-300">
                <span className="font-semibold text-white block">Sialkot Leather Workshop</span>
                <span className="text-[11px] text-[#B8BEC3]">Handcrafted assembly by FLAKES IMPEX technicians</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY VORQEN & FLAKES IMPEX (VERIFIED STRENGTHS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold text-[#B8BEC3] uppercase tracking-widest">
            Verified Business Strengths
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Why Partner With VORQEN & FLAKES IMPEX
          </h2>
          <p className="text-xs text-gray-400">
            Transparent manufacturing practices and reliable export cooperation from Sialkot, Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedStrengths.map((strength, idx) => (
            <div
              key={idx}
              className="bg-[#181818] p-6 rounded-xl border border-[#262626] hover:border-[#123D2A] transition-colors space-y-3"
            >
              <div className="text-xs font-mono font-bold text-[#123D2A]">
                0{idx + 1}.
              </div>
              <h3 className="text-sm font-bold text-white font-heading">
                {strength.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {strength.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CUSTOM MANUFACTURING CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#123D2A]/80 to-[#121212] p-8 sm:p-12 rounded-2xl border border-[#1e583c] relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold tracking-widest text-[#B8BEC3] uppercase">
              B2B & Private Label Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading leading-tight">
              YOUR DESIGN. YOUR BRAND. OUR MANUFACTURING PARTNER.
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              Have an existing tech-pack, brand insignia, or customized glove requirement? We support custom materials, PMS color matching, custom size charts, TPR injection molds, embroidery, and private-label packaging.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('custom-manufacturing')}
                className="px-6 py-3 bg-white text-[#111111] hover:bg-gray-100 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-md flex items-center gap-2"
              >
                <span>START YOUR CUSTOM PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onRequestQuote()}
                className="px-5 py-3 bg-[#111111]/80 hover:bg-[#111111] text-white text-xs font-semibold rounded-lg transition-colors border border-white/20"
              >
                Request OEM Evaluation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. B2B CONVERSION CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-[#161616] rounded-2xl p-8 sm:p-12 border border-[#2B2B2B] text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-widest text-[#B8BEC3] uppercase">
              Global Procurement & Distribution
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              LOOKING FOR A RELIABLE MANUFACTURING PARTNER?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Share your requirements with VORQEN through FLAKES IMPEX. Let's discuss product specifications, customization, quotations, and sample evaluation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onRequestQuote()}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all border border-[#255e41] shadow-lg flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>REQUEST A FORMAL QUOTE</span>
            </button>

            <a
              href={BRAND_INFO.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-[#202020] hover:bg-[#2A2A2A] text-white text-xs font-bold rounded-lg transition-colors border border-[#333333] flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WHATSAPP OUR TEAM (+92 322 4853236)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
