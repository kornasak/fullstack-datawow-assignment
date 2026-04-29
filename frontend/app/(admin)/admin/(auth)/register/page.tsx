import { AuthInput } from "@/components/forms/AuthInput";
import Link from "next/link";

export default function AdminRegisterPage() {
  return (
    <>
      <h2 className="mb-10 text-center text-[32px] font-bold text-black">
        Sign Up
      </h2>

      <form className="space-y-6">
        <AuthInput
          label="Full name"
          placeholder="Enter your Full Name"
          icon="user"
        />

        <AuthInput
          label="Email"
          type="email"
          placeholder="Enter your Email Address"
          icon="email"
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="Create a Password"
          icon="lock"
        />

        <AuthInput
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your Password"
          icon="lock"
        />

        <button className="h-12 w-full bg-[#2196e8] text-white font-bold rounded">
          Create an account
        </button>
      </form>

      <p className="mt-8 text-center text-[16px] text-black">
        Already have an account?{" "}
        <Link href="/admin/login" className="text-[#008cff]">
          Login
        </Link>
      </p>
    </>
  );
}
