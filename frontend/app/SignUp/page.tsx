"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ firstName, lastName, username });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-40">
      <Link href={"/"} className="flex mr-12 ml-0">
        <Image
          src="/images/logo-no-background.png"
          alt="Logo"
          width={400}
          height={200}
        />
      </Link>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-black opacity-90">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-900"
            >
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  sm:text-sm opacity-90"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium text-gray-900"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm opacity-90"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm opacity-90"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className=" file:w-md bg-blue-600 text-white p-3 px-4 shadow-md flex ml-40 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
