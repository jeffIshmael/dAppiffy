import Image from "next/image";
import Nav from "./(components)/Nav";
import TypingEffect from "./(components)/TypingEffect";
import Component from "./(components)/Centerpage";
import { AuthProvider } from "./context/AuthContext";

export default function Home() {
  return (
    <AuthProvider>
    <div>
      <Nav />
      <div className="mt-4 relative">
        <Component />
        <div className="absolute inset-0 flex items-start mt-10 ml-4"></div>
      </div>
    </div>
    </AuthProvider>
  );
}
