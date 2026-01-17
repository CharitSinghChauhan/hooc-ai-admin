"use client";

import { useAuth } from "@/lib/AuthContext";
import { googleAuth } from "@/lib/axios";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { login, user, loading } = useAuth();

  const router = useRouter();

  // useEffect(() => {
  //   if (!loading && user?.role === "super_admin") {
  //     router.push("/super-admin");
  //   } else if (!loading && user?.role === "admin") {
  //     router.push("/admin");
  //   }
  // }, [user, loading, router]);

  const responseGoogle = async (authResult: CodeResponse) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult["code"]);

        // console.log("result data: ", result.data);

        const { email, name, picture, role } = result.data.user;
        const token = result.data.token;

        login(token, { name, email, picture, role });
      }
    } catch (error) {
      console.error("Error while requesting google code", error);
    }
  };

  const handleGoogleError = (
    error: Pick<CodeResponse, "error" | "error_description" | "error_uri">,
  ) => {
    console.error("Google login failed", {
      error: error.error,
      description: error.error_description,
      uri: error.error_uri,
    });
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: handleGoogleError,
    flow: "auth-code",
  });

  return (
    <div className="w-screen min-h-screen bg-gray-50">
      <nav className="flex justify-between items-center w-full px-8 py-4 bg-white shadow-sm border-b border-gray-200">
        <div className="text-xl font-bold text-gray-800">Hooc AI</div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {/* Use img for external Google URLs to avoid next/image config issues for now */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border border-gray-200"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-700">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user.role.replace("_", " ")}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => handleGoogleLogin()}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Sign in with Google
            </button>
          )}
        </div>
      </nav>

      {/* Main Content Placeholder */}
      <main className="flex flex-col items-center justify-center p-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to HOOC AI
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Please log in to verify your account and access the dashboard.
        </p>
      </main>
    </div>
  );
}
