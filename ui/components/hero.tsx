import { ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="hero" className="mx-auto my-20 w-fit rounded-full bg-white px-8 py-5">
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-1 flex-col items-center">
            <h1 className="text-center text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Fast, simple decentralized social payments</h1>
            <p className="mt-6 max-w-[600px] text-center text-muted-foreground md:text-xl">Send and recieve payments from your friends</p>
          </div>
        </div>
        <div className="my-5 flex justify-center gap-5">
          <Link href="https://docs.decash.link">
            <Button size={"lg"} variant={"outline"}>Read Docs</Button>
          </Link>
          <Link href="/app">
            <Button size={"lg"} className="flex items-center gap-2">
              Create Link
              <ChevronRightIcon className="size-4"/>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}