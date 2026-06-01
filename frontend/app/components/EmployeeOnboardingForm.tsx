"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateCurrentUserProfile } from "@/lib/api";
import { getStoredAuth, updateStoredUser } from "@/lib/auth";

const jobTypes = ["Full time", "Part-time", "Contract", "Internship"];

const salaryRanges = [
  "$50 - $100k/year",
  "$100k - $150k/year",
  "$150k - $200k/year",
  "$200k+/year",
];

const qualifications = [
  "High School",
  "Diploma",
  "Bachelor Degree",
  "Master Degree",
  "PhD",
  "Professional Certificate",
];

export default function EmployeeOnboardingForm() {
  const router = useRouter();
  const [jobType, setJobType] = useState("Part-time");
  const [salaryRange, setSalaryRange] = useState(salaryRanges[0]);
  const [role, setRole] = useState("");
  const [qualification, setQualification] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedAuth = getStoredAuth();
    if (!storedAuth?.user) return;

    setJobType(storedAuth.user.preferredJobType || "Part-time");
    setSalaryRange(storedAuth.user.expectedSalaryRange || salaryRanges[0]);
    setRole(storedAuth.user.role || "");
    setQualification(storedAuth.user.qualification || "");
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    const storedAuth = getStoredAuth();
    if (!storedAuth?.token) {
      setError(
        "Please create an account or sign in before saving your onboarding details.",
      );
      return;
    }

    setIsSaving(true);

    try {
      const response = await updateCurrentUserProfile(
        {
          preferredJobType: jobType,
          expectedSalaryRange: salaryRange,
          role,
          qualification,
        },
        storedAuth.token,
      );

      updateStoredUser(response.user);
      setSuccessMessage("You’re all set! Your preferences have been saved.");
      router.push("/portal/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save your onboarding details.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f2f2f2] px-6 py-6 font-sans text-[#11121c] md:px-10">
      <header className="flex items-center">
        <Image
          src="/logo-removebg-preview.png"
          alt="Jobnest Logo"
          width={120}
          height={120}
          priority
          className="rounded-lg"
        />
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-[1280px] grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-center">
          <div className="w-full max-w-[520px]">
            <Image
              src="/roleilliustrationpage.png"
              alt="Person using a laptop"
              width={600}
              height={460}
              priority
              className="h-auto w-full object-contain"
            />
            <div className="mt-12 h-px w-full bg-gray-300" />
            <p className="mt-16 max-w-[420px] text-sm font-semibold leading-5 text-black">
              Let&apos;s get to know you and find the perfect career opportunity
              for your future.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-[560px]">
          <div className="absolute -left-12 -top-10 hidden h-[520px] w-[430px] rotate-[13deg] rounded-[18px] bg-black/5 lg:block" />
          <div className="absolute -bottom-10 right-2 hidden h-[560px] w-[430px] rotate-[10deg] rounded-[18px] bg-black/5 lg:block" />

          <form
            onSubmit={handleSubmit}
            className="relative rounded-[18px] bg-white px-8 py-10 font-sans shadow-[0_4px_6px_rgba(0,0,0,0.18)] md:px-10 md:py-12"
          >
            <h1 className="text-2xl font-bold text-primary md:text-3xl">
              What role do you want to find?
            </h1>
            <p className="mt-5 max-w-[430px] text-sm leading-5 text-gray-600">
              Tell us what kind of job you&apos;re targeting so we can tailor
              your search and recommendations.
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

            <div className="mt-9">
              <label className="text-sm font-semibold text-primary">
                Job type
              </label>
              <div className="mt-3 flex flex-wrap gap-3">
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setJobType(type)}
                    className={`h-6 rounded-full border px-4 font-sans text-[11px] font-semibold transition-colors ${
                      jobType === type
                        ? "border-[#20212b] bg-[#20212b] text-white"
                        : "border-[#20212b] bg-white text-[#20212b] hover:bg-gray-100"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <label
                htmlFor="salaryRange"
                className="text-sm font-semibold text-primary"
              >
                Expected salary range
              </label>
              <select
                id="salaryRange"
                value={salaryRange}
                onChange={(event) => setSalaryRange(event.target.value)}
                className="mt-3 h-12 w-full rounded-[12px] border border-[#20212b] bg-white px-5 font-sans text-sm text-gray-700 outline-none focus:border-accent"
              >
                {salaryRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-8">
              <label
                htmlFor="role"
                className="text-sm font-semibold text-primary"
              >
                Your role
              </label>
              <input
                id="role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                placeholder="e.g UI/UX designer"
                className="mt-3 h-12 w-full rounded-[12px] border border-[#20212b] bg-white px-5 font-sans text-sm text-gray-900 outline-none placeholder:text-[11px] placeholder:font-semibold placeholder:text-gray-400 focus:border-accent"
                required
              />
            </div>

            <div className="mt-8">
              <label
                htmlFor="qualification"
                className="text-sm font-semibold text-primary"
              >
                Highest Qualification
              </label>
              <select
                id="qualification"
                value={qualification}
                onChange={(event) => setQualification(event.target.value)}
                className="mt-3 h-12 w-full rounded-[12px] border border-[#20212b] bg-white px-5 font-sans text-sm text-gray-700 outline-none focus:border-accent"
                required
              >
                <option value="">e.g Diploma</option>
                {qualifications.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-16 flex justify-end gap-3">
              <Link
                href="/signup"
                className="flex h-10 min-w-[78px] items-center justify-center rounded-full bg-gray-200 px-5 font-sans text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-300"
              >
                Back
              </Link>
              <button
                type="submit"
                disabled={isSaving}
                className="flex h-10 min-w-[78px] items-center justify-center rounded-full bg-[#20212b] px-5 font-sans text-sm font-semibold text-white transition-colors hover:bg-[#2c2d39] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? "Saving..." : "Next"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
