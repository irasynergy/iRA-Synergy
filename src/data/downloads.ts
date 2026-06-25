export type DownloadCategory = "Ready Quotations" | string;

export interface DownloadFile {
  id: string;
  title: string;
  description: string;
  category: DownloadCategory;
  fileType: "PDF" | "DOCX" | "XLSX";
  fileSize: string;
  url: string;
  lastUpdated: string;
  previewImage?: string | null;
  downloadName?: string;
}

export const downloads: DownloadFile[] = [
  // Ready Quotations / BoQ
  {
    id: "dl-4",
    title: "Standard BOQ: Smart Pole (12m with CCTV & Wi-Fi)",
    description: "Ready quotation template with standard technical specifications and commercial terms.",
    category: "Ready Quotations",
    fileType: "XLSX",
    fileSize: "1.2 MB",
    url: "#",
    lastUpdated: "2025-03-01",
  },
  {
    id: "dl-5",
    title: "Commercial Proposal: 500kg Waste Incinerator",
    description: "Complete commercial proposal including installation, AMC, and standard pricing.",
    category: "Ready Quotations",
    fileType: "DOCX",
    fileSize: "2.5 MB",
    url: "#",
    lastUpdated: "2025-03-05",
  },
  {
    id: "dl-6",
    title: "Standard BOQ: Atal Tinkering Lab Setup",
    description: "Government-approved BOQ format for school STEM lab installations.",
    category: "Ready Quotations",
    fileType: "XLSX",
    fileSize: "1.8 MB",
    url: "#",
    lastUpdated: "2025-02-28",
  },
  {
    id: "dl-7",
    title: "Ready Quotation: Solar Smart Bench (Set of 10)",
    description: "Bulk pricing quotation with solar capacity and battery specifications.",
    category: "Ready Quotations",
    fileType: "PDF",
    fileSize: "3.4 MB",
    url: "#",
    lastUpdated: "2025-01-10",
  },

];
