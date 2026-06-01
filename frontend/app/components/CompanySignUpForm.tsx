"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getGoogleAuthUrl, registerUser } from "@/lib/api";
import { saveStoredAuth } from "@/lib/auth";

export default function CompanySignUpForm() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerUser({
        name: companyName,
        email,
        password,
        userType: "Employer",
        company: companyName,
      });

      saveStoredAuth(response);
      router.push("/company-profile");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = () => {
    window.location.href = getGoogleAuthUrl("Employer");
  };

  return (
    <>
      <h2 className="mb-2 text-2xl font-bold text-primary md:text-3xl">
        Register Now!
      </h2>
      <p className="mb-6 text-sm text-gray-600">
        Connect with skilled professionals, post job opportunities, and find the
        perfect candidates for your company faster and easier.
      </p>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="company" className="sr-only">
            Company name
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Image
                src="/companynameicon.jpeg"
                alt="Company"
                width={16}
                height={16}
              />
            </span>
            <input
              id="company"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company name"
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Company email
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Image src="/emailicon.jpeg" alt="Email" width={16} height={16} />
            </span>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Company email"
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none"
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
                alt="Password"
                width={16}
                height={16}
              />
            </span>
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((v) => !v)}
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
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-12 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirm" className="sr-only">
            Confirm password
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Image
                src="/passwordicon.jpeg"
                alt="Confirm"
                width={16}
                height={16}
              />
            </span>
            <button
              type="button"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
            >
              {showConfirmPassword ? (
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
              id="confirm"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-12 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-white transition-all hover:bg-opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Continuing..." : "Continue"}
          </button>
        </div>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200"></div>
        <span className="text-sm text-gray-500">
          — or sign in with —
        </span>
        <div className="h-px flex-1 bg-gray-200"></div>
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-200 py-3 font-semibold text-gray-700 shadow transition-colors hover:border-gray-300"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
          alt="Google Icon"
          className="w-5 h-5"
        />
        Continue with Google
      </button>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already registered?{" "}
        <Link
          href="/employer"
          className="text-accent font-semibold hover:underline"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
