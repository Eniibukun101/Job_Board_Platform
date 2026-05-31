"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { updateCurrentUserProfile } from "@/lib/api";
import { getStoredAuth, updateStoredUser } from "@/lib/auth";

export default function CompanyProfilePage() {
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedAuth = getStoredAuth();
    if (!storedAuth?.user) return;

    setIndustry(storedAuth.user.industry || "");
    setWebsite(storedAuth.user.website || "");
    setLocation(storedAuth.user.location || "");
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    const storedAuth = getStoredAuth();
    if (!storedAuth?.token) {
      setError(
        "Please sign in as an employer before saving your company profile.",
      );
      return;
    }

    setIsSaving(true);

    try {
      const response = await updateCurrentUserProfile(
        {
          industry,
          website,
          location,
        },
        storedAuth.token,
      );

      updateStoredUser(response.user);
      setSuccessMessage("Your company profile has been saved.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save your company profile.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-white p-4 md:p-7">
      <section className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1440px] overflow-hidden rounded-[18px] bg-[#20212b] md:min-h-[calc(100vh-3.5rem)]">
        <div className="hidden w-[52%] flex-col justify-center bg-[#20212b] px-14 py-12 text-white lg:flex xl:px-20">
          <div className="flex justify-center">
            <Image
              src="/companysignupillustration2.png"
              alt="Company profile illustration"
              width={560}
              height={420}
              priority
              className="h-auto w-full max-w-[560px] object-contain"
            />
          </div>

          <div className="mt-16 max-w-[520px]">
            <h1 className="text-3xl font-extrabold leading-tight tracking-normal xl:text-4xl">
              Hire Smarter With <br />
              JobNest
            </h1>
            <p className="mt-5 max-w-[500px] text-base leading-6 text-gray-100">
              Access a growing network of talented candidates ready to help your
              company succeed.
            </p>
          </div>
        </div>

        <div className="flex w-full items-center bg-white px-8 py-16 lg:w-[48%] lg:rounded-l-[64px] lg:px-12 xl:px-16">
          <div className="mx-auto w-full max-w-[520px]">
            <h2 className="text-2xl font-extrabold text-black md:text-3xl">
              Tell us more about
            </h2>
            <p className="mt-5 text-sm text-gray-500">
              Let us get to know your company
            </p>

            {error && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="industry"
                  className="mb-2 block text-base font-bold text-black"
                >
                  Industry
                </label>
                <input
                  id="industry"
                  value={industry}
                  onChange={(event) => setIndustry(event.target.value)}
                  placeholder="e.g computer Science"
                  className="h-11 w-full rounded-[9px] border border-[#1f2430] px-4 text-sm text-gray-900 outline-none placeholder:text-[11px] placeholder:font-semibold placeholder:text-gray-500 focus:border-accent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="mb-2 block text-base font-bold text-black"
                >
                  Website Url
                </label>
                <input
                  id="website"
                  type="url"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                  placeholder="e.g https://signup.ng"
                  className="h-11 w-full rounded-[9px] border border-[#1f2430] px-4 text-sm text-gray-900 outline-none placeholder:text-[11px] placeholder:font-semibold placeholder:text-gray-500 focus:border-accent"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-base font-bold text-black"
                >
                  Location
                </label>
                <input
                  id="location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="address, country"
                  className="h-11 w-full rounded-[9px] border border-[#1f2430] px-4 text-sm text-gray-900 outline-none placeholder:text-[11px] placeholder:font-semibold placeholder:text-gray-500 focus:border-accent"
                  required
                />
              </div>

              <div className="flex items-center justify-between gap-4 pt-5">
                <Link
                  href="/company-signup"
                  className="flex h-10 min-w-[104px] items-center justify-center rounded-full border border-gray-300 px-5 text-sm font-semibold text-[#20212b] transition-colors hover:border-[#20212b]"
                >
                  Back
                </Link>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex h-10 min-w-[112px] items-center justify-center rounded-full bg-[#20212b] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#2c2d39] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSaving ? "Saving..." : "Continue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
