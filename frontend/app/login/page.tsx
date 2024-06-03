"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import dAppifyABI from "@/components/Blockchain/dAppifyABI.json";
import { Toaster, toast } from "sonner";
import { useReadContract, useAccount } from "wagmi";
import React, { useState } from "react";

import { DAPPIFYCONTRACT } from "../constants/constant";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


export const LoginPage = () => {
  const { open, close } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const auth = useAuth();
  const router = useRouter();
  const [userName, setUsername] = useState("user");

  const {
    data: readdata,
    error,
    isSuccess,
    isRefetching,
    isFetched,
    refetch,
  } = useReadContract({
    abi: dAppifyABI,
    address: DAPPIFYCONTRACT,
    functionName: "login",
    args: [userName as string, address],
  });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const user = setUsername(data.username as string);

    if (!isConnected) {
      await open();
      console.log("wallet not connected");
    }
    if (address) {
      const result = await refetch();
      if (isSuccess) {
        console.log(address);
        console.log("Read new data", result.data);
        if (result.data === true) {
          auth.isAuthenticated = true;
          auth.username = userName;
          router.push("/");
        }
      } else {
        console.log(error);
      }
    } else {
      console.log("cant get addresss");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col max-w-md space-y-6 p-6 bg-white rounded-lg shadow-md">
        <div>
          <Link href={"/"}>
            <Image
              src="/static/images/logo-color-crop.png"
              alt="Logo"
              width={300}
              height={150}
            />
          </Link>
        </div>
        <form className="space-y-4" onSubmit={submit}>
          <div>
            <h2 className="text-2xl font-md font-sans text-black">Username</h2>
            <Label htmlFor="username" className="text-black">
              <p className="text-gray-800 mb-2">
                Please, use the username you used to sign in
              </p>
            </Label>
            <Input
              id="username"
              type="text"
              name="username"
              required
              className="border-gray-300 text-white"
            />
          </div>

          <Button
            type="submit"
            className="bg-blue-700 w-full text-white hover:bg-blue-600"
            disabled={isRefetching}
          >
            {isRefetching ? "..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
