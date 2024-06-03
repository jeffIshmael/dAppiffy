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
  const { isPending, writeContractAsync } = useWriteContract();
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
          console.log(err.reason);
          setError(err.reason);
        } else if (err.message) {
          console.log(err.message);
          setError("Username already taken, please use another.");
        }
        console.log(error);
      }
    } else {
      console.log("please connect wallet");
    }
  }

  return (
    <main className="dark:bg-gray-900">
      <div className="fixed inset-0 flex items-center justify-center  ">
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black  sm:text-sm opacity-90"
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
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm opacity-90"
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
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm opacity-90"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className={`${
                  isPending
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-blue-700"
                } file:w-md bg-blue-600 text-white p-3 px-4 shadow-md flex ml-40 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                disabled={isPending}
              >
                {isPending && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10 0l3 2.647A7.962 7.962 0 0120 12h-4z"
                    ></path>
                  </svg>
                )}
                {!isPending && "Sign Up"}
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
    </main>
  );
};

export default SignUpForm;
