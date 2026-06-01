"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building, Home, User } from "lucide-react";

export default function GetStartedSelectionPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[#20212b] px-6 py-10 text-white sm:px-10">
      <div className="pointer-events-none absolute left-[-12%] top-[-18%] h-[560px] w-[560px] rounded-full bg-indigo-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-20%] right-[-12%] h-[560px] w-[560px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10 flex w-full max-w-[760px] flex-col items-center">
        <Link href="/" className="transition-transform hover:scale-[1.03]">
          <Image
            src="/logo.jpeg"
            alt="Jobnest"
            width={230}
            height={76}
            priority
            className="h-[74px] w-auto rounded-[18px] bg-white object-contain shadow-xl ring-1 ring-white/10"
          />
        </Link>

        <div className="mt-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl">
            Welcome to JobNest
          </h1>
          <p className="mt-8 text-lg leading-7 text-gray-300 sm:text-xl">
            Choose your account type to create your workspace.
          </p>
        </div>

        <div className="mt-20 flex w-full flex-col gap-8">
          <Link
            href="/signup"
            className="group rounded-[32px] border border-white/10 bg-[#292b36] p-10 text-left shadow-[0_18px_50px_-28px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-[#303240] hover:shadow-[0_24px_60px_-30px_rgba(129,140,248,0.55)] sm:p-12"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-[22px] bg-indigo-500/10 text-indigo-400 transition-all duration-300 group-hover:bg-indigo-500 group-hover:text-white">
              <User className="h-10 w-10" />
            </div>
            <h2 className="mt-12 text-3xl font-extrabold tracking-[-0.02em] text-white">
              Sign up as Employee
            </h2>
            <p className="mt-7 max-w-[620px] text-lg leading-8 text-gray-300">
              Create your candidate profile, discover vacancies, manage applications, and track scheduled interviews.
            </p>
            <div className="mt-20 flex items-center gap-4 text-lg font-black uppercase tracking-wider text-indigo-400">
              <span>Candidate Portal</span>
              <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-2" />
            </div>
          </Link>

          <Link
            href="/company-signup"
            className="group rounded-[32px] border border-white/10 bg-[#292b36] p-10 text-left shadow-[0_18px_50px_-28px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-[#303240] hover:shadow-[0_24px_60px_-30px_rgba(34,211,238,0.5)] sm:p-12"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-[22px] bg-cyan-500/10 text-cyan-400 transition-all duration-300 group-hover:bg-cyan-500 group-hover:text-white">
              <Building className="h-10 w-10" />
            </div>
            <h2 className="mt-12 text-3xl font-extrabold tracking-[-0.02em] text-white">
              Sign up as Company
            </h2>
            <p className="mt-7 max-w-[620px] text-lg leading-8 text-gray-300">
              Create your employer workspace, publish vacancies, review incoming applicant CVs, and schedule interviews.
            </p>
            <div className="mt-20 flex items-center gap-4 text-lg font-black uppercase tracking-wider text-cyan-400">
              <span>Employer Workspace</span>
              <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-2" />
            </div>
          </Link>
        </div>

        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-white"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
