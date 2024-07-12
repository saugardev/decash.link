import { ChevronDown, ChevronDownIcon } from "lucide-react";
import CurrencyConverter from "./currency-converter";

export default function LinkForm() {
  return (
    <section className="mx-auto my-10 flex flex-col items-center">
      <div className="flex size-[400px] flex-col justify-between rounded-2xl border bg-white">
        <div className="p-5">
          <div className="flex items-center text-xs">
            <span>You are sending</span>
          </div>
          <CurrencyConverter />
        </div>
        <div className="mt-5 flex h-16 items-center border-t text-xs">
          <div className="mx-5 flex w-full items-center justify-between">
            <div className="flex flex-col">
              <span className="font-semibold">Polygon</span>
              <span>MATIC</span>
            </div>
            <ChevronDownIcon className="size-4"/>
          </div>
        </div>
      </div>
    </section>
  );
}
