import Image from "next/image";

export default function ProtocolsUsed() {
  return (
    <div className="py-5 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 items-center justify-center">
            <Image
              alt="Polygon"
              src="/polygon-logo.png"
              width={158}
              height={48}
              className="max-h-8 object-contain"
            />
            <Image
              alt="Dynamic"
              src="/dynamic-logo.png"
              width={158}
              height={48}
              className="max-h-6 object-contain"
            />
            <Image
              alt="Blockscout"
              src="/blockscout-logo.png"
              width={158}
              height={48}
              className="max-h-6 object-contain"
            />
            <Image
              alt="Chronicle"
              src="/chronicle-logo.png"
              width={158}
              height={48}
              className="max-h-10 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
