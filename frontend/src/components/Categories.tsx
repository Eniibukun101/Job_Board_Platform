import { CATEGORIES } from "../data/jobData";
import {
  BarChart3,
  Code,
  GraduationCap,
  Palette,
  PenTool,
  Sliders,
  TrendingUp,
  Users,
} from "lucide-react";

interface CategoriesProps {
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
}

const getIcon = (iconName: string) => {
  const className = "h-3.5 w-3.5";
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

export default function Categories({
  selectedCategoryId,
  onSelectCategory,
}: CategoriesProps) {
  return (
    <section id="categories-section" className="bg-[#f2f2f2] px-6 py-14">
      <div className="mx-auto max-w-[850px] text-center">
        <h2 className="text-4xl font-black tracking-[-0.02em] text-black">
          Choose Your Category
        </h2>
        <p className="mt-5 text-xl font-light text-gray-500">
          Pick from our range of jobs offer and filter your search to your field
        </p>

        <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
          {CATEGORIES.slice(0, 8).map((category) => {
            const isActive = selectedCategoryId === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.id)}
                className={`flex h-10 items-center gap-3 rounded-[7px] px-4 text-left text-[11px] font-black transition-all ${
                  isActive
                    ? "bg-[#20212b] text-white"
                    : "bg-white text-[#20212b] hover:-translate-y-0.5 hover:shadow-md"
                }`}
              >
                {getIcon(category.icon)}
                <span className="truncate">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
