"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/api";
import { saveStoredAuth } from "@/lib/auth";

export default function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Signing you in...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    const authToken = token;

    async function finishLogin() {
      try {
        const response = await getCurrentUser(authToken);
        saveStoredAuth({ token: authToken, user: response.user });
        router.replace(
          response.user.userType === "Employer"
            ? "/company-profile"
            : "/employee-onboarding",
        );
      } catch {
        setMessage(
          "We could not finish your Google sign-in. Please try again.",
        );
      }
    }

    finishLogin();
  }, [router, searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 text-center">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-primary">
          Google Authentication
        </h1>
        <p className="mt-4 text-sm text-gray-600">{message}</p>
      </div>
    </main>
  );
}
