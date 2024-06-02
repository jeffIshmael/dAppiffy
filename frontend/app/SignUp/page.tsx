"use client";
import React, { useState } from "react";
import Image from "next/image";
import ConnectButton from "../(components)/Connect";
import Link from "next/link";
import { useWriteContract, useConnect, useDisconnect, useAccount } from "wagmi";
import dAppifyABI from "@/components/Blockchain/dAppifyABI.json";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { AlertCircle, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DAPPIFYCONTRACT } from "../constants/constant";

export const SignUpForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { writeContractAsync } = useWriteContract();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const { isConnected, address } = useAccount();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const account = await open();
    

    if (isConnected) {
      const ally = await toast("Account successfully connected");
      try {
        const hash = await writeContractAsync({
          abi: dAppifyABI,
          address: DAPPIFYCONTRACT,
          functionName: "signUp",
          args: [
            data.firstname as string,
            data.lastname as string,
            data.username as string,
          ],
        });
        if (hash) {
          console.log(hash);
          setSuccess("Account has been created. You can now ");
          setError("");
          // disconnect();
        } else {
          setError("An error occurred while creating your account.");
        }
      } catch (err: any) {
        if (err.reason) {
          setError(err.reason);
        } else if (err.message) {
          setError("Username already taken, please use another.");
        }
        console.log(error);
      }
    } else {
      console.log("please connect wallet");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 ">
      <Link href={"/"} className="flex mr-12 ml-0">
        <Image
          src="/static/images/logo-no-background.png"
          alt="Logo"
          width={400}
          height={200}
        />
      </Link>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-black opacity-90">
          Sign Up
        </h2>
        <form onSubmit={submit}>
          <div className="mb-4">
            <label
              // htmlFor="first-name"
              className="block text-sm font-medium text-gray-900"
            >
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              // value={firstName}
              // onChange={(e) => setFirstName(e.target.value)}
              name="firstname"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  sm:text-sm opacity-90"
              required
            />
          </div>
          <div className="mb-4">
            <label
              // htmlFor="last-name"
              className="block text-sm font-medium text-gray-900"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              name="lastname"
              // value={lastName}
              // onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm opacity-90"
              required
            />
          </div>
          <div className="mb-6">
            <label
              // htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              // value={username}
              // onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm opacity-90"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className=" file:w-md bg-blue-600 text-white p-3 px-4 shadow-md flex ml-40 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>

          {error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}
          {success ? (
            <Alert className="mt-2 bg-grey-400">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                {success}
                <span>
                  <Link href={"/login"}>Log in.</Link>
                </span>
              </AlertDescription>
            </Alert>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
