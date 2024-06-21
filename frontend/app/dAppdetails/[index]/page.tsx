"use client";

import React from "react";
import { DAPPIFYCONTRACT } from "@/app/constants/constant";
import dAppifyABI from "@/components/Blockchain/dAppifyABI.json";
import { useReadContract } from "wagmi";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";



export default function DAppDetailsPage({
  params,
}: {
  params: { index: number };
}) {
  const {
    data: dApp,
    isPending,
    error,
  } = useReadContract({
    address: DAPPIFYCONTRACT,
    abi: dAppifyABI,
    functionName: "getdApp",
    args: [BigInt(params.index)],
  });

  interface dApp {
    category: string;
    chain: string;
    dAppId: string;
    dAppName: string;
    dAppreg: string;
    demolink: string;
    description: string;
    discord: string;
    email: string;
    ipfsHash: string;
    sourceCode: string;
    telegram: string;
    url: string;
  }

  console.log(dApp);
  console.log(dApp?.dAppName);

  return (
    <main className="flex flex-col items-center justify-center">
      <section className="flex flex-col w-full max-w-[1200px] flex-1 gap-8 bg-gray-100 rounded-lg py-12 mx-auto mt-4">
        {error && (
          <div className="flex h-screen items-center justify-center">
            <p>Error fetching dApp details, try again later</p>
          </div>
        )}

        {isPending && <Skeleton className="rounded-xl" />}
        <div className="flex gap-8">
          <div className="flex-shrink-0 ml-4">
            <Image
              src={`https://ipfs.io/ipfs/${dApp?.ipfsHash}`}
              alt={`${dApp?.dAppName} logo`}
              width={100}
              height={100}
              className="rounded-full ml-4"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl text-black font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {dApp?.dAppName}
            </h2>
            <h3 className="text-xl text-black font-bold tracking-tighter sm:text-lg md:text-xl">
              {dApp?.category}
            </h3>

            <div className="flex gap-4">
              <div className="text-white bg-black rounded opacity-80">
                <a
                  href={`${dApp?.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>visit website</Button>
                </a>
              </div>
              <div className="text-black rounded-md bg-blue-700">
                <Button>Download</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 ml-8">
          <div className="flex gap-4">
            <div className="text-black">
              <p>
                Chain: <span className="text-black">{dApp?.chain}</span>
              </p>
            </div>
          </div>
          <div>
            <div className="text-black tracking-tighter font-semibold">
              <p>
                <strong>About the dApp</strong>
              </p>
            </div>
            <div className="text-black tracking-tighter">
              <p>{dApp?.description}</p>
            </div>
          </div>
          <div className="flex gap-4 ml-8">
            <div>
              <a
                href={`${dApp?.sourceCode}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="flex bg-gray-200 items-center gap-2 hover:border-blue-900 hover:bg-slate-200"
                >
                  <span className="text-black">Smart Contract</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
