"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState<"email" | "verification">("email");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccess("Verification code sent to your email!");
      setStep("verification");
    }, 1500);
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (verificationCode.length === 6) {
        setSuccess("Code verified! Redirecting to reset password...");
        // In a real app, redirect to reset password page
      } else {
        setError("Please enter a valid 6-digit code");
      }
    }, 1500);
  };

  return (
    <div className="relative flex min-h-screen bg-white">
      {/* Left Section - Welcome/Illustration */}
      <div className="relative hidden flex-col items-center justify-center bg-white px-12 md:flex md:w-[52%]">
        {/* Logo */}
        <div className="absolute top-8 left-8">
          <Image
            src="/logo-removebg-preview.png"
            alt="Jobnest Logo"
            width={140}
            height={140}
            className="rounded-lg"
          />
        </div>

        {/* Welcome content */}
        <div className="text-center max-w-xl w-full flex flex-col items-center justify-center">
          <div className="mb-8 flex justify-center">
            <Image
              src="/HompageIllustration.jpeg"
              alt="Password recovery illustration"
              width={720}
              height={720}
              className="rounded-2xl"
            />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-[#11121c]">
            Forgot Your Password?
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            No worries! Enter your email address and we'll send you a
            verification code to reset your password and get you back on track.
          </p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex min-h-screen w-full items-center justify-center px-6 py-10 md:w-[48%] md:px-10">
        <div className="w-full max-w-lg rounded-[28px] border border-[#F1EAF8] bg-white px-6 py-8 shadow-[0_20px_60px_rgba(45,38,57,0.08)] md:px-10 md:py-10">
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

          {/* Back to Sign In Link */}
          <Link
            href="/login/employee"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>

          <h2 className="mb-2 text-3xl font-bold text-primary">
            {step === "email" ? "Reset Password" : "Enter Verification Code"}
          </h2>
          <p className="mb-8 text-sm text-gray-600">
            {step === "email"
              ? "Enter your email address and we'll send you a verification code."
              : "We've sent a 6-digit verification code to your email."}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
              {success}
            </div>
          )}

          {step === "email" ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? "Sending code..." : "Send Verification Code"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerificationSubmit} className="space-y-4">
              <div>
                <label htmlFor="code" className="sr-only">
                  Verification Code
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    id="code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 6) {
                        setVerificationCode(value);
                      }
                    }}
                    placeholder="Enter 6-digit code"
                    className="w-full rounded-lg border-2 border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none tracking-widest text-center text-lg font-semibold"
                    maxLength={6}
                    required
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500 text-center">
                  Enter the 6-digit code sent to {email}
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || verificationCode.length !== 6}
                className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? "Verifying..." : "Verify Code"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setVerificationCode("");
                  setSuccess("");
                  setError("");
                }}
                className="w-full text-sm text-gray-600 hover:text-primary transition-colors mt-4"
              >
                Didn't receive the code? Try again
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                href="/login/employee"
                className="font-semibold text-accent hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
