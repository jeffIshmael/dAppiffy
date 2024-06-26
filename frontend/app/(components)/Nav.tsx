"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Cloud,
  Copy,
  CreditCard,
  Github,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
  UserPlus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import {
  useDisconnect,
  useAccount,
  useReadContract,
  useAccountEffect,
  useWriteContract,
} from "wagmi";
import ConnectButton from "./Connect";
import dAppifyABI from "@/components/Blockchain/dAppifyABI.json";
import { DAPPIFYCONTRACT } from "../constants/constant";
import Modal from "./Modal";
import { toast } from "sonner";

type UserData = {
  userName: string;
};

const Navbar: React.FC = () => {
  const auth = useAuth();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const [prob, setProb] = useState("");
  const [success, setSuccess] = useState("");
  const [mounted, setMounted] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [userName, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isPending, writeContractAsync } = useWriteContract();
  const [isHovered, setIsHovered] = useState(false);
  const { error, refetch } = useReadContract({
    abi: dAppifyABI,
    address: DAPPIFYCONTRACT,
    functionName: "getUser",
    args: [address],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useAccountEffect({
    async onConnect() {
      console.log("Connected!");
      console.log(address);
      try {
        const result = await refetch();
        const data = result.data as [UserData, boolean];
        const reg = data[1];
        console.log(data);
        console.log(data[1]);
        if (reg === false) {
          auth.isAuthenticated = false;
          setIsModalOpen(true);
        } else {
          auth.isAuthenticated = true;
          setUserName(data[0].userName);
          console.log(userName);
        }
      } catch (err) {
        console.log(err);
        error && console.log(error);
      }
    },
  });

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUsernameSubmit = async (newUsername: string) => {
    if (isConnected) {
      console.log(newUsername);
      try {
        const hash = await writeContractAsync({
          abi: dAppifyABI,
          address: DAPPIFYCONTRACT,
          functionName: "signUp",
          args: [newUsername],
        });
        if (hash) {
          console.log(hash);
          setSuccess("Account has been created. You can now ");
          setProb("");
          auth.isAuthenticated = true;
          const result = await refetch();
          const data = result.data as [UserData, boolean];
          console.log(result);
          setUserName(data[0].userName);
        } else {
          setProb("An error occurred while creating your account.");
        }
      } catch (err: any) {
        if (err.reason) {
          console.log(err.reason);
          toast(err.reason);
          setProb(err.reason);
        } else if (err.message) {
          console.log(err.message);
          toast("Username already taken, please use another.");
          setProb("Username already taken, please use another.");
        }
        console.log(prob);
      }
    } else {
      console.log("please connect wallet");
    }
  };
  console.log(registered);
  console.log(success);

  if (!mounted) return null;

  function logOut() {
    auth.isAuthenticated = false;
    setRegistered(false);
    disconnect();
    setIsModalOpen(false);
  }

  return (
    <nav className="flex justify-between items-center">
      <Link href={"/"}>
        <div className="flex logo ml-5 rounded-md mt-3 mb-2">
          <Image
            src="/static/images/logo-no-background.png"
            width={200}
            height={50}
            alt="Logo"
          />
        </div>
      </Link>
      <div className="flex items-center space-x-8">
        <Link
          href={"/"}
          className="transition-all duration-300 ease-in-out hover:text-blue-400 hover:scale-105 flex-grow-1"
        >
          Home
        </Link>
        <Link
          href={"/ExploreDapps"}
          className="transition-all duration-300 ease-in-out hover:text-blue-400 hover:scale-105 flex-grow-1"
        >
          Explore
        </Link>
        <Link
          href={"/"}
          className="transition-all duration-300 ease-in-out hover:text-blue-400 hover:scale-105 flex-grow-1"
        >
          Updates
        </Link>
        <Link
          href={"/ProposedDapps"}
          className="transition-all duration-300 ease-in-out hover:text-blue-400 hover:scale-105 flex-grow-1"
        >
          Proposed dApps
        </Link>
      </div>
      <div className="flex items-center space-x-6 mr-4">
        <div className="flex mr-12">
          <Button
            variant="secondary"
            className="bg-gradient-to-r from-gray-600 to-gray-500 hover:bg-gradient-to-r hover:from-gray-400 hover:to-gray-300 text-gray-800 font-bold py-2 px-4 rounded flex-grow-1"
          >
            <Link href="/RegisterdApp">Register dApp</Link>
          </Button>
        </div>
        {auth.isAuthenticated ? (
          <>
            <div className="w-100 bg-gray-300 rounded-md p-1 ">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="ho:c-pointer">
                  <div className="flex justify-between items-center space-x-1 hover:cursor-pointer flex-grow-1">
                    <Avatar>
                      <AvatarImage src="/static/images/avatar.png" />
                      <AvatarFallback>DP</AvatarFallback>
                    </Avatar>
                    <h1 className="text-black flex-grow-1">{userName}</h1>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <div className="flex items-center gap-2 ">
                    <small className="text-ellipsis overflow-hidden truncate w-full ml-2 flex-grow-1">
                      {address}
                    </small>
                    <Button type="submit" size="sm" className="px-3">
                      <span className="sr-only">Copy</span>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Downloads</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Invite users</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Email</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>Message</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            <span>More...</span>
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Github className="mr-2 h-4 w-4" />
                    <span>GitHub</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <Cloud className="mr-2 h-4 w-4" />
                    <span>API</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <div className="hover:cursor-pointer">
                    <Button variant="ghost" onClick={logOut}>
                      <DropdownMenuItem className="hover:cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4 hover:cursor-pointer" />
                        <span className="hover:cursor-pointer">Log out</span>
                      </DropdownMenuItem>
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between mr-1">
              <ConnectButton />
              <div>
                {isConnected && (
                  <Button
                    variant="ghost"
                    className="flex items-center justify-center p-2 relative flex-grow-1"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setIsModalOpen(true)}
                    disabled={isModalOpen}
                  >
                    <Image
                      src={"/static/images/noun-sign-up.png"}
                      width={40}
                      height={40}
                      alt="signUp"
                      className="bg-gray-300 rounded-md"
                    />
                    {isHovered && (
                      <div
                        className="absolute top-full left-0 right-0 flex items-center justify-center bg-gray-900 text-white text-xs px-2 py-1 rounded-md"
                        style={{ transform: "translateY(25%)" }}
                      >
                        Sign Up
                      </div>
                    )}
                  </Button>
                )}
                <Modal
                  isOpen={isModalOpen}
                  onClose={handleModalClose}
                  onSubmit={handleUsernameSubmit}
                  isPending={isPending}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
