import Image from "next/image";
import Nav from "./(components)/Nav";
import TypingEffect from "./(components)/TypingEffect";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div>
      <Nav />
      <div className="mt-4 relative">
        <Image
          src="/images/image2.jpg"
          alt="landing pic"
          width={500}
          height={200}
          className="w-full opacity-20"
        />

        <div className="absolute inset-0 flex items-start mt-10 ml-4">
          <TypingEffect />
        </div>

      </div>
    </div>
  );
}
