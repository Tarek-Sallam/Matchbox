"use client";

import Link from "next/link";

const URLBase = "http://127.0.0.1:5000";

const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await fetch(
    `${URLBase}/user/login?email=${email}&password=${password}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  if (response.ok) {
    const data = await response.json();
    console.log("User logged in successfully:", data);
    console.log("User ID:", data.uid);
  } else {
    console.error("Failed to log in user");
  }
};

export default function Login() {
  return (
    <div className="flex justify-centers items-center flex-col">
      <h1 className="text-4xl mt-[50px]">Matchbox</h1>
      <div className="w-[80vw] fixed top-[45%]">
        <form
          className="w-full flex justify-centers items-center flex-col gap-5"
          onSubmit={handleLogin}
        >
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
          <button type="submit" className="w-1/2 rounded-md h-10  bg-gray-300">
            Login
          </button>
        </form>
      </div>

      <p className="fixed bottom-0">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </div>
  );
}
