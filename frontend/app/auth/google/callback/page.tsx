"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { AuthUser } from "@/lib/api";
import { getCurrentUser } from "@/lib/api";
import { saveStoredAuth } from "@/lib/auth";

function GoogleAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Finishing Google sign-in...");

  useEffect(() => {
    const error = searchParams.get("error");
    const token = searchParams.get("token");
    const userParam = searchParams.get("user");

    if (error) {
      setMessage(error);
      return;
    }

    if (!token) {
      setMessage(
        "Google authentication did not return the required login data.",
      );
      return;
    }

    const authToken = token;

    async function finishGoogleAuth() {
      try {
        let user: AuthUser;

        if (userParam) {
          user = JSON.parse(decodeURIComponent(userParam)) as AuthUser;
        } else {
          const response = await getCurrentUser(authToken);
          user = response.user;
        }

        saveStoredAuth({ token: authToken, user });
        router.replace(
          user.userType === "Employer"
            ? "/portal/employer"
            : "/portal/dashboard",
        );
      } catch {
        setMessage("Google authentication returned invalid user data.");
      }
    }

    finishGoogleAuth();
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

function GoogleAuthCallbackFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 text-center">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-primary">
          Google Authentication
        </h1>
        <p className="mt-4 text-sm text-gray-600">
          Finishing Google sign-in...
        </p>
      </div>
    </main>
  );
}

export default function GoogleAuthCallbackPage() {
  return (
    <Suspense fallback={<GoogleAuthCallbackFallback />}>
      <GoogleAuthCallbackContent />
    </Suspense>
  );
}
