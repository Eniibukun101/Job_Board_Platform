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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [countryCode, setCountryCode] = useState("+234"); // Default to Nigeria
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Common country codes
  const countryCodes = [
    { code: "+1", country: "US/CA" },
    { code: "+44", country: "UK" },
    { code: "+234", country: "NG" },
    { code: "+27", country: "ZA" },
    { code: "+254", country: "KE" },
    { code: "+233", country: "GH" },
    { code: "+91", country: "IN" },
    { code: "+86", country: "CN" },
    { code: "+81", country: "JP" },
    { code: "+49", country: "DE" },
    { code: "+33", country: "FR" },
  ];

  // Generate arrays for dropdowns
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const calculateAge = (day: string, month: string, year: string): number => {
    if (!day || !month || !year) return 0;
    
    const today = new Date();
    const birth = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const validatePhoneNumber = (phone: string, code: string): boolean => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, "");
    
    // Define expected lengths for different country codes
    const phoneLengths: { [key: string]: number[] } = {
      "+1": [10], // US/Canada
      "+44": [10], // UK
      "+234": [10], // Nigeria
      "+27": [9], // South Africa
      "+254": [9], // Kenya
      "+233": [9], // Ghana
      "+91": [10], // India
      "+86": [11], // China
      "+81": [10], // Japan
      "+49": [10, 11], // Germany
      "+33": [9], // France
    };

    const expectedLengths = phoneLengths[code] || [7, 8, 9, 10, 11]; // Default range
    return expectedLengths.includes(cleanPhone.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate age
    if (birthDay && birthMonth && birthYear) {
      const age = calculateAge(birthDay, birthMonth, birthYear);
      if (age < 16) {
        setError("You must be at least 16 years old to use JobNest.");
        return;
      }
    }

    // Validate phone number
    if (!validatePhoneNumber(phoneNumber, countryCode)) {
      setError(`Please enter a valid phone number for ${countryCode}. The number should contain only digits.`);
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerUser({
        name: `${firstName} ${lastName}`,
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
      <h2 className="mb-2 text-2xl font-bold text-primary md:text-3xl">
        Create Account
      </h2>
      <p className="mb-8 text-sm text-gray-600">
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
              className="w-full rounded-lg border border-gray-400 bg-white py-3 pl-12 pr-4 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstname" className="sr-only">
              First Name
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
                id="firstname"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full rounded-lg border border-gray-400 bg-white py-3 pl-12 pr-4 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="lastname" className="sr-only">
              Last Name
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
                id="lastname"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full rounded-lg border border-gray-400 bg-white py-3 pl-12 pr-4 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <div className="grid grid-cols-3 gap-3">
            <select
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
              className="rounded-lg border border-gray-400 bg-white py-3 px-4 text-gray-900 transition-colors focus:border-primary focus:outline-none"
              required
            >
              <option value="">Month</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <select
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              className="rounded-lg border border-gray-400 bg-white py-3 px-4 text-gray-900 transition-colors focus:border-primary focus:outline-none"
              required
            >
              <option value="">Day</option>
              {days.map((day) => (
                <option key={day} value={day.toString().padStart(2, "0")}>
                  {day}
                </option>
              ))}
            </select>
            <select
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              className="rounded-lg border border-gray-400 bg-white py-3 px-4 text-gray-900 transition-colors focus:border-primary focus:outline-none"
              required
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <p className="mt-1 text-xs text-gray-500">You must be at least 16 years old</p>
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">
            Phone Number
          </label>
          <div className="flex gap-2">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-28 rounded-lg border border-gray-400 bg-white py-3 px-3 text-gray-900 transition-colors focus:border-primary focus:outline-none"
            >
              {countryCodes.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.code} {item.country}
                </option>
              ))}
            </select>
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#888" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </span>
              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  // Only allow digits, spaces, hyphens, and parentheses
                  const value = e.target.value.replace(/[^\d\s\-()]/g, "");
                  setPhoneNumber(value);
                }}
                placeholder="Phone Number"
                pattern="[\d\s\-()]+"
                className="w-full rounded-lg border border-gray-400 bg-white py-3 pl-12 pr-4 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none"
                required
              />
            </div>
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
              className="w-full rounded-lg border border-gray-400 bg-white py-3 pl-12 pr-12 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none"
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
        <div className="h-px flex-1 bg-gray-200"></div>
        <span className="text-sm text-gray-500">
          or sign in with
        </span>
        <div className="h-px flex-1 bg-gray-200"></div>
      </div>
      <button
        type="button"
        onClick={handleGoogleSignUp}
        className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-200 py-3 font-semibold text-gray-700 shadow transition-colors hover:border-gray-300"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
          alt="Google Icon"
          className="w-5 h-5"
        />
        Continue with Google
      </button>
      <p className="mt-8 text-center text-sm text-gray-600">
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
