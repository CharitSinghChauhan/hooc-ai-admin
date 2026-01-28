"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { useAuth } from "@/lib/AuthContext";
import { googleAuth } from "@/lib/axios";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function Home() {
  // TODO : auth loader
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
    <main className="min-h-screen relative">
      <Navbar handleGoogleLogin={handleGoogleLogin} user={user} />
      <Hero handleGoogleLogin={handleGoogleLogin} user={user} />
    </main>
  );
}
