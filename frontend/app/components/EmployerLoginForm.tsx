"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getGoogleAuthUrl, loginUser } from "@/lib/api";
import { clearStoredAuth, saveStoredAuth } from "@/lib/auth";

export default function EmployerLoginForm() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await loginUser({ email, password });

      if (response.user.userType !== "Employer") {
        clearStoredAuth();
        setError("This login page is for employer accounts only.");
        return;
      }

      if (
        companyName &&
        response.user.company &&
        response.user.company.toLowerCase() !== companyName.toLowerCase()
      ) {
        setError("Company name does not match this employer account.");
        return;
      }

      saveStoredAuth(response);
      router.push("/portal/employer");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Sign in failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = () => {
    window.location.href = getGoogleAuthUrl("Employer");
  };

  return (
    <div className="flex min-h-full w-full items-center">
      <div className="w-full max-w-[460px] lg:max-w-[510px]">
        <h1 className="text-2xl font-extrabold text-black dark:text-white sm:text-3xl">
          Already back
        </h1>
        <p className="mt-9 max-w-[430px] text-sm leading-5 text-gray-500 dark:text-gray-300">
          Welcome back, Employer. Manage job postings, review applications, and
          discover top talent all in one place.
        </p>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-12 space-y-8">
          <label htmlFor="companyName" className="sr-only">
            Company name
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center">
              <Image
                src="/companynameicon.jpeg"
                alt=""
                width={23}
                height={18}
              />
            </span>
            <input
              id="companyName"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              placeholder="Company name"
              className="h-10 w-full rounded-[8px] border border-[#1f2430] bg-white pl-14 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-[11px] placeholder:text-gray-500 focus:border-accent dark:border-white/10 dark:bg-[#20212b] dark:text-white dark:placeholder:text-gray-500"
              required
            />
          </div>

          <label htmlFor="companyEmail" className="sr-only">
            Company email
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center">
              <Image src="/emailicon.jpeg" alt="" width={23} height={18} />
            </span>
            <input
              id="companyEmail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Company email"
              className="h-10 w-full rounded-[8px] border border-[#1f2430] bg-white pl-14 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-[11px] placeholder:text-gray-500 focus:border-accent dark:border-white/10 dark:bg-[#20212b] dark:text-white dark:placeholder:text-gray-500"
              required
            />
          </div>

          <label htmlFor="companyPassword" className="sr-only">
            Password
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center">
              <Image src="/passwordicon.jpeg" alt="" width={23} height={18} />
            </span>
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
            >
              {showPassword ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c6.5 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3.5 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="4" x2="20" y1="4" y2="20" />
                </svg>
              )}
            </button>
            <input
              id="companyPassword"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="h-10 w-full rounded-[8px] border border-[#1f2430] bg-white pl-14 pr-11 text-sm text-gray-900 outline-none transition-colors placeholder:text-[11px] placeholder:text-gray-500 focus:border-accent dark:border-white/10 dark:bg-[#20212b] dark:text-white dark:placeholder:text-gray-500"
              required
            />
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex h-11 w-full max-w-[260px] items-center justify-center rounded-[8px] bg-[#20212b] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#2c2d39] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <div className="mx-auto mt-14 flex w-full max-w-[260px] items-center gap-2">
          <div className="h-px flex-1 bg-gray-300 dark:bg-white/10" />
          <span className="text-[11px] font-medium text-gray-400">
            or sign in with
          </span>
          <div className="h-px flex-1 bg-gray-300 dark:bg-white/10" />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          className="mx-auto mt-9 flex h-11 w-full max-w-[260px] items-center justify-center gap-2 rounded-[8px] bg-white text-[11px] font-medium text-gray-600 shadow-[0_4px_8px_rgba(0,0,0,0.22)] transition-transform hover:-translate-y-0.5"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            alt=""
            className="h-4 w-4"
          />
          Continue with Google
        </button>

        <p className="mt-8 text-center text-[11px] font-semibold text-gray-500 dark:text-gray-300">
          Don&apos;t have an account?{" "}
          <Link href="/company-signup" className="text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
