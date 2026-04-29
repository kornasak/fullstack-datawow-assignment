import { apiClient } from "@/lib/axios";
import { paths } from "@/types/api";

type RegisterPath = paths["/auths/register"]["post"];
type LoginPath = paths["/auths/login"]["post"];
// type MePath = paths["/auths/me"]["get"];
// type AdminOnlyPath = paths["/auths/admin-only"]["get"];

export type RegisterRequest =
  RegisterPath["requestBody"]["content"]["application/json"];
export type RegisterResponse =
  RegisterPath["responses"]["201"]["content"]["application/json"];

export type LoginRequest =
  LoginPath["requestBody"]["content"]["application/json"];
export type LoginResponse =
  LoginPath["responses"]["201"]["content"]["application/json"];

// export type MeResponse = MePath["responses"]["200"]["content"]["application/json"];

// export type AdminOnlyResponse = AdminOnlyPath["responses"]["200"]["content"]["application/json"];

export async function register(
  payload: RegisterRequest,
): Promise<RegisterResponse> {
  const { data } = await apiClient.post("/auths/register", payload);
  return data;
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const { data } = await apiClient.post("/auths/login", payload);
  return data;
}
