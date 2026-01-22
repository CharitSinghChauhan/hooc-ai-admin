import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { LoginSquare01Icon } from "@hugeicons/core-free-icons";
import { User } from "@/lib/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar({
  handleGoogleLogin,
  user,
}: {
  handleGoogleLogin: () => void;
  user: User | null;
}) {
  return (
    <nav className="w-full fixed top-0 left-0 z-50">
      <div className="container flex h-16 items-center justify-between mx-auto md:px-6 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold tracking-tight ">
            Hooc-AI
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex justify-between items-center gap-4">
              <Button className="text-sm  py-0.5 px-4" variant={"default"}>
                <Link href="/super-admin">Dashboard</Link>
              </Button>
              <Avatar className="">
                <AvatarImage src={user.picture} alt="user-profile" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <Button
              className=" text-sm py-1 px-2"
              asChild
              onClick={handleGoogleLogin}
            >
              <div>
                <HugeiconsIcon icon={LoginSquare01Icon} />
                <span>Sign Up</span>
              </div>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
