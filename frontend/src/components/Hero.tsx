import React from "react";
import { Search, MapPin, Sparkles } from "lucide-react";

interface HeroProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  locationSearch: string;
  setLocationSearch: (val: string) => void;
  onSearchClick: () => void;
}

export default function Hero({
  searchTerm,
  setSearchTerm,
  locationSearch,
  setLocationSearch,
  onSearchClick
}: HeroProps) {
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchClick();
    }
  };

  return (
    <section className="bg-[#21222D] text-white pt-10 pb-20 px-6 md:px-12 relative overflow-hidden">
      
      {/* Absolute decorative radial gradients */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/4 bottom-0 w-72 h-72 bg-emerald-950/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-10">
        
        {/* Centered Compact Search Bar exactly matching reference screenshot */}
        <div className="flex justify-center">
          <div className="bg-white text-gray-900 rounded-[20px] shadow-2xl flex items-center md:gap-4 max-w-[980px] w-full h-[60px] px-6 border border-gray-200">
            <div className="flex items-center gap-3 w-[35%]">
              <MapPin className="w-5 h-5 text-indigo-500 shrink-0" />
              <input 
                type="text" 
                value={locationSearch}
                onChange={(e) => {
                  setLocationSearch(e.target.value);
                  setTimeout(() => onSearchClick(), 0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Location"
                className="w-full text-sm font-semibold focus:outline-none placeholder-gray-400 bg-transparent text-gray-800"
                id="hero-job-location"
              />
            </div>
            
            <div className="w-[1.5px] h-6 bg-gray-200 shrink-0 mx-2" />

            <div className="flex items-center gap-3 w-[65%]">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setTimeout(() => onSearchClick(), 0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search jobs, skills or companies"
                className="w-full text-sm font-semibold focus:outline-none placeholder-gray-400 bg-transparent text-gray-800"
                id="hero-job-keyword"
              />
            </div>
          </div>
        </div>

        {/* Hero split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left column Content */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-5.5xl font-black tracking-tight leading-tight md:leading-none text-white font-sans">
                Unlock your next <br />
                <span className="text-white">career path</span>
              </h1>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
                Bridging obstacles, aspirations, and professional success. Discover careers that match your workspace profile and join high-performing global networks today.
              </p>
            </div>

          {/* Bottom Avatar Stack & Rating */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex -space-x-3">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=80&auto=format&fit=crop" 
                alt="user" 
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#21222D]"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80&auto=format&fit=crop" 
                alt="user" 
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#21222D]"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80&auto=format&fit=crop" 
                alt="user" 
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#21222D]"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=80&auto=format&fit=crop" 
                alt="user" 
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#21222D]"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <div className="text-yellow-400 text-xs flex gap-0.5">
                ★ ★ ★ ★ ★
              </div>
              <p className="text-[10px] uppercase text-gray-450 font-bold tracking-wider font-mono mt-0.5">
                Trusted by 5,000+ candidates globally
              </p>
            </div>
          </div>

        </div>

        {/* Right column showcase Image */}
        <div className="lg:col-span-5 relative group flex items-center justify-center min-h-[400px]">
          {/* Subtle backdrop blur glow */}
          <div className="absolute -inset-1.5 bg-indigo-500/5 rounded-2xl blur-md pointer-events-none" />
          
          {/* Slanted rectangle in shade #282934 - scaled down to 360.35px by 360.27px and rotated 21.03 degrees */}
          <div className="absolute w-[360.35px] h-[360.27px] bg-[#282934] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-gray-800/40 transition-transform duration-500 z-0" style={{ transform: 'rotate(21.03deg)' }} />
          
          {/* Image container - scaled down to 380.8px by 381.6px */}
          <div className="relative w-[380.8px] h-[381.6px] rounded-2xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.7)] border border-gray-800 bg-[#1e2029] z-10">
            <img 
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop" 
              alt="Workspace setup representing Job Board" 
              className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

      </div>
    </div>
  </section>
  );
}
