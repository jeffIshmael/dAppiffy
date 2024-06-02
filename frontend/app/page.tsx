"use client";

import Nav from "./(components)/Nav";
import LandPage from "./(components)/Centerpage";
import { AuthProvider } from "../context/AuthContext";
import { AppProps } from "next/app";

export default function Home() {
  return (
    <>
      <Nav />
      <LandPage />
    </>
  );
}
