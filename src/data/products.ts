import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Work and Safety Gloves
  {
    id: 'vq-safe-01',
    name: 'VORQEN Pro-Impact TPR Heavy Safety Glove',
    category: 'work-safety-gloves',
    categoryLabel: 'Work & Safety Gloves',
    shortDescription: 'Heavy-duty impact protection glove engineered with thermoplastic rubber ribs and oil-resistant synthetic palm.',
    description: 'Designed for demanding industrial, oilfield, and heavy assembly environments. Features sonic-welded TPR dorsal impact protection on fingers and metacarpals, reinforced Kevlar thumb saddle, and high-traction palm with vibration damping padding.',
    image: '/src/assets/images/gloves_craftsmanship_1792345107076.jpg',
    galleryImages: [
      '/src/assets/images/gloves_craftsmanship_1792345107076.jpg',
      '/src/assets/images/workshop_craftsmanship_1792345108466.jpg'
    ],
    materials: ['Sonic-Welded TPR', 'Synthetic Microfiber Palm', 'Spandex Stretch Backing', 'Neoprene Cuff'],
    colors: ['Hi-Vis Yellow / Black', 'Olive Drab / Black', 'Charcoal / High-Vis Orange'],
    sizes: ['S (8)', 'M (9)', 'L (10)', 'XL (11)', 'XXL (12)'],
    moq: '500 Pairs (Negotiable for evaluation samples)',
    sampleAvailable: true,
    leadTime: '25-35 Days depending on batch size',
    features: [
      'Anatomically articulated dorsal TPR impact shields',
      'Anti-slip silicone micro-textured grip matrix',
      'Adjustable hook-and-loop neoprene cuff with pull tab',
      'Reinforced high-wear thumb saddle for enhanced durability'
    ],
    brandingOptions: ['Direct TPR Molded Logo', 'Rubberized Patch', 'Woven Cuff Label', 'Custom Silk Print'],
    packagingOptions: ['Individual Polybag with Header Card', 'Recycled Kraft Gift Box', 'Bulk Export Master Carton'],
    salesMode: 'b2b_quote'
  },
  {
    id: 'vq-safe-02',
    name: 'VORQEN Top-Grain Cowhide Driver & Rigging Glove',
    category: 'work-safety-gloves',
    categoryLabel: 'Work & Safety Gloves',
    shortDescription: 'Supple full-grain cowhide leather driver glove with keystone thumb and elasticized shirred wrist.',
    description: 'Classic industrial driver and material-handling glove manufactured from premium A-grade cowhide leather. Offers exceptional puncture resistance, natural abrasion resistance, and ergonomic dexterity for equipment operators and construction teams.',
    image: '/src/assets/images/gloves_craftsmanship_1792345107076.jpg',
    galleryImages: [
      '/src/assets/images/gloves_craftsmanship_1792345107076.jpg',
      '/src/assets/images/workshop_craftsmanship_1792345108466.jpg'
    ],
    materials: ['A-Grade Full Grain Cowhide', 'Heat-Resistant Cotton Thread', 'Elastic Shirred Backing'],
    colors: ['Natural Tan', 'Golden Amber', 'Raw Wheat', 'Matte Black'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    moq: '600 Pairs',
    sampleAvailable: true,
    leadTime: '20-30 Days',
    features: [
      'Ergonomic keystone thumb for maximum movement freedom',
      'Self-hemmed leather cuff with gathered elastic back',
      'Smooth interior grain finish for skin comfort',
      'Double-stitched palm seam with heavy-gauge thread'
    ],
    brandingOptions: ['Heat Embossing / Debossing', 'Laser Etched Brand Mark', 'Sewn-in Leather Tag'],
    packagingOptions: ['12-Pair Tied Bundles', 'Polybag with Barcode', 'Custom Retail Box'],
    salesMode: 'b2b_quote'
  },
  {
    id: 'vq-safe-04',
    name: 'VORQEN ArmorGuard XP-750 Cut-Resistant TPR Impact Safety Glove',
    category: 'work-safety-gloves',
    categoryLabel: 'Work & Safety Gloves',
    shortDescription: 'High-visibility cut-level 5 safety glove with sandy nitrile micro-foam grip and articulated dorsal TPR impact armor.',
    description: 'Precision engineered for industrial extraction, structural rigging, sheet metal processing, and heavy automotive assembly. Features ANSI/ISEA rated dorsal TPR impact bumpers, high-density cut-resistant composite knit liner, and dual-layer sandy nitrile palm dip for exceptional grip in wet and oily conditions. Contact for catalog samples and timely shipping.',
    image: '/src/assets/images/safety_gloves_industrial_1792347428425.jpg',
    galleryImages: [
      '/src/assets/images/safety_gloves_industrial_1792347428425.jpg',
      '/src/assets/images/gloves_craftsmanship_1792345107076.jpg',
      '/src/assets/images/workshop_craftsmanship_1792345108466.jpg'
    ],
    materials: ['HPPE / Glass Fiber Cut-Resistant Knit', 'Sandy Nitrile Palm Coating', 'Direct-Bonded TPR Armor Ribs', 'Elasticized Neoprene Cuff'],
    colors: ['Hi-Vis Orange / Graphite Charcoal', 'Fluorescent Yellow / Black'],
    sizes: ['M (8)', 'L (9)', 'XL (10)', 'XXL (11)'],
    moq: '500 Pairs (Contact for catalog samples & timely shipping)',
    sampleAvailable: true,
    leadTime: '20-30 Days (Express Sample Dispatch via DHL/FedEx)',
    features: [
      'Heavy-duty thermoplastic rubber (TPR) dorsal impact armor on knuckles and fingers',
      'Sandy nitrile micro-foam palm coating for unmatched oil and wet traction',
      'Reinforced thumb crotch saddle for extended wear cycle',
      'Snug hook-and-loop wrist closure with customizable pull-tab brand plate'
    ],
    brandingOptions: ['TPR Molded Wrist Badge', 'Direct Silk-Screen Palm Print', 'Woven Cuff Label'],
    packagingOptions: ['Individual Polybag with Barcoded Header', '12-Pair Industrial Inner Packs', 'Master Export Carton'],
    salesMode: 'b2b_quote'
  },
  {
    id: 'vq-safe-03',
    name: 'VORQEN High-Dexterity Touchscreen Mechanic Glove',
    category: 'work-safety-gloves',
    categoryLabel: 'Work & Safety Gloves',
    shortDescription: 'Precision touchscreen-compatible synthetic leather mechanics glove with breathable mesh back.',
    description: 'Engineered for automotive technicians, aerospace assembly, and precision mechanical maintenance. Features conductive index finger and thumb tips for instant tablet/smartphone operation without glove removal.',
    image: '/src/assets/images/gloves_craftsmanship_1792345107076.jpg',
    galleryImages: [
      '/src/assets/images/gloves_craftsmanship_1792345107076.jpg'
    ],
    materials: ['0.8mm Synthetic Leather', 'Conductive PU Touch Fabric', '4-Way Stretch Lycra Mesh'],
    colors: ['Stealth Black', 'Racing Red / Black', 'Forest Green / Charcoal'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    moq: '500 Pairs',
    sampleAvailable: true,
    leadTime: '25 Days',
    features: [
      'Multi-finger capacitive touch conductivity',
      'Knuckle flex gussets for fatigue reduction',
      'Terry cloth sweat wipe on thumb back',
      'Machine washable cold cycle formulation'
    ],
    brandingOptions: ['Silicone Palm Grip Logo', 'Sublimated Spandex Backing', 'Woven Cuff Label'],
    packagingOptions: ['Hanger Header Card', 'Zip Polybag', 'Export Carton'],
    salesMode: 'b2b_quote'
  },
  {
    id: 'vq-safe-05',
    name: 'VORQEN VulcanSplit Heavy Leather Welding & Heat Protective Glove',
    category: 'work-safety-gloves',
    categoryLabel: 'Work & Safety Gloves',
    shortDescription: 'Industrial split cowhide heavy welding glove in cobalt blue & gold with Kevlar thread stitching and insulated thermal cotton fleece lining.',
    description: 'Engineered for MIG/TIG welding, foundry operations, plasma cutting, and high-heat metal fabrication. Built with premium heat-resistant split cowhide, welted Kevlar seams to resist molten splatter, and an extended 14-inch safety gauntlet cuff. Contact for catalog samples and timely shipping.',
    image: '/src/assets/images/welding_gloves_blue_1792349112228.jpg',
    galleryImages: [
      '/src/assets/images/welding_gloves_blue_1792349112228.jpg',
      '/src/assets/images/workshop_craftsmanship_1792345108466.jpg'
    ],
    materials: ['A-Grade Heavy Split Cowhide', '100% Kevlar Flame-Resistant Thread', 'Thick Brushed Cotton Thermal Lining', 'Reinforced Palm & Thumb Saddle'],
    colors: ['Cobalt Blue / Golden Tan', 'Gunmetal Charcoal / Tan', 'Classic Golden Yellow'],
    sizes: ['M (9)', 'L (10)', 'XL (11)', 'XXL (12)'],
    moq: '400 Pairs (Contact for catalog samples & timely shipping)',
    sampleAvailable: true,
    leadTime: '20-25 Days (Fast international air / sea dispatch)',
    features: [
      'Heavy-duty 14-inch extended gauntlet cuff for forearm protection against sparks and heat',
      'Welted seams with 4-ply Kevlar thread to prevent seam burnout',
      'Thermal insulating fleece liner for elevated radiant heat resistance',
      'Reinforced thumb saddle and double palm patch for extended abrasion resistance'
    ],
    brandingOptions: ['Heat Brand / Leather Deboss', 'Silicone Cuff Label', 'Custom Barcoded Header Tag'],
    packagingOptions: ['12-Pair Tied Bundles', 'Polybag with Barcode', 'Heavy Export Master Carton'],
    salesMode: 'b2b_quote'
  },
  {
    id: 'vq-safe-06',
    name: 'VORQEN TitanGrip Heavy Construction & Rigging Cowhide Work Glove',
    category: 'work-safety-gloves',
    categoryLabel: 'Work & Safety Gloves',
    shortDescription: 'High-durability grain cowhide construction glove with hi-vis yellow knuckle guard, reinforced double palm, and protective safety cuff.',
    description: 'Designed for heavy construction sites, scaffolding, masonry, lumber handling, and industrial rigging. Combines supple grain cowhide palm with high-visibility yellow protective backing, TPR knuckle bumpers, and an elastic safety cuff. Contact for catalog samples and timely shipping.',
    image: '/src/assets/images/construction_gloves_yellow_1792349112887.jpg',
    galleryImages: [
      '/src/assets/images/construction_gloves_yellow_1792349112887.jpg',
      '/src/assets/images/safety_gloves_industrial_1792347428425.jpg',
      '/src/assets/images/workshop_craftsmanship_1792345108466.jpg'
    ],
    materials: ['Heavy-Duty Full Grain Cowhide Palm', 'Hi-Vis Yellow Cotton Drill Back', 'Molded Knuckle Protection Band', 'Padded Safety Cuff'],
    colors: ['Hi-Vis Yellow / Natural Tan', 'Hi-Vis Orange / Tan'],
    sizes: ['S (8)', 'M (9)', 'L (10)', 'XL (11)', 'XXL (12)'],
    moq: '500 Pairs (Contact for catalog samples & timely shipping)',
    sampleAvailable: true,
    leadTime: '20-30 Days (Air express courier sample dispatch)',
    features: [
      'Double leather palm with reinforced thumb crotch for heavy tool and rope handling',
      'High-visibility yellow back with reflective piping for road and construction safety',
      'Rubberized safety cuff allows rapid flick-off glove removal in emergencies',
      'Breathable cotton back keeps hands dry during all-day construction shifts'
    ],
    brandingOptions: ['Silk Screen Print on Cuff', 'Heat Embossing', 'Woven Cuff Tag'],
    packagingOptions: ['12-Pair Industrial Packs', 'Custom Polybag with Barcode', 'Master Export Carton'],
    salesMode: 'b2b_quote'
  },
  {
    id: 'vq-safe-07',
    name: 'VORQEN DuraFlex Multi-Purpose Industrial General Work Glove',
    category: 'work-safety-gloves',
    categoryLabel: 'Work & Safety Gloves',
    shortDescription: 'Versatile all-day industrial utility glove with breathable stretch back and synthetic suede anti-abrasion palm with grip padding.',
    description: 'The everyday workhorse for logistics, warehouse loading, light assembly, equipment handling, and maintenance work. Ergonomic design reduces hand fatigue during long shifts while providing dependable mechanical grip. Contact for catalog samples and timely shipping.',
    image: '/src/assets/images/general_work_gloves_1792349113119.jpg',
    galleryImages: [
      '/src/assets/images/general_work_gloves_1792349113119.jpg',
      '/src/assets/images/gloves_craftsmanship_1792345107076.jpg'
    ],
    materials: ['Reinforced Synthetic Micro-Suede Palm', '4-Way Stretch Spandex Chassis', 'Neoprene Comfort Cuff', 'Silicone Grip Pads'],
    colors: ['Industrial Charcoal / High-Vis Green', 'Black / Steel Grey', 'Navy / High-Vis Orange'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    moq: '500 Pairs (Contact for catalog samples & timely shipping)',
    sampleAvailable: true,
    leadTime: '20-25 Days',
    features: [
      'Ergonomic anatomical finger curvature reduces grip effort and fatigue',
      'Breathable 4-way stretch back allows continuous heat dissipation',
      'Reinforced synthetic palm with vibration-dampening foam inserts',
      'Adjustable TPR hook-and-loop wrist closure for secure custom fit'
    ],
    brandingOptions: ['Direct TPR Molded Logo', 'Sublimated Spandex Back', 'Woven Wrist Label'],
    packagingOptions: ['Hanger Header Card', 'Frosted Polybag', 'Export Master Carton'],
    salesMode: 'b2b_quote'
  },
  {
    id: 'vq-safe-08',
    name: 'VORQEN CyberTouch Precision Mechanics & Touchscreen Work Glove',
    category: 'work-safety-gloves',
    categoryLabel: 'Work & Safety Gloves',
    shortDescription: 'High-dexterity automotive and maintenance glove with full capacitive touchscreen fingertips and ergonomic palm padding.',
    description: 'Tailored for automotive technicians, precision assembly engineers, and electrical maintenance crews. Conductive index and thumb pads allow effortless tablet, barcode scanner, and smartphone operation without removing gloves. Contact for catalog samples and timely shipping.',
    image: '/src/assets/images/touchscreen_work_gloves_1792349113428.jpg',
    galleryImages: [
      '/src/assets/images/touchscreen_work_gloves_1792349113428.jpg',
      '/src/assets/images/general_work_gloves_1792349113119.jpg'
    ],
    materials: ['High-Grade Conductive Synthetic Leather', 'Breathable Hex-Mesh Back', 'Gel Palm Shock Absorbers', 'Elastic Neoprene Wrist'],
    colors: ['Stealth Charcoal / Emerald Green Accent', 'All-Black Tactical', 'Silver Grey / Charcoal'],
    sizes: ['S (8)', 'M (9)', 'L (10)', 'XL (11)', 'XXL (12)'],
    moq: '400 Pairs (Contact for catalog samples & timely shipping)',
    sampleAvailable: true,
    leadTime: '20-25 Days',
    features: [
      'Capacitive micro-conductive fingertip integration for all modern touchscreen devices',
      'Hexagonal cooling mesh back for maximum airflow in warm workshop environments',
      'Strategically positioned palm gel pads that dampen power tool vibrations',
      'Terrycloth brow and perspiration wipe located on back of thumb'
    ],
    brandingOptions: ['Silicone Injection Logo', 'Sublimated Back Graphics', 'Embossed Neoprene Strap'],
    packagingOptions: ['Retail Hanging Header Card', 'Frosted Slider Bag', 'Master Carton'],
    salesMode: 'b2b_quote'
  },

  // 2. Tactical & Motorcycle Gloves
  {
    id: 'vq-tact-01',
    name: 'VORQEN Apex Tactical Hard-Knuckle Combat Glove',
    category: 'tactical-motorcycle-gloves',
    categoryLabel: 'Tactical & Motorcycle Gloves',
    shortDescription: 'Molded carbon-styled knuckle tactical glove with reinforced leather palm and breathable stretch chassis.',
    description: 'Battlefield-proven ergonomic tactical glove engineered for military personnel, law enforcement, and shooting sports enthusiasts. Delivers aggressive impact protection, positive weapons manipulation, and flame-resistant aramid stitching.',
    image: '/src/assets/images/hero_vorqen_collection_1792345106994.jpg',
    galleryImages: [
      '/src/assets/images/hero_vorqen_collection_1792345106994.jpg',
      '/src/assets/images/gloves_craftsmanship_1792345107076.jpg'
    ],
    materials: ['High-Density Polycarbonate Knuckle Armor', 'Goatskin Leather Palm', 'Ripstop Nylon', 'Neoprene'],
    colors: ['Coyote Brown', 'Tactical OD Green', 'Stealth Matte Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    moq: '400 Pairs',
    sampleAvailable: true,
    leadTime: '30 Days',
    features: [
      'Anatomically contoured molded knuckle guard',
      'Dual-layer palm reinforcement with EVA dampening foam',
      'Molle-compatible nylon webbing loop on wrist for carabiner carry',
      'Articulated accordion finger flex panels'
    ],
    brandingOptions: ['Rubber TPR Wrist Strap Badge', 'Laser-Etched Knuckle', 'Internal Military Spec Label'],
    packagingOptions: ['Matte Black Tactical Box', 'Heavy-Duty Zip Holster Bag'],
    salesMode: 'b2b_quote'
  },
  {
    id: 'vq-moto-02',
    name: 'VORQEN Track-Pro Leather Motorcycle Racing Glove',
    category: 'tactical-motorcycle-gloves',
    categoryLabel: 'Tactical & Motorcycle Gloves',
    shortDescription: 'Full-gauntlet cowhide and kangaroo leather motorcycle glove with TPU palm sliders and double cuff lock.',
    description: 'Track-ready motorcycle glove manufactured for sport riders and racing leagues. Handcrafted from supple top-grain leather with external seam construction for maximum tactile handlebar feedback and zero interior pinch points.',
    image: '/src/assets/images/motorcycle_racing_gloves_1792347773122.jpg',
    galleryImages: [
      '/src/assets/images/motorcycle_racing_gloves_1792347773122.jpg',
      '/src/assets/images/hero_vorqen_collection_1792345106994.jpg',
      '/src/assets/images/leather_jacket_biker_1792345107459.jpg'
    ],
    materials: ['1.1mm Drum-Dyed Cowhide', 'Molded Carbon Fiber Knuckle Armor', 'TPU Scaphoid Slider', 'Kevlar Underlining'],
    colors: ['Monochrome Black / Neon Green Accents', 'Black / Titanium Silver', 'Custom Race Team Colors'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    moq: '300 Pairs (Contact for catalog samples & timely shipping)',
    sampleAvailable: true,
    leadTime: '25-35 Days',
    features: [
      'Genuine aerodynamic carbon fiber knuckle protector shield',
      'Bridge connection between 4th and 5th finger to prevent rollover',
      'Pre-curved ergonomic track race palm geometry',
      'Dual-stage Velcro wrist cinch and gauntlet closure'
    ],
    brandingOptions: ['Custom Molded TPU Branding', 'Embroidered Wrist Flap', 'Full Custom Color Blocking'],
    packagingOptions: ['Luxury Rigid Gift Box with Magnetic Clasp', 'Mesh Ventilated Rider Bag'],
    salesMode: 'b2b_quote'
  },

  // 3. Sports & Fitness Gloves
  {
    id: 'vq-sport-01',
    name: 'VORQEN Pro-Grip Weightlifting & Gym Training Glove',
    category: 'sports-fitness-gloves',
    categoryLabel: 'Sports & Fitness Gloves',
    shortDescription: 'Ergonomic fitness gym glove with integrated 18-inch elastic wrist wraps and silicone honeycomb palm grip.',
    description: 'Engineered for powerlifters, CrossFit athletes, and general strength training. The extended wrist wrap provides rock-solid carpal stabilization during heavy presses and deadlifts, while silicone honeycomb matrix prevents bar slip.',
    image: '/src/assets/images/gym_fitness_gloves_1792347771538.jpg',
    galleryImages: [
      '/src/assets/images/gym_fitness_gloves_1792347771538.jpg',
      '/src/assets/images/sports_gear_suit_1792347428517.jpg'
    ],
    materials: ['Amara Synthetic Suede', 'Microfiber', 'High-Tension Elastic Webbing', 'Silicone Honeycomb'],
    colors: ['Forest Green / Gunmetal', 'All-Black Stealth', 'Steel Silver / Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    moq: '500 Pairs',
    sampleAvailable: true,
    leadTime: '20-25 Days',
    features: [
      'Integrated heavy-elastic wrist support strap with industrial Velcro',
      'Quick-release finger pull-tabs for easy removal after workout',
      'High-density open palm venting to reduce perspiration',
      'Reinforced calloused area padding'
    ],
    brandingOptions: ['Woven Wrap Label', 'Embossed Silicone Strap', 'Printed Palm Matrix'],
    packagingOptions: ['Matte Frosted Resealable Pouch', 'Display Hang Box'],
    salesMode: 'b2b_quote'
  },
  {
    id: 'vq-sport-02',
    name: 'VORQEN Aero-Road Gel Cycling Gloves',
    category: 'sports-fitness-gloves',
    categoryLabel: 'Sports & Fitness Gloves',
    shortDescription: 'Aerodynamic short-finger road cycling glove with multi-density gel padding and Italian mesh back.',
    description: 'Designed for endurance road cyclists and gravel riders. Reduces ulnar nerve pressure and road vibration through anatomically mapped silicone gel inserts.',
    image: '/src/assets/images/gloves_craftsmanship_1792345107076.jpg',
    galleryImages: [
      '/src/assets/images/gloves_craftsmanship_1792345107076.jpg'
    ],
    materials: ['Sublimated Poly-Lycra Mesh', 'AX Suede Palm', 'Anti-Shock Gel Matrix'],
    colors: ['Deep Forest Green', 'Charcoal Heather', 'Racing White'],
    sizes: ['S', 'M', 'L', 'XL'],
    moq: '400 Pairs',
    sampleAvailable: true,
    leadTime: '25 Days',
    features: [
      'Subtle pull-off loops between middle fingers',
      'Bonded seamless cuff for frictionless wrist movement',
      'High-absorbency microfiber nose wipe along thumb',
      'Reflective 3M piping on outer edge for low-light visibility'
    ],
    brandingOptions: ['Full-Color Sublimation Backing', 'Silicone Grip Logo', 'Woven Seam Label'],
    packagingOptions: ['Recycled Cardboard Pegboard Card', 'Eco Polybag'],
    salesMode: 'b2b_quote'
  },

  // 4. Leather Collection
  {
    id: 'vq-leath-01',
    name: 'VORQEN Heritage Café Racer Leather Jacket',
    category: 'leather-collection',
    categoryLabel: 'Leather Collection',
    shortDescription: 'Handcrafted drum-dyed full-grain cowhide leather motorcycle jacket with antique brass YKK hardware.',
    description: 'A timeless silhouette combining classic café racer aesthetics with modern riding ergonomics. Hand-cut and assembled in our workshop from 1.2mm thick premium cowhide with a soft, supple hand-feel that patinas beautifully over years of wear.',
    image: '/src/assets/images/leather_jacket_biker_1792345107459.jpg',
    galleryImages: [
      '/src/assets/images/leather_jacket_biker_1792345107459.jpg',
      '/src/assets/images/hero_vorqen_collection_1792345106994.jpg',
      '/src/assets/images/workshop_craftsmanship_1792345108466.jpg'
    ],
    materials: ['1.2mm Drum-Dyed Naked Cowhide', 'Original YKK Brass Zippers', 'Quilted Satin Thermal Liner', 'Internal Armor Pockets'],
    colors: ['Distressed Vintage Black', 'Espresso Dark Brown', 'Raw Tan Patina'],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (2XL)', 'Custom Tailored Dimensions'],
    moq: '50 Pieces (Custom sample prototypes welcomed)',
    sampleAvailable: true,
    leadTime: '30-40 Days',
    features: [
      'Mandarin collar with snap-button closure',
      'Bi-swing action back pleats for effortless reach to motorcycle handlebars',
      'Internal zippered concealed-carry and smartphone security pockets',
      'Adjustable waist buckles and zippered sleeve cuffs'
    ],
    brandingOptions: ['Custom Embossed Leather Back Patch', 'Debossed Pocket Flap', 'Custom Satin Inner Woven Label', 'Engraved Metal Snaps'],
    packagingOptions: ['Heavyweight Garment Dust Cover Bag with Wood Hanger', 'Double-Wall Export Box'],
    salesMode: 'b2b_quote'
  },
  {
    id: 'vq-leath-02',
    name: 'VORQEN Artisanal Full-Grain Leather Weekend Duffle',
    category: 'leather-collection',
    categoryLabel: 'Leather Collection',
    shortDescription: 'Vegetable-tanned full-grain leather carryall duffle with reinforced base and brass hardware.',
    description: 'Designed for international travel and sports gear transport. Constructed from thick vegetable-tanned leather with heavy bonded nylon top-stitching and riveted stress points.',
    image: '/src/assets/images/leather_jacket_biker_1792345107459.jpg',
    galleryImages: [
      '/src/assets/images/leather_jacket_biker_1792345107459.jpg',
      '/src/assets/images/workshop_craftsmanship_1792345108466.jpg'
    ],
    materials: ['Full-Grain Buffalo/Cow Leather', 'Heavy Cotton Drill Lining', 'Solid Antique Brass Hardware'],
    colors: ['Rich Havana Brown', 'Onyx Black', 'Cognac Tan'],
    sizes: ['55cm x 28cm x 28cm (Carry-On Compliant)'],
    moq: '100 Pieces',
    sampleAvailable: true,
    leadTime: '30 Days',
    features: [
      'Detachable padded leather shoulder strap',
      'Dedicated zippered shoe and laundry compartment',
      'Reinforced bottom panel with 5 protective brass feet',
      'Two exterior quick-access boarding pass pockets'
    ],
    brandingOptions: ['Hot Foil Stamping (Gold/Silver)', 'Deep Blind Debossing', 'Custom Leather Luggage Tag'],
    packagingOptions: ['Cotton Canvas Storage Bag', 'Protective Carton'],
    salesMode: 'b2b_quote'
  },
  {
    id: 'vq-drive-01',
    name: 'VORQEN Classic Perforated Lambskin Leather Driving Glove',
    category: 'leather-collection',
    categoryLabel: 'Leather Collection',
    shortDescription: 'Artisan handcrafted perforated lambskin leather driving glove with knuckle cutouts and antique brass snap closure.',
    description: 'A tribute to classic motorsport elegance and touring control. Handcrafted from ultra-supple Italian-grade perforated lambskin leather with ergonomic knuckle ventilation cutouts, elasticized wrist gathered channel, and antique brass snap button closure. Contact for catalog samples and timely shipping.',
    image: '/src/assets/images/leather_driving_gloves_1792347772223.jpg',
    galleryImages: [
      '/src/assets/images/leather_driving_gloves_1792347772223.jpg',
      '/src/assets/images/leather_jacket_biker_1792345107459.jpg',
      '/src/assets/images/workshop_craftsmanship_1792345108466.jpg'
    ],
    materials: ['A-Grade Full-Grain Perforated Lambskin', 'Antique Brass Snap Stud Hardware', 'Bonded Nylon Seaming'],
    colors: ['Cognac Tan', 'British Racing Green', 'Vintage Saddle Brown', 'Onyx Black'],
    sizes: ['7.5 (S)', '8.0 (M)', '8.5 (L)', '9.0 (XL)', '9.5 (XXL)'],
    moq: '150 Pairs (Contact for catalog samples & timely shipping)',
    sampleAvailable: true,
    leadTime: '20-25 Days',
    features: [
      'Precision punch-hole perforation across fingers and back for cooling airflow',
      'Anatomical open knuckle portals for frictionless wheel grip flex',
      'Unlined construction for direct, tactile road and steering feedback',
      'Hand-burnished leather piping along cuff edges'
    ],
    brandingOptions: ['Debossed Leather Wrist Tab', 'Engraved Brass Snap Cap', 'Custom Suede Gift Sleeve'],
    packagingOptions: ['Luxury Rigid Slide Gift Box', 'Kraft Presentation Envelope', 'Export Master Carton'],
    salesMode: 'b2b_quote'
  },
  {
    id: 'vq-dress-01',
    name: 'VORQEN Luxury Cashmere-Lined Nappa Leather Dress Glove',
    category: 'leather-collection',
    categoryLabel: 'Leather Collection',
    shortDescription: 'Formal men and women Italian nappa leather dress gloves with 3-point hand-stitching and pure cashmere lining.',
    description: 'Impeccable sartorial formal gloves crafted for luxury boutiques and private labels. Cut from velvety-soft drum-dyed nappa leather and lined with pure knit Mongolian cashmere for featherlight thermal warmth. Contact for catalog samples and timely international shipping.',
    image: '/src/assets/images/leather_dress_gloves_1792347772105.jpg',
    galleryImages: [
      '/src/assets/images/leather_dress_gloves_1792347772105.jpg',
      '/src/assets/images/workshop_craftsmanship_1792345108466.jpg'
    ],
    materials: ['Premium Italian-Finish Aniline Nappa Leather', '100% Pure Knit Cashmere Thermal Lining'],
    colors: ['Two-Tone Onyx Black & Chestnut Brown', 'All-Black Classic', 'Espresso Dark Chocolate'],
    sizes: ['S (7.5)', 'M (8.0)', 'L (8.5)', 'XL (9.0)', 'Custom Bespoke Grading'],
    moq: '200 Pairs (Contact for catalog samples & timely shipping)',
    sampleAvailable: true,
    leadTime: '20-30 Days',
    features: [
      'Classic 3-line raised hand-stitched points across dorsal surface',
      'Contrast leather wrist banding with palm vent notch for easy entry',
      'Ultra-thin table-cut leather for sleek silhouette under overcoat sleeves',
      'Conductive leather touchscreen compatibility option available'
    ],
    brandingOptions: ['Hot-Stamped Foil Logo on Inner Lining', 'Woven Satin Brand Label', 'Custom Embossed Gift Box'],
    packagingOptions: ['Lidded Matte Velvet Presentation Box', 'Cotton Dust Pouch', 'Export Carton'],
    salesMode: 'b2b_quote'
  },

  // 5. Sportswear & Apparel
  {
    id: 'vq-app-01',
    name: 'VORQEN Pro-Performance Thermal Grid Athletic Hoodie',
    category: 'sportswear-apparel',
    categoryLabel: 'Sportswear & Apparel',
    shortDescription: 'Engineered moisture-wicking waffle-grid fleece hoodie with articulated raglan sleeves and bonded zip pockets.',
    description: 'Premium athletic hoodie crafted for warmup, training, and modern technical streetwear. Made from a custom 340 GSM cotton-poly fleece blend featuring an interior thermal waffle grid that traps body heat while venting excess sweat.',
    image: '/src/assets/images/fleece_hoodie_streetwear_1792348610784.jpg',
    galleryImages: [
      '/src/assets/images/fleece_hoodie_streetwear_1792348610784.jpg',
      '/src/assets/images/sports_gear_suit_1792347428517.jpg',
      '/src/assets/images/hero_vorqen_collection_1792345106994.jpg'
    ],
    materials: ['340 GSM Cotton/Polyester Technical Grid Fleece', 'Water-Resistant Matte Zippers', 'Ribbed Elastane Cuffs'],
    colors: ['Deep Forest Green', 'Heather Charcoal', 'Core Off-White', 'Black Obsidian'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    moq: '300 Pieces per colorway',
    sampleAvailable: true,
    leadTime: '25-30 Days',
    features: [
      'Scuba-style 3-panel structured hood with concealed bungee toggles',
      'Concealed zippered kangaroo hand-warmer pockets',
      'Articulated raglan sleeve construction to prevent seam bunching',
      'Pre-shrunk fabric treatment to maintain exact post-wash sizing'
    ],
    brandingOptions: ['High-Density 3D Silicone Chest Print', 'Direct-to-Film (DTF) Graphics', 'Custom Neck Tape & Woven Labels'],
    packagingOptions: ['Individual Recyclable Frosted Slider Bags', 'Custom Hangtag with Barcode'],
    salesMode: 'b2b_quote'
  },
  {
    id: 'vq-app-02',
    name: 'VORQEN Technical Compression Training Top & Tights',
    category: 'sportswear-apparel',
    categoryLabel: 'Sportswear & Apparel',
    shortDescription: '4-way stretch multi-panel compression set with flatlock non-chafing seams and zoned ventilation.',
    description: 'High-performance athletic compression base layer set engineered for combat sports, gym training, and high-intensity conditioning. Delivers targeted muscle stabilization and rapid thermoregulation.',
    image: '/src/assets/images/sportswear_athletic_1792345107740.jpg',
    galleryImages: [
      '/src/assets/images/sportswear_athletic_1792345107740.jpg'
    ],
    materials: ['85% Poly / 15% Spandex (240 GSM)', 'Antimicrobial Moisture-Wicking Treatment', 'Jacquard Elastic Band'],
    colors: ['Forest Green Geometric', 'Stealth Graphite', 'Navy Camo'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    moq: '300 Sets',
    sampleAvailable: true,
    leadTime: '25 Days',
    features: [
      '6-thread flatlock anti-chafing seam technology',
      'Graduated muscle support compression profiles',
      'Sublimated artwork that will never peel, crack, or fade',
      'Elasticized jacquard waistband with silicone inner grip'
    ],
    brandingOptions: ['Full Dye Sublimation Printing', 'Heat Transfer Reflective Logos', 'Custom Woven Waistband'],
    packagingOptions: ['Biodegradable Poly Sleeve', 'Brand Printed Carton'],
    salesMode: 'b2b_quote'
  },
  {
    id: 'vq-app-03',
    name: 'VORQEN Heavyweight Piqué Athletic Polo Shirt',
    category: 'sportswear-apparel',
    categoryLabel: 'Sportswear & Apparel',
    shortDescription: '220 GSM combed organic cotton piqué polo with reinforced placket and ribbed collar.',
    description: 'Engineered for teamwear, coaching staff, and clubhouse lifestyle. Hand-dyed yarns deliver superior wash fastness and shape retention.',
    image: '/src/assets/images/sportswear_athletic_1792345107740.jpg',
    galleryImages: [
      '/src/assets/images/sportswear_athletic_1792345107740.jpg'
    ],
    materials: ['100% Combed Compact Cotton Piqué (220 GSM)', 'Mother-of-Pearl Melamine Buttons'],
    colors: ['Forest Green / Silver Tipping', 'Charcoal Heather', 'Clean Crisp White', 'Midnight Black'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    moq: '250 Pieces',
    sampleAvailable: true,
    leadTime: '20-25 Days',
    features: [
      'Split tennis tail hem with interior contrast twill tape',
      'Anti-curl heat-set ribbed knit collar and cuffs',
      'Double-needle hem stitching for longevity',
      'Bio-washed for ultra-soft handfeel'
    ],
    brandingOptions: ['High-Precision Chest Embroidery', 'Silicone Emblem', 'Custom Buttons'],
    packagingOptions: ['Cardboard Collar Former in Polybag', 'Export Master Carton'],
    salesMode: 'b2b_quote'
  },
  {
    id: 'vq-app-04',
    name: 'VORQEN Apex-Pro Technical Sports Gear Training Suit',
    category: 'sportswear-apparel',
    categoryLabel: 'Sportswear & Apparel',
    shortDescription: 'Full 2-piece high-performance athletic tracksuit featuring windproof hooded training jacket and tapered zippered track pants.',
    description: 'Engineered for team sports, athletic conditioning, and professional club warmups. Manufactured with a two-tone bonded poly-elastane technical weave with water-repellent DWR finish, ergonomic raglan arm articulation, reflective silver safety piping, and waterproof YKK reverse-coil zippers. Contact for catalog samples and timely international shipping.',
    image: '/src/assets/images/sports_gear_suit_1792347428517.jpg',
    galleryImages: [
      '/src/assets/images/sports_gear_suit_1792347428517.jpg',
      '/src/assets/images/sportswear_athletic_1792345107740.jpg',
      '/src/assets/images/workshop_craftsmanship_1792345108466.jpg'
    ],
    materials: ['Bonded Poly-Elastane DWR Woven Fabric (280 GSM)', 'Breathable Honeycomb Mesh Lining', 'Reflective 3M Piping', 'YKK Aquaguard Zippers'],
    colors: ['Deep Forest Green / Dark Charcoal / Silver', 'Monochrome Black / Titanium Silver', 'Navy / White / Gunmetal'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', 'Custom Club Sizing'],
    moq: '200 Sets (Contact for catalog samples & timely shipping)',
    sampleAvailable: true,
    leadTime: '20-25 Days (Timely ocean/air export)',
    features: [
      'Full 2-piece matching hooded technical jacket and tapered athletic track pants',
      'Windproof and water-resistant shell with micro-mesh thermal regulation',
      'Concealed waterproof zip pockets on jacket and trousers with ankle zips',
      '360-degree reflective silver piping for dusk/night training visibility'
    ],
    brandingOptions: ['High-Density Silicone Crest / Logo', 'Direct Embroidery', 'Reflective Heat Transfer', 'Custom Zipper Pulls & Neck Tape'],
    packagingOptions: ['Individual Luxury Frosted Zipper Bag', 'Custom Team Pack', 'Export Master Carton'],
    salesMode: 'b2b_quote'
  },
  {
    id: 'vq-app-05',
    name: 'VORQEN Aero-Dry Performance Athletic Training T-Shirt',
    category: 'sportswear-apparel',
    categoryLabel: 'Sportswear & Apparel',
    shortDescription: 'Technical lightweight training t-shirt with ergonomic raglan sleeves, silver flatlock seams, and micro-mesh cooling zones.',
    description: 'Engineered for gym training, running, and high-intensity club athletics. Constructed from an ultra-lightweight 160 GSM poly-elastane micro-mesh with active moisture-wicking and antimicrobial fiber infusion. Contact for catalog samples and timely international shipping.',
    image: '/src/assets/images/athletic_tshirt_apparel_1792348610117.jpg',
    galleryImages: [
      '/src/assets/images/athletic_tshirt_apparel_1792348610117.jpg',
      '/src/assets/images/sports_gear_suit_1792347428517.jpg'
    ],
    materials: ['92% Micro-Polyester / 8% Spandex (160 GSM)', 'Antimicrobial Hydrophilic Coating'],
    colors: ['Deep Forest Green / Silver Piping', 'Charcoal Heather', 'Clean White', 'Onyx Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    moq: '250 Pieces (Contact for catalog samples & timely shipping)',
    sampleAvailable: true,
    leadTime: '15-20 Days',
    features: [
      'Silky 4-way stretch fabric with targeted underarm ventilation mesh',
      'Flatlock non-abrasive seams to prevent chest and shoulder chafing',
      'Drop-tail curved athletic hem for stay-tucked workout coverage',
      'Reflective transfer logo detailing on chest and nape'
    ],
    brandingOptions: ['High-Density Silicone Print', 'Sublimation Printing', 'Heat-Seal Reflective Brand Badge', 'Custom Woven Neck Label'],
    packagingOptions: ['Individual Frosted Polybag', 'Export Master Carton'],
    salesMode: 'b2b_quote'
  },
  {
    id: 'vq-app-06',
    name: 'VORQEN Elite 6-Panel Performance Athletic Sports Cap',
    category: 'sportswear-apparel',
    categoryLabel: 'Sportswear & Apparel',
    shortDescription: 'Structured 6-panel performance sports cap with pre-curved visor, AeroDry moisture-wicking sweatband, and 3D silicone logo.',
    description: 'Crafted for athletes, motorsport teams, and sports lifestyle brands. Built with a breathable micro-pique woven fabric, laser-cut ventilation eyelets, interior AeroDry moisture-absorbing sweatband, and adjustable hook-and-loop rear closure with rubberized pull tab.',
    image: '/src/assets/images/performance_sports_caps_1792348611080.jpg',
    galleryImages: [
      '/src/assets/images/performance_sports_caps_1792348611080.jpg',
      '/src/assets/images/fleece_hoodie_streetwear_1792348610784.jpg'
    ],
    materials: ['Performance Micro-Piqué Polyester', 'High-Density AeroDry Terry Sweatband', 'Structured Buckram Front Panels'],
    colors: ['Forest Green / Black Visor Trim', 'All-Black Stealth', 'Titanium Silver / Charcoal'],
    sizes: ['One Size Fits Most (Adjustable Rear Strap)'],
    moq: '300 Pieces (Contact for catalog samples & timely shipping)',
    sampleAvailable: true,
    leadTime: '20 Days',
    features: [
      'Structured 6-panel A-frame crown for sharp silhouette retention',
      'Pre-curved memory visor with sandwich contrast piping',
      'Sonic-welded 3D silicone front crest logo application',
      'Custom woven seam taping on interior crown'
    ],
    brandingOptions: ['3D Silicone Injection Patch', '3D Puff Embroidery', 'Woven Clamp Label on Strap', 'Custom Laser-Etched Buckle'],
    packagingOptions: ['Custom Inner Display Box', 'Protective Form Insert', 'Export Master Carton'],
    salesMode: 'b2b_quote'
  },
  {
    id: 'vq-app-07',
    name: 'VORQEN Tapered Articulated Athletic Training Pants & Joggers',
    category: 'sportswear-apparel',
    categoryLabel: 'Sportswear & Apparel',
    shortDescription: 'Ergonomic tapered athletic pants with articulated knee panels, concealed waterproof zip pockets, and ribbed cuffs.',
    description: 'Engineered for club training, gym warmup, and athletic lifestyle. Crafted from 320 GSM French terry fleece with articulated anatomical knee seams that prevent binding during deep squats and sprints. Contact for catalog samples and timely international shipping.',
    image: '/src/assets/images/athletic_training_pants_1792348611705.jpg',
    galleryImages: [
      '/src/assets/images/athletic_training_pants_1792348611705.jpg',
      '/src/assets/images/fleece_hoodie_streetwear_1792348610784.jpg',
      '/src/assets/images/sports_gear_suit_1792347428517.jpg'
    ],
    materials: ['320 GSM Compact Cotton/Poly French Terry', 'Waterproof Heat-Sealed Zippers', 'Ribbed Elastane Ankle Cuffs'],
    colors: ['Dark Charcoal Black', 'Deep Forest Green', 'Gunmetal Heather'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    moq: '250 Pieces (Contact for catalog samples & timely shipping)',
    sampleAvailable: true,
    leadTime: '20-25 Days',
    features: [
      'Articulated knee stitching and inner-thigh gusset for unrestricted athletic movement',
      'Concealed waterproof zippered thigh security pocket with heat-sealed bonding',
      'Heavy-duty elastic waistband with rubber-dipped drawcord tips',
      'Deep front hand pockets and back zippered wallet pocket'
    ],
    brandingOptions: ['High-Density Silicone Thigh Emblem', 'Reflective Heat Transfer', 'Custom Branded Drawcords & Aglets'],
    packagingOptions: ['Individual Frosted Slider Polybag', 'Export Master Carton'],
    salesMode: 'b2b_quote'
  },

  // 6. Custom OEM / Private-Label
  {
    id: 'vq-custom-01',
    name: 'VORQEN Bespoke OEM & Private-Label Manufacturing Service',
    category: 'custom-oem',
    categoryLabel: 'Custom & OEM Solutions',
    shortDescription: 'End-to-end custom sports gear, tactical gloves, leather jackets, and apparel manufacturing according to your technical drawings.',
    description: 'Transform your brand vision into production-ready physical goods with our full manufacturing support from Sialkot, Pakistan. We accommodate custom patterns, specialized leather tanning, private mold tooling for TPR protectors, customized hardware, and private-label packaging.',
    image: '/src/assets/images/workshop_craftsmanship_1792345108466.jpg',
    galleryImages: [
      '/src/assets/images/workshop_craftsmanship_1792345108466.jpg',
      '/src/assets/images/hero_vorqen_collection_1792345106994.jpg',
      '/src/assets/images/leather_jacket_biker_1792345107459.jpg'
    ],
    materials: ['Customer Specified Textiles', 'Certified Leathers', 'Custom Molded Rubbers & Polymers'],
    colors: ['Custom Pantone (PMS) Color Matching Available'],
    sizes: ['Custom International Size Charts (US / EU / Asian fits)'],
    moq: 'Flexible by product category (Typically 250-500 units)',
    sampleAvailable: true,
    leadTime: '7-14 Days for Samples | 30-45 Days Bulk Production',
    features: [
      'Dedicated technical support and sample prototyping',
      'Comprehensive material sourcing and physical sample approvals',
      'Strict brand non-disclosure agreement (NDA) honored',
      'Direct factory communication with experienced export management'
    ],
    brandingOptions: ['Woven Labels', 'Embroidery', 'Silicone Badges', 'Leather Patches', 'Laser Engraving', 'Custom Hangtags'],
    packagingOptions: ['Fully Customized Retail Packaging, Display Boxes & Export Barcoding'],
    salesMode: 'b2b_quote'
  }
];

export const PRODUCT_CATEGORIES = [
  {
    id: 'all',
    label: 'All Products',
    description: 'Complete VORQEN catalog supported by FLAKES IMPEX manufacturing.'
  },
  {
    id: 'work-safety-gloves',
    label: 'Work & Safety Gloves',
    description: 'TPR impact, cut-resistant, mechanic, driver, and industrial handling gloves.'
  },
  {
    id: 'tactical-motorcycle-gloves',
    label: 'Tactical & Motorcycle Gloves',
    description: 'Hard-knuckle tactical, military combat, and track racing motorcycle gloves.'
  },
  {
    id: 'sports-fitness-gloves',
    label: 'Sports & Fitness Gloves',
    description: 'Weightlifting, cycling, batting, gym, and custom athletic grip gloves.'
  },
  {
    id: 'leather-collection',
    label: 'Leather Collection',
    description: 'Authentic cowhide motorcycle jackets, leather bags, and crafted goods.'
  },
  {
    id: 'sportswear-apparel',
    label: 'Sportswear & Apparel',
    description: 'Thermal grid hoodies, compression wear, athletic tees, polos, and tracksuits.'
  },
  {
    id: 'custom-oem',
    label: 'Custom OEM Solutions',
    description: 'Full private-label development, custom tech-packs, and bespoke export batches.'
  }
];
