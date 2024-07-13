'use client'

import ClaimForm from "@/components/claim-form";
import LinkForm from "@/components/link-form";
import DotPattern from "@/components/magicui/dot-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function AppContent() {
  const [activeButton, setActiveButton] = useState('send');
  const [claimId, setClaimId] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const linkParam = searchParams.get('link');
    if (linkParam) {
      setActiveButton('receive');
      setClaimId(linkParam);
    }
  }, [searchParams]);

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
        <Button 
          size='sm' 
          variant='outline' 
          className={activeButton === 'bridge' ? 'active' : ''}
          onClick={() => handleButtonClick('bridge')}
        >
          Bridge
        </Button>
      </div>
      {activeButton === 'send' && <LinkForm />}
      {activeButton === 'receive' && <ClaimForm claimId={claimId} />}
      {activeButton === 'bridge' && <LinkForm />}
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

export default function AppPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppContent />
    </Suspense>
  );
}
