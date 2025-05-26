import Image from "next/image"

export default function FundingSection() {
  return (
    <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-medium text-navy-800 leading-tight">
            Streamline Funding,
            <br />
            Save Time &<br />
            Resources
          </h2>
        </div>
        <div>
          <p className="text-gray-600">
            Focus more on building and less on chasing leads. With BuildSpace&aposs AI-driven matching and document
            automation, you reduce repetitive tasks and connect faster with the right people.
          </p>
        </div>
      </div>

      <div className="flex gap-4 mt-10 justify-end">
        <div className="overflow-hidden rounded-lg">
          <Image
            src="/images/image1.png"
            alt="Identity verification on mobile device"
            width={280}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <Image
            src="/images/image2.png"
            alt="Business handshake"
            width={280}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <Image
            src="/images/image3.png"
            alt="Person holding money"
            width={280}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
