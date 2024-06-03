"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import dAppifyABI from "@/components/Blockchain/dAppifyABI.json";
import { Toaster, toast } from "sonner";
import { useReadContract, useAccount } from "wagmi";
import React, { useState } from "react";
import ConnectButton from "../(components)/Connect";
import { DAPPIFYCONTRACT } from "../constants/constant";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { set } from "react-hook-form";

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
    <div className="fixed inset-0 flex items-center justify-center mt-0 bg-gray-900">
      <div className="flex flex-col">
        <Link href={"/"} className="flex items-center mb-8 ml-14">
          <Image
            src="/static/images/logo-no-background.png"
            alt="Logo"
            width={250}
            height={150}
          />
        </Link>
        <form onSubmit={submit}>
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Please use the same username and address you used to create.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="username"
                  type="text"
                  // value={firstName}
                  // onChange={(e) => setUserName(e.target.value)}
                  name="username"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="bg-blue-700">
                Login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
