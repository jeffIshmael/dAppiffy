"use client"

import React from "react";
import dAppifyABI from "@/components/Blockchain/dAppifyABI.json";
import { Toaster, toast } from "sonner";
import { useReadContract, useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export const DAppifyDAO = () => {
  // const { open, close } = useWeb3Modal();
  // open();

  const { data, error, isSuccess,isFetched,isLoading, isError, refetch } = useReadContract({
    abi: dAppifyABI,
    address: "0x064c3d9fe79e82A1d60d0c1D558b6Ab0C070f1C4",
    functionName: "getAllUsers",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isSuccess) {
    console.log(data);
  }

  return (
    <button
      onClick={() => refetch({ throwOnError: false, cancelRefetch: true })}
    >
      Refetch Data
    </button>
  );
};

export default DAppifyDAO;
