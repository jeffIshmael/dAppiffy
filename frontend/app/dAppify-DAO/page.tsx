"use client";

import React, { useState } from "react";
import dAppifyABI from "@/components/Blockchain/dAppifyABI.json";
import { Toaster, toast } from "sonner";
import { useReadContract, useAccount, useWriteContract } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { DAPPIFYCONTRACT } from "../constants/constant";
import { ethers } from "ethers";
import { Checkbox } from "@/components/ui/checkbox";

export const DAppifyDAO = () => {
  const { isPending, error, writeContractAsync } = useWriteContract();
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  async function submit() {
    if (isConnected) {
      try {
        const hash = await writeContractAsync({
          abi: dAppifyABI,
          address: DAPPIFYCONTRACT,
          functionName: "joinDAO",
          args: [],
          value: ethers.parseUnits("260000000000000", "wei"),
        });
        if (hash) {
          console.log(hash);
          toast("You have successfully joined the DAO");
          setErr("");
          // disconnect();
        } else {
          setErr("An error occurred while creating your account.");
        }
      } catch (err: any) {
        if (err.reason) {
          console.log(err.reason);
        } else if (err.message) {
          console.log("Username already taken, please use another.");
        }
        console.log(error);
      }
    } else {
      console.log("please login to your account first");
    }
  }

  return (
    <div className="p-4 bg-gray-100 rounded-md space-y-4">
      <h1 className="text-2xl font-bold text-black">
        Welcome to the Dappify DAO
      </h1>
      <p className="text-gray-600">
        Thank you for considering joining the Dappify DAO! Dappify is a
        groundbreaking platform that serves as an all-in-one marketplace for
        everything related to Web 3.0. Similar to an app store, Dappify is
        dedicated exclusively to decentralized applications (dApps), providing a
        secure and user-friendly environment for discovering, sharing, and
        utilizing the latest advancements in decentralized technology.
      </p>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-black">
          About the Dappify DAO
        </h2>
        <p className="text-gray-600">
          The Dappify DAO (Decentralized Autonomous Organization) is a crucial
          part of our ecosystem, ensuring the quality, security, and integrity
          of the dApps listed on our platform. As a member of the DAO, you will
          play an essential role in vetting and approving dApps before they are
          released to the public. This collaborative governance model empowers
          our community to maintain high standards and trustworthiness in the
          dApps we offer.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-black">How the DAO Works</h2>
        <p className="text-gray-600">
          Staking Tokens: To join the Dappify DAO, members are required to stake
          a specified amount of tokens. This staking mechanism ensures
          commitment and aligns incentives towards maintaining the quality and
          security of the platform. Vetting Process: DAO members participate in
          the vetting process by reviewing and auditing dApps submitted for
          listing. This includes assessing the security, functionality, and
          overall quality of the dApps to ensure they meet our stringent
          standards. Voting and Governance: Members of the DAO have the ability
          to propose and vote on various decisions related to the platform. This
          includes not only the approval of new dApps but also broader
          governance matters that impact the direction and development of
          Dappify.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-black">
          Terms and Conditions for Joining the DAO
        </h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>
            Commitment to Security: You will diligently review and vet dApps for
            potential security vulnerabilities and ensure they adhere to best
            practices in decentralized application development.
          </li>
          <li>
            Integrity and Fairness: You will act with integrity and fairness,
            making decisions that are in the best interest of the Dappify
            community.
          </li>
          <li>
            Confidentiality: You agree to keep sensitive information about
            submitted dApps confidential and not to disclose any proprietary or
            sensitive information without proper authorization.
          </li>
          <li>
            Active Participation: You commit to actively participating in the
            DAO's activities, including voting on proposals and contributing to
            discussions and reviews.
          </li>
          <li>
            Stake Requirements: You understand that staking tokens is a
            requirement for joining the DAO, and you acknowledge the risk that
            comes with staking. Your staked tokens will be locked for a
            specified period, and any malicious behavior or violation of the
            terms may result in the forfeiture of your staked tokens.
          </li>
          <li>
            Adherence to Governance Rules: You agree to follow the governance
            rules set forth by the DAO and to respect the outcomes of the
            democratic voting process.
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-black">
          Join Us in Shaping the Future of Web 3.0
        </h3>
        <p className="text-gray-600">
          By becoming a member of the Dappify DAO, you are not only contributing
          to a secure and vibrant dApp ecosystem but also taking part in shaping
          the future of Web 3.0. Your participation ensures that only the best
          and most secure dApps make it to the forefront, benefiting users and
          developers alike.
        </p>
      </div>

      <div className="space-y-2">
        <Checkbox id="terms" required className="border-gray-700 bg-gray-700" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          <p className="text-gray-600">
            By clicking "Agree," you acknowledge that you have read, understood,
            and agree to the terms and conditions outlined above. Your journey
            towards building and safeguarding the future of decentralized
            applications begins here.
          </p>
        </label>
      </div>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={submit}
      >
        Join the dAppify DAO
      </button>
    </div>
  );
};

export default DAppifyDAO;
