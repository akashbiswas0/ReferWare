"use client";
import { Badge } from "@/components/landing/ui/badge";
import { Button } from "@/components/landing/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  const handleRedirect = () => {
    window.location.href = "";
  };
  const { theme } = useTheme();
  return (
    <section className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-28">
        <div className="text-center space-y-8">
        <Link href="">
      <Badge variant="outline" className="text-lg bg-emerald-50 text-black tracking-widest cursor-pointer">
        <span>Try our Platform !</span>
      </Badge>
    </Link>

          <div className="max-w-screen-lg mx-auto text-center text-4xl md:text-5xl font-bold">
            <h1 className="text-white">
            <span className="text-transparent px-2 bg-gradient-to-r from-[#3572EF] to-primary bg-clip-text">
            Ref3r-Ware
              </span>
              Connecting influencers and brands for seamless collaborations
            </h1>
          </div>
          <p className="max-w-screen-sm mx-auto text-2xl text-muted-foreground text-white">
            {`Our unique platform features automate commissions and streamline influencer sponsorship..`}
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button className="w-5/6 md:w-1/4 font-semibold group/arrow text-white text-lg border-2 border-white"
                    onClick={handleRedirect}>
              Learn more about R3ferWare
              <ArrowRight className="size-8 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </Button>

            <Button
              asChild
              variant="secondary"
              className="w-5/6 md:w-1/4 font-bold text-white text-xl"
            >
              <Link
                href="https://github.com/akashbiswas0/"
                target="_blank"
              >
                Github respository
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};