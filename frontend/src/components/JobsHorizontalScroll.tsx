import React, { useRef, useState, useEffect } from "react";
import { Job, Category } from "../types";
import { CATEGORIES } from "../data/jobData";
import { MapPin, Briefcase, ChevronLeft, ChevronRight, DollarSign, Clock, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface JobsHorizontalScrollProps {
  jobs: Job[];
  selectedCategoryId: string;
  onApplyClick: (job: Job) => void;
}

export default function JobsHorizontalScroll({ 
  jobs, 
  selectedCategoryId,
  onApplyClick
}: JobsHorizontalScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check if count of jobs is more than 8
  const isScrollableMode = jobs.length > 8;

  // Calculate scroll bar parameters on scroll
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;
    
    if (maxScroll <= 0) {
      setScrollPercentage(0);
      setCanScrollLeft(false);
      setCanScrollRight(false);
    } else {
      const percentage = (scrollLeft / maxScroll) * 100;
      setScrollPercentage(percentage);
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < maxScroll - 5);
    }
  };

  // Re-evaluate scrollability parameters when jobs list or category changes
  useEffect(() => {
    setTimeout(() => {
      handleScroll();
    }, 100);
  }, [jobs, selectedCategoryId]);

  // Handle manual scroll left / right buttons
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 340; // width of job card + gap
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  const activeCategoryName = CATEGORIES.find(c => c.id === selectedCategoryId)?.name || "All";

  return (
    <section className="py-16 px-6 bg-[#f4f5f7] border-b border-gray-150">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1 bg-indigo-50 px-2.5 py-1 rounded-full text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
            Suggested Openings
          </div>
          <h2 className="text-2xl md:text-3.5xl font-black text-gray-900 tracking-tight font-sans">
            Jobs You May Be Interested in
          </h2>
          <p className="text-gray-550 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            We have a selection of actual high-paying vacancies that match your profile and expertise criteria.
          </p>
        </div>

        {/* Selected Category Tag Indicator */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 max-w-4xl mx-auto">
          <p className="text-xs font-bold text-gray-500">
            Showing <span className="text-gray-900 font-extrabold">{activeCategoryName}</span> Listings
          </p>
          <span className="text-[10px] bg-[#21222D] text-white px-2.5 py-1 rounded-full font-bold">
            {jobs.length} roles found
          </span>
        </div>

        {isScrollableMode ? (
          /* ==================== SCROLLABLE CAROUSEL MODE (&gt; 8 jobs) ==================== */
          <div className="space-y-6 relative max-w-6xl mx-auto">
            
            {/* Scroll Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-20">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`p-2.5 rounded-full border shadow-md bg-white text-gray-700 transition-all ${
                  canScrollLeft 
                  ? "hover:bg-gray-50 opacity-100 scale-100 cursor-pointer" 
                  : "opacity-45 scale-95 pointer-events-none"
                }`}
                id="carousel-btn-left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-20">
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`p-2.5 rounded-full border shadow-md bg-white text-gray-700 transition-all ${
                  canScrollRight 
                  ? "hover:bg-gray-50 opacity-100 scale-100 cursor-pointer" 
                  : "opacity-45 scale-95 pointer-events-none"
                }`}
                id="carousel-btn-right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Carousel track */}
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex items-stretch gap-6 overflow-x-auto pb-4 pt-1 snap-x select-none no-scrollbar cursor-grab active:cursor-grabbing scroll-smooth"
              style={{ scrollbarWidth: "none" }}
            >
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="w-[310px] sm:w-[330px] shrink-0 bg-white p-5 rounded-3xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between snap-start"
                  id={`job-card-scroll-${job.id}`}
                >
                  <div>
                    {/* Header info */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${job.logoBg}`}>
                          {job.company.substring(0, 1)}
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{job.company}</p>
                          <span className="text-[10px] text-indigo-600 font-bold font-mono">⚡ {job.applicants} applied</span>
                        </div>
                      </div>
                      
                      <span className="text-[9px] bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded-full">
                        {job.type}
                      </span>
                    </div>

                    <h3 className="text-sm font-extrabold text-[#21222D] tracking-tight hover:text-indigo-600 cursor-pointer mb-2 line-clamp-1">
                      {job.title}
                    </h3>

                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4">
                      {job.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100/80 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">Salary Package</span>
                      <p className="text-sm font-extrabold text-gray-900 font-mono flex items-center">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        {job.salary}
                      </p>
                    </div>

                    <button
                      onClick={() => onApplyClick(job)}
                      className="px-4 py-2 bg-[#21222D] hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                      id={`apply-job-${job.id}`}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Horizontal Scroll Indicator (matches the gray slide indicator inside the ref image!) */}
            <div className="max-w-md mx-auto pt-4 flex items-center justify-center">
              <div className="w-full bg-gray-200/70 h-1.5 rounded-full relative overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-150 absolute"
                  style={{ 
                    left: `${(scrollPercentage * 0.8)}%`, // map to slightly less so handle does not clip
                    width: "20%" 
                  }}
                />
              </div>
            </div>

          </div>
        ) : (
          /* ==================== STANDARD GRID MODE (&lt;= 8 jobs) ==================== */
          <div className="max-w-4xl mx-auto">
            {jobs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-900 font-semibold mb-1">No vacancies fit these constraints</p>
                <p className="text-gray-400 text-xs">Try selecting another category panel above.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {jobs.map((job) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      key={job.id}
                      className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                      id={`job-card-grid-${job.id}`}
                    >
                      <div>
                        {/* Header info */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${job.logoBg}`}>
                              {job.company.substring(0, 1)}
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{job.company}</p>
                              <span className="text-[10px] text-indigo-600 font-bold font-mono">⚡ {job.applicants} applied</span>
                            </div>
                          </div>
                          
                          <span className="text-[9px] bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded-full font-mono">
                            {job.type}
                          </span>
                        </div>

                        <h3 className="text-sm font-extrabold text-[#21222D] tracking-tight hover:text-indigo-600 cursor-pointer mb-2">
                          {job.title}
                        </h3>

                        <p className="text-xs text-gray-500 leading-relaxed mb-4">
                          {job.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">Salary Package</span>
                          <p className="text-sm font-extrabold text-gray-900 font-mono flex items-center">
                            <DollarSign className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            {job.salary}
                          </p>
                        </div>

                        <button
                          onClick={() => onApplyClick(job)}
                          className="px-4 py-2 bg-[#21222D] hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                          id={`apply-grid-${job.id}`}
                        >
                          Apply Now
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
