import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  exp: number;
  role: "ADMIN" | "USER";
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function getAccessToken() {
  if (!isBrowser()) return null;

  return localStorage.getItem("access-token");
}

export function isTokenValid() {
  const token = getAccessToken();

  if (!token) return false;

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    const now = Date.now() / 1000;

    return decoded.exp > now;
  } catch {
    return false;
  }
}

export function logout() {
  if (!isBrowser()) return;

  localStorage.removeItem("access-token");
  localStorage.removeItem("auth-user");
}
