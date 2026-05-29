import { motion } from "motion/react";

interface DoubleBannersProps {
  onNavigate?: (view: "home" | "dashboard" | "employer" | "login" | "profile" | "job-details" | "notifications", mode?: "login" | "create") => void;
}

export default function DoubleBanners({ onNavigate }: DoubleBannersProps) {
  const handleScrollToCategories = () => {
    const el = document.getElementById("categories-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToNewsletter = () => {
    const el = document.getElementById("newsletter-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="py-12 px-6 bg-[#f4f5f7]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: For Candidates */}
        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-[#21222D] text-white p-6 md:p-8 rounded-2xl border border-gray-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
        >
          {/* Subtle glowing element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 max-w-sm relative z-10 text-center md:text-left">
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest font-mono">For Candidates</span>
            <h3 className="text-xl md:text-2xl font-black tracking-tight leading-snug">
              Looking for your <br className="hidden md:inline" /> next major role?
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Explore hundreds of verified modern tech listings and file your details instantly in single clicks.
            </p>
            <button 
              onClick={handleScrollToCategories}
              className="mt-2 inline-flex items-center gap-1 bg-white hover:bg-gray-100 text-[#21222D] text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
              id="banner-candidate-trigger"
            >
              Apply for a Job
            </button>
          </div>

          {/* Custom high-fidelity recreation of the uploaded candidate illustration */}
          <div className="shrink-0 relative">
            <svg 
              className="w-40 h-40 md:w-44 md:h-44" 
              viewBox="0 0 180 150" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Soft modern floor platform background */}
              <path d="M 5,145 Q 90,135 175,145 L 175,150 L 5,150 Z" fill="#F4F5F7" opacity="0.3" />
              
              {/* Woman's right shoulder/arm in pink/salmon skin shade */}
              <path d="M 18,102 C 18,102 34,103 36,115 L 38,142 C 38,142 24,144 20,131 C 18,124 17,112 18,102 Z" fill="#E89295" />
              
              {/* White blouse/dress layout */}
              <path d="M 36,115 C 44,119 56,115 58,103 C 58,95 56,90 56,90 L 36,90 Z" fill="#FFFFFF" />
              <path d="M 56,103 C 56,112 52,126 38,126" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

              {/* Hand/Left arm extending under body to type */}
              <path d="M 28,124 C 40,123 68,118 84,118 C 86,118 88,120 84,122 C 68,126 40,130 28,130 Z" fill="#E89295" />

              {/* Neck and chin profile in pink/salmon */}
              <path d="M 50,90 L 50,76 L 60,76 L 60,90 Z" fill="#E89295" />
              <path d="M 50,76 C 50,76 58,78 66,70 C 72,64 76,56 70,46 C 64,36 52,42 50,50 Z" fill="#E89295" />

              {/* Sleek long flowing black hair surrounding head and back */}
              <path d="M 48,34 C 38,18 59,5 77,16 C 87,24 86,36 85,46 C 84,56 88,70 84,80 C 80,90 70,90 68,83 C 66,76 69,68 67,53 C 65,38 55,40 48,34 Z" fill="#111216" />
              <path d="M 32,78 C 27,68 31,48 39,38 C 47,28 51,32 49,46 C 47,60 49,74 43,84 C 39,89 35,88 32,78 Z" fill="#111216" />

              {/* White/Silver headphones headband */}
              <path d="M 38,36 C 35,24 46,12 62,12 C 73,12 82,20 83,29" fill="none" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
              
              {/* Headphones cushion & cup */}
              <g transform="rotate(-12, 38, 38)">
                <rect x="34" y="30" width="8" height="18" rx="4" fill="#FFFFFF" />
                <rect x="31" y="33" width="3" height="12" rx="1.5" fill="#D1D5DB" />
              </g>

              {/* White mesh professional studio desk microphone */}
              <rect x="32" y="142" width="20" height="4.5" rx="2" fill="#4B4E69" />
              <line x1="42" y1="142" x2="42" y2="114" stroke="#4B4E69" strokeWidth="3" strokeLinecap="round" />
              
              {/* Microphone capsule body */}
              <rect x="34" y="82" width="16" height="32" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
              {/* Mesh dotted pattern layers */}
              <circle cx="39" cy="90" r="0.7" fill="#9CA3AF" />
              <circle cx="43" cy="90" r="0.7" fill="#9CA3AF" />
              <circle cx="47" cy="90" r="0.7" fill="#9CA3AF" />
              <circle cx="39" cy="95" r="0.7" fill="#9CA3AF" />
              <circle cx="43" cy="95" r="0.7" fill="#9CA3AF" />
              <circle cx="47" cy="95" r="0.7" fill="#9CA3AF" />
              <circle cx="39" cy="100" r="0.7" fill="#9CA3AF" />
              <circle cx="43" cy="100" r="0.7" fill="#9CA3AF" />
              <circle cx="47" cy="100" r="0.7" fill="#9CA3AF" />
              <circle cx="39" cy="105" r="0.7" fill="#9CA3AF" />
              <circle cx="43" cy="105" r="0.7" fill="#9CA3AF" />
              <circle cx="47" cy="105" r="0.7" fill="#9CA3AF" />
              <circle cx="39" cy="110" r="0.7" fill="#9CA3AF" />
              <circle cx="43" cy="110" r="0.7" fill="#9CA3AF" />
              <circle cx="47" cy="110" r="0.7" fill="#9CA3AF" />

              {/* Sleek laptop setup to her right */}
              {/* Keyboard Base */}
              <path d="M 46,131 L 74,127 L 144,130 L 136,140 L 46,137 Z" fill="#111216" />
              <path d="M 46,131 L 144,130" stroke="#4B4E69" strokeWidth="1" />
              
              {/* Laptop Screen Lid facing us */}
              <path d="M 78,78 C 78,76 80,74 82,74 L 146,72 C 148,72 150,74 150,76 L 144,130 L 76,131 Z" fill="#111216" />
              {/* Glowing logo identifier in middle of lid */}
              <circle cx="111" cy="101" r="3.5" fill="#FFFFFF" />
            </svg>
          </div>
        </motion.div>

        {/* Card 2: For Employers */}
        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-[#21222D] text-white p-6 md:p-8 rounded-2xl border border-gray-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
        >
          {/* Subtle glowing element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 max-w-sm relative z-10 text-center md:text-left">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest font-mono">For Employers</span>
            <h3 className="text-xl md:text-2xl font-black tracking-tight leading-snug">
              Need to onboard <br className="hidden md:inline" /> skilled personnel fast?
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Post listings to our active community of experts and discover compatible portfolios instantly.
            </p>
            <button 
              onClick={() => {
                if (onNavigate) {
                  onNavigate("employer");
                } else {
                  handleScrollToNewsletter();
                }
              }}
              className="mt-2 inline-flex items-center gap-1 bg-[#3ed384] hover:bg-[#32b26e] text-[#21222D] text-xs font-black px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer border-0"
              id="banner-employer-trigger"
            >
              Enter Employer Desk
            </button>
          </div>

          {/* Custom high-fidelity recreation of the uploaded employer illustration */}
          <div className="shrink-0 relative">
            <svg 
              className="w-40 h-40 md:w-44 md:h-44" 
              viewBox="0 0 180 150" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Soft modern floor platform background */}
              <path d="M 5,145 Q 90,135 175,145 L 175,150 L 5,150 Z" fill="#F4F5F7" opacity="0.3" />
              
              {/* --- BACKGROUND BOOKSHELVES & ITEMS --- */}
              {/* Shelf 1 (top) */}
              <line x1="5" y1="18" x2="85" y2="18" stroke="#4a4e69" strokeWidth="0.5" opacity="0.4" />
              {/* Row of books on top shelf */}
              <rect x="10" y="5" width="2" height="13" fill="#DBDFEA" opacity="0.8" />
              <rect x="13" y="5" width="2" height="13" fill="#DBDFEA" opacity="0.8" />
              <rect x="16" y="5" width="2" height="13" fill="#DBDFEA" opacity="0.8" />
              <rect x="19" y="5" width="2" height="13" fill="#DBDFEA" opacity="0.8" />
              <rect x="22" y="5" width="2" height="13" fill="#DBDFEA" opacity="0.8" />
              <rect x="25" y="5" width="2" height="13" fill="#DBDFEA" opacity="0.8" />
              <rect x="28" y="5" width="2" height="13" fill="#DBDFEA" opacity="0.8" />
              <rect x="31" y="5" width="2" height="13" fill="#DBDFEA" opacity="0.8" />
              <rect x="34" y="5" width="2" height="13" fill="#DBDFEA" opacity="0.8" />
              <rect x="37" y="5" width="2" height="13" fill="#DBDFEA" opacity="0.8" />
              <rect x="40" y="5" width="2" height="13" fill="#DBDFEA" opacity="0.8" />
              <rect x="43" y="5" width="2" height="13" fill="#DBDFEA" opacity="0.8" />

              {/* Shelf 2 (middle) */}
              <line x1="5" y1="43" x2="85" y2="43" stroke="#4a4e69" strokeWidth="0.5" opacity="0.4" />
              {/* Potted plant */}
              <path d="M 14,38 L 18,38 L 17,43 L 15,43 Z" fill="#E5E7EB" />
              <circle cx="12" cy="34" r="1.2" fill="#DBDFEA" />
              <circle cx="16" cy="31" r="1.2" fill="#DBDFEA" />
              <circle cx="20" cy="34" r="1.2" fill="#DBDFEA" />
              <path d="M 16,38 Q 15,35 12,34 M 16,38 Q 16,33 16,31 M 16,38 Q 18,35 20,34" stroke="#4a4e69" strokeWidth="0.5" opacity="0.6" />
              {/* 3 Block binders on right side */}
              <rect x="42" y="26" width="5" height="17" rx="0.5" fill="#DBDFEA" stroke="#4a4e69" strokeWidth="0.3" opacity="0.9" />
              <rect x="49" y="26" width="5" height="17" rx="0.5" fill="#DBDFEA" stroke="#4a4e69" strokeWidth="0.3" opacity="0.9" />
              <rect x="56" y="26" width="5" height="17" rx="0.5" fill="#DBDFEA" stroke="#4a4e69" strokeWidth="0.3" opacity="0.9" />

              {/* Shelf 3 (bottom) */}
              <line x1="5" y1="68" x2="85" y2="68" stroke="#4a4e69" strokeWidth="0.5" opacity="0.4" />
              {/* 3 Block binders on left side */}
              <rect x="16" y="51" width="5" height="17" rx="0.5" fill="#DBDFEA" stroke="#4a4e69" strokeWidth="0.3" opacity="0.9" />
              <rect x="23" y="51" width="5" height="17" rx="0.5" fill="#DBDFEA" stroke="#4a4e69" strokeWidth="0.3" opacity="0.9" />
              <rect x="30" y="51" width="5" height="17" rx="0.5" fill="#DBDFEA" stroke="#4a4e69" strokeWidth="0.3" opacity="0.9" />


              {/* --- DESK & TABLE ACCESSORIES --- */}
              {/* Pen Cup */}
              <rect x="20" y="93" width="9" height="7" rx="1" fill="#E5E7EB" stroke="#4a4e69" strokeWidth="0.5" />
              <line x1="22" y1="93" x2="19" y2="85" stroke="#111216" strokeWidth="0.75" />
              <line x1="25" y1="93" x2="27" y2="82" stroke="#4a4e69" strokeWidth="0.75" />
              <line x1="27" y1="93" x2="24" y2="86" stroke="#E89295" strokeWidth="0.75" />

              {/* Table Structure */}
              {/* Desk Legs */}
              <line x1="17" y1="102" x2="17" y2="146" stroke="#2F2E41" strokeWidth="3" strokeLinecap="round" />
              <line x1="17" y1="102" x2="41" y2="146" stroke="#2F2E41" strokeWidth="3" strokeLinecap="round" />
              <line x1="118" y1="102" x2="118" y2="146" stroke="#2F2E41" strokeWidth="3" strokeLinecap="round" />
              <line x1="118" y1="102" x2="100" y2="146" stroke="#2F2E41" strokeWidth="3" strokeLinecap="round" />
              {/* Tabletop */}
              <rect x="12" y="100" width="114" height="4" rx="2" fill="#2F2E41" />


              {/* --- LEFT PERSON (CANDIDATE/DEVELOPER) --- */}
              {/* Stool leg details */}
              <line x1="52" y1="122" x2="52" y2="146" stroke="#E5E7EB" strokeWidth="2.5" />
              <line x1="64" y1="122" x2="64" y2="146" stroke="#E5E7EB" strokeWidth="2.5" />
              <ellipse cx="58" cy="120" rx="14" ry="4" fill="#E5E7EB" />
              
              {/* Legs/Pants */}
              <path d="M 46,110 Q 64,110 76,112 L 76,144 L 68,144 L 68,124 Q 54,122 54,144 L 46,144 Z" fill="#DBDFEA" />
              {/* Feet/Shoes */}
              <path d="M 68,144 L 80,144 C 81,145 80,146 76,146 L 68,146 Z" fill="#111216" />
              <path d="M 46,144 L 58,144 C 59,145 58,146 54,146 L 46,146 Z" fill="#111216" />

              {/* Torso */}
              <path d="M 46,110 Q 58,110 58,95 C 58,95 56,76 48,76 C 42,88 44,98 46,110 Z" fill="#FFFFFF" />
              {/* Neck */}
              <path d="M 52,76 C 52,70 54,72 54,66 L 50,66 C 50,72 50,76 52,76 Z" fill="#E89295" />
              {/* Face/Profile */}
              <path d="M 50,66 C 50,66 56,66 60,60 C 62,56 62,52 58,46 C 54,42 48,46 48,52 Z" fill="#E89295" />
              {/* Dark Hair */}
              <path d="M 48,52 C 45,46 50,40 58,40 C 62,40 60,46 58,48 C 56,50 54,54 50,56 Z" fill="#111216" />
              {/* Arms & Typing motion */}
              <path d="M 48,78 Q 58,84 68,92" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <path d="M 54,78 Q 66,80 72,92" stroke="#E89295" strokeWidth="3" strokeLinecap="round" />

              {/* Laptop Setup on Table */}
              <path d="M 74,100 L 98,100 L 100,102 L 72,102 Z" fill="#B0B3C3" />
              <path d="M 94,100 L 104,80 L 106,81 L 96,101 Z" fill="#C0C0C0" />
              <circle cx="100" cy="90" r="1.5" fill="#FFFFFF" />


              {/* --- RIGHT PERSON (EMPLOYER/INTERVIEWER) --- */}
              {/* Stool leg details */}
              <line x1="147" y1="122" x2="147" y2="146" stroke="#E5E7EB" strokeWidth="2.5" />
              <line x1="159" y1="122" x2="159" y2="146" stroke="#E5E7EB" strokeWidth="2.5" />
              <ellipse cx="153" cy="120" rx="14" ry="4" fill="#E5E7EB" />

              {/* Legs/Trousers */}
              <path d="M 154,112 Q 134,110 132,128 L 126,144 L 134,144 L 140,126 Q 148,126 148,144 L 155,144 Q 158,122 154,112 Z" fill="#2F2E41" />
              {/* Shoes */}
              <path d="M 126,144 L 132,143 C 133,144 132,146 128,146 L 122,146 Z" fill="#111216" />
              <path d="M 148,144 L 154,143 C 155,144 154,146 150,146 L 144,146 Z" fill="#111216" />

              {/* Torso */}
              <path d="M 136,112 C 136,112 144,90 144,84 C 144,78 152,78 155,84 C 158,90 156,104 154,112 Z" fill="#FFFFFF" />
              {/* Neck */}
              <path d="M 149,84 L 149,76 L 145,76 L 145,84 Z" fill="#734a52" />
              {/* Face/Profile */}
              <circle cx="147" cy="68" r="6" fill="#734a52" />
              {/* Hair/Bun */}
              <circle cx="148" cy="60" r="4.5" fill="#111216" />
              <path d="M 141,66 C 141,61 147,61 152,65 C 154,68 152,74 148,74 C 144,74 141,71 141,66 Z" fill="#111216" />

              {/* Document/Paper sheet */}
              <path d="M 126,94 L 138,90 L 144,112 L 132,116 Z" fill="#E5E7EB" stroke="#FFFFFF" strokeWidth="1" />
              {/* Hand/Arms */}
              <path d="M 152,84 Q 146,92 144,102" fill="none" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 150,84 C 144,88 138,102 144,106" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
              <path d="M 142,98 Q 138,102 135,108" fill="none" stroke="#734a52" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
