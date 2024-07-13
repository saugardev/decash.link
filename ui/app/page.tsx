import HeroSection from "@/components/hero";
import DotPattern from "@/components/magicui/dot-pattern";
import FirstSection from "@/components/first-section";
import { cn } from "@/lib/utils";
import ProtocolsUsed from "@/components/protocols-used";
import SecondSection from "@/components/second-section";

export default function Home() {
  return (
    <main className="my-10 flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-6xl">
        <HeroSection />
        <ProtocolsUsed />
        <FirstSection />
      </div>

      <SecondSection />
      <DotPattern
        width={40}
        height={40}
        cr={2}
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)] -z-10 -top-[370px]",
        )}
      />
    </main>
  );
}
