"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  savePassword: boolean;
  setSavePassword: (save: boolean) => void;
  error: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleSignIn: () => void;
}

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  savePassword,
  setSavePassword,
  error,
  isLoading,
  onSubmit,
  onGoogleSignIn,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {/* Mobile logo */}
      <div className="md:hidden mb-8 flex justify-center">
        <Image
          src="/logo-removebg-preview.png"
          alt="Jobnest Logo"
          width={56}
          height={56}
          className="rounded-lg"
        />
      </div>

      <h2 className="mb-2 text-3xl font-bold text-primary">
        Welcome back!
      </h2>
      <p className="mb-8 text-sm text-gray-600">
        Welcome back! Continue building your profile, applying for jobs, and
        discovering opportunities that match your career goals.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
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
              className="w-full rounded-lg border-2 border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none"
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
              className="w-full rounded-lg border-2 border-gray-200 bg-white py-3 pl-12 pr-12 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={savePassword}
              onChange={(e) => setSavePassword(e.target.checked)}
              className="w-4 h-4 accent-primary rounded"
            />
            <span className="text-sm text-gray-600">
              Save password
            </span>
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-accent hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-6"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <div className="flex items-center gap-4 my-6">
        <div className="h-px flex-1 bg-gray-200"></div>
        <span className="text-sm text-gray-500">
          or sign in with
        </span>
        <div className="h-px flex-1 bg-gray-200"></div>
      </div>

      <button
        type="button"
        onClick={onGoogleSignIn}
        className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-200 py-3 font-semibold text-gray-700 transition-colors hover:border-gray-300"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
          alt="Google Icon"
          className="w-5 h-5"
        />
        Continue with Google
      </button>

      <p className="mt-8 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-accent hover:underline"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
