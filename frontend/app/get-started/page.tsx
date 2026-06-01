import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building, Home, UserPlus } from "lucide-react";

export default function GetStartedSelectionPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f8fafc] p-6 transition-colors duration-300 dark:bg-[#20212b] sm:p-12">
      <div className="pointer-events-none absolute left-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="z-10 flex w-full max-w-4xl flex-col items-center">
        <div className="mb-10 flex flex-col items-center gap-4">
          <Link href="/" className="transition-transform hover:scale-105">
            <Image
              src="/logo.jpeg"
              alt="Jobnest"
              width={160}
              height={50}
              priority
              className="h-12 w-auto rounded-xl object-contain shadow-lg ring-1 ring-black/10 dark:ring-white/10"
            />
          </Link>
        </div>

        <div className="mb-12 text-center">
          <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-[#11121c] dark:text-white sm:text-4xl">
            Get started with JobNest
          </h1>
          <p className="mx-auto max-w-md text-sm text-gray-600 dark:text-gray-400 sm:text-base">
            Choose your account type to create your secure workspace.
          </p>
        </div>

        <div className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
          <Link
            href="/signup"
            className="group relative flex min-h-[300px] cursor-pointer flex-col justify-between rounded-[24px] border border-gray-200 bg-white p-8 text-left shadow-[0_10px_30px_-10px_rgba(15,23,42,0.18)] transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-50/60 hover:shadow-[0_20px_40px_-5px_rgba(99,102,241,0.15)] dark:border-white/5 dark:bg-[#272935] dark:hover:bg-[#2e3140]"
          >
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white">
                <UserPlus className="h-7 w-7" />
              </div>
              <h2 className="mb-3 text-xl font-extrabold text-[#11121c] dark:text-white">
                Get started as Employee
              </h2>
              <p className="mb-6 text-xs leading-relaxed text-gray-600 dark:text-gray-400 sm:text-sm">
                Create your candidate account, build your profile, upload your
                CV, and start applying to jobs that match your goals.
              </p>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 group-hover:text-indigo-300">
              <span>Create Candidate Account</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
            </div>
          </Link>

          <Link
            href="/company-signup"
            className="group relative flex min-h-[300px] cursor-pointer flex-col justify-between rounded-[24px] border border-gray-200 bg-white p-8 text-left shadow-[0_10px_30px_-10px_rgba(15,23,42,0.18)] transition-all duration-300 hover:border-cyan-500/30 hover:bg-cyan-50/60 hover:shadow-[0_20px_40px_-5px_rgba(6,182,212,0.15)] dark:border-white/5 dark:bg-[#272935] dark:hover:bg-[#2e3140]"
          >
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white">
                <Building className="h-7 w-7" />
              </div>
              <h2 className="mb-3 text-xl font-extrabold text-[#11121c] dark:text-white">
                Get started as Company
              </h2>
              <p className="mb-6 text-xs leading-relaxed text-gray-600 dark:text-gray-400 sm:text-sm">
                Register your company workspace to publish vacancies, review
                applicants, and manage interviews from one place.
              </p>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 group-hover:text-cyan-300">
              <span>Create Employer Workspace</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
            </div>
          </Link>
        </div>

        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-2 text-xs font-semibold text-gray-500 transition-colors hover:text-[#11121c] dark:text-gray-400 dark:hover:text-white"
        >
          <Home className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </main>
  );
}
