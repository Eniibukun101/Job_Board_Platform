"use client";

import Image from "next/image";
import Link from "next/link";
import { User, Building, ArrowRight, Home } from "lucide-react";

export default function LoginSelectionPage() {
  return (
    <main className="relative min-h-screen bg-[#20212b] flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden">
      {/* Decorative background glow circles */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-4xl flex flex-col items-center z-10">
        
        {/* Logo and Home Navigation */}
        <div className="mb-10 flex flex-col items-center gap-4">
          <Link href="/" className="hover:scale-105 transition-transform">
            <Image
              src="/logo.jpeg"
              alt="Jobnest"
              width={160}
              height={50}
              priority
              className="h-12 w-auto object-contain rounded-xl shadow-lg ring-1 ring-white/10"
            />
          </Link>
        </div>

        {/* Title Block */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Welcome to JobNest
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
            Choose your account type to proceed to the secure sign-in workspace.
          </p>
        </div>

        {/* Workspace Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          
          {/* Card 1: Employee */}
          <Link 
            href="/login/employee"
            className="group relative bg-[#272935] hover:bg-[#2e3140] rounded-[24px] p-8 text-left transition-all duration-300 border border-white/5 hover:border-indigo-500/30 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_-5px_rgba(99,102,241,0.15)] flex flex-col justify-between min-h-[300px] cursor-pointer"
          >
            {/* Top Info */}
            <div>
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                <User className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-extrabold text-white mb-3">
                Sign in as Employee
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                Are you looking for your next career move? Sign in to apply to vacancies, manage your applications, and track scheduled interviews.
              </p>
            </div>

            {/* Bottom Arrow Action */}
            <div className="flex items-center gap-2 text-indigo-400 group-hover:text-indigo-300 font-bold text-xs uppercase tracking-wider mt-4">
              <span>Candidate Portal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </Link>

          {/* Card 2: Company */}
          <Link 
            href="/employer"
            className="group relative bg-[#272935] hover:bg-[#2e3140] rounded-[24px] p-8 text-left transition-all duration-300 border border-white/5 hover:border-cyan-500/30 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_-5px_rgba(6,182,212,0.15)] flex flex-col justify-between min-h-[300px] cursor-pointer"
          >
            {/* Top Info */}
            <div>
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                <Building className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-extrabold text-white mb-3">
                Sign in as Company
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                Looking to recruit top talent? Sign in to publish active vacancies, review incoming applicant CVs, and schedule interviews.
              </p>
            </div>

            {/* Bottom Arrow Action */}
            <div className="flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300 font-bold text-xs uppercase tracking-wider mt-4">
              <span>Employer Workspace</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </Link>

        </div>

        {/* Back Link */}
        <Link 
          href="/" 
          className="mt-12 inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xs font-semibold"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

      </div>
    </main>
  );
}
