"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getGoogleAuthUrl, registerUser } from "@/lib/api";
import { saveStoredAuth } from "@/lib/auth";

export default function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await registerUser({
        name: fullName,
        email,
        password,
        userType: "Applicant",
      });

      saveStoredAuth(response);
      router.push("/employee-onboarding");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Sign up failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = getGoogleAuthUrl("Applicant");
  };

  return (
    <>
      <h2 className="mb-2 text-2xl font-bold text-primary dark:text-white md:text-3xl">
        Create Account
      </h2>
      <p className="mb-8 text-sm text-gray-600 dark:text-gray-300">
        Be part of a professional network designed to make job searching simple,
        modern, and accessible.
      </p>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Image
                src="/emailicon.jpeg"
                alt="Email Icon"
                width={16}
                height={16}
              />
            </span>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full rounded-lg border border-gray-400 bg-white py-3 pl-12 pr-4 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none dark:border-white/10 dark:bg-[#20212b] dark:text-white dark:placeholder:text-gray-500"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="fullname" className="sr-only">
            Full Name
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" stroke="#888" strokeWidth="2" />
                <path
                  d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4"
                  stroke="#888"
                  strokeWidth="2"
                />
              </svg>
            </span>
            <input
              id="fullname"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full rounded-lg border border-gray-400 bg-white py-3 pl-12 pr-4 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none dark:border-white/10 dark:bg-[#20212b] dark:text-white dark:placeholder:text-gray-500"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Image
                src="/passwordicon.jpeg"
                alt="Password Icon"
                width={16}
                height={16}
              />
            </span>
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
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
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg border border-gray-400 bg-white py-3 pl-12 pr-12 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none dark:border-white/10 dark:bg-[#20212b] dark:text-white dark:placeholder:text-gray-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? "Creating account..." : "Sign up"}
        </button>
      </form>
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200 dark:bg-white/10"></div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          or sign in with
        </span>
        <div className="h-px flex-1 bg-gray-200 dark:bg-white/10"></div>
      </div>
      <button
        type="button"
        onClick={handleGoogleSignUp}
        className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-200 py-3 font-semibold text-gray-700 shadow transition-colors hover:border-gray-300 dark:border-white/10 dark:bg-white dark:text-[#11121c] dark:hover:border-white/30"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
          alt="Google Icon"
          className="w-5 h-5"
        />
        Continue with Google
      </button>
      <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <Link
          href="/login/employee"
          className="text-accent hover:underline font-semibold"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
