import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';

interface CurrencyConverterProps {
  onValueChange: (usdAmount: number, tokenAmount: number) => void;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ onValueChange }) => {
  const tokenPriceInUSD = 0.02959; // Example token price
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [usdAmount, setUsdAmount] = useState<number>(0);
  const [isUsd, setIsUsd] = useState<boolean>(true);

  useEffect(() => {
    if (isUsd) {
      const tokenValue = usdAmount / tokenPriceInUSD;
      setTokenAmount(isFinite(tokenValue) ? parseFloat(tokenValue.toFixed(2)) : 0);
    } else {
      const usdValue = tokenAmount * tokenPriceInUSD;
      setUsdAmount(isFinite(usdValue) ? parseFloat(usdValue.toFixed(2)) : 0);
    }
  }, [usdAmount, tokenAmount, isUsd, tokenPriceInUSD]);

  useEffect(() => {
    onValueChange(usdAmount, tokenAmount);
  }, [usdAmount, tokenAmount, onValueChange]);

  const handleToggle = () => {
    setIsUsd(!isUsd);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value) || value < 0) {
      if (isUsd) {
        setUsdAmount(0);
      } else {
        setTokenAmount(0);
      }
    } else {
      if (isUsd) {
        setUsdAmount(value);
      } else {
        setTokenAmount(value);
      }
    }
  };

  return (
    <div className="mx-auto flex w-52 flex-col items-center p-5">
      <div className="relative mb-2 text-center text-4xl">
        <div className="relative flex justify-center text-6xl">
          {isUsd && '$'}
          <input
            type="number"
            value={isUsd ? usdAmount : tokenAmount}
            onChange={handleChange}
            className="absolute left-0 top-0 size-full border-none bg-transparent text-center text-6xl opacity-0 outline-none"
          />
          {isUsd ? usdAmount : tokenAmount}
        </div>
        <Button variant={'outline'} className="mx-auto mt-2 block text-xs" onClick={handleToggle}>
          {isUsd ? `${tokenAmount} MATIC` : `${usdAmount} USD`}
          <span className="text-xs">
            {isUsd ? ' ⇅' : ' ⇵'}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default CurrencyConverter;
