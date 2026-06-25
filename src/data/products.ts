import { type Product, type ProductCategory } from "@/types";

export const products: Product[] = [
  {
    id: "p-8",
    slug: "solar-smart-bench",
    name: "Smart Solar Bench",
    category: "Smart City",
    description:
      "The Solar Smart Bench is a next-generation urban seating solution that brings connectivity and renewable energy to public spaces. Fully powered by integrated solar panels, it provides free Wi-Fi, wireless device charging, USB ports, and atmospheric sensors. Designed with durable, weather-resistant materials, it's perfect for parks, university campuses, smart city squares, and corporate campuses.",
    shortDescription: "Solar-powered smart seating with Wi-Fi & USB charging",
    features: [
      "Integrated monocrystalline solar panels",
      "Wireless charging pad (Qi standard)",
      "4x fast-charging USB ports",
      "Public Wi-Fi hotspot integration",
      "Ambient LED lighting for night safety",
      "Vandal-resistant and weatherproof design",
      "Built-in atmospheric and environmental sensors",
    ],
    specs: [
      { label: "Solar Panel", value: "100W High-Efficiency Monocrystalline" },
      { label: "Battery", value: "12V 40Ah / 50Ah Lithium Iron Phosphate" },
      { label: "USB Ports", value: "2x USB-A + 2x USB-C" },
      { label: "Seating Capacity", value: "4-6 persons" },
      { label: "Construction", value: "SS 304 Frame + UV-Resistant Composite" },
      { label: "IP Rating", value: "IP65 Waterproof" },
    ],
    certifications: ["MNRE Approved", "IP65", "GeM Listed", "CE Marking"],
    images: [
      "/images/products/solar_bench/sb_1.png",
      "/images/products/solar_bench/sb_2.png"
    ],
    price: "On Request",
    inStock: true,
    badge: "Smart City",
    relatedProductSlugs: [],
  },
  {
    id: "p-9",
    slug: "ev-rickshaw",
    name: "EV-Rickshaw",
    category: "Waste Management",
    description:
      "Eco-friendly Electric Vehicle (EV) Rickshaw tailored for efficient municipal solid waste collection. Designed with a robust chassis, hydraulic tipping mechanism, and segregated wet/dry waste bins, it offers a zero-emission solution for door-to-door garbage collection in urban and semi-urban areas.",
    shortDescription: "Zero-emission electric rickshaw for solid waste collection",
    features: [
      "100% Electric & Zero Emission",
      "Hydraulic tipping for easy unloading",
      "Segregated compartments (Wet/Dry/Hazardous)",
      "High-capacity Lithium-ion / Lead-acid battery options",
      "Heavy-duty shock absorbers for uneven roads",
      "Low maintenance and running cost",
    ],
    specs: [
      { label: "Motor Power", value: "1000W - 1500W BLDC" },
      { label: "Load Capacity", value: "500 Kg - 700 Kg" },
      { label: "Range", value: "70 - 100 km per charge" },
      { label: "Charging Time", value: "4 - 5 Hours (Fast Charge)" },
      { label: "Bin Capacity", value: "1.5 - 2.5 Cubic Meters" },
      { label: "Warranty", value: "1 Year Vehicle, 3 Years Battery" },
    ],
    certifications: ["ICAT Approved", "Make in India", "ISO 9001:2015"],
    images: [
      "/images/products/ev_rickshaw/ft_1.jpg",
      "/images/products/ev_rickshaw/ft_2.jpg",
      "/images/products/ev_rickshaw/ft_3.jpg",
      "/images/products/ev_rickshaw/ft_4.jpg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Eco-Certified",
    relatedProductSlugs: ["solar-smart-bench"],
  },
  {
    id: "p-10",
    slug: "organic-waste-composter",
    name: "Automatic Organic Food Waste Compost Machine",
    category: "Waste Management",
    description:
      "The Organic Food Waste Composter Machine by WASTEMENT provides a fully automatic, odour-free solution to convert organic food waste into nutritious compost. It features a smart PLC control system and high-efficiency composting process with 50KG to 500KG capacity per cycle. The internal process includes shredding, drying, and composting chambers for sustainable waste reduction.",
    shortDescription: "Fully automatic machine to convert organic food waste into compost",
    features: [
      "Fully Automatic Operation",
      "Smart PLC Control System",
      "Low Power Consumption",
      "Odour Free Process",
      "High Efficiency Composting",
      "Easy to Operate & Maintain",
    ],
    specs: [
      { label: "Capacity", value: "50KG - 500KG per cycle" },
      { label: "Construction", value: "Mild Steel with Powder Coating" },
      { label: "Power Supply", value: "220V / 50Hz" },
      { label: "Power Consumption", value: "3 - 5 kW" },
      { label: "Cycle Time", value: "8 - 12 Hours" },
      { label: "Operating Temp.", value: "40°C - 70°C" },
      { label: "Mobility", value: "Heavy Duty Castor Wheels" },
    ],
    certifications: [],
    images: [
      "/images/products/composter/composter_2.png",
      "/images/products/composter/composter_1.png",
    ],
    price: "On Request",
    inStock: true,
    badge: "Eco-Friendly",
    relatedProductSlugs: ["ev-rickshaw"],
  },
  {
    id: "p-11",
    slug: "bio-medical-waste-incinerator",
    name: "Smokeless Bio Medical Waste Incinerator",
    category: "Waste Management",
    description:
      "The Bio Medical Waste Incinerator by WASTEMENT is engineered for the safe and compliant disposal of bio-medical hazards. Utilizing advanced combustion technology, it guarantees a complete burn with minimal emissions, reducing infection risks. Built with robust materials for durability and featuring intelligent safety interlocks, this CPCB and MOEF compliant machine offers a low-maintenance, eco-friendly solution for hospitals and clinics.",
    shortDescription: "Safe and compliant advanced combustion incinerator for bio-medical waste",
    features: [
      "Eco Friendly & Low Emission",
      "Smart Control with Safety Interlocks",
      "Advanced Combustion for Complete Burn",
      "CPCB & MOEF Compliant",
      "Durable and Robust Construction",
      "User Friendly & Low Maintenance",
    ],
    specs: [
      { label: "Application", value: "Bio-Medical Waste Disposal" },
      { label: "Compliance", value: "CPCB & MOEF Guidelines" },
      { label: "Combustion", value: "High Efficiency Advanced Burn" },
      { label: "Safety", value: "Intelligent Interlocks" },
      { label: "Design", value: "Made in India" },
    ],
    certifications: ["ISO 14001:2015", "CPCB Compliant", "Made in India"],
    images: [
      "/images/products/incinerator/3_2.png",
      "/images/products/incinerator/3_3.png",
      "/images/products/incinerator/3_4.png",
      "/images/products/incinerator/3_1.png",
      "/images/products/bio-medical-waste-incinerator/1.jpeg",
      "/images/products/bio-medical-waste-incinerator/2.jpeg",
      "/images/products/bio-medical-waste-incinerator/3.jpeg",
      "/images/products/bio-medical-waste-incinerator/4.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "ISO Certified",
    relatedProductSlugs: ["organic-waste-composter", "ev-rickshaw"],
  },
  {
    id: "p-12",
    slug: "solid-waste-incinerator",
    name: "Solid Waste Incinerator With Smoke Control System",
    category: "Waste Management",
    description:
      "The Solid Waste Incinerator by WASTEMENT is a next-generation waste solution designed for high-temperature combustion and low emission. Featuring an integrated scrubber tank and cyclone separator, it ensures an environmentally friendly burn process. This heavy-duty system is highly efficient, durable, and cost-effective, offering a complete solution for safe solid waste disposal.",
    shortDescription: "Next-generation solid waste incinerator with integrated scrubber and low emission technology",
    features: [
      "High Temperature Combustion",
      "Low Emission Technology",
      "Integrated Scrubber Tank",
      "Efficient & Reliable Performance",
      "Environment Friendly Solution",
      "Safe, Durable & Cost Effective",
    ],
    specs: [
      { label: "Type", value: "Solid Waste Incinerator" },
      { label: "Emission Control", value: "Cyclone Separator & Scrubber" },
      { label: "Combustion", value: "High Temperature" },
      { label: "Ash Management", value: "Integrated Ash Tray" },
      { label: "Design", value: "Industrial Grade" },
    ],
    certifications: ["Low Emission Certified"],
    images: [
      "/images/products/solid_incinerator/4_1.png",
      "/images/products/solid_incinerator/4_2.png"
    ],
    price: "On Request",
    inStock: true,
    badge: "Next Generation",
    relatedProductSlugs: ["bio-medical-waste-incinerator"],
  },
  {
    id: "p-13",
    slug: "smart-food-cart",
    name: "Smart Mobile Food Cart",
    category: "Smart City",
    description:
      "A modern, hygienic, and fully equipped mobile food vending cart designed to elevate the street food experience. Built with premium food-grade stainless steel, this cart features integrated LED lighting, spacious storage compartments, built-in waste disposal units, and a sleek aesthetic. It's the perfect solution for street food vendors, outdoor catering, and modern smart city urban planning.",
    shortDescription: "Premium stainless steel mobile food vending cart with integrated lighting and storage",
    features: [
      "Food-Grade Stainless Steel Construction",
      "Integrated LED Branding & Lighting",
      "Built-in Hygiene & Waste Management",
      "Weather-resistant Canopy",
      "Modular Cooking & Prep Sections",
      "Heavy-duty Mobility Castors",
    ],
    specs: [
      { label: "Material", value: "Premium Stainless Steel (SS 304)" },
      { label: "Mobility", value: "Heavy Duty Swivel Castors with Brakes" },
      { label: "Lighting", value: "Energy-efficient LED strips & Panel Lights" },
      { label: "Storage", value: "Lockable under-counter cabinets" },
      { label: "Customization", value: "Fully customizable branding wraps" },
    ],
    certifications: ["FSSAI Compliant Design", "Make in India"],
    images: [
      "/images/products/food_cart/5_1.jpg",
      "/images/products/food_cart/5_2.jpg",
      "/images/products/food_cart/5_3.jpg",
      "/images/products/food_cart/5_4.jpg",
      "/images/products/food_cart/5_5.jpg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Modern Design",
    relatedProductSlugs: ["solar-smart-bench"],
  },
  {
    id: "p-14",
    slug: "plastic-grinder-machine",
    name: "Plastic Waste Grinder Machine",
    category: "Waste Management",
    description:
      "The Plastic Grinder Machine by WASTEMENT is built for performance and designed for the future. Ideal for all types of plastic waste, this robust and heavy-duty machine delivers highly efficient grinding with its high-speed rotor system. It guarantees energy-efficient operation with low noise and vibration, making it a low maintenance, user-friendly waste solution for recycling plants.",
    shortDescription: "High efficiency plastic grinding machine for all types of plastic waste recycling",
    features: [
      "High Efficiency Grinding Performance",
      "Robust & Heavy Duty Body Construction",
      "High Speed Rotor System",
      "Low Noise & Vibration",
      "Energy Efficient Operation",
      "Easy Cleaning & Maintenance",
    ],
    specs: [
      { label: "Power", value: "15 - 30 HP" },
      { label: "Rotor Speed", value: "800 - 1200 RPM" },
      { label: "Screen Size", value: "10 - 40 MM" },
      { label: "Capacity", value: "100 - 500 KG/HR" },
    ],
    certifications: ["CE Certified"],
    images: [
      "/images/products/waste_machinery/6_3.png",
      "/images/products/plastic-grinder-machine/1.jpeg",
      "/images/products/plastic-grinder-machine/2.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "High Performance",
    relatedProductSlugs: ["solid-waste-incinerator"],
  },
  {
    id: "p-15",
    slug: "trommel-waste-sorting-plant",
    name: "3 Stage Trommel Screening Machine",
    category: "Waste Management",
    description:
      "The 3 Stage Trommel Screening Machine by WASTEMENT is an industrial-scale automated screening and waste segregation plant. Built for high volume municipal solid waste management, it features a massive rotating cylindrical screen, heavy-duty feeding conveyors, and multiple segregation stages. The system is designed with high-grade, corrosion-resistant steel and a centralized control panel, delivering continuous, reliable, and energy-efficient performance in municipal and commercial recycling facilities.",
    shortDescription: "Industrial-scale 3-stage rotating trommel screen with heavy-duty conveyor belts for municipal waste segregation",
    features: [
      "Massive 3-Stage Cylindrical Rotating Screen for precise segregation",
      "Heavy-Duty Automated Feeding & Discharge Conveyors",
      "Centralized Control Panel for easy system operations",
      "Corrosion-Resistant Powder Coated Finish for harsh environments",
      "UV & Weather Resistant exterior for long-lasting shine",
      "High-Throughput continuously automated processing",
      "Low Maintenance and easy-to-clean design",
      "Custom Color Finishes: Wastement Green, Industrial Grey, Earth Brown, Premium Blue",
    ],
    specs: [
      { label: "System Type", value: "3 Stage Trommel Screening Plant" },
      { label: "Operation", value: "Continuous Automated" },
      { label: "Material", value: "Heavy-Duty Corrosion-Resistant Mild Steel" },
      { label: "Finishing", value: "Powder Coated (UV & Weather Resistant)" },
      { label: "Power & Control", value: "Central Control Panel with Emergency Stops" },
      { label: "Color Options", value: "Wastement Green (RAL 6005), Industrial Grey (RAL 7012), Earth Brown (RAL 8025), Premium Blue (RAL 5010)" },
    ],
    certifications: ["Industrial Grade Approved", "Make in India", "ISO Certified"],
    images: ["/images/products/trommel-waste-sorting-plant/1.jpeg"],
    price: "On Request",
    inStock: true,
    badge: "Industrial Scale",
    relatedProductSlugs: ["plastic-grinder-machine"],
  },
  {
    id: "p-16",
    slug: "vertical-industrial-incinerator",
    name: "Vertical Industrial Incinerator",
    category: "Waste Management",
    description:
      "Our Vertical Industrial Incinerator is a highly efficient waste-to-energy and mass disposal solution. Featuring a vertical primary combustion chamber and an advanced secondary emission control stack, this heavy-duty system minimizes its footprint while maximizing throughput. Complete with access platforms and robust steel construction, it ensures safe, continuous, and environmentally compliant industrial waste management.",
    shortDescription: "High-throughput vertical industrial incinerator system with advanced emission control",
    features: [
      "Space-Saving Vertical Chamber Design",
      "Advanced Emission Control Stack",
      "Integrated Access Platforms & Safety Stairs",
      "High-Temperature Combustion",
      "Heavy-Duty Industrial Construction",
      "Continuous Operation Capability",
    ],
    specs: [
      { label: "Configuration", value: "Vertical Chamber" },
      { label: "Emission Control", value: "Integrated Stack & Scrubber" },
      { label: "Material", value: "Industrial Grade Steel" },
    ],
    certifications: [],
    images: ["/images/products/waste_machinery/6_2.png"],
    price: "On Request",
    inStock: true,
    badge: "Heavy Duty",
    relatedProductSlugs: ["solid-waste-incinerator"],
  },
  {
    id: "p-17",
    slug: "horizontal-industrial-incinerator",
    name: "Heavy-Duty Horizontal Incinerator",
    category: "Waste Management",
    description:
      "The Heavy-Duty Horizontal Incinerator is built for massive volume reduction and industrial waste processing. This skid-mounted unit features a large, accessible primary horizontal combustion chamber with multi-point automated latching for maximum safety. Equipped with forced-draft fans and a dedicated exhaust stack, it delivers uncompromising burn efficiency for bulk solid wastes in a robust, low-profile footprint.",
    shortDescription: "Large capacity horizontal industrial incinerator for bulk solid waste processing",
    features: [
      "Large Horizontal Combustion Chamber",
      "Multi-Point Safety Latching System",
      "Skid-Mounted Modular Design",
      "Integrated Forced-Draft Blowers",
      "High-Capacity Bulk Waste Processing",
      "Heavy Gauge Steel Construction",
    ],
    specs: [
      { label: "Configuration", value: "Horizontal Skid-Mounted" },
      { label: "Capacity", value: "Bulk Industrial Waste" },
      { label: "Combustion", value: "Forced-Draft High Temperature" },
    ],
    certifications: [],
    images: ["/images/products/waste_machinery/6_5.png"],
    price: "On Request",
    inStock: true,
    badge: "Bulk Capacity",
    relatedProductSlugs: ["vertical-industrial-incinerator"],
  },
  {
    id: "p-18",
    slug: "e-toilet",
    name: "E-Toilet",
    category: "Smart City",
    description: "The EcoRestroom E-Toilet is a self-cleaning, eco-friendly public sanitation solution designed for smart cities. It features an automated access system, hygienic self-washing mechanisms, odor control technology, and minimal water consumption. This green infrastructure is essential for improving urban hygiene with dignity and sustainability.",
    shortDescription: "Automated, self-cleaning eco-friendly public restroom",
    features: [
      "Fully Automated Self-Cleaning System",
      "Eco-Friendly & Minimal Water Usage",
      "Advanced Odor Control Technology",
      "Touchless Hygienic Operation",
      "Smart Access & Usage Monitoring",
      "Durable, Vandal-Resistant Design"
    ],
    specs: [
      { label: "Material", value: "High-Grade Stainless Steel & Composite" },
      { label: "Water Usage", value: "Optimized Flush (1.5L - 2.5L)" },
      { label: "Power", value: "Solar/Grid Compatible" },
      { label: "Maintenance", value: "Automated Floor & Bowl Wash" }
    ],
    certifications: ["Swachh Bharat Approved", "Eco-Friendly", "Smart City Standard"],
    images: [
      "/images/products/e_toilet/1.jpeg",
      "/images/products/e_toilet/2.jpeg",
      "/images/products/e_toilet/3.jpeg",
      "/images/products/e_toilet/4.jpeg",
      "/images/products/e_toilet/5.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Smart City",
    relatedProductSlugs: []
  },
  {
    id: "p-19",
    slug: "pure-water-atm",
    name: "Pure Water ATM",
    category: "Public Health",
    description: "The Pure Water ATM provides 24/7 access to clean, safe, and mineral-enriched drinking water. Equipped with a 4-stage purification process including Reverse Osmosis (RO), UV Care, Ozonation, and a Mineral Booster, this automated dispensing unit ensures high-quality hydration for public spaces. It features a digital interface, automated dispensing, and sturdy weather-resistant construction.",
    shortDescription: "Automated 4-stage purification water dispensing ATM",
    features: [
      "4-Stage Purification (RO + UV + Ozonation + Mineral Booster)",
      "24/7 Automated Dispensing",
      "Digital Interface & Payment System",
      "Real-time Water Quality Monitoring",
      "Hygienic Touchless Design",
      "Weather & Vandal Resistant"
    ],
    specs: [
      { label: "Purification", value: "RO, UV, Ozonation, Mineral Booster" },
      { label: "Dispensing", value: "Automated Sensor/Button" },
      { label: "Construction", value: "Premium Stainless Steel & Coated Panels" },
      { label: "Capacity", value: "High Volume Commercial Output" }
    ],
    certifications: ["Safe Drinking Water", "ISO Certified"],
    images: [
      "/images/products/water_atm/1.jpeg",
      "/images/products/water_atm/2.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Public Health",
    relatedProductSlugs: ["e-toilet"]
  },
  {
    id: "p-20",
    slug: "container-kitchen",
    name: "Container Kitchen",
    category: "Smart City",
    description: "The Container Kitchen is a fully-equipped, prefabricated commercial kitchen built inside a repurposed shipping container. Featuring industrial-grade stainless steel countertops, commercial gas burners, exhaust hoods, deep sinks, and ample prep space, it's a turnkey solution for catering businesses, event venues, disaster relief camps, and military field operations. The modular design allows rapid deployment — simply transport, connect utilities, and start cooking.",
    shortDescription: "Prefabricated commercial kitchen in a shipping container",
    features: [
      "Full Commercial Kitchen Setup",
      "Industrial-Grade SS Countertops & Equipment",
      "Commercial Exhaust Hood & Ventilation",
      "Multiple Gas Burner Stations",
      "Deep Wash Sinks with Plumbing",
      "LED Lighting & Electrical Wiring",
      "Insulated Walls for Temperature Control",
      "Rapid Deployment — Plug & Play"
    ],
    specs: [
      { label: "Container Size", value: "20ft / 40ft Standard" },
      { label: "Construction", value: "Corrugated Steel Shell + SS 304 Interior" },
      { label: "Kitchen Equipment", value: "Burners, Ovens, Exhaust, Sinks, Prep Tables" },
      { label: "Electrical", value: "Pre-wired with LED Lighting & Power Outlets" },
      { label: "Ventilation", value: "Industrial Chimney Hood with Grease Filters" }
    ],
    certifications: ["FSSAI Ready", "Fire Safety Compliant", "ISO Certified"],
    images: [
      "/images/products/container_kitchen/1.jpeg",
      "/images/products/container_kitchen/2.jpeg",
      "/images/products/container_kitchen/3.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Modular",
    relatedProductSlugs: ["container-food-stall", "portable-community-kitchen"]
  },
  {
    id: "p-21",
    slug: "container-food-stall",
    name: "Container Food Stall",
    category: "Smart City",
    description: "The Container Food Stall is a vibrant, eye-catching, fully customizable food vending unit built from repurposed shipping containers. Branded with bold cultural artwork and signage (Maharashtra theme shown), these stalls feature large serving windows, interior shelving, display counters, and a compact yet functional kitchen setup. Ideal for street food businesses, government food distribution programs, cultural festivals, and smart city food zones.",
    shortDescription: "Branded container-based food vending stall",
    features: [
      "Custom Branding & Cultural Artwork",
      "Large Serving Window with Fold-Down Counter",
      "Interior Shelving & Product Display",
      "Built-in Kitchen/Prep Area",
      "Weather-Resistant Exterior Coating",
      "Multiple Window & Door Configurations",
      "Roof Canopy / Awning Options",
      "Lockable & Secure When Closed"
    ],
    specs: [
      { label: "Container Size", value: "10ft / 20ft / 40ft Options" },
      { label: "Exterior", value: "Powder-Coated Steel with Custom Graphics" },
      { label: "Serving Window", value: "Hydraulic Lift-Up or Sliding" },
      { label: "Interior", value: "Food-Grade Surfaces, LED Lighting" },
      { label: "Mobility", value: "Forklift / Crane Transportable" }
    ],
    certifications: ["FSSAI Ready", "Smart City Approved", "Weather Resistant"],
    images: [
      "/images/products/container_food_stall/1.jpeg",
      "/images/products/container_food_stall/2.jpeg",
      "/images/products/container_food_stall/3.jpeg",
      "/images/products/container_food_stall/4.jpeg",
      "/images/products/container_food_stall/5.jpeg",
      "/images/products/container_food_stall/6.jpeg",
      "/images/products/container_food_stall/7.jpeg",
      "/images/products/container_food_stall/8.jpeg",
      "/images/products/container_food_stall/9.jpeg",
      "/images/products/container_food_stall/10.jpeg",
      "/images/products/container_food_stall/11.jpeg",
      "/images/products/container_food_stall/12.jpeg",
      "/images/products/container_food_stall/13.jpeg",
      "/images/products/container_food_stall/14.jpeg",
      "/images/products/container_food_stall/15.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Customizable",
    relatedProductSlugs: ["container-kitchen", "portable-community-kitchen"]
  },
  {
    id: "p-22",
    slug: "portable-warehouse",
    name: "Portable Warehouse",
    category: "Smart City",
    description: "The Portable Warehouse is a large-capacity, containerized storage solution with an arched corrugated metal roof for maximum headroom and weather protection. Built on a standard shipping container base, it provides secure, weatherproof storage for construction sites, agricultural produce, industrial equipment, and emergency supplies. The modular design allows quick setup without permanent foundations.",
    shortDescription: "Containerized storage with arched roof for maximum capacity",
    features: [
      "Arched Roof for Extra Headroom",
      "Heavy-Duty Corrugated Steel Construction",
      "Large Double-Door Access",
      "Weatherproof & Leak-Resistant",
      "Ventilation Windows for Air Circulation",
      "No Foundation Required — Sits on Level Ground",
      "Stackable & Expandable Design",
      "Anti-Corrosion Coated Exterior"
    ],
    specs: [
      { label: "Base Size", value: "20ft / 40ft Container Base" },
      { label: "Roof Type", value: "Arched Galvanized Steel" },
      { label: "Height", value: "Extended — Up to 12ft Internal" },
      { label: "Load Capacity", value: "Heavy-Duty Industrial Grade" },
      { label: "Access", value: "Double Swing Doors + Side Entry" }
    ],
    certifications: ["IS Standard", "Weatherproof", "Industrial Grade"],
    images: [
      "/images/products/portable_warehouse/1.jpeg",
      "/images/products/portable_warehouse/2.jpeg",
      "/images/products/portable_warehouse/3.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Heavy Duty",
    relatedProductSlugs: ["portable-site-office"]
  },
  {
    id: "p-23",
    slug: "portable-site-office",
    name: "Portable Site Office",
    category: "Smart City",
    description: "The Portable Site Office is a fully-furnished, containerized office unit designed for construction sites, project management, and temporary field operations. Built from a modified shipping container, it features multiple windows for natural light, pre-installed electrical wiring, air conditioning provisions, and a professional interior finish. Ideal for engineers, supervisors, and project teams who need a functional workspace on remote sites.",
    shortDescription: "Container-based portable office for site operations",
    features: [
      "Multiple Windows for Natural Lighting",
      "Pre-Wired Electrical System with Outlets",
      "Air Conditioning & Ventilation Provisions",
      "Insulated Walls, Floor & Ceiling",
      "Lockable Entry Door with Security",
      "Notice Board & Signage Panel",
      "Durable Powder-Coated Exterior",
      "Fork Pockets for Easy Transport"
    ],
    specs: [
      { label: "Container Size", value: "20ft / 40ft Options" },
      { label: "Interior", value: "PVC/PUF Insulated Panels" },
      { label: "Flooring", value: "Vinyl / Chequered Plate" },
      { label: "Windows", value: "Sliding Aluminum with Grills" },
      { label: "Electrical", value: "Pre-Wired with MCB Panel" }
    ],
    certifications: ["IS Standard", "Fire Safety", "Industrial Grade"],
    images: [
      "/images/products/portable_site_office/1.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Portable",
    relatedProductSlugs: ["portable-warehouse", "portable-toilet-block"]
  },
  {
    id: "p-24",
    slug: "portable-toilet-block",
    name: "Portable Toilet Block",
    category: "Public Health",
    description: "The Portable Toilet Block is a multi-compartment, containerized sanitation facility designed for high-traffic public areas, construction sites, events, and disaster relief camps. Featuring multiple individual toilet cubicles with lockable doors, proper plumbing, ventilation, and a pitched roof for rain protection, it provides a dignified and hygienic sanitation solution that can be deployed rapidly anywhere.",
    shortDescription: "Multi-unit container-based sanitation facility",
    features: [
      "Multiple Individual Toilet Cubicles",
      "Lockable Doors with Occupancy Indicators",
      "Pitched Roof for Rain & Sun Protection",
      "Internal Plumbing & Waste Management",
      "Ventilation & Lighting in Each Cubicle",
      "ADA-Compliant Options Available",
      "Easy to Clean & Maintain",
      "Rapid Deployment — No Construction Needed"
    ],
    specs: [
      { label: "Configuration", value: "4 / 6 / 8 / 10 Cubicle Options" },
      { label: "Construction", value: "Steel Frame with Insulated Panels" },
      { label: "Plumbing", value: "Pre-Installed with External Connection" },
      { label: "Roof", value: "Galvanized Pitched Roof" },
      { label: "Flooring", value: "Anti-Skid, Waterproof Surface" }
    ],
    certifications: ["Swachh Bharat Approved", "Public Health Compliant", "ISO Certified"],
    images: [
      "/images/products/portable_toilet_block/1.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Public Health",
    relatedProductSlugs: ["e-toilet", "portable-site-office"]
  },
  {
    id: "p-25",
    slug: "portable-community-kitchen",
    name: "Portable Community Kitchen",
    category: "Smart City",
    description: "The Portable Community Kitchen is a culturally-decorated, container-based cooking facility designed for Anganwadis, mid-day meal programs, community feeding centers, and rural welfare schemes. Adorned with traditional Warli art and vibrant cultural motifs, it blends seamlessly into community settings while providing a fully-functional kitchen with stainless steel counters, gas burners, wash basins, and fire safety systems. Built for government schemes like PM POSHAN and ICDS.",
    shortDescription: "Culturally-themed container kitchen for community programs",
    features: [
      "Traditional Cultural Artwork & Branding",
      "Full Kitchen Setup — Burners, Sinks, Counters",
      "Fire Safety System with Alarm",
      "Ceiling Fan & Ventilation Windows",
      "Security Grills on Windows",
      "Insulated Roof for Heat Protection",
      "Lockable Entry with Secure Access",
      "Designed for PM POSHAN / ICDS Programs"
    ],
    specs: [
      { label: "Container Size", value: "20ft Standard" },
      { label: "Interior", value: "SS Countertops, Food-Grade Surfaces" },
      { label: "Safety", value: "Fire Alarm, Extinguisher Mount" },
      { label: "Ventilation", value: "Ceiling Fan + Window Grills" },
      { label: "Exterior", value: "Cultural Art + Powder-Coated Steel" }
    ],
    certifications: ["FSSAI Ready", "PM POSHAN Compatible", "Fire Safety Compliant"],
    images: [
      "/images/products/portable_community_kitchen/1.jpeg",
      "/images/products/portable_community_kitchen/2.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Community",
    relatedProductSlugs: ["container-kitchen", "container-food-stall"]
  },
  {
    id: "p-26",
    slug: "containerized-bio-gas-plant",
    name: "Containerized Bio-Gas Plant",
    category: "Renewable Energy",
    description: "The Containerized Bio-Gas Plant provides a decentralized, plug-and-play solution for organic waste management and renewable energy generation. Built within standard shipping containers, it converts food and agricultural waste into clean biogas and nutrient-rich liquid fertilizer. It features automated feeding, gas scrubbing, and smart monitoring for efficient, odor-free operation.",
    shortDescription: "Plug-and-play modular biogas plant in a shipping container",
    features: [
      "Modular Containerized Design",
      "Automated Feeding & Mixing System",
      "Integrated Biogas Scrubber & Storage",
      "Smart Monitoring & Control Panel",
      "High-Yield Methane Production",
      "Odor-Free & Weatherproof Operation",
      "Produces Nutrient-Rich Liquid Fertilizer"
    ],
    specs: [
      { label: "Container Size", value: "20ft / 40ft Options" },
      { label: "Waste Capacity", value: "500 Kg to 5 Tonnes/Day" },
      { label: "Gas Output", value: "High-Calorific Biogas" },
      { label: "Byproduct", value: "Liquid Organic Fertilizer" },
      { label: "Automation", value: "PLC Based Control System" }
    ],
    certifications: ["MNRE Compliant", "Eco-Friendly"],
    images: [
      "/images/products/containerized-bio-gas-plant/1.jpeg",
      "/images/products/containerized-bio-gas-plant/2.jpeg",
      "/images/products/containerized-bio-gas-plant/3.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Renewable Energy",
    relatedProductSlugs: ["organic-waste-composter"]
  },
  {
    id: "p-27",
    slug: "sanitary-pad-vending-machine",
    name: "Sanitary Napkin Vending Machine",
    category: "Public Health",
    description: "The iRA Synergy Sanitary Napkin Vending Machine provides 24/7, hygienic, safe, and affordable access to sanitary napkins in schools, colleges, offices, public restrooms, and hospitals. Featuring a robust powder-coated mild steel body, coin or smart card operation, wall-mounted space-saving design, and very low power consumption, it encourages dignity, confidence, and menstrual hygiene among girls and women.",
    shortDescription: "Coin-operated, wall-mounted automatic sanitary napkin dispenser for public hygiene",
    features: [
      "Coin Operated Mechanism for Easy Use",
      "Hygienic & Safe Dispensing and Storage",
      "Easy Refill System with Simple Latch Open",
      "Low Power Consumption & Energy Efficient",
      "Wall Mounted, Space-Saving Compact Design",
      "Provides Immediate Access during Emergencies",
      "Promotes Menstrual Hygiene and Dignity",
      "Reduces Absenteeism in Schools and Workplaces",
    ],
    specs: [
      { label: "Dimensions (HxWxD)", value: "450 x 550 x 150 mm" },
      { label: "Weight", value: "12-15 kg (Approx)" },
      { label: "Material", value: "Mild Steel Body (Powder Coated)" },
      { label: "Power Supply", value: "12V DC Adapter / 220V AC Compatible" },
      { label: "Capacity", value: "50 Napkins" },
      { label: "Mounting", value: "Wall Mounted" },
      { label: "Variants Available", value: "Elegant Flow (Blue), Nature Care (Green), Women Care (Pink)" },
    ],
    certifications: ["Swachh Bharat Approved", "Make in India", "ISO 9001:2015"],
    images: [
      "/images/products/sanitary-pad-vending-machine/1.jpeg",
      "/images/products/sanitary-pad-vending-machine/2.jpeg",
      "/images/products/sanitary-pad-vending-machine/3.jpeg",
      "/images/products/sanitary-pad-vending-machine/4.jpeg",
      "/images/products/sanitary-pad-vending-machine/5.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Women Empowerment",
    relatedProductSlugs: []
  },
  {
    id: "p-28",
    slug: "plastic-baling-machine",
    name: "Hydraulic Plastic Baling Machine",
    category: "Waste Management",
    description: "The Hydraulic Plastic Baling Machine is an industrial hydraulic press designed to compress plastic waste, cardboard, and paper into dense, manageable bales. It significantly reduces waste volume, lowering transportation and storage costs. Featuring a heavy-duty hydraulic cylinder, safety lock mechanisms, and a robust steel frame, it's essential for recycling centers and large facilities.",
    shortDescription: "Hydraulic press for compressing plastic and cardboard waste into dense bales",
    features: [
      "Heavy-Duty Hydraulic Compression",
      "High Volume Reduction Ratio",
      "Safe & Easy Operation with Instructions",
      "Robust Steel Construction",
      "Lockable Compression Door",
      "Ideal for Plastic, Paper, and Cardboard"
    ],
    specs: [
      { label: "Compression Force", value: "10 to 50 Tons" },
      { label: "Bale Weight", value: "50 Kg to 200 Kg" },
      { label: "Power Pack", value: "Separate Hydraulic Power Unit" },
      { label: "Operation", value: "Semi-Automatic / Manual" }
    ],
    certifications: ["Industrial Grade", "CE Standard"],
    images: [
      "/images/products/plastic-baling-machine/1.jpeg",
      "/images/products/plastic-baling-machine/2.jpeg",
      "/images/products/plastic-baling-machine/3.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Industrial Grade",
    relatedProductSlugs: ["plastic-grinder-machine", "plastic-shredder-machine"]
  },
  {
    id: "p-29",
    slug: "plastic-shredder-machine",
    name: "Municipal Solid Waste Shredder Machine",
    category: "Waste Management",
    description: "Our Municipal Solid Waste Shredder Machine efficiently tears down bulky plastic waste into smaller pieces, preparing it for recycling or further processing. Equipped with high-torque twin shafts and hardened steel blades, it easily handles tough plastics, pipes, drums, and packaging materials. Engineered for low noise and high throughput, it is a powerhouse for modern recycling facilities.",
    shortDescription: "High-torque twin-shaft shredder for bulky plastic waste",
    features: [
      "High-Torque Twin Shaft Design",
      "Hardened Steel Shredding Blades",
      "Heavy-Duty Geared Motor",
      "Hopper for Easy Feeding",
      "Low Noise & Vibration",
      "High Throughput Capacity"
    ],
    specs: [
      { label: "Type", value: "Twin Shaft Shredder" },
      { label: "Blade Material", value: "Alloy Steel (Hardened)" },
      { label: "Motor Power", value: "5 HP to 50 HP Options" },
      { label: "Capacity", value: "100 Kg to 1000 Kg/Hr" }
    ],
    certifications: ["Industrial Grade"],
    images: [
      "/images/products/plastic-shredder-machine/1.jpeg",
      "/images/products/plastic-shredder-machine/2.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "High Torque",
    relatedProductSlugs: ["plastic-baling-machine", "plastic-grinder-machine"]
  },
  {
    id: "p-30",
    slug: "smoke-control-unit",
    name: "Smoke Control & Wet Scrubber Unit",
    category: "Waste Management",
    description: "The Smoke Control & Wet Scrubber Unit is an essential emission control system designed to treat exhaust gases from incinerators and industrial processes. By passing smoke through a water spray chamber, it effectively removes particulate matter and neutralizes harmful gases before they are released into the atmosphere, ensuring compliance with strict environmental regulations.",
    shortDescription: "Industrial wet scrubber for emission control and air purification",
    features: [
      "High-Efficiency Wet Scrubbing Technology",
      "Removes Particulate Matter & Toxic Gases",
      "Stainless Steel / Anti-Corrosive Interior",
      "Water Recirculation Pump System",
      "Ensures CPCB Emission Compliance",
      "Easy Maintenance & Sludge Removal"
    ],
    specs: [
      { label: "Type", value: "Wet Scrubber System" },
      { label: "Application", value: "Incinerator Exhaust Treatment" },
      { label: "Material", value: "SS 304 / Mild Steel with Epoxy Coating" },
      { label: "Pump", value: "High-Pressure Spray Pump" }
    ],
    certifications: ["CPCB Compliant", "Pollution Control Standard"],
    images: [
      "/images/products/smoke-control-unit/1.jpeg",
      "/images/products/smoke-control-unit/2.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Eco-Friendly",
    relatedProductSlugs: ["solid-waste-incinerator", "bio-medical-waste-incinerator"]
  },
  {
    id: "p-31",
    slug: "pet-bottle-crusher",
    name: "PET Bottle Crusher",
    category: "Waste Management",
    description: "The PET Bottle Crusher is a compact, high-speed machine designed specifically for volume reduction of plastic bottles. It quickly shreds PET bottles into flakes, facilitating efficient transport and recycling. Ideal for public spaces, events, recycling centers, and commercial facilities aiming to manage plastic bottle waste effectively.",
    shortDescription: "High-speed crusher for reducing PET bottle volume",
    features: [
      "High-Speed Rotary Blades",
      "Compact & Space-Saving Design",
      "Safety Feed Hopper",
      "Easy Access for Cleaning",
      "Produces Uniform PET Flakes",
      "Low Power Consumption"
    ],
    specs: [
      { label: "Application", value: "PET Bottles & Small Plastics" },
      { label: "Motor Power", value: "2 HP to 10 HP Options" },
      { label: "Blade Type", value: "Rotary & Stationary Knives" },
      { label: "Capacity", value: "50 Kg to 300 Kg/Hr" }
    ],
    certifications: [],
    images: [
      "/images/products/pet-bottle-crusher/1.jpeg",
      "/images/products/pet-bottle-crusher/2.jpeg",
      "/images/products/pet-bottle-crusher/3.jpeg",
      "/images/products/pet-bottle-crusher/4.jpeg",
      "/images/products/pet-bottle-crusher/5.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Recycling",
    relatedProductSlugs: ["plastic-grinder-machine"]
  },
  {
    id: "p-32",
    slug: "smart-vend-cloth-bag-vending-machine",
    name: "Smart Cloth Bag Vending Machine",
    category: "Smart City",
    description: "The Smart Vend Cloth Bag Vending Machine is a smart, automatic public utility kiosk designed to dispense reusable, eco-friendly cloth and jute bags. Featuring a touch-screen user interface, IoT connectivity for real-time stock monitoring, and multiple payment options (coins, notes, or digital UPI), it provides a convenient alternative to single-use plastics in retail markets, malls, schools, and transit hubs.",
    shortDescription: "IoT-enabled automatic cloth bag vending machine with touch-screen and UPI payment options",
    features: [
      "Automatic Reusable Cloth / Jute Bag Dispensation",
      "Multiple Payment Support: Coins, notes, and digital UPI payments",
      "Touch-Screen User Interface & digital LCD display counter",
      "IoT Enabled for real-time inventory monitoring and reporting",
      "Secure Multi-point Locking System for cash and inventory protection",
      "Durable & Weather-Resistant powder-coated mild steel enclosure",
      "Custom Branding Options with eco-friendly 'Say No to Plastic' graphics",
      "Compact floor-standing design suitable for indoor & outdoor use",
    ],
    specs: [
      { label: "Model", value: "WT-CBVM-01 / Smart Vend" },
      { label: "Storage Capacity", value: "100 - 150 Bags" },
      { label: "Payment Options", value: "Coins, Notes, and Digital (UPI)" },
      { label: "Dimensions (LxWxH)", value: "600 x 400 x 1200 mm" },
      { label: "Weight", value: "45 - 50 kg (Approx.)" },
      { label: "Body Material", value: "Mild Steel (Power Coated)" },
      { label: "Power Supply", value: "220V - 230V AC / 50Hz" },
      { label: "Connectivity", value: "IoT Enabled for Real-time Monitoring" },
      { label: "Display", value: "Touch Screen Interface / LCD Digital Display" },
      { label: "Color Options", value: "Green, Yellow, Blue, White, Earth Beige" },
    ],
    certifications: ["Eco-Friendly Certified", "Make in India", "CE Standard"],
    images: [
      "/images/products/smart-vend-cloth-bag-vending-machine/1.jpeg",
      "/images/products/smart-vend-cloth-bag-vending-machine/2.jpeg",
      "/images/products/smart-vend-cloth-bag-vending-machine/3.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Eco-Friendly",
    relatedProductSlugs: ["sanitary-pad-vending-machine"]
  },
  {
    id: "p-33",
    slug: "smart-city-bus-shelter",
    name: "Smart Solar Bus Stop",
    category: "Smart City",
    description: "Our Smart Solar Bus Stop redefines urban commuting with modern amenities and sustainable infrastructure. It features a solar-powered smart pole, integrated CCTV for safety, environmental sensors, and digital advertisement displays. Built with weather-resistant materials and offering comfortable seating, it serves as a smart hub for public transportation.",
    shortDescription: "Modern transit shelter with solar power, CCTV, and digital displays",
    features: [
      "Solar-Powered Smart Pole Integration",
      "Integrated CCTV & Security Sensors",
      "Digital Advertising Panel",
      "Comfortable Seating with Weather Protection",
      "Modern Aesthetics & Corporate Branding",
      "Built-in Smart Waste Bins"
    ],
    specs: [
      { label: "Power Source", value: "Grid + Solar Backup Options" },
      { label: "Structure", value: "Galvanized Steel & Toughened Glass" },
      { label: "Displays", value: "Outdoor LED/LCD Screens" },
      { label: "Lighting", value: "Automated LED Illumination" }
    ],
    certifications: ["Smart City Standard", "ISO Certified"],
    images: [
      "/images/products/smart-city-bus-shelter/1.jpeg",
      "/images/products/smart-city-bus-shelter/2.jpeg",
      "/images/products/smart-city-bus-shelter/3.jpeg",
      "/images/products/smart-city-bus-shelter/4.jpeg",
      "/images/products/smart-city-bus-shelter/5.jpeg",
      "/images/products/smart-city-bus-shelter/6.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Smart Infrastructure",
    relatedProductSlugs: ["solar-smart-bench"]
  },
  {
    id: "p-34",
    slug: "dead-animal-solid-waste-incinerator",
    name: "Dual-Purpose (2-in-1) Dead Animal & Solid Waste Incinerator",
    category: "Waste Management",
    description: "The Dual-Purpose (2-in-1) Dead Animal & Solid Waste Incinerator is a high-efficiency incinerator designed for the safe disposal of both dead animals and solid municipal waste. It utilizes a 5-chamber design including primary and secondary combustion, heat exchange, scrubber, and an ID fan stack. Operating at extremely high temperatures, it ensures complete combustion with minimal emissions, making it ideal for municipalities, veterinary facilities, and large farms.",
    shortDescription: "High-efficiency 5-chamber incinerator for safe disposal of dead animals and solid waste",
    features: [
      "Dual Purpose: Dead Animal & Solid Waste",
      "5-Chamber Design for Complete Combustion",
      "High Temperature (800°C - 1100°C)",
      "Advanced Emission & Smoke Control (Scrubber)",
      "Diesel or Gas Burner Options",
      "PLC Based Automatic Operation",
      "Heavy-Duty Steel Construction"
    ],
    specs: [
      { label: "Capacity", value: "Up to 500 kg/batch" },
      { label: "Temperature", value: "800°C - 1100°C" },
      { label: "Fuel Type", value: "Diesel / Gas" },
      { label: "Control System", value: "PLC Automatic" },
      { label: "Emission Standard", value: "As per CPCB Norms" }
    ],
    certifications: ["CPCB Compliant", "Environmentally Responsible"],
    images: [
      "/images/products/dead-animal-solid-waste-incinerator/1.jpeg",
      "/images/products/dead-animal-solid-waste-incinerator/2.jpeg",
      "/images/products/dead-animal-solid-waste-incinerator/3.jpeg",
      "/images/products/dead-animal-solid-waste-incinerator/4.jpeg",
      "/images/products/dead-animal-solid-waste-incinerator/5.jpeg",
      "/images/products/dead-animal-solid-waste-incinerator/6.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Dual-Purpose",
    relatedProductSlugs: ["solid-waste-incinerator", "vertical-industrial-incinerator"]
  },
  {
    id: "p-35",
    slug: "solar-smart-air-purifier-outdoor-unit",
    name: "Solar Air Purifier",
    category: "Public Health",
    description: "The iRA Synergy Solar Air Purifier is an advanced, eco-friendly outdoor air filtration system designed for schools, public parks, bus stations, gardens, and municipal spaces. Fully powered by integrated solar panels, it operates continuously and silently to combat urban air pollution. Its high-efficiency two-stage purification system (HEPA and Activated Carbon) removes fine particulate matter, dust, smoke, and odors, protecting public health and improving children's well-being.",
    shortDescription: "100% solar-powered outdoor air purifier with HEPA & active carbon filtration",
    features: [
      "100% Solar-Powered Green Operation with Zero Running Cost",
      "Two-Stage Purification with HEPA & Activated Carbon Filters",
      "High-Efficiency PM2.5 & PM10 Particulate Matter Removal",
      "Activated Carbon Filter for Gas, Odor, and VOC Absorption",
      "Sophisticated Airflow Design with Curved Vents for High Suction",
      "Ultra-Silent Operation Ideal for Classrooms & Learning Environments",
      "Low Maintenance & Long Operating Life",
      "Vandal-Resistant, Weatherproof Design with Multiple Color Options",
    ],
    specs: [
      { label: "Power Source", value: "100% Integrated Solar Panel" },
      { label: "Purification Tech", value: "HEPA Filter + Activated Carbon (Two-Stage)" },
      { label: "Filtration Efficiency", value: "Removes PM2.5, PM10, Dust, Pollen, Bacteria & Viruses" },
      { label: "Airflow Design", value: "Curved Vents with High Suction System" },
      { label: "Installation", value: "Freestanding Outdoor / Classroom Mobile" },
      { label: "Color Options", value: "Forest Green, Sky Blue, Slate Grey, Earth Brown, Pearl White" },
    ],
    certifications: ["Eco-Friendly Certified", "Smart City Standard", "ISO Certified"],
    images: [
      "/images/products/solar-smart-air-purifier-outdoor-unit/1.jpeg",
      "/images/products/solar-smart-air-purifier-outdoor-unit/2.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Eco-Friendly",
    relatedProductSlugs: ["fresh-air-purifier-indoor-unit"]
  },
  {
    id: "p-36",
    slug: "fresh-air-purifier-indoor-unit",
    name: "Fresh Air Purifier Indoor Unit",
    category: "Public Health",
    description: "Designed for classrooms, offices, and indoor public spaces, the Fresh Air Purifier efficiently removes PM2.5, allergens, and airborne pathogens. With a sleek design and quiet operation, it ensures a healthier indoor environment for 'Healthy Minds, Brighter Futures'. It includes a digital display for real-time air quality tracking.",
    shortDescription: "High-efficiency indoor air purifier for classrooms and offices",
    features: [
      "Advanced HEPA & Activated Carbon Filtration",
      "Real-Time PM2.5 Digital Display",
      "Quiet Operation for Learning Environments",
      "Multiple Speed & Timer Settings",
      "Sleek & Compact Design",
      "Improves Focus & Well-being"
    ],
    specs: [
      { label: "Filtration", value: "HEPA + Active Carbon" },
      { label: "Coverage Area", value: "Suitable for Classrooms/Halls" },
      { label: "Noise Level", value: "Ultra-Quiet (<40 dB on low)" },
      { label: "Controls", value: "Touch Panel + Remote" }
    ],
    certifications: ["CE Certified", "Safe for Schools"],
    images: [
      "/images/products/fresh-air-purifier-indoor-unit/1.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Public Health",
    relatedProductSlugs: ["solar-smart-air-purifier-outdoor-unit"]
  },
  {
    id: "p-37",
    slug: "smart-waste-bin",
    name: "Smart Waste Bin",
    category: "Smart City",
    description: "The Smart Waste Bin brings IoT technology to urban waste management. Featuring segregated compartments for general and recyclable waste, it includes built-in sensors to monitor fill levels in real-time, optimizing collection routes. It is solar-powered and boasts a durable, aesthetically pleasing design suitable for modern cityscapes.",
    shortDescription: "IoT-enabled segregated waste bin with real-time fill level monitoring",
    features: [
      "Segregated Compartments (General / Recycle)",
      "IoT Sensors for Fill-Level Monitoring",
      "Solar-Powered Sensor Operation",
      "Durable Weather-Resistant Construction",
      "Optimizes Waste Collection Logistics",
      "Clear Visual Iconography for Public Use"
    ],
    specs: [
      { label: "Compartments", value: "Dual / Triple Segregation" },
      { label: "Technology", value: "Ultrasonic Fill Sensors" },
      { label: "Power", value: "Solar Panel for IoT Module" },
      { label: "Material", value: "Powder-Coated Steel / Composite" }
    ],
    certifications: ["Smart City Standard"],
    images: [
      "/images/products/smart-waste-bin/1.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Smart City",
    relatedProductSlugs: ["smart-city-bus-shelter"]
  },
  {
    id: "p-38",
    slug: "biomass-gasifier-plant",
    name: "Gasifier (Waste to Energy Generation Plant)",
    category: "Renewable Energy",
    description: "The Gasifier (Waste to Energy Generation Plant) by WASTEMENT converts agricultural residue, wood chips, and other biomass into clean producer gas (syngas). This advanced renewable energy system features a fuel storage and drying unit, a high-efficiency gasifier reactor, a producer gas cooler, and an automated control panel. It provides a sustainable alternative to fossil fuels for thermal applications or power generation.",
    shortDescription: "Advanced plant converting biomass into clean energy",
    features: [
      "Converts Biomass to Clean Producer Gas",
      "Integrated Fuel Storage & Dryer Unit",
      "Advanced Gas Cooling & Scrubbing",
      "Automated PLC Control Panel",
      "Low Emission Renewable Energy",
      "Reduces Fossil Fuel Dependency"
    ],
    specs: [
      { label: "Fuel Type", value: "Wood Chips, Agri-Residue, Biomass" },
      { label: "Output", value: "Producer Gas (Syngas)" },
      { label: "Application", value: "Thermal Heating / Power Generation" },
      { label: "Control", value: "Automated Control Panel" }
    ],
    certifications: ["Renewable Energy Standard", "Eco-Friendly"],
    images: [
      "/images/products/biomass-gasifier-plant/1.jpeg",
      "/images/products/biomass-gasifier-plant/2.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Renewable Energy",
    relatedProductSlugs: ["containerized-bio-gas-plant"]
  },
  {
    id: "p-39",
    slug: "cyclone-safe-zone-shelter",
    name: "Cyclone Safe Zone ZP School Shelter",
    category: "Smart City",
    description: "The iRA Synergy Cyclone Safe Zone is a specially designed multi-purpose school shelter built to provide robust protection for students, teachers, and staff during cyclones, heavy rains, floods, and extreme weather. Featuring high wind resistance up to 250 kmph, waterproof and leak-proof design, and rapid 2-5 day installation, it serves as a resilient classroom, sleeping shelter, or community relief hub in disaster-prone regions.",
    shortDescription: "Multi-purpose, high-wind-resistant school shelter for disaster protection and classrooms",
    features: [
      "Protects Lives: Secure shelter for students, teachers, and staff during cyclones",
      "High Wind Resistance: Built to withstand wind speeds up to 250 kmph",
      "Waterproof & Leak-Proof: Special roof and wall design prevents water leakage",
      "Multi-Purpose Use: Can be used as a classroom, emergency shelter, store room, or emergency hall",
      "Rapid Installation: Ready to use in just 2-5 days with minimal civil work",
      "Long Lasting: High-grade materials ensure durability for 20+ years",
      "Eco-Friendly: Sustainable, reusable, and environmentally friendly structure",
    ],
    specs: [
      { label: "Structure", value: "High-grade Steel (GI/MS)" },
      { label: "Wall Panel", value: "Insulated PU Panels" },
      { label: "Roof", value: "Curved / Flat - Weatherproof" },
      { label: "Flooring", value: "Anti-skid Marine Board" },
      { label: "Windows", value: "Aluminium Sliding Windows" },
      { label: "Door", value: "Steel Security Door" },
      { label: "Wind Resistance", value: "Up to 250 kmph" },
      { label: "Lifespan", value: "20+ Years" },
      { label: "Installation", value: "Ready to Use in 2-5 Days" },
      { label: "Customization", value: "As per School Requirement" },
    ],
    certifications: ["Government Approved Design", "Make in India", "ISO 9001:2015"],
    images: [
      "/images/products/cyclone-safe-zone-shelter/1.jpeg",
      "/images/products/cyclone-safe-zone-shelter/2.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Disaster Ready",
    relatedProductSlugs: ["portable-kitchen-cabinet"]
  },
  {
    id: "p-40",
    slug: "smart-pole",
    name: "Smart Pole",
    category: "Smart City",
    description: "iRA Synergy's solar-powered Smart Poles integrate advanced green energy technology with AI surveillance, environmental monitoring, high-speed connectivity, and EV charging options. Designed as an intelligent, modular public utility system, it enhances public safety and connectivity across smart cities, highways, parks, and rural areas while supporting a sustainable future.",
    shortDescription: "Solar-powered smart pole with AI surveillance, public Wi-Fi, AQI sensors, and EV charging",
    features: [
      "100% Solar Powered Clean & Green Energy",
      "AI Surveillance with High-Resolution PTZ Camera & Night Vision",
      "4G LTE & Wi-Fi Hotspot for Seamless Connectivity",
      "Environmental Sensors for Real-time AQI, Temp, Humidity & Noise",
      "Full HD LED Display for Public Information & Advertisement",
      "One-Touch Panic Button & Two-way Public Address System",
      "Integrated EV Charging Unit (AC Charger Support)",
      "GI Steel Corrosion-Resistant & IP66 Protected Structure",
    ],
    specs: [
      { label: "Height", value: "6m / 8m / 10m (Customizable)" },
      { label: "Material", value: "GI Steel (Corrosion Resistant) / Powder Coated" },
      { label: "Solar Panel", value: "200W - 540W High Efficiency" },
      { label: "Battery", value: "LiFePO4 48V / 100Ah+" },
      { label: "LED Light", value: "30W - 80W (Smart Dimming)" },
      { label: "AI Camera", value: "2MP / 4MP / PTZ Camera" },
      { label: "EV Charger", value: "7.2kW / 22kW AC (Optional)" },
      { label: "Operating Temp.", value: "-10°C to 50°C" },
      { label: "Protection", value: "IP66, Surge & Lightning Protection" },
      { label: "Warranty", value: "2 Years" },
    ],
    certifications: ["CE Certified", "RoHS Compliant", "ISO Certified", "Make in India"],
    images: [
      "/images/products/smart-pole/1.jpeg",
      "/images/products/smart-pole/2.jpeg",
      "/images/products/smart-pole/3.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Smart City",
    relatedProductSlugs: ["solar-smart-bench"]
  },
  {
    id: "p-41",
    slug: "electric-mobile-market-van",
    name: "Electric Mobile Market Van",
    category: "Smart City",
    description: "The iRA Synergy Electric Mobile Market Van is an eco-friendly, zero-emission mobile business solution designed to support entrepreneurs, particularly women, and promote green commerce. Built with a robust chassis, spacious display shelves, a weather-protected canopy, and high-efficiency lithium-ion batteries, it offers a reliable, low-maintenance, and highly maneuverable solution for urban and rural retail markets.",
    shortDescription: "Zero-emission electric vehicle with spacious display shelves for mobile retail and market businesses",
    features: [
      "100% Electric & Zero Emissions",
      "Spacious Display Area with Well-Designed Shelves",
      "Strong Canopy & Weather Protection for All-Season Use",
      "High-Efficiency Lithium-ion Battery with Long Lifespan",
      "Compact Design for Easy Maneuverability in Busy Streets",
      "Low Operating Cost & Low Maintenance for High Savings",
      "Custom Branding Options for Better Business Visibility",
      "Empowers Women Entrepreneurs & Enhances Local Economy",
    ],
    specs: [
      { label: "Vehicle Type", value: "Electric Mobile Market Van" },
      { label: "Seating Capacity", value: "Driver + 1 Assistant" },
      { label: "Payload Capacity", value: "Up to 500 kg" },
      { label: "Battery Type", value: "Lithium-ion" },
      { label: "Battery Capacity", value: "48V / 100Ah" },
      { label: "Range per Charge", value: "100 - 120 km" },
      { label: "Charging Time", value: "4 - 5 Hours" },
      { label: "Top Speed", value: "45 km/h" },
      { label: "Drive Type", value: "Rear Wheel Drive" },
      { label: "Dimensions (LxWxH)", value: "3500mm x 1500mm x 2000mm" },
    ],
    certifications: ["Make in India", "Eco-Friendly & Zero Emission"],
    images: [
      "/images/products/electric-mobile-market-van/1.jpeg",
      "/images/products/electric-mobile-market-van/2.jpeg",
      "/images/products/electric-mobile-market-van/3.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Empowering Women",
    relatedProductSlugs: ["ev-rickshaw"]
  },
  {
    id: "p-42",
    slug: "animal-waste-incinerator",
    name: "Animal Waste Incinerator",
    category: "Waste Management",
    description: "The iRA Synergy Animal Waste Incinerator is a highly efficient, high-temperature waste disposal solution designed for the safe, hygienic, and eco-friendly destruction of animal carcasses and organic waste. Equipped with an advanced emission and smoke control system (cyclone separator, scrubber, and filter), this CPCB-compliant system ensures complete destruction with minimal emission, making it ideal for municipalities, veterinary clinics, poultry farms, research labs, and zoos.",
    shortDescription: "High-temperature CPCB-compliant incinerator with advanced emission and smoke control for safe animal waste disposal",
    features: [
      "High-Temperature Combustion: 850°C - 1200°C for complete destruction",
      "Advanced Emission Control: Scrubber & filter system ensures smokeless operation",
      "High Efficiency: >99% destruction efficiency of animal waste",
      "Sterile Ash Residue: Less than 5% sterile, odorless ash residue",
      "Robust Construction: Heavy-duty MS/SS body with high-grade refractory lining",
      "Intelligent Controls: PLC-based automatic/semiautomatic control panel with safety interlocks",
      "Multiple Fuel Options: Diesel or LPG gas burner based system",
      "Versatile Configurations: Standard, front-loading, top-loading, or mobile trailer models",
    ],
    specs: [
      { label: "Capacity", value: "50 - 500 kg per batch (Customizable)" },
      { label: "Primary Chamber Temp.", value: "850°C - 950°C" },
      { label: "Secondary Chamber Temp.", value: "1000°C - 1200°C" },
      { label: "Fuel Type", value: "LPG / Diesel" },
      { label: "Burning Efficiency", value: ">99%" },
      { label: "Power Requirement", value: "3 - 5 kW (Excluding Fuel)" },
      { label: "Emission Control", value: "Cyclone Separator, Wet Scrubber & Filters" },
      { label: "Compliance", value: "CPCB & MoEF Norms" },
    ],
    certifications: ["CPCB Compliant", "ISO 14001:2015", "Make in India"],
    images: [
      "/images/products/animal-waste-incinerator/1.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "CPCB Compliant",
    relatedProductSlugs: ["smoke-control-unit", "solid-waste-incinerator"]
  },
  {
    id: "p-43",
    slug: "portable-kitchen-cabinet",
    name: "Portable Kitchen Cabinet",
    category: "Smart City",
    description: "The Udaan Bhaarat Portable Kitchen Cabinet is a fully integrated, prefabricated container-based cooking and meal service solution designed to support mid-day meal programs, tribal schools, community kitchens, and disaster relief. Built with ISO-certified steel containers, food-grade SS 304 cooking platforms, and integrated safety systems, it offers a secure, durable, and highly mobile kitchen ready for rapid deployment in remote and disaster-prone areas.",
    shortDescription: "ISO container-based mobile commercial kitchen cabinet for community feeding and school mid-day meals",
    features: [
      "ISO Certified Steel Container Structure for high durability",
      "SS 304 Food-Grade Kitchen Platforms & Work Surfaces",
      "Flexible Cooking Range (LPG, Electric, or Induction options)",
      "Integrated 1000 Liter Food-Grade Water Tank",
      "Safe LPG Gas Connection with Advanced Safety System",
      "Ample Dry & Cold Storage Space for ingredients",
      "Disaster Management Ready: Earthquake-proof, elevated base, waterproof & rust-resistant",
      "Cultural Tribal Theme Design options (Vanrai Green, Wagh Red, Sahyadri Blue)",
    ],
    specs: [
      { label: "Dimensions (LxWxH)", value: "20ft / 13ft / 10ft Options (Customizable)" },
      { label: "Structure", value: "ISO-Certified Steel Container / GI Sheet" },
      { label: "Kitchen Platform", value: "Stainless Steel (SS 304) Food Grade" },
      { label: "Cooking Range", value: "LPG / Electric / Induction" },
      { label: "Water Tank", value: "1000 Ltr. Inbuilt (Food Grade)" },
      { label: "Gas Connection", value: "Piped LPG with Safety System" },
      { label: "Weight", value: "1500 - 2500 kg (Model Dependent)" },
      { label: "Serving Capacity", value: "40 - 60 Students per shift" },
      { label: "Lifespan", value: "10+ Years" },
      { label: "Installation Time", value: "4 - 6 Hours (Ready to Use)" },
    ],
    certifications: ["FSSAI Ready", "PM POSHAN Compliant", "Zilla Parishad Palghar Approved", "Government of Maharashtra School Education Department Approved"],
    images: [
      "/images/products/portable-kitchen-cabinet/1.jpeg",
      "/images/products/portable-kitchen-cabinet/2.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Tribal Welfare",
    relatedProductSlugs: ["container-kitchen", "portable-community-kitchen"]
  },
  {
    id: "p-44",
    slug: "msrtc-smart-bottle-crusher",
    name: "MSRTC Smart Bottle Crusher with In-Built Weight Machine",
    category: "Waste Management",
    description: "The MSRTC Smart Bottle Crusher with In-Built Weight Machine is a state-of-the-art public utility recycling kiosk designed for bus depots, transit stations, schools, and shopping malls. It allows citizens to dispose of plastic bottles automatically while instantly displaying the recycled weight and printing a contribution slip. Additionally, it features an integrated body weight measurement platform to promote healthy living, encouraging public participation in waste management.",
    shortDescription: "Automatic plastic bottle crusher with built-in digital weight machine and weight slip printer",
    features: [
      "Crushes Plastic Bottles Automatically for instant volume reduction",
      "In-Built Digital Weight Machine with instant display for public use",
      "Self-Weight Display Platform for body weight tracking",
      "Encourages Recycling and supports Swachh Bharat & MSRTC Clean Green mission",
      "Prints Contribution Slip showing recycled weight and thank-you message",
      "User-friendly and safe operation with simple instructions",
      "Heavy-duty powder-coated steel construction for public durability",
      "Compact, modern, and stylish design with corporate branding options",
    ],
    specs: [
      { label: "Crushing Capacity", value: "Up to 100 Bottles / Min" },
      { label: "Bottle Size Support", value: "Up to 2 Liters" },
      { label: "Power Supply", value: "220V AC, 50Hz" },
      { label: "Power Consumption", value: "1.5 HP" },
      { label: "Weight Capacity (Scale)", value: "Up to 200 kg (Person)" },
      { label: "Machine Weight", value: "Approx. 90 kg" },
      { label: "Material", value: "Powder Coated Mild Steel" },
      { label: "Dimensions (HxWxD)", value: "1290 x 600 x 550 mm" },
    ],
    certifications: ["MSRTC Approved", "Swachh Bharat Compliant", "ISO Certified"],
    images: [
      "/images/products/msrtc-smart-bottle-crusher/1.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Smart Recycling",
    relatedProductSlugs: ["pet-bottle-crusher", "smart-waste-bin"]
  },
  {
    id: "p-45",
    slug: "sanitary-pad-incinerator",
    name: "Sanitary Pad Incinerator",
    category: "Public Health",
    description: "The iRA Synergy Sanitary Pad Incinerator provides a safe, hygienic, and eco-friendly way to dispose of used sanitary napkins. Engineered for schools, colleges, women's hostels, and public restrooms, it ensures complete combustion of waste into sterile ash with minimal smoke or odor, maintaining dignity and cleanliness.",
    shortDescription: "Safe, hygienic, and eco-friendly sanitary napkin disposal incinerator for institutions",
    features: [
      "Smokeless and Odorless combustion technology",
      "Auto Power Off functionality for energy saving",
      "High-density ceramic insulation for exterior safety",
      "Compact wall-mounted design",
      "Ash collection tray for easy cleaning",
      "Durable powder-coated mild steel body",
    ],
    specs: [
      { label: "Burning Capacity", value: "Up to 50-100 Pads / Day" },
      { label: "Operation", value: "Automatic / Manual" },
      { label: "Power Supply", value: "220V AC, 50Hz" },
      { label: "Material", value: "Mild Steel Powder Coated" },
      { label: "Emission", value: "Low Smoke / Smokeless" },
    ],
    certifications: ["ISO Certified", "CE Certified"],
    images: [
      "/images/products/sanitary-pad-vending-machine/1.jpeg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Hygiene Standard",
    relatedProductSlugs: ["sanitary-pad-vending-machine"]
  },
  {
    id: "p-46",
    slug: "fatka-machine",
    name: "Fatka Machine (Dust & Waste Separator)",
    category: "Waste Management",
    description: "The iRA Synergy Fatka Machine is a heavy-duty mechanical separator designed for the efficient segregation of municipal solid waste and dry waste. It uses high-speed rotary agitation to separate dust, soil, and finer particles from plastics, paper, and other recyclable materials. This robust machine significantly improves the efficiency of waste sorting plants and MRF (Material Recovery Facilities).",
    shortDescription: "Heavy-duty mechanical waste separator for dust and fine particle removal in MRF plants",
    features: [
      "High-speed rotary agitation for efficient separation",
      "Removes dust, soil, and fine particles from mixed waste",
      "Heavy-duty robust steel construction for continuous operation",
      "Low maintenance and high durability",
      "Improves sorting efficiency in Material Recovery Facilities",
      "Customizable capacities based on plant requirements",
    ],
    specs: [
      { label: "Capacity", value: "1 to 5 Tons / Hour" },
      { label: "Motor Power", value: "5 HP to 15 HP" },
      { label: "Material", value: "Heavy-Duty Mild Steel" },
      { label: "Application", value: "Municipal Solid Waste (MSW), Dry Waste" },
      { label: "Power Supply", value: "415V, 3-Phase, 50Hz" },
    ],
    certifications: ["ISO Certified", "Make in India"],
    images: [
      "/images/products/fatka-machine/angle-1.jpg",
      "/images/products/fatka-machine/angle-2.jpg",
      "/images/products/fatka-machine/angle-3.jpg",
      "/images/products/fatka-machine/angle-4.jpg",
      "/images/products/fatka-machine/angle-5.jpg"
    ],
    price: "On Request",
    inStock: true,
    badge: "Waste Separation",
    relatedProductSlugs: ["trommel-waste-sorting-plant", "solid-waste-incinerator"]
  }
];

export const productCategories: ProductCategory[] = [
  "Smart City",
  "Renewable Energy",
  "Waste Management",
  "Public Health",
  "Fitness",
  "Education",
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.badge);
}
