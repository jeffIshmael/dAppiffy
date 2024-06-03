"use client";

import React from "react";
import { DAPPIFYCONTRACT } from "../constants/constant";
import dAppifyABI from "@/components/Blockchain/dAppifyABI.json";
import { useReadContract, useAccount } from "wagmi";
import Link from "next/link";
import Navbar from "../(components)/Nav";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const AllDapps = () => {
  const {
    data: dApps,
    isPending,
    error,
  } = useReadContract({
    address: DAPPIFYCONTRACT,
    abi: dAppifyABI,
    functionName: "getAllDapps",
  });

  console.log(dApps);

  return (
    <main className="flex flex-col">
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16 lg:py-20">
        <div className="space-y-6 md:space-y-8 lg:space-y-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              latest dApps
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-10">
            {dApps == 0 && (
              <div className="flex h-screen items-center justify-center">
                <p className="text-black">No dApps found</p>
              </div>
            )}
            {error && (
              <div className="flex h-screen items-center justify-center">
                <p>
                  Error fetching dApps, connect wallet if not connected and try
                  again
                </p>
              </div>
            )}
            {isPending ? (
              <Skeleton className="h-[250px] w-full object-cover" />
            ) : (
              <div>
                <h2 className="text-xl font-bold mb-4">dApps</h2>

                <div className="bg-white p-4 shadow rounded-lg">
                  <div className="flex items-center justify-center w-full h-[200px] object-cover rounded-t-lg">
                    <Image
                      alt="logo"
                      className="h-full w-full object-cover"
                      height="200"
                      src={"/static/images/Tapswap.jpeg"}
                      style={{
                        aspectRatio: "300/200",
                        objectFit: "cover",
                      }}
                      width="300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg text-black font-semibold mb-2">TapSwap</h3>
                    <p className="text-sm text-black mb-4">Tapswap is a decentralized exchange (DEX) built on the Ethereum blockchain. It allows users to swap one cryptocurrency for another directly without the need for intermediaries like centralized exchanges. Tapswap leverages smart contracts to facilitate these swaps securely and transparently, providing users with control over their assets while maintaining privacy and security. Users can trade various tokens with ease, contributing to liquidity pools and earning fees for providing liquidity. </p>
                    <Link href={"#"}className="text-primary">
                      View dApp
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AllDapps;
