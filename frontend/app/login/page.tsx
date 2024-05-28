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
import React, { useState } from 'react';
// import useLogin from '../(components)/LoginHook';

export const LoginPage = () => {
  const { open, close } = useWeb3Modal();
  const { isConnected } = useAccount();
  const [username, setUsername] = useState('');

  // const { login, result, error } = useLogin(username);

  // async function submit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   const formData = new FormData(e.target as HTMLFormElement);
  //   const data = Object.fromEntries(formData.entries());
  //   setUsername(data.username as string);

  //   const account = await open();
  //   await login(); // Call the login function from the custom hook
  //     if (result) {
  //       console.log(result);
  //       // Handle success
  //     } else if (error) {
  //       console.error(error);
  //       // Handle error
  //     }
    
  // }
  return (
    <div className="fixed inset-0 flex items-center justify-center mt-0 bg-gray-900 bg-opacity-40">
      <div className="flex flex-col">
        <Link href={"/"} className="flex items-center mb-8 ml-14">
          <Image
            src="/images/logo-no-background.png"
            alt="Logo"
            width={250}
            height={150}
          />
        </Link>
        <form >
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
              <Button type="submit">Login</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
