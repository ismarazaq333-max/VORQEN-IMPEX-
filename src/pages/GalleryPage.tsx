import React, { useState } from 'react';
import { Eye, X, ZoomIn, Layers, Filter } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeLightboxImage, setActiveLightboxImage] = useState<{
    url: string;
    title: string;
    category: string;
    categoryLabel: string;
    caption: string;
  } | null>(null);

  const galleryItems = [
    {
      id: 1,
      category: 'gloves',
      categoryLabel: 'Protective & Tactical Gloves',
      title: 'TPR Impact & Kevlar Work Gloves',
      caption: 'Detailed view of sonic-welded TPR dorsal impact ribs, high-wear thumb saddle, and precision seam stitching.',
      url: '/src/assets/images/gloves_craftsmanship_1792345107076.jpg',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 2,
      category: 'leather',
      categoryLabel: 'Leather Collection',
      title: '1.2mm Drum-Dyed Café Racer Leather Jacket',
      caption: 'Classic hand-finished black cowhide with heavy-gauge brass YKK zippers and articulated shoulder gussets.',
      url: '/src/assets/images/leather_jacket_biker_1792345107459.jpg',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 3,
      category: 'gloves',
      categoryLabel: 'Tactical & Motorcycle',
      title: 'VORQEN Apex Tactical & Track Gauntlet Collection',
      caption: 'Composite showcase of high-dexterity combat gloves and reinforced motorcycle gloves on slate pedestal.',
      url: '/src/assets/images/hero_vorqen_collection_1792345106994.jpg',
      aspect: 'aspect-[16/9]'
    },
    {
      id: 4,
      category: 'apparel',
      categoryLabel: 'Sportswear & Apparel',
      title: '340 GSM Thermal Grid Athletic Hoodie & Tights',
      caption: 'Waffle-grid fleece hoodie with moisture-wicking compression base layer and ergonomic flatlock seams.',
      url: '/src/assets/images/sportswear_athletic_1792345107740.jpg',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 5,
      category: 'workshop',
      categoryLabel: 'Workshop & Craftsmanship',
      title: 'Artisan Industrial Leather Sewing in Sialkot',
      caption: 'Direct workshop photography of master seamstress assembling heavy leather panels with precision thread tension.',
      url: '/src/assets/images/workshop_craftsmanship_1792345108466.jpg',
      aspect: 'aspect-[16/9]'
    },
    {
      id: 6,
      category: 'gloves',
      categoryLabel: 'Protective & Tactical Gloves',
      title: 'VORQEN ArmorGuard XP-750 Cut-Resistant TPR Safety Gloves',
      caption: 'ANSI/ISEA cut-level 5 industrial protective glove with micro-foam sandy nitrile palm and high-visibility dorsal impact ribs. Contact for catalog samples and timely shipping.',
      url: '/src/assets/images/safety_gloves_industrial_1792347428425.jpg',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 7,
      category: 'apparel',
      categoryLabel: 'Sportswear & Apparel',
      title: 'VORQEN Apex-Pro Technical Sports Gear Training Suit',
      caption: 'Full 2-piece high-performance athletic tracksuit featuring windproof hooded training jacket and tapered zippered track pants in deep forest green and charcoal.',
      url: '/src/assets/images/sports_gear_suit_1792347428517.jpg',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 8,
      category: 'gloves',
      categoryLabel: 'Sports & Gym Gloves',
      title: 'VORQEN Pro-Grip Weightlifting & Gym Training Gloves',
      caption: 'Ergonomic fitness gym gloves with integrated heavy-tension wrist support wraps and silicone honeycomb palm grip matrix.',
      url: '/src/assets/images/gym_fitness_gloves_1792347771538.jpg',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 9,
      category: 'leather',
      categoryLabel: 'Leather Driving Gloves',
      title: 'VORQEN Classic Perforated Lambskin Driving Gloves',
      caption: 'Artisan handcrafted perforated lambskin leather driving gloves with knuckle flex portals and antique brass snap closure.',
      url: '/src/assets/images/leather_driving_gloves_1792347772223.jpg',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 10,
      category: 'leather',
      categoryLabel: 'Luxury Dress Gloves',
      title: 'VORQEN Luxury Cashmere-Lined Nappa Leather Dress Gloves',
      caption: 'Bespoke formal nappa leather gloves with classic 3-line hand-stitched points and pure Mongolian knit cashmere thermal lining.',
      url: '/src/assets/images/leather_dress_gloves_1792347772105.jpg',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 11,
      category: 'gloves',
      categoryLabel: 'Motorcycle Racing Gloves',
      title: 'VORQEN Track-Pro Carbon Armor Racing Gloves',
      caption: 'Full-gauntlet cowhide racing gloves equipped with aerodynamic molded carbon fiber knuckle guards, TPU palm scaphoid sliders, and dual wrist locks.',
      url: '/src/assets/images/motorcycle_racing_gloves_1792347773122.jpg',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 12,
      category: 'apparel',
      categoryLabel: 'Sportswear & Apparel',
      title: 'VORQEN Aero-Dry Performance Training T-Shirt',
      caption: 'Lightweight poly-elastane athletic t-shirt in deep forest green with silver accent flatlock seams and underarm cooling mesh. Contact for catalog samples and timely shipping.',
      url: '/src/assets/images/athletic_tshirt_apparel_1792348610117.jpg',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 13,
      category: 'apparel',
      categoryLabel: 'Sportswear & Apparel',
      title: 'VORQEN Heavyweight 400 GSM Streetwear Fleece Hoodie',
      caption: 'Heavyweight compact cotton-fleece hoodie with structured 3-panel hood, matte drawcords, and kangaroo pocket in dark charcoal.',
      url: '/src/assets/images/fleece_hoodie_streetwear_1792348610784.jpg',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 14,
      category: 'apparel',
      categoryLabel: 'Headwear & Caps',
      title: 'VORQEN Elite 6-Panel Performance Athletic Sports Cap',
      caption: 'Structured micro-piqué sports cap in forest green and black with pre-curved visor and 3D sonic-welded silicone crest emblem.',
      url: '/src/assets/images/performance_sports_caps_1792348611080.jpg',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 15,
      category: 'apparel',
      categoryLabel: 'Sportswear & Apparel',
      title: 'VORQEN Tapered Articulated Athletic Training Pants',
      caption: 'Tapered athletic French terry training pants with articulated ergonomic knee seams, waterproof zip pockets, and ribbed cuffs.',
      url: '/src/assets/images/athletic_training_pants_1792348611705.jpg',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 16,
      category: 'gloves',
      categoryLabel: 'Protective & Safety Gloves',
      title: 'VORQEN VulcanSplit Heavy Split Leather Welding Gloves',
      caption: 'Cobalt blue and golden split cowhide heavy welding gloves with flame-resistant Kevlar welted seams and extended forearm gauntlet cuff. Contact for catalog samples & timely shipping.',
      url: '/src/assets/images/welding_gloves_blue_1792349112228.jpg',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 17,
      category: 'gloves',
      categoryLabel: 'Protective & Safety Gloves',
      title: 'VORQEN TitanGrip Heavy Construction & Rigging Gloves',
      caption: 'High-durability grain cowhide construction gloves with hi-vis yellow knuckle guard, double reinforced palm, and protective safety cuff. Contact for catalog samples & timely shipping.',
      url: '/src/assets/images/construction_gloves_yellow_1792349112887.jpg',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 18,
      category: 'gloves',
      categoryLabel: 'Protective & Safety Gloves',
      title: 'VORQEN DuraFlex Multi-Purpose Industrial Work Gloves',
      caption: 'Versatile all-day industrial utility gloves with 4-way stretch back, vibration-dampening palm pads, and TPR hook-and-loop closure. Contact for catalog samples & timely shipping.',
      url: '/src/assets/images/general_work_gloves_1792349113119.jpg',
      aspect: 'aspect-[4/3]'
    },
    {
      id: 19,
      category: 'gloves',
      categoryLabel: 'Protective & Safety Gloves',
      title: 'VORQEN CyberTouch Mechanics & Touchscreen Work Gloves',
      caption: 'Precision mechanics gloves with capacitive touchscreen index finger and thumb, hex-mesh cooling back, and gel shock absorbers. Contact for catalog samples & timely shipping.',
      url: '/src/assets/images/touchscreen_work_gloves_1792349113428.jpg',
      aspect: 'aspect-[4/3]'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Media' },
    { id: 'gloves', label: 'Protective & Tactical Gloves' },
    { id: 'leather', label: 'Leather Collection' },
    { id: 'apparel', label: 'Sportswear & Apparel' },
    { id: 'workshop', label: 'Workshop Craftsmanship' },
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-[#222222] pb-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B8BEC3]">
          <span>Visual Media & Product Showcase</span>
          <span aria-hidden="true">&bull;</span>
          <span>FLAKES IMPEX Sialkot</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          VORQEN Visual Gallery & Workshop Archive
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-2xl leading-relaxed">
          High-resolution photography of our manufactured articles, leather grain detailing, technical textiles, and Sialkot workshop seam assembly.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap border ${
              activeFilter === f.id
                ? 'bg-[#123D2A] text-white border-[#1c5a3d] shadow-sm'
                : 'bg-[#161616] text-gray-400 border-[#262626] hover:text-white hover:bg-[#1F1F1F]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveLightboxImage(item)}
            className="group cursor-pointer bg-[#181818] rounded-xl border border-[#262626] hover:border-[#123D2A] overflow-hidden transition-all duration-300 flex flex-col justify-between"
          >
            <div className={`relative ${item.aspect} w-full overflow-hidden bg-[#111111]`}>
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-3 bg-black/70 text-white rounded-full border border-white/20 shadow-lg">
                  <ZoomIn className="w-5 h-5" />
                </span>
              </div>
            </div>

            <div className="p-5">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#B8BEC3] block mb-1">
                {item.categoryLabel}
              </span>
              <h3 className="text-sm font-bold text-white font-heading">
                {item.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxImage && (
        <div
          onClick={() => setActiveLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#161616] border border-[#2B2B2B] rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="relative aspect-video max-h-[65vh] w-full bg-[#111111]">
              <img
                src={activeLightboxImage.url}
                alt={activeLightboxImage.title}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setActiveLightboxImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black text-white rounded-full border border-white/20 transition-colors"
                aria-label="Close image"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-[#161616] border-t border-[#262626]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B8BEC3]">
                {activeLightboxImage.categoryLabel}
              </span>
              <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                {activeLightboxImage.title}
              </h3>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                {activeLightboxImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
