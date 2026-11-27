import { api } from "@/lib/api";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
};

export type AuthResponse = { token: string; user: AuthUser };
type Credentials = { email: string; password: string };

const post = (path: string, body: Credentials) =>
  api<AuthResponse>(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

export const register = (c: Credentials) => post("/auth/register", c);
export const login = (c: Credentials) => post("/auth/login", c);

const TOKEN_KEY = "ewf_token";
const USER_KEY = "ewf_user";

/** Simpan sesi di browser. */
export function saveSession(res: AuthResponse) {
  try {
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
  } catch {
    // Penyimpanan diblokir (mode privat); sesi hanya berlaku sampai halaman ditutup
  }
}

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {
    // Penyimpanan diblokir; tidak ada yang perlu dihapus
  }
}

/** Halaman tujuan setelah masuk, sesuai peran. */
export const homePathFor = (role: AuthUser["role"]) =>
  role === "admin" ? "/admin" : "/dashboard";

/** Seperti api(), tetapi menyertakan token pengguna yang sedang masuk. */
export function authApi<T>(path: string, init: RequestInit = {}) {
  const token = getToken();

  return api<T>(path, {
    ...init,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });
}

/** Data pengguna terbaru dari server (sumber kebenaran untuk peran). */
export async function fetchMe() {
  const { user } = await authApi<{ user: AuthUser }>("/auth/me");
  return user;
}

/** Cabut token di server (jika masih valid), lalu hapus sesi di browser. */
export async function logout() {
  try {
    if (getToken()) await authApi("/auth/logout", { method: "POST" });
  } catch {
    // Token mungkin sudah kedaluwarsa atau server tidak terjangkau: sesi lokal tetap dihapus
  }

  clearSession();
}