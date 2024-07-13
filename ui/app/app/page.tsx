'use client'

import ClaimForm from "@/components/claim-form";
import LinkForm from "@/components/link-form";
import DotPattern from "@/components/magicui/dot-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AppPage() {
  const [activeButton, setActiveButton] = useState('send');

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <main className="mx-auto my-10 flex min-h-screen max-w-6xl flex-col">
      <div className="flex w-[400px] mx-auto mb-2 gap-2">
        <Button 
          size='sm' 
          variant='outline' 
          className={activeButton === 'send' ? 'active' : ''}
          onClick={() => handleButtonClick('send')}
        >
          Send
        </Button>
        <Button 
          size='sm' 
          variant='outline' 
          className={activeButton === 'receive' ? 'active' : ''}
          onClick={() => handleButtonClick('receive')}
        >
          Receive
        </Button>
      </div>
      {activeButton === 'send' ? <LinkForm /> : <ClaimForm />} {/* Conditionally render forms */}
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
