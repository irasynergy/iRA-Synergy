"use client";

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
  allLabel?: string;
}

export default function CategoryFilter({
  categories,
  active,
  onChange,
  allLabel = "All",
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Category filter">
      <button
        role="tab"
        aria-selected={active === "All"}
        onClick={() => onChange("All")}
        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          active === "All"
            ? "bg-ira-primary text-white shadow-lg shadow-ira-primary/20"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
        }`}
      >
        {allLabel}
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
          onClick={() => onChange(cat)}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            active === cat
              ? "bg-ira-primary text-white shadow-lg shadow-ira-primary/20"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
