import { type Solution } from "@/types";

export const solutions: Solution[] = [
  {
    id: "sol-1",
    slug: "smart-school-infrastructure",
    title: "Smart School Infrastructure",
    shortTitle: "Smart Schools",
    description:
      "End-to-end educational infrastructure solutions including AI labs, science kits, tinkering labs, and portable libraries — empowering the next generation of learners.",
    longDescription:
      "We transform educational institutions with cutting-edge infrastructure that prepares students for the future. From AI Robotics Labs and Atal Tinkering Labs to comprehensive Science Kit Labs and Earthquake Safety Labs, our solutions are designed to meet CBSE and state board requirements while fostering innovation and hands-on learning. Every installation includes teacher training, curriculum alignment, and ongoing maintenance support.",
    icon: "School",
    color: "bg-blue-900",
    features: [
      "Atal Tinkering Lab (ATL) compliant setups",
      "AI & Robotics Lab with curriculum integration",
      "Science Kit Labs for Classes 1-12",
      "Earthquake Safety Lab with simulation",
      "Portable Library with 500+ curated books",
      "Smart classroom integration",
      "Teacher training & certification",
      "Annual maintenance contracts",
    ],
    certifications: ["ISO 9001:2015", "CBSE Lab Standards", "GeM Registered"],
    useCases: [
      "Government schools under Samagra Shiksha Abhiyan",
      "Municipal corporation school upgrades",
      "CSR-funded educational projects",
      "Private school modernization",
    ],
    relatedProductSlugs: [
      "atal-tinkering-labs",
      "science-kit-lab",
      "earthquake-safety-lab",
      "ai-robotics-lab",
      "portable-library",
    ],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800",
    extraImages: [
      "/images/generated/smart_school_lab_1783792273147.png",
      "/images/generated/smart_school_library_1783792283921.png"
    ],
    stats: [
      { label: "Schools Equipped", value: "50+" },
      { label: "Labs Installed", value: "200+" },
      { label: "Students Impacted", value: "25,000+" },
    ],
  },
  {
    id: "sol-2",
    slug: "waste-management-systems",
    title: "Waste Management Systems",
    shortTitle: "Waste Management",
    description:
      "Comprehensive waste processing solutions from collection to disposal — incinerators, composters, crushers, and smart waste bins for municipalities and institutions.",
    longDescription:
      "Our integrated waste management systems address every stage of the waste lifecycle. From smart collection with E-Carts and Smart Dust Bins to processing with fuel-free incinerators, organic composters, and recycling machinery — we help municipalities and institutions achieve zero-waste goals. Our solutions comply with Swachh Bharat Mission standards and are designed for Indian conditions.",
    icon: "Recycle",
    color: "bg-green-700",
    features: [
      "Fuel-free solid waste incinerators",
      "Organic food waste composting machines",
      "Medical & sanitary waste incinerators",
      "PET bottle crushers & recycling lines",
      "Smart dust bins with fill-level sensors",
      "E-Carts for waste collection",
      "Screening & shredding machines",
      "Bio gas plants for energy recovery",
    ],
    certifications: [
      "CPCB Approved",
      "ISO 14001:2015",
      "Swachh Bharat Compliant",
      "GeM Registered",
    ],
    useCases: [
      "Municipal solid waste processing",
      "Hospital biomedical waste disposal",
      "Industrial estate waste management",
      "Smart city waste infrastructure",
    ],
    relatedProductSlugs: [
      "solid-waste-incinerator",
      "organic-waste-composter",
      "bio-medical-waste-incinerator",
      "pet-bottle-crusher",
      "smart-waste-bin",
      "ev-rickshaw",
      "animal-waste-incinerator",
      "msrtc-smart-bottle-crusher",
      "dead-animal-solid-waste-incinerator",
      "fatka-machine",
    ],
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800",
    stats: [
      { label: "Waste Reduction", value: "40%" },
      { label: "Cities Served", value: "12+" },
      { label: "Tons Processed Daily", value: "50+" },
    ],
  },
  {
    id: "sol-3",
    slug: "renewable-energy-solutions",
    title: "Renewable Energy Solutions",
    shortTitle: "Renewable Energy",
    description:
      "Solar-powered infrastructure including solar trees, smart benches, and energy systems — harnessing clean energy for public spaces and institutions.",
    longDescription:
      "We bring renewable energy to public infrastructure through innovative solar-powered solutions. Our Solar Trees provide shade and charging stations while generating clean energy. Solar Smart Benches offer Wi-Fi, USB charging, and ambient lighting in public parks and campuses. Combined with our gasifier and biogas solutions, we help organizations reduce their carbon footprint while creating self-sustaining infrastructure.",
    icon: "Sun",
    color: "bg-amber-600",
    features: [
      "Solar Tree installations (5kW-20kW)",
      "Solar Smart Benches with USB & Wi-Fi",
      "Gasifier systems for waste-to-energy",
      "Bio Gas Plants for organic waste",
      "Smart Pole with solar & sensors",
      "Grid-tied and off-grid solutions",
      "Battery storage systems",
      "25-year panel warranty",
    ],
    certifications: ["MNRE Approved", "BIS Certified", "IEC 61215", "GeM Registered"],
    useCases: [
      "Smart city public spaces",
      "University & college campuses",
      "Government building complexes",
      "Public parks and gardens",
    ],
    relatedProductSlugs: [
      "solar-smart-bench",
      "smart-pole",
      "biomass-gasifier-plant",
      "containerized-bio-gas-plant",
    ],
    image: "/images/hero/solar-panel.jpg",
    stats: [
      { label: "kW Installed", value: "500+" },
      { label: "CO₂ Saved (tons/yr)", value: "200+" },
      { label: "Solar Trees Deployed", value: "30+" },
    ],
  },
  {
    id: "sol-4",
    slug: "public-health-hygiene",
    title: "Public Health & Hygiene Solutions",
    shortTitle: "Public Health",
    description:
      "Self-cleaning toilets, air purifiers, water ATMs, and sanitary product vending — creating healthier public spaces across India.",
    longDescription:
      "Our public health solutions address India's most pressing hygiene challenges. Self-Cleaning Smart Toilets require zero manual cleaning and are ideal for high-traffic public areas. Indoor & Outdoor Air Purifiers combat pollution in schools, hospitals, and public buildings. Water ATMs provide safe drinking water with RO purification at affordable rates. Sanitary napkin vending machines and incinerators promote menstrual hygiene in schools and workplaces.",
    icon: "HeartPulse",
    color: "bg-rose-600",
    features: [
      "Self-cleaning smart toilets (automatic sanitization)",
      "Indoor & outdoor air purifiers (HEPA + UV)",
      "Water ATMs with RO purification",
      "Sanitary napkin vending & incinerators",
      "Touchless hand sanitizer stations",
      "IoT-enabled usage monitoring",
      "Low water consumption technology",
      "Solar-powered variants available",
    ],
    certifications: [
      "ISO 9001:2015",
      "BIS Certified",
      "Swachh Bharat Mission Compliant",
      "GeM Registered",
    ],
    useCases: [
      "Railway stations & bus terminals",
      "Municipal public toilets",
      "School & college campuses",
      "Hospital & healthcare facilities",
    ],
    relatedProductSlugs: [
      "e-toilet",
      "solar-smart-air-purifier-outdoor-unit",
      "fresh-air-purifier-indoor-unit",
      "pure-water-atm",
      "sanitary-pad-vending-machine",
      "sanitary-pad-incinerator",
    ],
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800",
    stats: [
      { label: "Units Deployed", value: "100+" },
      { label: "Daily Users", value: "10,000+" },
      { label: "Cities Covered", value: "8+" },
    ],
  },
  {
    id: "sol-5",
    slug: "fitness-play-equipment",
    title: "Fitness & Play Equipment",
    shortTitle: "Fitness & Play",
    description:
      "Open gym equipment for adults and kids, integrated sports development solutions, and playground infrastructure for parks and communities.",
    longDescription:
      "We design and install fitness infrastructure that promotes active living across all age groups. Our Health Open Gym equipment for adults and Kids Fitness Stations are built with heavy-duty galvanized steel, weather-resistant coatings, and ergonomic designs. Integrated School & Sports Development Solutions combine sports equipment, playground infrastructure, and fitness zones into comprehensive wellness ecosystems for schools and communities.",
    icon: "Dumbbell",
    color: "bg-teal-600",
    features: [
      "Health Open Gym for adults (12+ stations)",
      "Kids Fitness Stations (age 3-14)",
      "Integrated school sports solutions",
      "Weather-resistant galvanized steel",
      "Anti-vandal design",
      "ASTM safety compliance",
      "Installation & ground preparation",
      "5-year structural warranty",
    ],
    certifications: ["ASTM F1487", "ISO 9001:2015", "EN 16630", "GeM Registered"],
    useCases: [
      "Municipal parks and gardens",
      "School & college campuses",
      "Housing society common areas",
      "Smart city fitness zones",
    ],
    relatedProductSlugs: [
      "health-open-gym-for-adults",
      "kids-fitness-station",
      "integrated-school-sports-development",
    ],
    image: "/images/hero/green-gym.png",
    extraImages: [
      "/images/generated/outdoor_fitness_gym_1783792293449.png",
      "/images/generated/kids_play_station_1783792302898.png"
    ],
    stats: [
      { label: "Gyms Installed", value: "75+" },
      { label: "Equipment Units", value: "500+" },
      { label: "Daily Users", value: "5,000+" },
    ],
  },
  {
    id: "sol-6",
    slug: "smart-city-csr-projects",
    title: "Smart City & CSR Projects",
    shortTitle: "Smart City",
    description:
      "Turnkey smart city infrastructure — smart poles, bus shelters, cyclone shelters, vending machines, and integrated urban solutions for government & CSR initiatives.",
    longDescription:
      "We partner with municipal corporations, smart city SPVs, and corporate CSR teams to deliver turnkey urban infrastructure projects. From Smart Poles with integrated lighting, CCTV, Wi-Fi, and environmental sensors to Smart Bus Stop Shelters with solar panels and digital displays — our solutions transform urban spaces. Cyclone Safe Zone Shelters provide emergency refuge with communication systems. We handle end-to-end: design, supply, installation, and maintenance.",
    icon: "Building2",
    color: "bg-indigo-700",
    features: [
      "Smart Poles (lighting, CCTV, Wi-Fi, sensors)",
      "Smart Bus Stop Shelters (solar, digital)",
      "Cyclone Safe Zone Shelters",
      "Vending machines (cloth bags, snacks)",
      "Food trolleys for municipal canteens",
      "Portable kitchen cabinets",
      "IoT integration & dashboards",
      "Turnkey project management",
    ],
    certifications: [
      "Smart Cities Mission Compliant",
      "ISO 9001:2015",
      "BIS Certified",
      "GeM Registered",
    ],
    useCases: [
      "Smart City Mission projects",
      "Corporate CSR initiatives",
      "Municipal infrastructure upgrades",
      "Disaster preparedness (cyclone shelters)",
    ],
    relatedProductSlugs: [
      "smart-pole",
      "smart-city-bus-shelter",
      "cyclone-safe-zone-shelter",
      "smart-vend-cloth-bag-vending-machine",
      "smart-food-cart",
      "portable-kitchen-cabinet",
      "electric-mobile-market-van",
    ],
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=800",
    stats: [
      { label: "Smart City Projects", value: "15+" },
      { label: "Smart Poles Installed", value: "200+" },
      { label: "States Served", value: "10+" },
    ],
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function getAllSolutionSlugs(): string[] {
  return solutions.map((s) => s.slug);
}
