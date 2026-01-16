"use client";

import { useAuth } from "@/lib/AuthContext";
import { googleAuth } from "@/lib/axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { login, user, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.role === "super_admin") {
      router.push("/admin");
    }
  }, [user, loading, router]);

  const responseGoogle = async (authResult) => {
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

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="w-screen ">
      <nav className="flex justify-center w-full ">
        <button
          onClick={() => handleGoogleLogin()}
          className="rounded-md border-2 border-slate-300 p-2"
        >
          logIn
        </button>
        <div className="">Name: {user?.name}</div>
      </nav>
    </div>
  );
}
