import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Nav = () => {
  return (
    <nav className="flex justify-between ">
      <Link href={"/"}>
        <div className="flex logo ml-5 rounded-md">
          <Image
            src="/images/logo-no-background.png"
            width={200}
            height={100}
            alt="Logo"
          />
        </div>
      </Link>
      <div className="flex items-center space-x-16">
        <Link href={"/"}> Home </Link>
        <Link href={"/"}> Explore </Link>
        <Link href={"/"}> Updates </Link>
        <Link href={"/"}> Proposed dApps </Link>
      </div>

      <div className="flex items-center space-x-6 mr-4">
        <div className=" flex mr-12">
          <Button asChild variant="secondary">
            <Link href="/Register-dApp">register dApp</Link>
          </Button>
        </div>
        <Button asChild variant="outline">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/SignUp">Sign Up</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Nav;
