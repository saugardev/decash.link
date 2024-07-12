'use client'

import LinkForm from "@/components/link-form";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useAccount } from "wagmi";

export default function AppPage() {

  const { address, isConnected, chain } = useAccount();

  return (
    <main className="mx-auto my-10 flex min-h-screen max-w-6xl flex-col">
      <LinkForm />
      <DotPattern
        width={40}
        height={40}
        cr={2}
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)] -z-10 -top-[370px]",
        )}
      />
    </main>
  )
}