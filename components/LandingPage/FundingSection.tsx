import Image from "next/image"

export default function FundingSection() {
  return (
    <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-medium text-navy-800 leading-tight">
            Empower Your Startup,
            <br />
            Achieve More &
            <br />
            Innovate Smarter
          </h2>
        </div>
        <div>
          <p className="text-gray-600">
            BuildSpace offers AI-powered matchmaking and seamless campaign tools, helping you focus on scaling your
            startup while we connect you with the right investors and resources.
          </p>
        </div>
      </div>

      <div className="flex gap-4 mt-10 justify-end">
        <div className="overflow-hidden rounded-lg">
          <Image
            src="/images/col1.png"
            alt="AI-driven matchmaking process"
            width={280}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <Image
            src="/images/col2.png"
            alt="Networking opportunities for entrepreneurs"
            width={280}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <Image
            src="/images/col3.png"
            alt="Crowdfunding success visualization"
            width={280}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
