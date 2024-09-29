"use client";

import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const URLBase = "http://127.0.0.1:5000";

  const [uid, setUid] = useState<string | null>(null);

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fname = formData.get("fname") as string;
    const lname = formData.get("lname") as string;

    const response = await fetch(`${URLBase}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        fname,
        lname,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setUid(data.uid);
      console.log("User created successfully:", data);
      console.log("User ID:", uid);
    } else {
      console.error("Failed to create user");
    }
  };

  return (
    <div className="flex justify-centers items-center flex-col">
      <h1 className="text-4xl mt-[50px]">Matchbox</h1>
      <div className="w-[80vw] fixed top-[45%]">
        <form
          className="w-full flex justify-centers items-center flex-col gap-5"
          onSubmit={handleSignup}
        >
          <div className=" border-2 border-black rounded-md w-full h-10 flex justify-between items-center ">
            <input
              className="outline-none ml-2"
              type="text"
              id="fname"
              name="fname"
              placeholder="First Name"
              required
            />
            <p className="text-red-500 mr-4">*</p>
          </div>
          <div className=" border-2 border-black rounded-md w-full h-10 flex justify-between items-center ">
            <input
              className="outline-none ml-2"
              type="text"
              id="lname"
              name="lname"
              placeholder="Last Name"
              required
            />
            <p className="text-red-500 mr-4">*</p>
          </div>
          <div className=" border-2 border-black rounded-md w-full h-10 flex justify-between items-center">
            <input
              className="outline-none ml-2"
              type="email"
              id="email"
              name="email"
              placeholder="my@example.com"
              required
            />
            <p className="text-red-500 mr-4">*</p>
          </div>
          <div className=" border-2 border-black rounded-md w-full h-10 flex justify-between items-center ">
            <input
              className="outline-none ml-2"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
            <p className="text-red-500 mr-4">*</p>
          </div>
          <button type="submit" className="w-1/2 rounded-md h-10 bg-gray-300">
            Login
          </button>
        </form>
      </div>

      <p className="fixed bottom-0">
        Return to{" "}
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
}
