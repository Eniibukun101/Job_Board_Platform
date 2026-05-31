"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getGoogleAuthUrl, loginUser } from "@/lib/api";
import { saveStoredAuth } from "@/lib/auth";
import LoginForm from "./LoginForm";
import WelcomeSection from "./WelcomeSection";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [savePassword, setSavePassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await loginUser({ email, password });
      saveStoredAuth(response);
      router.push(
        response.user.userType === "Employer"
          ? "/company-profile"
          : "/employee-onboarding",
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = getGoogleAuthUrl("Applicant");
  };

  return (
    <div className="relative min-h-screen flex bg-white">
      <WelcomeSection />

      <div className="flex w-full md:w-[48%] items-center justify-center px-6 py-10 md:px-10 min-h-screen">
        <div className="w-full max-w-lg rounded-[28px] border border-[#F1EAF8] bg-white px-6 py-8 shadow-[0_20px_60px_rgba(45,38,57,0.08)] md:px-10 md:py-10">
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            savePassword={savePassword}
            setSavePassword={setSavePassword}
            error={error}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onGoogleSignIn={handleGoogleSignIn}
          />
        </div>
      </div>
    </div>
  );
}
