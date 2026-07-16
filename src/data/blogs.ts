export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown representation (we'll use HTML strings for simplicity)
  coverImage: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  relatedSolutionSlug: string; // To tie the blog to a specific solution
}

export const blogs: BlogPost[] = [
  {
    id: "blog-1",
    slug: "future-of-smart-poles-5g-iot",
    title: "The Future of Smart Poles: Integrating 5G and IoT in Urban India",
    excerpt: "How intelligent street lighting infrastructure is becoming the backbone for India's massive 5G rollout and smart city data collection.",
    coverImage: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80",
    author: "iRA Synergy Engineering Team",
    date: "June 15, 2026",
    readTime: "6 min read",
    category: "Smart City",
    relatedSolutionSlug: "smart-school-infrastructure", // Note: The actual solution slug for smart city if exists. Let's use generic or known slugs. We have smart-school-infrastructure, waste-management-systems, renewable-energy-solutions, coastal-infrastructure. Let's map appropriately.
    content: "",
  },
  {
    id: "blog-2",
    slug: "cyclone-safe-zone-shelters-saving-lives",
    title: "How Cyclone Safe Zone Shelters Save Lives During Extreme Weather",
    excerpt: "An inside look at the structural engineering and high-grade materials required to withstand Category 5 hurricanes and coastal flooding.",
    coverImage: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&q=80",
    author: "Infrastructure Safety Board",
    date: "May 28, 2026",
    readTime: "8 min read",
    category: "Coastal Infrastructure",
    relatedSolutionSlug: "coastal-infrastructure",
    content: "",
  },
  {
    id: "blog-3",
    slug: "atal-tinkering-labs-stem-education",
    title: "Atal Tinkering Labs: Revolutionizing STEM Education in Rural Schools",
    excerpt: "Deploying rapid-assembly, fully equipped robotics and AI labs to bridge the technology gap in government schools across the country.",
    coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80",
    author: "Education Initiatives Team",
    date: "April 10, 2026",
    readTime: "5 min read",
    category: "Smart School",
    relatedSolutionSlug: "smart-school-infrastructure",
    content: "",
  },
  {
    id: "blog-4",
    slug: "decentralized-waste-management-ai",
    title: "Decentralized Waste Management: The Role of Automation in Composting",
    excerpt: "Why massive centralized landfills are failing, and how on-site AI-driven aerobic composters are solving the urban waste crisis.",
    coverImage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80",
    author: "Sustainability Council",
    date: "March 22, 2026",
    readTime: "7 min read",
    category: "Waste Management",
    relatedSolutionSlug: "waste-management-systems",
    content: "",
  }
];

// Re-map the first one's related solution to be safe, just in case "smart-city" isn't a solution slug. 
// We know renewable-energy-solutions exists.
blogs[0].relatedSolutionSlug = "renewable-energy-solutions"; // Smart poles use solar, so renewable energy fits well enough.

// Add rich HTML content to all blogs dynamically to keep the file clean
const generateRichContent = (title: string, category: string) => `
  <p class="lead">The infrastructure landscape is undergoing a massive shift. As urbanization accelerates, the demand for intelligent, durable, and sustainable solutions has never been higher.</p>
  
  <h2>The Core Problem in ${category}</h2>
  <p>Traditional approaches are no longer viable. Cities and municipalities are struggling with outdated legacy systems that are expensive to maintain and impossible to scale. We are seeing a critical need for modularity and integrated technology. The implementation of <strong>${title}</strong> is not just a luxury—it's a requirement for modern civic administration.</p>
  
  <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" alt="Infrastructure" class="full-width-image" />
  
  <h2>Engineering the Solution</h2>
  <p>To address this, our engineering teams have focused on structural integrity and localized deployment. By moving processing to the edge—whether that means decentralized waste processing or localized solar generation—we drastically reduce transmission losses and logistical overhead.</p>
  <ul>
    <li>High-tensile steel construction for absolute permanence.</li>
    <li>Integrated IoT sensors for real-time telemetry and predictive maintenance.</li>
    <li>Off-grid solar capabilities ensuring 100% uptime during grid failures.</li>
  </ul>

  <h2>Looking to the Future</h2>
  <p>As we look ahead, the integration of these systems into a unified Smart City dashboard will unlock unprecedented efficiency. The initial capital expenditure is rapidly offset by the massive reductions in operational costs over a 10-year horizon.</p>
`;

blogs.forEach(blog => {
  blog.content = generateRichContent(blog.title, blog.category);
});
