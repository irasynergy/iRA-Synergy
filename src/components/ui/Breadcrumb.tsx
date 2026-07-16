import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1 text-sm text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
        <li className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link href="/" className="flex items-center gap-1 hover:text-ira-primary transition-colors" itemProp="item">
            <Home size={14} />
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <ChevronRight size={14} className="mx-1 text-gray-300" />
            {item.href ? (
              <Link href={item.href} className="hover:text-ira-primary transition-colors" itemProp="item">
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span className="text-ira-primary font-semibold" itemProp="name">
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={String(idx + 2)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
