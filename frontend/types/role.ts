import { components } from "@/types/api";

export type Role = components["schemas"]["LoginResponse"]["user"]["role"];

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}
