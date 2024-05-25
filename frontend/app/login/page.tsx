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
import { error } from "console";

export const LoginPage = () => {
  //open the wallets
  const { open, close } = useWeb3Modal();

  const handleLoginClick =  (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    open();
  };
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
              <Input id="name" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLoginClick }>Login</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
