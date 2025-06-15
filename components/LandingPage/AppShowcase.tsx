import Image from "next/image";
import { DotPattern } from "@/components/ui/dot-pattern";

export default function AppShowcase() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Mobile App Section */}
      <section className="p-6 sm:p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        <div className="relative w-full md:w-1/2">
          <Image
            src="/images/phone-app.png"
            alt="Mobile app mockups showing interface"
            width={400}
            height={300}
            className="w-full h-auto"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
          <h2 className="text-xl sm:text-2xl font-medium text-slate-800">
            Simplify your startup journey. Manage your campaigns and connect with investors anytime, anywhere.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Download BuildSpace and unlock tools for success.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <a
              href="/auth/signup"
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              Download App
            </a>
          </div>
        </div>
      </section>

      {/* Enrollment Section */}
      <section className="py-10 px-6 sm:py-16 sm:px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
          <h2 className="text-xl sm:text-2xl font-medium text-slate-800">
            Build Your Vision Today
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Join BuildSpace to find investors, launch campaigns, and grow your startup with actionable insights.
          </p>
          <div className="mt-4 sm:mt-6 flex justify-center md:justify-start">
            <a
              href="/auth/signup"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Join BuildSpace
            </a>
          </div>
        </div>

        <div className="relative w-full md:w-1/2">
          <div className="absolute -top-8 -left-8 md:-top-10 md:-left-10 z-0">
            <DotPattern />
          </div>
          <div className="relative z-10">
            <Image
              src="/images/IMG.png"
              alt="Device showing campaign progress interface"
              width={400}
              height={300}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
