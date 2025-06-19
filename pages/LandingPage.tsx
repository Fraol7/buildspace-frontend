"use client";
import React, { useEffect } from "react";
// import Header from '@/components/LandingPage/Header';
import HeroSection from "@/components/LandingPage/HeroSection";
import Mission from "@/components/LandingPage/Mission";
import WhyBuildSpace from "@/components/LandingPage/WhyBuildSpace";
import FundingSection from "@/components/LandingPage/FundingSection";
import InnovationJourney from "@/components/LandingPage/InnovationJourney";
import AppShowcase from "@/components/LandingPage/AppShowcase";
import Footer from "@/components/LandingPage/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const router = useRouter();

  useEffect(() => {
    if (role === "investor") {
      router.push("/investor/dashboard");
    } else if (role === "startup") {
      router.push("/entrepreneur/dashboard");
    }
  }, [role, router]);
  return (
    <>
      {/* <div className="text-red-800 font-bold text-4xl p-6">Landing Page</div> */}
      <HeroSection />
      <Mission />
      <WhyBuildSpace />
      <FundingSection />
      <InnovationJourney />
      <AppShowcase />
      <Footer />
    </>
  );
};

export default LandingPage;
