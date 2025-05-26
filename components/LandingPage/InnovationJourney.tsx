import Image from "next/image"
import { DotPattern } from "@/components/ui/dot-pattern"

export default function InnovationJourney() {
  return (
    <div className="w-full max-w-6xl bg-sky-100 rounded-lg overflow-hidden p-16 shadow-lg mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="flex flex-col gap-12">
          {/* Header Section - Left */}
          <div className="space-y-4 mb-4">
            <h1 className="text-3xl font-medium text-slate-800">
              Empower Your
              <br />
              Innovation Journey
            </h1>
            <p className="text-sm text-slate-600">
              BuildSpace connects entrepreneurs and investors, offering tools to streamline crowdfunding and unlock
              market insights to grow your startup.
            </p>
          </div>

          {/* Middle Section - Left */}
          <div className="flex flex-col mb-4">
            <div className="relative w-full flex items-center justify-center">
              <Image
                src="/images/Portfolio22.png"
                alt="AI-driven crowdfunding campaigns"
                width={300}
                height={240}
                className="object-contain"
              />
            </div>
            <p className="text-center text-slate-800 mt-4">
              Launch and Manage 
              <br/>
              Crowdfunding Campaigns
            </p>
          </div>

          {/* Bottom Section - Left */}
          <div className="flex flex-col">
            <div className="relative w-full flex items-center justify-center">
              <Image
                src="/images/Portfolio32.png"
                alt="Collaborative idea exchange"
                width={300}
                height={240}
                className="object-contain"
              />
            </div>
            <p className="text-center text-slate-800 mt-4">
              Collaborate and Share Ideas
              <br />
              with Like-Minded Innovators
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-12">
          {/* Header Section - Right */}
          <div className="flex flex-col items-center relative mb-4">
            <div className="relative w-full flex items-center justify-center z-10 pt-4">
              <Image
                src="/images/Portfolio2.png"
                alt="Targeted opportunities illustration"
                width={300}
                height={240}
                className="object-contain"
              />
            </div>
            <p className="text-center text-slate-800 mt-4">
              Discover Opportunities
              <br />
              Tailored to Your Startup
            </p>
            <div className="absolute top-0 right-0">
              <DotPattern />
            </div>
          </div>

          {/* Middle Section - Right */}
          <div className="flex flex-col mb-4">
            <div className="relative w-full flex items-center justify-center">
              <Image
                src="/images/Portfolio3.png"
                alt="Networking connections"
                width={300}
                height={240}
                className="object-contain"
              />
            </div>
            <p className="text-center text-slate-800 mt-4">
              Build Strategic Connections
              <br />
              with Investors and Peers
            </p>
          </div>

          {/* Bottom Section - Right */}
          <div className="flex flex-col">
            <div className="relative w-full flex items-center justify-center">
              <Image
                src="/images/Portfolio1.png"
                alt="Secure and seamless platform"
                width={300}
                height={240}
                className="object-contain"
              />
            </div>
            <p className="text-center text-slate-800 mt-4">
              All Features on a
              <br />
              Secure, Seamless Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
