import { z } from "zod";

export const loginAdminSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginAdminForm = z.infer<typeof loginAdminSchema>;
