import React from "react";
import dAppifyABI from "@/components/Blockchain/dAppifyABI.json";
import { Toaster, toast } from "sonner";
import { useReadContract, useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export const RegisterdApp = () => {
  const { open } = useWeb3Modal();
  open();
  const { data : boolean } = useReadContract({
    abi : dAppifyABI,
    address:  "0x03bD673B77C9f21F1F1C74c697D5c8E9e77EC432",
    functionName: 'login',
    args: ['small'],
    
  })
  
  return <div>data</div>;
};

export default RegisterdApp;
