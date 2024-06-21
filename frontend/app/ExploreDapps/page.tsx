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
    ipfsHash: string;
    sourceCode: string;
    telegram: string;
    url: string;
  }

  // const filterByCategory = (category: string): DApp[] => {
  //   return dApps?.filter((dApp: DApp) => dApp.category === category) || [];
  // };

  // const Categories = [
  //   "DeFi",
  //   "NFT Collection",
  //   "NFT Marketplace",
  //   "Games",
  //   "Others",
  // ];

  console.log(dApps);
  // console.log(dApps.ipfsHash);

  return (
    <main className="px-2 flex flex-col">
      <Navbar />
      <section className="py-6">
        <div className="space-y-6 md:space-y-8 lg:space-y-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Latest dApps
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-6 lg:gap-10">
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
                </p>
              </div>
            )}
            {isPending ? (
              <Skeleton className="h-[250px] rounded-xl" />
            ) : (
              dApps?.map((dApp: DApp, index: number) => (
                <Link href={`/dAppdetails/${index}`} key={index}>
                  <div key={index}>
                    <div>
                      <div className="flex flex-col space-y-2 p-2 shadow-md rounded-xl">
                        <div>
                          <Image
                            alt="App Icon"
                            height="200"
                            src={`https://ipfs.io/ipfs/${dApp.ipfsHash}`}
                            width="200"
                            className="object-cover rounded-xl"
                          />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold md:text-base text-white">
                            {dApp.dAppName}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {dApp.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          {/* <div>
            {Categories.map((category) => (
              <div key={category}>
                <h2>{category}</h2>
                {filterByCategory(category).map((dApp: DApp, index: number) => (
                  <Link href={`/dAppdetails/${index}`} key={index}>
                    <div key={index}>
                      <div>
                        <div className="flex flex-col space-y-2 p-2 shadow-md rounded-xl">
                          <div>
                            <Image
                              alt="App Icon"
                              height="200"
                              src={`https://ipfs.io/ipfs/${cid}`}
                              width="200"
                              className="object-cover rounded-xl"
                            />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-lg font-semibold md:text-base text-white">
                              {dApp.dAppName}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              {dApp.category}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div> */}
            {/* ))} */}
          {/* </div> */}
        </div>
      </section>
    </main>
  );
};

export default AllDapps;
