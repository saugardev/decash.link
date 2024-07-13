import { linksContractABI, linksContractAddress } from '@/config/constants';
import React from 'react';
import { useAccount, useReadContract } from 'wagmi';

export default function SentTable() {
  const { address } = useAccount();

  const { data: payments } = useReadContract({
    address: linksContractAddress,
    abi: linksContractABI,
    functionName: 'getLinksCreated',
    args: [address],
  });

  console.log(payments);
  return (
    <>
      <h2 className="text-xl font-bold text-center mt-20">Movements</h2>
      <div className="border-text-foreground relative mx-auto my-10 w-full max-w-md overflow-x-auto border sm:rounded-[15px]">
        <table className="w-full text-left text-sm rtl:text-right">
          <thead className="border-text-foreground border-b text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              {/* <th scope="col" className="px-6 py-3">Amount</th> */}
              <th scope="col" className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {Array.isArray(payments) && payments.map((id, index) => (
              <tr key={index} className="border-text-foreground hover:bg-accent border-b transition-all duration-200">
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium">
                  {id.toString()}
                </th>
                {/* <td className="px-6 py-4">{product.amount}</td> */}
                <td className="px-6 py-4 text-right">
                  <a href="#" className="font-medium hover:underline">Cancel</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
    
  );
}
