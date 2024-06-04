"use client";

import React from "react";
import { DAPPIFYCONTRACT } from "../constants/constant";
import dAppifyABI from "@/components/Blockchain/dAppifyABI.json";
import { useReadContract, useAccount } from "wagmi";

import Navbar from "../(components)/Nav";
import { Skeleton } from "@/components/ui/skeleton";
;
import { useRouter } from "next/router";

export default function dAppDetailsPage({
  params,
}: {
  params: { index: number };
}) {
  const router = useRouter();

  const { address, isConnected } = useAccount();

  const {
    data: dApp,
    isPending,
    isFetching,
    error,
  } = useReadContract({
    address: DAPPIFYCONTRACT,
    abi: dAppifyABI,
    functionName: "getdApp",
    args: [BigInt(params.index)],
  });
  interface DApp {
    category: string;
    chain: string;
    dAppId: string;
    dAppName: string;
    dAppreg: string;
    demolink: string;
    description: string;
    discord: string;
    email: string;
    sourceCode: string;
    telegram: string;
    url: string;
  }

  console.log(dApp);

  return (
    <main>
      <div className="hidden sm:block">
        <Navbar />
      </div>
      <section className="flex w-full flex-col gap-8 bg-gray-100 py-12 ">
        {error && (
          <div className="flex h-screen items-center justify-center">
            <p>Error fetching dApp details, try again later</p>
          </div>
        )}

        {isPending && <Skeleton className="rounded-xl" />}
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm font-medium">
                Dapp details
              </div>
              {/* <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                
                {dApp ?.[2]}
              </h1>
              <div className="flex items-center space-x-4 text-gray-500">
                
                <div className="flex items-center space-x-1">
                  
                  
                  <p>{dApp?.[3]}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                
                <p className="text-2xl font-semibold">
                  
                  {dApp?.[7]} cUSD
                </p>
              </div>
              
            </div> <Image
              alt="Event banner"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
              height="400"
              src="/static/images/concert/concert-3.jpg"
              width="600"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About the dApp
              </h2>
              <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                
                {dApp?.[9]}
              </p>
            </div> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
