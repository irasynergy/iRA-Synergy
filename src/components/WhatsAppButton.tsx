import { companyInfo } from "@/data/company";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${companyInfo.whatsapp}?text=Hi%20iRA%20Synergy%2C%20I%27m%20interested%20in%20your%20solutions.`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} fill="white" />
    </a>
  );
}
