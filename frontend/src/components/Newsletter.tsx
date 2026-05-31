import React, { useState } from "react";
import { Mail, CheckCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section id="newsletter-section" className="py-16 px-6 bg-[#f4f5f7]">
      <div className="max-w-4xl mx-auto">
        
        {/* Newsletter Dark Box Container */}
        <div className="bg-[#21222D] text-white p-8 md:p-12 rounded-3xl overflow-hidden shadow-2xl relative border border-gray-800">
          
          {/* Subtle decoration dots / circles */}
          <div className="absolute right-0 bottom-0 w-44 h-44 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content column */}
            <div className="md:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest font-mono text-indigo-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" /> Stay informed
              </span>
              <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
                Get weekly job alerts, career advice, and exclusive opportunities delivered straight to your inbox.
              </h3>

              {/* Connected Input form */}
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 bg-indigo-900/30 text-indigo-300 rounded-2xl border border-indigo-800 text-xs font-semibold flex items-center gap-2 max-w-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                    Subscribed! We’ve sent a confirmation to {email}
                  </motion.div>
                ) : (
                  <motion.form 
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-2 max-w-md"
                  >
                    <div className="relative w-full">
                      <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full bg-gray-900/60 border border-gray-800 focus:border-indigo-500 focus:bg-gray-900 text-white rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none placeholder-gray-500"
                        id="newsletter-email"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="bg-white hover:bg-gray-100 text-[#21222D] font-bold text-xs px-6 py-2.5 rounded-xl transition-all cursor-pointer shrink-0"
                      id="newsletter-submit-trigger"
                    >
                      Subscribe
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Right Insignia stamp column */}
            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="w-24 h-24 border-2 border-dashed border-gray-700 rounded-full flex items-center justify-center p-2 transform rotate-12 opacity-40">
                <div className="border border-dashed border-gray-750 rounded-full w-full h-full flex flex-col items-center justify-center text-[8px] tracking-widest text-center text-gray-400 select-none">
                  <span className="font-mono uppercase font-black">CONFIDENTIAL</span>
                  <span className="text-[6px] font-sans">© JOBNEST</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
