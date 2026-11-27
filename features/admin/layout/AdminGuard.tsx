"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ApiError } from "@/lib/api";
import { clearSession, fetchMe, getToken, homePathFor } from "@/features/auth/api";

type Status = "checking" | "ok" | "error";

/**
 * Memeriksa sesi ke server sebelum halaman admin tampil.
 * Ini hanya lapisan kenyamanan (UX). Perlindungan sebenarnya ada di API:
 * setiap endpoint admin dijaga middleware "admin" dan akan membalas 403.
 */
export default function AdminGuard({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("checking");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      if (!getToken()) {
        router.replace("/masuk");
        return;
      }

      try {
        const user = await fetchMe();
        if (cancelled) return;

        if (user.role !== "admin") {
          router.replace(homePathFor(user.role));
          return;
        }

        setStatus("ok");
      } catch (err) {
        if (cancelled) return;

        // Token ditolak atau sudah kedaluwarsa
        if (err instanceof ApiError && err.status === 401) {
          clearSession();
          router.replace("/masuk");
          return;
        }

        // Gangguan jaringan/server: jangan mengeluarkan admin, beri kesempatan mencoba lagi
        setStatus("error");
      }
    };

    check();

    return () => {
      cancelled = true;
    };
  }, [attempt, router]);

  if (status === "ok") return <>{children}</>;

  return (
    <div className="grid min-h-dvh place-items-center bg-[#eff2f7] px-6 text-center">
      {status === "checking" ? (
        <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
          <Loader2 size={18} className="animate-spin" />
          Memeriksa sesi…
        </div>
      ) : (
        <div>
          <p className="text-sm font-semibold text-slate-700">
            Tidak dapat terhubung ke server.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus("checking");
              setAttempt((n) => n + 1);
            }}
            className="mt-4 rounded-full bg-[#ec7013] px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
          >
            Coba lagi
          </button>
        </div>
      )}
    </div>
  );
}