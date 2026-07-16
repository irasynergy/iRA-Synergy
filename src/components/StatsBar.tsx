"use client";

import { Briefcase, Package, MapPin, Flag } from "lucide-react";
import CountUp from "./ui/CountUp";
import { companyStats } from "@/data/company";

const iconMap: Record<string, React.ElementType> = {
  Briefcase,
  Package,
  MapPin,
  Flag,
};

export default function StatsBar() {
  return (
    <div className="relative z-20 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mb-16">
        <div className="gradient-steel rounded-2xl shadow-premium-lg p-1">
          <div className="bg-gradient-to-r from-[#3D7F93] to-[#4A90A4] rounded-[0.875rem] px-6 md:px-10 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              {companyStats.map((stat) => {
                const Icon = iconMap[stat.icon] || Briefcase;
                return (
                  <div key={stat.id} className="flex flex-col items-center text-center group">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors">
                      <Icon size={22} className="text-white/90" />
                    </div>
                    <CountUp
                      end={stat.value}
                      suffix={stat.suffix}
                      className="text-3xl md:text-4xl font-extrabold text-white tracking-tight"
                      labelClassName="text-sm text-white/70 font-medium mt-1"
                      label={stat.label}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
