"use client";

import { register } from "@/api/auth.api";
import { AuthInput } from "@/components/forms/AuthInput";
import { getErrorMessage } from "@/helper/axios";
import {
  RegisterUserForm,
  registerUserSchema,
} from "@/schemas/user/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function UserRegisterPage() {
  const router = useRouter();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserForm>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterUserForm) => {
    try {
      const response = await register({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });

      toast.success(response.message);
      router.push("/user/login");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <h2 className="mb-10 text-center text-[32px] font-bold text-black">
        Sign Up
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          label="Full name"
          placeholder="Enter your Full Name"
          icon="user"
          error={errors.fullName?.message}
          {...registerField("fullName")}
        />

        <AuthInput
          label="Email"
          type="email"
          placeholder="Enter your Email Address"
          icon="email"
          error={errors.email?.message}
          {...registerField("email")}
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="Create a Password"
          icon="lock"
          error={errors.password?.message}
          {...registerField("password")}
        />

        <AuthInput
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your Password"
          icon="lock"
          error={errors.confirmPassword?.message}
          {...registerField("confirmPassword")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full bg-[#2196e8] text-white font-bold rounded"
        >
          {isSubmitting ? "Creating..." : "Create an account"}
        </button>
      </form>

      <p className="mt-8 text-center text-[16px] text-black">
        Already have an account?{" "}
        <Link href="/user/login" className="text-[#008cff]">
          Login
        </Link>
      </p>
    </>
  );
}
