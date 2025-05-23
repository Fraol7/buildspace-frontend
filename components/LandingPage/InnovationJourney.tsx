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
              Power Up Your
              <br />
              Innovation Journey
            </h1>
            <p className="text-sm text-slate-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing tempus sed nunc consequat lacus
              porttitor neque at nulla. Maecenas gravida risque leo diam. Nunc, felis fringilla lectus felis aliquet
              tempor vitae.
            </p>
          </div>

          {/* Middle Section - Left */}
          <div className="flex flex-col mb-4">
            <div className="relative w-full flex items-center justify-center">
              <Image
                src="/images/Portfolio22.png"
                alt="Person looking at analytics dashboard"
                width={300}
                height={240}
                className="object-contain"
              />
            </div>
            <p className="text-center text-slate-800 mt-4">Crowdfunding for Campaigns</p>
          </div>

          {/* Bottom Section - Left */}
          <div className="flex flex-col">
            <div className="relative w-full flex items-center justify-center">
              <Image
                src="/images/Portfolio32.png"
                alt="People exchanging ideas"
                width={300}
                height={240}
                className="object-contain"
              />
            </div>
            <p className="text-center text-slate-800 mt-4">
              Exchange ideas with startup
              <br />
              minds like yours
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
                alt="Person climbing stairs to target"
                width={300}
                height={240}
                className="object-contain"
              />
            </div>
            <p className="text-center text-slate-800 mt-4">
              Discover tailored opportunities
              <br />
              based on your goals
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
                alt="Network of people connections"
                width={300}
                height={240}
                className="object-contain"
              />
            </div>
            <p className="text-center text-slate-800 mt-4">
              Build meaningful connections
              <br />
              with peers and potential backers
            </p>
          </div>

          {/* Bottom Section - Right */}
          <div className="flex flex-col">
            <div className="relative w-full flex items-center justify-center">
              <Image
                src="/images/Portfolio1.png"
                alt="Secure platform illustration"
                width={300}
                height={240}
                className="object-contain"
              />
            </div>
            <p className="text-center text-slate-800 mt-4">All on one secure, intuitive platform</p>
          </div>
        </div>
      </div>
    </div>
  )
}
