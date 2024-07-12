import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronRightIcon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex h-16 w-full items-center justify-center border-b border-b-neutral-200 bg-background">
      <div className="flex w-full max-w-6xl items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">DeCash</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/contract" className="text-sm">Contract</Link>
          <Link href="/documentation" className="text-sm">Documentation</Link>
          <Link href="/app">
            <Button size={"lg"} className="flex items-center gap-2">
              Create Link
              <ChevronRightIcon className="size-4"/>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
