import { useState, ChangeEvent, useEffect } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useReadContract } from "wagmi";
import { linksContractABI, linksContractAddress } from "@/config/constants";
import { formatUnits } from "viem";
import CurrencyDisplayer from "./currency-displayer";

export default function ClaimForm({ claimId: initialClaimId }: { claimId: string | undefined }) {
  const [claimId, setClaimId] = useState<string | undefined>(initialClaimId);
  const [inputId, setInputId] = useState<string>("");
  const [paymentInfo, setPaymentInfo] = useState<any>();

  const { data } = useReadContract({
    address: linksContractAddress,
    abi: linksContractABI,
    functionName: 'paymentLinks',
    args: [claimId],
  });

  useEffect(() => {
    if (data) {
      setPaymentInfo(data);
    }
  }, [data]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputId(e.target.value);
  };

  const handleVerify = () => {
    setClaimId(inputId);
  };

  const renderClaimInfo = () => (
    <div className="flex size-[400px] flex-col justify-between rounded-2xl border bg-white">
      <div className="p-5">
        <div className="flex items-center text-xs">
          <span>You are claiming</span>
        </div>
        <div className="text-center text-3xl mt-5">
          {paymentInfo && <CurrencyDisplayer tokenAmount={parseFloat(formatUnits(paymentInfo[1].toString(), 18))}/> }
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
  );

  const renderInputForm = () => (
    <div className="flex size-[400px] flex-col justify-between rounded-2xl border bg-white p-5">
      <div className="flex flex-col mb-5">
        <label htmlFor="claimId" className="text-xs font-semibold">Enter Claim ID</label>
        <input
          type="text"
          id="claimId"
          value={inputId}
          onChange={handleInputChange}
          className="mt-1 rounded border px-3 py-2"
        />
      </div>
      <Button size={"lg"} onClick={handleVerify} className="flex items-center gap-2 self-end">
        Verify
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  );

  return (
    <section className="mx-auto flex flex-col items-center">
      {claimId ? renderClaimInfo() : renderInputForm()}
      {claimId && (
        <Button size={"lg"} className="mt-5 flex items-center gap-2 self-end">
          Claim
          <ChevronRightIcon className="size-4" />
        </Button>
      )}
    </section>
  );
}