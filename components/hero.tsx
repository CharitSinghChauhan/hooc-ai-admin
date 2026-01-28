import { TextEffect } from "@/components/motion-primitives/text-effect";
import { TextShimmer } from "@/components/motion-primitives/text-shimmer";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/AuthContext";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero({
  handleGoogleLogin,
  user,
}: {
  handleGoogleLogin: () => void;
  user: User | null;
}) {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        {/* Pill/Badge */}
        {/*TODO : Apple button glass effect*/}
        <div className="flex items-center justify-center gap-2 px-4 py-1 text-sm mb-8 rounded-full bg-white">
          <span className="">🚀</span>
          <span className="text-black">|</span>
          <TextShimmer
            className="text-xs font-light tracking-tight"
            duration={1}
          >
            Corporate Document Automation
          </TextShimmer>
        </div>

        {/* Headline */}

        <h1 className="text-4xl md:text-4xl lg:text-6xl font-serif font-medium italic tracking-tighter mb-6 max-w-4xl ">
          <TextEffect
            preset="fade-in-blur"
            speedReveal={1.1}
            speedSegment={0.3}
            className=""
          >
            Professional Corporate
          </TextEffect>
          <TextEffect
            preset="fade-in-blur"
            speedReveal={1.1}
            speedSegment={0.3}
          >
            Documents in Seconds
          </TextEffect>
        </h1>

        {/* Subheadline */}
        <p className="text-sm max-w-4xl mb-10 leading-relaxed /80 flex-wrap">
          The all-in-one platform for HR correspondence. Generate offer letters,
          NDAs, appointment letters, and other corporate documents with
          precision and speed.
        </p>

        {/* CTA Button */}
        {user ? (
          <Button className="text-sm  py-0.5 px-4" variant={"default"}>
            <Link
              href="/super-admin"
              className="flex justify-between items-center gap-2"
            >
              <ArrowRight />
              <span>Try for free</span>
            </Link>
          </Button>
        ) : (
          <Button
            size="default"
            className=""
            asChild
            onClick={handleGoogleLogin}
          >
            <div className="text-sm  py-0.5 px-4 flex justify-between items-center gap-2">
              <ArrowRight />
              <span>Try for free</span>
            </div>
          </Button>
        )}

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 text-center ">
          <div className="flex flex-col gap-1">
            <span className="text-xl font-bold ">10x Faster</span>
            <span className="text-xs /60">Generation Speed</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xl font-bold ">100% Compliant</span>
            <span className="text-xs /60">Legal Accuracy</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xl font-bold ">&lt; 30s</span>
            <span className="text-xs">Per Document</span>
          </div>
        </div>
      </div>
    </section>
  );
}
