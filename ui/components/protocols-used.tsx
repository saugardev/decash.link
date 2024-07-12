import Image from "next/image";

export default function ProtocolsUsed() {
  return (
    <div className="py-5 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="mx-auto flex items-center justify-center gap-10">
            <Image
              alt="Statamic"
              src="/polygon-logo.png"
              width={158}
              height={48}
              className="col-span-2 max-h-8 object-contain object-left lg:col-span-1"
            />
            <Image
              alt="Statamic"
              src="/dynamic-logo.png"
              width={158}
              height={48}
              className="col-span-2 max-h-6 object-contain object-left lg:col-span-1"
            />
            <Image
              alt="Statamic"
              src="/blockscout-logo.png"
              width={158}
              height={48}
              className="col-span-2 max-h-6 object-contain object-left lg:col-span-1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
