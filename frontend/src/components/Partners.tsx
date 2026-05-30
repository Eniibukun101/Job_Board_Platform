import { motion } from "motion/react";

export default function Partners() {
  return (
    <section className="py-8 bg-[#f4f5f7] px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Dynamic sheared skewed background matching the picture layout */}
        <div className="bg-[#21222D] text-[#9ca3af] py-6 px-8 rounded-2xl transform skew-y-0.5 relative overflow-hidden shadow-lg border border-gray-800">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30" />
          
          <div className="text-center mb-4">
            <span className="text-[9px] uppercase tracking-widest font-mono font-black text-gray-400">
              In partnership with
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-around gap-6 md:gap-8 opacity-80">
            {/* Amazon SVG */}
            <div className="h-6 flex items-center select-none cursor-help hover:opacity-100 transition-opacity">
              <span className="font-extrabold text-white text-sm tracking-tight">amazon</span>
            </div>

            {/* Apple SVG label or simple logo */}
            <div className="h-6 flex items-center gap-1.5 select-none cursor-help hover:opacity-100 transition-opacity">
              <span className="font-bold text-white text-sm"> apple</span>
            </div>

            {/* Google */}
            <div className="h-6 flex items-center select-none cursor-help hover:opacity-100 transition-opacity">
              <span className="font-semibold text-white text-sm tracking-tight font-sans">G<span className="text-red-400">o</span><span className="text-yellow-400">o</span>g<span className="text-green-400">l</span>e</span>
            </div>

            {/* Meta */}
            <div className="h-6 flex items-center select-none cursor-help hover:opacity-100 transition-opacity">
              <span className="font-mono text-white text-sm tracking-widest font-black">♾ meta</span>
            </div>

            {/* Slack */}
            <div className="h-6 flex items-center select-none cursor-help hover:opacity-100 transition-opacity">
              <span className="font-bold text-white text-sm font-sans">slack</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
