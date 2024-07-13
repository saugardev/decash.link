'use client'

import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronRightIcon } from "lucide-react";
import { usePathname } from 'next/navigation';
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export default function Navbar() {
  const path = usePathname();

  return (
    <>
      <nav className="bg-background flex h-16 w-full items-center justify-center border-b border-b-neutral-200">
        <div className="flex w-full max-w-6xl items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold">DeCash</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/contract" className="text-sm">Contract</Link>
            <Link href="https://docs.decash.link" target="_blank" className="text-sm">Documentation</Link>
            {path === '/app'
              ? <DynamicWidget />
              : <Link href="/app">
                  <Button size={"lg"} className="flex items-center gap-2">
                    Create Link
                    <ChevronRightIcon className="size-4"/>
                  </Button>
                </Link>
              }
          </div>
        </div>
      </nav>
    </>
  );
}
