import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, CopyIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { FadeText } from "./magicui/fade-text";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function ClaimForm() {
  const [overlayVisible, setOverlayVisible] = useState(false);

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  return (
    <section className="mx-auto flex flex-col items-center">
      <div className="flex size-[400px] flex-col justify-between rounded-2xl border bg-white">
        <div className="p-5">
          <div className="flex items-center text-xs">
            <span>You are claiming</span>
          </div>
        </div>
        <div className="mt-5 flex h-16 items-center border-t text-xs">
          <div className="mx-5 flex w-full items-center justify-between">
            <div className="flex flex-col">
              <span className="font-semibold">Polygon</span>
              <span>MATIC</span>
            </div>
            <ChevronDownIcon className="size-4" />
          </div>
        </div>
      </div>
      <Button size={"lg"} className="mt-5 flex items-center gap-2 self-end">
        Create Link
        <ChevronRightIcon className="size-4" />
      </Button>
    </section>
  );
}
