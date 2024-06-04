"use client";

import React from "react";
import { DAPPIFYCONTRACT } from "../constants/constant";
import dAppifyABI from "@/components/Blockchain/dAppifyABI.json";
import { useReadContract } from "wagmi";
import Link from "next/link";
import Navbar from "../(components)/Nav";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";


const AllDapps = () => {
  const {
    data: dApps,
    isPending,
    isFetching,
    error,
  } = useReadContract({
    address: DAPPIFYCONTRACT,
    abi: dAppifyABI,
    functionName: "getAllDapps",
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

  console.log(dApps);

  return (
    <main className="px-4 flex flex-col">
      <Navbar />
      <section className="py-6">
        <div className="space-y-6 md:space-y-8 lg:space-y-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Latest dApps
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-10">
            {dApps?.length === 0 && (
              <div className="flex h-screen items-center justify-center">
                <p>No dApps yet</p>
              </div>
            )}
            {error && (
              <div className="flex h-screen items-center justify-center">
                <p>
                  Error fetching dApps, connect wallet if not connected and try
                  again
                  {error.message}
                </p>
              </div>
            )}
            {isPending ? (
              <Skeleton className="h-[250px] rounded-xl" />
            ) : (
              dApps?.map((dApp: DApp, index: number) => (
                <Link href={`#`} key={index}>
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg hover:cursor-pointer"
                  >
                    {/* TODO: Replace with users uploaded image */}
                    <Image
                      alt="Event 1"
                      className="h-60 w-full object-cover"
                      height="200"
                      src="/static/images/MADANA.jpg"
                      style={{
                        aspectRatio: "300/200",
                        objectFit: "cover",
                      }}
                      width="300"
                    />
                    <div className="p-4 md:p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="mb-2 text-lg font-semibold md:text-xl text-black">
                          {dApp.dAppName}
                        </h3>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            window.open(dApp.sourceCode, "_blank");
                          }}
                        >
                          Download
                        </button>
                      </div>
                      <div className="mb-3 flex items-center space-x-2">
                        <p className="text-gray-700">
                          Category: {dApp.category}
                        </p>
                      </div>
                      <div className="mb-3 flex items-center space-x-2">
                        <p className="text-gray-700">Chain {dApp.chain}</p>
                      </div>
                      <div className="mb-3 flex items-center space-x-2">
                        <p className="text-gray-700">Website {dApp.url}</p>
                      </div>
                      <p className="line-clamp-2 text-gray-600">
                        <h2>About dApp</h2>
                        {dApp.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AllDapps;
