import { useState } from "react";
import { CheckIcon, ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, CopyIcon, CrossIcon, InfoIcon, SettingsIcon, XIcon } from "lucide-react";
import CurrencyConverter from "./currency-converter";
import { Button } from "./ui/button";
import { FadeText } from "./magicui/fade-text";
import { AnimatePresence, motion } from "framer-motion";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { linksContractABI, linksContractAddress } from "@/config/constants";
import { parseUnits } from "viem";
import Link from "next/link";
import { QRCode } from 'react-qrcode-logo';
import SentTable from "./sent-table";
import { Input } from "@/components/ui/input";
import { Toggle } from "./ui/toggle";

export default function LinkForm() {
  const { data: hash, writeContractAsync: createPaymentLink } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [usdAmount, setUsdAmount] = useState<number>(0);
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [transactionDetails, setTransactionDetails] = useState<any>(null);
  const [showSentTable, setShowSentTable] = useState(false);
  const [linkId, setLinkId] = useState(0);
  const [viewLinkSettings, setViewLinkSettings] = useState(false);
  const [priceTarget, setPriceTarget] = useState("");
  const [enablePriceTarget, setEnablePriceTarget] = useState(false);

  const truncateHash = (hash: string) => {
    if (hash.length > 10) {
      return hash.slice(0, 7) + '...' + hash.slice(-5);
    }
    return hash;
  };

  const handleCreateLinkClick = async (e: any) => {
    e.preventDefault();

    const min = 10000;
    const max = Number.MAX_SAFE_INTEGER;
    const id = Math.floor(Math.random() * (max - min + 1)) + min;
    setLinkId(id);

    const args = []
    if (enablePriceTarget) {
      if (priceTarget.length >= 1) {
        args.push(...[id, parseUnits(priceTarget, 18), true]);
      }
      else {
        alert('Introduce a price target');
        return;
      }
    }
    else {
      args.push(...[id, 0, false]);
    }

    setOverlayVisible(true);

    console.log(args);
    try {
      const tx = await createPaymentLink({
        address: linksContractAddress,
        abi: linksContractABI,
        functionName: 'createPaymentLink',
        args: args,
        value: parseUnits(tokenAmount.toString(), 18)
      });
      setTransactionDetails(tx);
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewMovementsClick = () => {
    setShowSentTable(!showSentTable);
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  const toggleLinkSettings = () => {
    setViewLinkSettings(!viewLinkSettings)
  }

  const handlePriceTarget = (e: any) => {
    e.preventDefault();
    setPriceTarget(e.target.value)
  }

  const togglePriceTarget = (e: any) => {
    e.preventDefault();
    setEnablePriceTarget(!enablePriceTarget)
  }

  const texts = ["Waiting for confirmation", "Confirming", "Transaction confirmed"];
  let currentText = texts[0];

  if (isConfirming) {
    currentText = texts[1];
  } else if (isConfirmed) {
    currentText = texts[2];
  }

  const handleValueChange = (usdAmount: number, tokenAmount: number) => {
    setUsdAmount(usdAmount);
    setTokenAmount(tokenAmount);
  };

  const copyToClipboard = () => {
    const link = `https://decash.link/app?link=${linkId}`;
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy: ", err);
    });
  };

  return (
    <section className="mx-auto flex flex-col items-center">
      <div className="flex size-[400px] flex-col justify-between rounded-2xl border bg-white">
        <div className="px-5 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span>You are sending</span>
            <Button variant="ghost" size="icon" onClick={toggleLinkSettings}>
              <SettingsIcon className="size-4" />
            </Button>
          </div>
          <CurrencyConverter onValueChange={handleValueChange} />
          {viewLinkSettings
            ? <>
                <div className="flex items-center gap-2 text-xs my-2 ml-[13px]">
                  <div>Enable Chronicle price target</div>
                  <InfoIcon className="size-4" />
                </div>
                <Input 
                  placeholder="Set price target"
                  type="number"
                  onChange={handlePriceTarget}
                />
                <Toggle aria-label="Toggle price target" onClick={togglePriceTarget} className={`flex mt-2 gap-2 text-xs ${enablePriceTarget ? 'text-green-500' : 'text-red-500'}`}>
                  {enablePriceTarget ? "Enabled" : "Disabled"}
                  {enablePriceTarget ? <CheckIcon className="size-3" /> : <XIcon className="size-3" />}
                </Toggle>
              </>
            : null
          }
        </div>
        <div className="mt-5 flex h-16 items-center border-t text-xs">
          <div className="mx-5 flex w-full items-center justify-between">
            <div className="flex flex-col">
              <span className="font-semibold">Select Destination Chain</span>
              <span>Sepolia</span>
            </div>
            {/* <ChevronDownIcon className="size-4" /> */}
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <Button size={"lg"} variant='outline' className="mt-5 flex items-center gap-2 self-end" onClick={handleViewMovementsClick}>
          {showSentTable ? 'Hide movements' : 'Show movements'}
          {showSentTable ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
          
        </Button>
        <Button size={"lg"} className="mt-5 flex items-center gap-2 self-end" onClick={handleCreateLinkClick}>
          Create Link
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
      {overlayVisible && (
        <div className="animate-in fade-in-0 fixed inset-0 z-50 bg-white/90">
          <div className="relative flex size-full items-center justify-center">
            <button
              className="absolute right-4 top-4"
              onClick={handleCloseOverlay}
            >
              <XIcon className="size-6" />
            </button>
            <div className="flex flex-col items-center gap-10">
              <AnimatePresence mode="wait">
                <FadeText
                  key={currentText} // Key prop to trigger re-render
                  className="text-4xl font-bold text-black dark:text-white"
                  direction="up"
                  framerProps={{
                    show: { transition: { delay: 0.2 } },
                  }}
                  text={currentText}
                />
              </AnimatePresence>
              {isConfirmed ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                <div className="flex size-[400px] flex-col justify-between rounded-2xl border bg-white">
                  <div className="p-5">
                    <div className="flex items-center text-xs">
                      <span>Link Created Succesfully</span>
                    </div>
                    <div className="flex justify-center mt-9">
                      <QRCode value={`https://decash.link/app?link=${linkId}`} qrStyle="fluid" eyeRadius={100} size={200}/>
                    </div>
                  </div>
                  <div className="mt-5 flex h-16 items-center border-t text-xs">
                    <div className="mx-5 flex w-full items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-semibold">Transaction Hash:</span>
                        <span>{truncateHash(transactionDetails)}</span>
                      </div>
                      <Link href={`https://eth-sepolia.blockscout.com/tx/${transactionDetails}`} target="_blank" className="flex items-center">
                        <span>View in Blockscout</span>
                        <ChevronRightIcon className="size-4" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="my-5 flex justify-end gap-5">
                  <Button size={"lg"} className="flex items-center gap-2" onClick={copyToClipboard}>
                    Copy Link
                    <CopyIcon className="size-4"/>
                  </Button>
                </div>
                </motion.div>
              ) : (
                <div role="status">
                  <svg aria-hidden="true" className="size-8 animate-spin fill-neutral-600 text-neutral-200 dark:text-neutral-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div>
          </div>        
        </div>        
      )}
      {showSentTable && <SentTable />}
    </section>
  );
}
