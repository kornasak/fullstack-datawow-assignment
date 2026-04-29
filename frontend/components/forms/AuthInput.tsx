"use client";

import { useState } from "react";
import { LuEye, LuEyeOff, LuLockKeyhole, LuMail, LuUser } from "react-icons/lu";

type AuthIcon = "user" | "email" | "lock";

const iconMap = {
  user: LuUser,
  email: LuMail,
  lock: LuLockKeyhole,
};

type Props = {
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  icon?: AuthIcon;
  error?: string;
  name?: string;
};

export function AuthInput({
  label,
  type = "text",
  placeholder,
  icon,
  error,
  name,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const Icon = icon ? iconMap[icon] : null;

  return (
    <div>
      <label className="mb-3 block text-[18px] font-medium text-black">
        {label}
      </label>

      <div
        className={`flex h-11.5 items-center rounded border px-3 transition ${
          error
            ? "border-red-500"
            : "border-[#9b9b9b] focus-within:border-[#057ba7]"
        }`}
      >
        {Icon && <Icon className="mr-3 text-[20px] text-black" />}

        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          className="h-full w-full bg-transparent text-[14px] text-black outline-none placeholder:text-[#b7b7b7]"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="ml-3 text-black"
          >
            {showPassword ? (
              <LuEye className="text-[18px]" />
            ) : (
              <LuEyeOff className="text-[18px]" />
            )}
          </button>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
