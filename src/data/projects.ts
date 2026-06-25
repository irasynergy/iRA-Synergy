import { type Project } from "@/types";

export const projects: Project[] = [
  {
    id: "proj-1",
    slug: "nashik-smart-city-waste-management",
    title: "Nashik Smart City — Integrated Waste Management",
    client: "Nashik Municipal Corporation",
    location: "Nashik, Maharashtra",
    state: "Maharashtra",
    category: "Waste Management",
    description:
      "Deployed a comprehensive waste management ecosystem across 12 municipal wards in Nashik including smart dust bins, e-carts for collection, and a centralized composting facility.",
    challenge:
      "Nashik was struggling with overflowing waste bins, irregular collection schedules, and lack of waste segregation. The city needed an integrated solution that could handle 200+ tons of daily waste.",
    solution:
      "We installed 500+ smart dust bins with fill-level sensors across high-traffic zones, deployed 30 e-carts for door-to-door collection, and set up 2 organic food waste compost machines at community processing centers. A centralized IoT dashboard tracks all assets in real-time.",
    impact: [
      { metric: "Waste Reduction", value: "40%", description: "Reduction in waste sent to landfill" },
      { metric: "Collection Efficiency", value: "65%", description: "Improvement in collection route optimization" },
      { metric: "Compost Generated", value: "15 tons/month", description: "Organic compost from food waste" },
      { metric: "Coverage", value: "12 wards", description: "Municipal wards covered" },
    ],
    testimonial: {
      quote: "iRA Synergy's integrated approach transformed our waste management system. The smart bins and e-carts have significantly reduced overflow complaints, and the composting facility is generating revenue from organic compost.",
      author: "Municipal Commissioner",
      role: "Nashik Municipal Corporation",
    },
    images: ["https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800"],
    completionDate: "2025-03",
    productsUsed: ["Smart Dust Bin", "E-Cart for Garbage", "Organic Food Waste Compost Machine"],
  },
  {
    id: "proj-2",
    slug: "pune-solar-smart-infrastructure",
    title: "Pune — Solar Smart City Infrastructure",
    client: "Pune Smart City Development Corporation",
    location: "Pune, Maharashtra",
    state: "Maharashtra",
    category: "Renewable Energy",
    description:
      "Installed 20 solar trees, 50 solar smart benches, and 15 smart poles across Pune's public parks, bus stops, and pedestrian zones — creating a network of self-powered urban infrastructure.",
    challenge:
      "Pune's expanding smart city needed sustainable, self-powered infrastructure for public spaces that could provide citizen services (charging, Wi-Fi, lighting) without adding to the electricity grid load.",
    solution:
      "We designed and installed a network of solar-powered infrastructure: 20 Solar Trees in major parks generating 200 kW total, 50 Solar Smart Benches along pedestrian corridors with USB charging and Wi-Fi, and 15 Smart Poles at key intersections with CCTV, sensors, and lighting.",
    impact: [
      { metric: "Clean Energy", value: "200 kW", description: "Total solar generation capacity" },
      { metric: "CO₂ Reduction", value: "150 tons/year", description: "Annual carbon emissions saved" },
      { metric: "Citizens Served", value: "50,000+", description: "Daily footfall in equipped areas" },
      { metric: "Grid Savings", value: "₹25L/year", description: "Annual electricity cost savings" },
    ],
    testimonial: {
      quote: "The solar trees have become iconic landmarks in our parks. Citizens love the charging facilities and Wi-Fi, and we're saving significantly on energy costs. iRA Synergy delivered exceptional quality.",
      author: "CEO",
      role: "Pune Smart City Development Corporation",
    },
    images: ["https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800"],
    completionDate: "2025-06",
    productsUsed: ["Solar Tree", "Solar Smart Bench", "Smart Pole"],
  },
  {
    id: "proj-3",
    slug: "maharashtra-school-modernization",
    title: "Maharashtra — Smart School Modernization Program",
    client: "Department of Education, Govt. of Maharashtra",
    location: "Multiple Districts, Maharashtra",
    state: "Maharashtra",
    category: "Education",
    description:
      "Equipped 50 government schools across 5 districts with Atal Tinkering Labs, Science Kit Labs, AI Robotics Labs, and Portable Libraries under the Samagra Shiksha Abhiyan scheme.",
    challenge:
      "Government schools in rural Maharashtra lacked modern laboratory infrastructure. Students had no access to hands-on STEM learning, robotics, or innovation-focused education aligned with NEP 2020.",
    solution:
      "We deployed standardized lab setups across 50 schools: 50 Atal Tinkering Labs with complete kits, 50 Science Kit Labs (Classes 6-12), 25 AI Robotics Labs in senior secondary schools, and 50 Portable Libraries with 500+ books each. Each installation included teacher training workshops.",
    impact: [
      { metric: "Schools Equipped", value: "50", description: "Government schools modernized" },
      { metric: "Students Reached", value: "25,000+", description: "Students with access to modern labs" },
      { metric: "Labs Installed", value: "175", description: "Total laboratory installations" },
      { metric: "Teachers Trained", value: "200+", description: "Teachers received hands-on training" },
    ],
    testimonial: {
      quote: "Our students are now competing in national robotics competitions. The tinkering labs have sparked a passion for innovation that was previously missing. iRA Synergy's training for our teachers was invaluable.",
      author: "District Education Officer",
      role: "Zilla Parishad, Nashik",
    },
    images: ["https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800"],
    completionDate: "2025-09",
    productsUsed: ["Atal Tinkering Labs", "Science Kit Lab", "AI Robotics Lab", "Portable Library"],
  },
  {
    id: "proj-4",
    slug: "gujarat-public-health-infrastructure",
    title: "Gujarat — Public Health & Hygiene Infrastructure",
    client: "Gujarat Urban Development Mission",
    location: "Ahmedabad & Surat, Gujarat",
    state: "Gujarat",
    category: "Public Health",
    description:
      "Deployed self-cleaning smart toilets, water ATMs, and air purifiers across Ahmedabad and Surat railway stations, bus terminals, and public markets under the Swachh Bharat Mission.",
    challenge:
      "High-footfall public areas in Ahmedabad and Surat lacked hygienic public toilets and safe drinking water. Manual cleaning couldn't keep up with usage volumes, and air quality in crowded markets was poor.",
    solution:
      "We installed 30 Self-Cleaning Smart Toilets at railway stations and bus terminals, 50 Water ATMs with RO purification in public markets and schools, and 20 outdoor air purifiers in high-pollution zones. All units are IoT-connected for remote monitoring.",
    impact: [
      { metric: "Daily Users", value: "10,000+", description: "People served daily" },
      { metric: "Water Dispensed", value: "25,000 L/day", description: "Safe drinking water provided" },
      { metric: "Hygiene Score", value: "95%", description: "User satisfaction rating" },
      { metric: "Maintenance Cost", value: "-60%", description: "Reduction vs manual cleaning" },
    ],
    testimonial: {
      quote: "The self-cleaning toilets are a game-changer for public hygiene. Zero complaints about cleanliness, and the water ATMs have reduced waterborne diseases in nearby communities significantly.",
      author: "Project Director",
      role: "Gujarat Urban Development Mission",
    },
    images: ["https://images.unsplash.com/photo-1584820927498-cafe2c1c7669?q=80&w=800"],
    completionDate: "2025-12",
    productsUsed: ["Self Cleaning Smart Toilet", "Water ATM", "Air Purifier — Indoor & Outdoor"],
  },
  {
    id: "proj-5",
    slug: "mumbai-fitness-parks",
    title: "Mumbai — Urban Fitness Park Network",
    client: "Brihanmumbai Municipal Corporation (BMC)",
    location: "Mumbai, Maharashtra",
    state: "Maharashtra",
    category: "Fitness",
    description:
      "Created a network of 25 open-air fitness parks across Mumbai's public gardens and community spaces, featuring adult gym equipment and children's fitness stations.",
    challenge:
      "Mumbai's dense urban population lacked accessible, free fitness infrastructure. Commercial gyms are expensive, and public parks had no exercise equipment beyond basic playground structures.",
    solution:
      "We designed and installed 25 open-air fitness parks: each featuring 12-station Health Open Gyms for adults, Kids Fitness Stations for children, instructional signage, and rubber safety flooring. Solar-powered LED lighting enables evening usage.",
    impact: [
      { metric: "Fitness Parks", value: "25", description: "Parks installed across Mumbai" },
      { metric: "Daily Users", value: "5,000+", description: "Citizens exercising daily" },
      { metric: "Equipment Units", value: "500+", description: "Individual fitness stations" },
      { metric: "Health Impact", value: "Significant", description: "Reduction in lifestyle disease metrics" },
    ],
    images: ["https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800"],
    completionDate: "2024-11",
    productsUsed: ["Health Open Gym for Adults", "Kids Fitness Station"],
  },
  {
    id: "proj-6",
    slug: "odisha-cyclone-shelters",
    title: "Odisha — Cyclone-Resistant Shelter Network",
    client: "Odisha State Disaster Management Authority",
    location: "Coastal Districts, Odisha",
    state: "Odisha",
    category: "Smart City",
    description:
      "Engineered and installed 10 cyclone-resistant community shelters along Odisha's coastline, providing emergency refuge for 2,000+ people during extreme weather events.",
    challenge:
      "Odisha's coastline faces frequent cyclones (Fani, Amphan, Yaas). Existing shelters were outdated, had limited capacity, and lacked communication systems for emergency coordination.",
    solution:
      "We designed and built 10 Cyclone Safe Zone Shelters rated for 250 km/h winds. Each shelter accommodates 200 people with emergency rations, water storage, solar backup power, and satellite communication systems. Community training programs were conducted for 5,000+ residents.",
    impact: [
      { metric: "Shelters Built", value: "10", description: "Along Odisha coastline" },
      { metric: "Capacity", value: "2,000+", description: "People can be sheltered" },
      { metric: "Wind Rating", value: "250 km/h", description: "Maximum wind resistance" },
      { metric: "Lives Protected", value: "50,000+", description: "In catchment areas" },
    ],
    testimonial: {
      quote: "During Cyclone Michaung, three of iRA Synergy's shelters protected over 600 families. The integrated communication systems helped us coordinate rescue operations effectively. These shelters save lives.",
      author: "Managing Director",
      role: "Odisha State Disaster Management Authority",
    },
    images: ["https://images.unsplash.com/photo-1469122312224-c5846569feb1?q=80&w=800"],
    completionDate: "2024-06",
    productsUsed: ["Cyclone Safe Zone Shelter"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getFeaturedProjects(count: number = 3): Project[] {
  return projects.slice(0, count);
}
