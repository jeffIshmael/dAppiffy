"use client";

import { useAccount, useWriteContract } from "wagmi";
import dAppifyABI from "@/components/Blockchain/dAppifyABI.json";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { DAPPIFYCONTRACT } from "../constants/constant";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";

export const RegisterdApp = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { isPending, error, writeContractAsync } = useWriteContract();

  const validationSchema = Yup.object().shape({
    dAppName: Yup.string().required("Required"),
    logo: Yup.mixed().required("Required"),
    category: Yup.string().required("Required"),
    chain: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
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
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
      const hash = await writeContractAsync({
        address: DAPPIFYCONTRACT,
        abi: dAppifyABI,
        functionName: "proposeDapp",
        args: [data.name as string, data.description as string],
      });
      if (hash) {
        console.log(hash);
        toast("Proposal has been successfully made");
        router.push("/ProposeddApps");
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to register dApp, try again.");
      return;
    }
  }

  return (
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
          {({ setFieldValue }) => (
            <Form className="space-y-4">
              <div className=" flex justify-between lg:grid grid-cols-2 space-y-2 ">
                <div>
                  <label htmlFor="dAppName" className="block font-medium">
                    dApp Name
                  </label>
                  <Field
                    id="dAppName"
                    name="dAppName"
                    className="border border-gray-300 p-2 rounded mr-4 focus:outline-none focus:ring focus:border-blue-300 text-black"
                  />
                  <ErrorMessage
                    name="dAppName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="logo" className="block font-medium">
                    dApp Logo
                  </label>
                  <input
                    id="logo"
                    name="logo"
                    type="file"
                    onChange={(event) => {}}
                    className="flex border border-gray-300 p-2 rounded mr-4 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <ErrorMessage
                    name="logo"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block font-medium">
                    Category
                  </label>
                  <Field
                    as="select"
                    id="category"
                    name="category"
                    className=" border border-gray-300 p-2 rounded mr-4 focus:outline-none focus:ring focus:border-blue-300 text-black"
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
                  <label htmlFor="chain" className="block font-medium">
                    Chain
                  </label>
                  <Field
                    as="select"
                    id="chain"
                    name="chain"
                    className=" border border-gray-300 text-black p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
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
                  className="w-full border text-black border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label htmlFor="sourceCode" className="block font-medium">
                  Source code (smart contract)
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

              <div className="bg-gray-300 rounded-lg mb-0">
                <h1 className="text-2xl font-bold mb-6 text-center  text-black">
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
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-opacity-80"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterdApp;
{
  /* <section className="mx-auto max-w-md space-y-6 px-4 py-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Register dApps</h1>
            <p className="text-gray-500 ">
              Fill out the form to register a dApp.
            </p>
          </div>
          <form onSubmit={submit} className="">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">dApp Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">dApp Icon</Label>
                <Input id="picture" type="file" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="venue">Source code(Github Link)</Label>
                <Input id="venue" name="venue" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="name">dApp Description</Label>
                <Textarea id="description" name="description" required />
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox id="terms1" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  ></label>
                </div>
              </div>
            </div>
            <Button
              disabled={isPending}
              className="mt-8 w-full"
              type="submit"
              variant="secondary"
            >
              {isPending ? "Creating..." : "Register dApp"}
            </Button>
          </form>
        </section> */
}
