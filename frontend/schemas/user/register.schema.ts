import { z } from "zod";

export const registerUserSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export type RegisterUserForm = z.infer<typeof registerUserSchema>;
