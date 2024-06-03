"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
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
import { useRouter } from "next/navigation";
import { useDisconnect } from "wagmi";

const Navbar: React.FC = () => {
  const auth = useAuth();
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  console.log(auth.isAuthenticated);

  function logOut() {
    disconnect();
    auth.isAuthenticated = false;
    auth.username = "";
  }

  return (
    <nav className="flex justify-between">
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
      <div className="flex items-center space-x-16">
        <Link
          href={"/"}
          className="transition-all duration-300 ease-in-out hover:text-blue-400 hover:scale-105"
        >
          Home
        </Link>
        <Link
          href={"/ExploreDapps"}
          className="transition-all duration-300 ease-in-out hover:text-blue-400 hover:scale-105"
        >
          Explore
        </Link>
        <Link
          href={"/"}
          className="transition-all duration-300 ease-in-out hover:text-blue-400 hover:scale-105"
        >
          Updates
        </Link>
        <Link
          href={"/"}
          className="transition-all duration-300 ease-in-out hover:text-blue-400 hover:scale-105"
        >
          Proposed dApps
        </Link>
      </div>
      <div className="flex items-center space-x-6 mr-4">
        <div className=" flex mr-12">
          <Button
            variant="secondary"
            className="bg-gradient-to-r from-gray-600 to-gray-500 hover:bg-gradient-to-r hover:from-gray-400 hover:to-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            <Link href="/Register-dApp">Register dApp</Link>
          </Button>
        </div>
        {auth.isAuthenticated ? (
          <>
            <div className="w-100 bg-gray-300 rounded-md p-1 ">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="ho:c-pointer">
                  <div className="flex justify-between items-center space-x-1 hover:cursor-pointer">
                    <Avatar>
                      <AvatarImage src="/static/images/avatar.png" />
                      <AvatarFallback>DP</AvatarFallback>
                    </Avatar>
                    <h1 className="text-black">{auth.username}</h1>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
                  <Button variant="ghost" onClick={logOut}>
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : (
          <>
            <Button asChild variant="outline" className="hover:border-blue-900">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-white text-black hover:bg-slate-300 ">
              <Link href="/SignUp">Sign Up</Link>
            </Button>
          </>
        )}

        <div />
      </div>
    </nav>
  );
};

export default Navbar;
