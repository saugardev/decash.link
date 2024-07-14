import React, { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { buildPayloadForClaim } from "../lib/buildPayloadForClaim";
import {
    aggLayerContractABI,
    TESTNET_BRIDGE_ADDRESS,
} from "@/config/constants";

interface Transaction {
    hash: string;
    status: string;
}

export default function ClaimsTable() {
    const { address } = useAccount();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { data: hash, writeContractAsync: claimAsset } = useWriteContract();

    useEffect(() => {
        const fetchTransactions = () => {
            const allTransactions = JSON.parse(
                localStorage.getItem("transactions") || "[]"
            ).map((tx: string) => ({ hash: tx, status: "Pending" })); // Add status to each transaction
            setTransactions(allTransactions);
            setIsLoading(false);
        };

        fetchTransactions();
    }, [address]);

    const truncateHash = (hash: string) => {
        if (hash.length > 10) {
            return hash.slice(0, 7) + "..." + hash.slice(-5);
        }
        return hash;
    };

    const handleClaim = async (tx: Transaction) => {
        if (tx.status == "Ready") {
            try {
                const payload = await buildPayloadForClaim(tx.hash, 0);

                const smtProofLocalExitRoot = payload.smtProof;
                const smtProofRollupExitRoot = payload.smtProofRollup;
                const globalIndex = payload.globalIndex;
                const mainnetExitRoot = payload.mainnetExitRoot;
                const rollupExitRoot = payload.rollupExitRoot;
                const originNetwork = payload.originNetwork;
                const originTokenAddress = payload.originTokenAddress;
                const destinationNetwork = payload.destinationNetwork;
                const destinationAddress = payload.destinationAddress;
                const amount = payload.amount;
                const metadata = payload.metadata;

                const args = [
                    smtProofLocalExitRoot,
                    smtProofRollupExitRoot,
                    globalIndex,
                    mainnetExitRoot,
                    rollupExitRoot,
                    originNetwork,
                    originTokenAddress,
                    destinationNetwork,
                    destinationAddress,
                    amount,
                    metadata,
                ];

                const claimTx = await claimAsset({
                    address: TESTNET_BRIDGE_ADDRESS,
                    abi: aggLayerContractABI,
                    functionName: "claimAsset",
                    args: args,
                });
            } catch (error: any) {
                if (error.message.includes("AlreadyClaimed")) {
                    tx.status = "Claimed";
                    // Optionally, add logic to update this status in the database or application state
                } else {
                    console.error("An unexpected error occurred:", error);
                }
            }
        }
    };

    const handleStatus = async (tx: Transaction) => {
        const payload = await buildPayloadForClaim(tx.hash, 0);

        if (payload.smtProof == undefined) {
            updateTransactionStatus(tx.hash, "Pending");
        } else {
            updateTransactionStatus(tx.hash, "Ready");
        }
    };

    const updateTransactionStatus = (hash: string, status: string) => {
        setTransactions((prevTransactions) =>
            prevTransactions.map((tx) =>
                tx.hash === hash ? { ...tx, status } : tx
            )
        );
    };

    return (
        <>
            <h2 className="text-xl font-bold text-center mt-20">Claims</h2>
            <div className="border-text-foreground relative mx-auto my-10 w-full max-w-md overflow-x-auto border sm:rounded-[15px]">
                {isLoading ? (
                    <div
                        role="status"
                        className="flex flex-col gap-5 justify-center items-center h-64"
                    >
                        <div className="flex items-center text-xs">
                            <span>Loading your latest movements</span>
                        </div>
                        <svg
                            aria-hidden="true"
                            className="size-8 animate-spin fill-neutral-600 text-neutral-200 dark:text-neutral-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <table className="w-full text-left text-sm rtl:text-right">
                        <thead className="border-text-foreground border-b text-xs uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Check
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right"
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {Array.isArray(transactions) &&
                                transactions.map((tx, index) => (
                                    <tr
                                        key={index}
                                        className="border-text-foreground hover:bg-accent border-b transition-all duration-200"
                                    >
                                        <th
                                            scope="row"
                                            className="whitespace-nowrap px-6 py-4 font-medium"
                                        >
                                            {truncateHash(tx.hash)}
                                        </th>
                                        <td className="px-6 py-4">
                                            {tx.status}
                                        </td>{" "}
                                        {/* Display the status */}
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleStatus(tx)}
                                                className="font-medium hover:underline"
                                            >
                                                Check status
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleClaim(tx)}
                                                className="font-medium hover:underline"
                                            >
                                                Claim
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
