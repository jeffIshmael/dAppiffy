"use client";

import React, { useState, useEffect } from "react";
import { DAPPIFYCONTRACT } from "../constants/constant";
import dAppifyABI from "@/components/Blockchain/dAppifyABI.json";
import { useReadContract } from "wagmi";
// import Link from "next/link";
import Navbar from "../(components)/Nav";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
// import { cid } from "../constants/ipfshash";

const AllProposals = () => {
  const [countDown, setCountDown] = useState("");
  // const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const {
    data: ProposalIds,
    isPending,
    error,
  } = useReadContract({
    address: DAPPIFYCONTRACT,
    abi: dAppifyABI,
    functionName: "getAllProposalIds",
  });

  const {
    data: Proposals,
    
  } = useReadContract({
    address: DAPPIFYCONTRACT,
    abi: dAppifyABI,
    functionName: "getProposal",
    args: [ProposalIds],
  });

  // interface proposal {
  //   proposalId: string;
  //   dAppName: string;
  //   description: string;
  //   category: string;
  //   chain: string;
  //   yesVotes: string;
  //   noVotes: string;
  //   endtime: string;
  //   proposer: string;
  //   isApproved: boolean;
  // }

  useEffect(() => {
    if (!Proposals) return;

    const Timestamp = Number(Proposals?.[7]);
    const FormattedDate = new Date(Timestamp * 1000).toLocaleString();
    setDate(FormattedDate);

    const nowTimestamp = Timestamp; // Convert BigInt to Number
    const targetDate = new Date(nowTimestamp * 1000 + 24 * 60 * 60 * 1000);

    const updateCountdown = () => {
      const now = new Date();
      console.log(now);
      const timeDifference = targetDate.getTime() - now.getTime();
      const remainingTime = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      console.log(timeDifference);
      console.log(remainingTime);

      if (remainingTime <= 0) {
        setCountDown("0");
      } else {
        const hours = Math.floor(
          (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        setCountDown(
          `${String(hours).padStart(2, "0")}hrs ${String(minutes).padStart(
            2,
            "0"
          )} mins`
        );
      }
    };

    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [Proposals]);

  
  console.log(countDown);
  console.log(Proposals);
  console.log(ProposalIds?.[0] as string);
  //   console.log(Proposal[8]);

  return (
    <main>
      <Navbar />
      <section>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Proposed dApps
            </h1>
          </div>
          <div>
            {ProposalIds?.length === 0 && (
              <div className="flex h-screen items-center justify-center">
                <p>No proposed dApps yet</p>
              </div>
            )}
            {error && (
              <div className="flex h-screen items-center justify-center">
                <p>
                  Error fetching proposals, connect wallet if not connected and
                  try again
                </p>
              </div>
            )}
            {isPending ? (
              <Skeleton className="h-[250px] rounded-xl" />
            ) : (
              <div className="flex flex-col p-4 shadow-md rounded-xl bg-gray-800 text-white w-full">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm">
                    <small>
                      By:{" "}
                      <span className="text-blue-400">
                        {`${Proposals?.[14].slice(
                          0,
                          6
                        )}...${Proposals?.[14].slice(-6)}`}
                      </span>
                      {"   "}
                      {"   "} At: <span className="text-pretty">{date}</span>
                    </small>

                    {countDown === "00hrs 00 mins" ? (
                      <p className="text-red-300">Ended</p>
                    ) : (
                      <p style={{ fontStyle: "italic" }}>
                        Ends in: {countDown}
                      </p>
                    )}
                  </div>
                  <div>
                    {Proposals?.[15] === false ? (
                      <p className="text-gray-400">Not Approved</p>
                    ) : (
                      <p className="text-green-500">Approved</p>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <div className="">
                    <Image
                      alt="App Icon"
                      height="100"
                      src={`https://ipfs.io/ipfs/${Proposals?.[8]}`}
                      width="100"
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col justify-between ">
                    <div className="">
                      <h3
                        className="text-slate-300 mb-0.5"
                        style={{ fontStyle: "italic" }}
                      >
                        {Number(ProposalIds?.[0])}
                      </h3>
                      <h2 className="text-lg font-bold md:text-base text-white mt-0">
                        {Proposals?.[1]}
                      </h2>
                      <h3 className="text-lg   text-white">{Proposals?.[3]}</h3>
                      <p className="text-gray-300 text-sm">
                        Chain: {Proposals?.[4]}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col space-y-2 space-x-10 items-center">
                    <button className="text-white bg-blue-500 px-4 py-2 rounded-md mr-2 self-end">
                      Approve
                    </button>
                    <button className="text-white bg-red-500 px-4 py-2 rounded-md self-end">
                      Disapprove
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="font-semibold">Description</p>
                  <p>{Proposals?.[2]}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AllProposals;
