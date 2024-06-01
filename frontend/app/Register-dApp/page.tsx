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

export const RegisterdApp = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { isPending, error, writeContractAsync } = useWriteContract();

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
    <div>
      <main className="flex flex-col ">
        <section className="mx-auto max-w-md space-y-6 px-4 py-8">
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
        </section>
      </main>
    </div>
  );
};

export default RegisterdApp;
