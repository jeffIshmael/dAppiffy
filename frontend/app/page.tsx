import Image from "next/image";
import Nav from "./(components)/Nav";
import { Fullscreen } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Nav />
      <div className="mt-4">
        <Image src="/images/image2.jpg" alt="landing pic" width={500} height={200} />
      </div>
    </div>
  );
}
