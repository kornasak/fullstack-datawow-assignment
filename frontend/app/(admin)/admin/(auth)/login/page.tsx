"use client";

import { useRouter } from "next/navigation";
import { AuthInput } from "@/components/forms/AuthInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginAdminForm, loginAdminSchema } from "@/schemas/admin/login.schema";
import { login } from "@/api/auth.api";
import { UserRole } from "@/types/role";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/helper/axios";

export default function AdminLoginPage() {
  const router = useRouter();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginAdminForm>({
    resolver: zodResolver(loginAdminSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginAdminForm) => {
    try {
      const data = await login(values);

      if (data.user.role !== UserRole.ADMIN) {
        toast.error("You are not authorized to access this page");
        return;
      }

      localStorage.setItem("access-token", data.accessToken);
      localStorage.setItem("auth-user", JSON.stringify(data.user));

      toast.success("Login success");
      router.push("/admin/concerts/overview");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <h2 className="mb-9 text-center text-[30px] font-bold text-black">
        Login
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
          placeholder="Enter your Password"
          icon="lock"
          error={errors.password?.message}
          {...registerField("password")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded bg-[#2196e8] font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Login as Administrator"}
        </button>
      </form>

      <p className="mt-7 text-center text-[14px] text-black">
        Don’t have an account?{" "}
        <a href="/admin/register" className="text-[#008cff]">
          Create an account
        </a>
      </p>
    </>
  );
}
