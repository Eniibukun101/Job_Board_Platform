"use client";

import Image from "next/image";
import Link from "next/link";
import { User, Building, ArrowRight, Home } from "lucide-react";

export default function LoginSelectionPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f8fafc] p-6 dark:bg-[#20212b] sm:p-12">
      {/* Decorative background glow circles */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-4xl flex flex-col items-center z-10">
        {/* Logo and Home Navigation */}
        <div className="mb-10 flex flex-col items-center gap-4">
          <Link href="/" className="hover:scale-105 transition-transform">
            <Image
              src="/logo-removebg-preview.png"
              alt="Jobnest"
              width={160}
              height={50}
              priority
              className="h-12 w-auto rounded-xl object-contain shadow-lg ring-1 ring-black/10 dark:ring-white/10"
            />
          </Link>
        </div>

        {/* Title Block */}
        <div className="text-center mb-12">
          <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-[#11121c] dark:text-white sm:text-4xl">
            Welcome to JobNest
          </h1>
          <p className="mx-auto max-w-md text-sm text-gray-600 dark:text-gray-400 sm:text-base">
            Choose your account type to proceed to the secure sign-in workspace.
          </p>
        </div>

        {/* Workspace Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Card 1: Employee */}
          <Link
            href="/login/employee"
            className="group relative flex min-h-[300px] cursor-pointer flex-col justify-between rounded-[24px] border border-gray-200 bg-white p-8 text-left shadow-[0_10px_30px_-10px_rgba(15,23,42,0.18)] transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-50/60 hover:shadow-[0_20px_40px_-5px_rgba(99,102,241,0.15)] dark:border-white/5 dark:bg-[#272935] dark:hover:bg-[#2e3140]"
          >
            {/* Top Info */}
            <div>
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                <User className="w-7 h-7" />
              </div>
              <h2 className="mb-3 text-xl font-extrabold text-[#11121c] dark:text-white">
                Sign in as Employee
              </h2>
              <p className="mb-6 text-xs leading-relaxed text-gray-600 dark:text-gray-400 sm:text-sm">
                Are you looking for your next career move? Sign in to apply to
                vacancies, manage your applications, and track scheduled
                interviews.
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
            className="group relative flex min-h-[300px] cursor-pointer flex-col justify-between rounded-[24px] border border-gray-200 bg-white p-8 text-left shadow-[0_10px_30px_-10px_rgba(15,23,42,0.18)] transition-all duration-300 hover:border-cyan-500/30 hover:bg-cyan-50/60 hover:shadow-[0_20px_40px_-5px_rgba(6,182,212,0.15)] dark:border-white/5 dark:bg-[#272935] dark:hover:bg-[#2e3140]"
          >
            {/* Top Info */}
            <div>
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                <Building className="w-7 h-7" />
              </div>
              <h2 className="mb-3 text-xl font-extrabold text-[#11121c] dark:text-white">
                Sign in as Company
              </h2>
              <p className="mb-6 text-xs leading-relaxed text-gray-600 dark:text-gray-400 sm:text-sm">
                Looking to recruit top talent? Sign in to publish active
                vacancies, review incoming applicant CVs, and schedule
                interviews.
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
          className="mt-12 inline-flex items-center gap-2 text-xs font-semibold text-gray-500 transition-colors hover:text-[#11121c] dark:text-gray-400 dark:hover:text-white"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </main>
  );
}
