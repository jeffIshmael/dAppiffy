"use client";

import { useAccount, useWriteContract } from "wagmi";
import dAppifyABI from "@/components/Blockchain/dAppifyABI.json";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DAPPIFYCONTRACT } from "../constants/constant";
import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { ethers } from "ethers";

export const RegisterdApp = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { writeContractAsync } = useWriteContract();
  // const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  // const [uploading, setUploading] = useState(false);
  const inputFile = useRef(null);

  const validationSchema = Yup.object().shape({
    dAppName: Yup.string().required("Required"),
    logo: Yup.mixed().required("Required"),
    category: Yup.string().required("Required"),
    chain: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    websiteUrl: Yup.string().url("Invalid URL").required("Required"),
    sourceCode: Yup.string().url("Invalid URL").required("Required"),
    videoDemo: Yup.string().url("Invalid URL").required("Required"),
    telegram: Yup.string().url("Invalid URL").required("Required"),
    discord: Yup.string().url("Invalid URL").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConnected) {
      toast.error("Please login to your account");
      console.log("Please login to your account");
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const params = {
      dAppName: data.dAppName as string,
      ipfsHash: cid,
      category: data.category as string,
      chain: data.chain as string,
      description: data.description as string,
      url: data.websiteUrl as string,
      sourceCode: data.sourceCode as string,
      demolink: data.videoDemo as string,
      dAppreg: address,
      telegram: data.telegram as string,
      discord: data.discord as string,
      email: data.email as string,
    };

    try {
      const hash = await writeContractAsync({
        address: DAPPIFYCONTRACT,
        abi: dAppifyABI,
        functionName: "registerDapp",
        args: [params],
        value: ethers.parseUnits("260000000000000", "wei"),
      });
      if (hash) {
        console.log(hash);
        toast("dApp has been registered successfully");
        router.push("/ExploreDapps");
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to register dApp, try again.");
      return;
    }
  }

  const uploadFile = async (fileToUpload) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", fileToUpload);
      const res = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const resData = await res.json();
      setCid(resData.IpfsHash);
      console.log(resData.IpfsHash);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    uploadFile(e.target.files[0]);
  };

  return (
    <>
      <div className="flex items-center flex-col justify-center min-h-screen bg-gray-900">
        <div className="mt-2">
          <Link href={"/"}>
            <div className="bg-gray-300 rounded-lg ">
              <h1 className="text-2xl font-bold mb-6 text-center p-4 text-black">
                dApp Registration Form
              </h1>
            </div>
          </Link>
        </div>
        <div className=" flex w-full max-w-xl bg-gray-700 rounded-lg p-8 shadow-lg ">
          <Formik
            initialValues={{
              dAppName: "",
              logo: null,
              category: "",
              chain: "",
              description: "",
              websiteUrl: "",
              sourceCode: "",
              videoDemo: "",
              telegram: "",
              discord: "",
              email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form className="space-y-4" onSubmit={submit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dAppName" className="block font-medium">
                    dApp Name
                  </label>
                  <Field
                    id="dAppName"
                    name="dAppName"
                    className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300 text-black"
                  />
                  <ErrorMessage
                    name="dAppName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="logo"
                    className="block font-medium mb-2 text-white"
                  >
                    dApp Logo
                  </label>
                  <input
                    id="logo"
                    name="logo"
                    type="file"
                    ref={inputFile}
                    onChange={handleChange}
                    className="border w-full border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <ErrorMessage
                    name="logo"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block font-medium mb-2">
                    Category
                  </label>
                  <Field
                    as="select"
                    id="category"
                    name="category"
                    className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300 text-black"
                  >
                    <option value="">select your dApp category</option>
                    <option value="DeFi">DeFi</option>
                    <option value="NFT collection">NFT collection</option>
                    <option value="NFT marketplace">NFT marketplace</option>
                    <option value="Games">Games</option>
                    <option value="Others">Others</option>
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="chain" className="block font-medium mb-2">
                    Chain
                  </label>
                  <Field
                    as="select"
                    id="chain"
                    name="chain"
                    className=" border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300 text-black"
                  >
                    <option value="">Select the chain</option>
                    <option value="Lisk">Lisk</option>
                    <option value="Celo">Celo</option>
                    <option value="Ethereum">Ethereum</option>
                    <option value="Solana">Solana</option>
                    <option value="Arbitrum">Arbitrum</option>
                    <option value="Others">Others</option>
                  </Field>
                  <ErrorMessage
                    name="chain"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block font-medium">
                  Full description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="w-full border h-32 text-black border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label htmlFor="websiteUrl" className="block font-medium">
                  Website (URL)
                </label>
                <Field
                  id="websiteUrl"
                  name="websiteUrl"
                  className="w-full border text-black border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <ErrorMessage
                  name="websiteUrl"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label htmlFor="sourceCode" className="block font-medium">
                  Source code (Github link)
                </label>
                <Field
                  id="sourceCode"
                  name="sourceCode"
                  className="w-full border text-black border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <ErrorMessage
                  name="sourceCode"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label htmlFor="videoDemo" className="block font-medium">
                  Link to video demo
                </label>
                <Field
                  id="videoDemo"
                  name="videoDemo"
                  className="w-full border text-black border-green-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <ErrorMessage
                  name="videoDemo"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-lg mb-0">
                <h1 className="text-2xl font-bold mb-6 text-center text-black">
                  Developer socials
                </h1>
              </div>

              <div>
                <label htmlFor="telegram" className="block font-medium">
                  Telegram (developer)
                </label>
                <Field
                  id="telegram"
                  name="telegram"
                  className="w-full mt-0 border text-black border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <ErrorMessage
                  name="telegram"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label htmlFor="discord" className="block font-medium">
                  Discord (developer)
                </label>
                <Field
                  id="discord"
                  name="discord"
                  className="w-full border text-black border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <ErrorMessage
                  name="discord"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-medium">
                  Email (developer)
                </label>
                <Field
                  id="email"
                  name="email"
                  className="w-full border text-black border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default RegisterdApp;
