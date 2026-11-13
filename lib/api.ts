function requireApiUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_API_URL belum di-set.");
  }
  return url;
}

const API_URL = requireApiUrl();

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function apiUrl(path: string) {
  return `${API_URL}${path}`;
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(apiUrl(path), {
    ...init,
    headers: { Accept: "application/json", ...init.headers },
  });

  if (!res.ok) {
    let message = "Terjadi kesalahan. Silakan coba lagi.";

    try {
      const body = await res.json();
      const firstError = body?.errors ? Object.values<string[]>(body.errors)[0]?.[0] : undefined;
      message = firstError ?? body?.message ?? message;
    } catch {
      // respons bukan JSON, pakai pesan bawaan
    }

    throw new ApiError(res.status, message);
  }

  return res.json() as Promise<T>;
}