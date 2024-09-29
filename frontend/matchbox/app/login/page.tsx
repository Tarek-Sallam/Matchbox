import Link from "next/link";

export default function Login() {
  return (
    <div className="flex justify-centers items-center flex-col">
      <h1 className="text-4xl mt-[50px]">Matchbox</h1>
      <div className="w-[80vw] fixed top-[45%]">
        <form className="w-full flex justify-centers items-center flex-col gap-5">
          <div className=" border-2 border-black rounded-md w-full h-10">
            <label htmlFor="email">Email:</label>
            <input
              className="outline-none ml-2"
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div className=" border-2 border-black rounded-md w-full h-10">
            <label htmlFor="password">Password:</label>
            <input
              className="outline-none ml-2"
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
          <button type="submit" className="w-1/2 rounded-md h-10 bg-gray-300">
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
