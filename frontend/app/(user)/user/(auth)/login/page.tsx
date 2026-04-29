'use client'

import { useRouter } from "next/navigation";
import { AuthInput } from "@/components/forms/AuthInput";

export default function UserLoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/user/concerts");
  };

  return (
    <>
      <h2 className="mb-9 text-center text-[30px] font-bold text-black">
        Login
      </h2>

      <form className="space-y-6">
        <AuthInput
          label="Email"
          type="email"
          placeholder="Enter your Email Address"
          icon="email"
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="Enter your Password"
          icon="lock"
        />

        <button
          onClick={handleSubmit}
          className="h-12 w-full bg-[#2196e8] text-white font-bold rounded"
        >
          Login as User
        </button>
      </form>

      <p className="mt-7 text-center text-[14px] text-black">
        Don’t have an account?{" "}
        <a href="/user/register" className="text-[#008cff]">
          Create an account
        </a>
      </p>
    </>
  );
}
