import { Category } from "../types";
import { CATEGORIES } from "../data/jobData";
import { 
  Code, 
  PenTool, 
  Palette, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Sliders, 
  GraduationCap 
} from "lucide-react";

interface CategoriesProps {
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
}

// Icon helper to render correct lucide icon based on name
const getIcon = (iconName: string, className: string) => {
  switch (iconName) {
    case "Code":
      return <Code className={className} />;
    case "PenTool":
      return <PenTool className={className} />;
    case "Palette":
      return <Palette className={className} />;
    case "TrendingUp":
      return <TrendingUp className={className} />;
    case "BarChart3":
      return <BarChart3 className={className} />;
    case "Users":
      return <Users className={className} />;
    case "Sliders":
      return <Sliders className={className} />;
    case "GraduationCap":
      return <GraduationCap className={className} />;
    default:
      return <Code className={className} />;
  }
};

export default function Categories({ selectedCategoryId, onSelectCategory }: CategoriesProps) {
  return (
    <section id="categories-section" className="py-16 px-6 bg-[#f4f5f7] border-b border-gray-150">
      <div className="max-w-7xl mx-auto space-y-8 text-center">
        
        {/* Section Header */}
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3.5xl font-black text-gray-900 tracking-tight font-sans">
            Choose Your Category
          </h2>
          <p className="text-gray-500 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Pick from our curated list of professional fields and instantly refine your search listings.
          </p>
        </div>

        {/* Categories Grid Container */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`py-3 px-4 rounded-xl text-left border text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-3 active:scale-98 ${
                  isActive
                    ? "bg-[#21222D] border-[#21222D] text-white shadow-md scale-[1.02]"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-350 hover:bg-gray-50/50"
                }`}
                id={`cat-pill-${cat.id}`}
              >
                <div className={`p-1.5 rounded-lg flex items-center justify-center shrink-0 ${
                  isActive ? "bg-indigo-600/30 text-indigo-400" : "bg-gray-100 text-gray-500"
                }`}>
                  {getIcon(cat.icon, "w-4 h-4")}
                </div>
                <div className="truncate">
                  <p className="truncate leading-tight">{cat.name}</p>
                  <p className={`text-[9px] font-medium mt-0.5 ${isActive ? "text-gray-400" : "text-gray-400"}`}>
                    {cat.count} listings
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
