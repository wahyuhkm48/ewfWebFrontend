"use client";

import { useId, useState, type CSSProperties, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { ApiError } from "@/lib/api";
import { homePathFor, login, register, saveSession } from "../api";
import { AUTH_COPY, type AuthMode } from "../copy";

type Props = {
  mode: AuthMode;
  active: boolean;
  onSwitch: () => void;
  className?: string;
};

type Message = { tone: "error" | "info"; text: string; id: number };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const label = "mb-2 block text-sm font-bold text-ink";
const input =
  "w-full rounded-full border-2 border-ink bg-white px-5 py-3 text-base font-medium text-ink outline-none transition placeholder:font-normal placeholder:text-muted/60 focus:border-brand focus:ring-4 focus:ring-brand/15";

/** Urutan muncul isi form (dipakai CSS lewat variabel --i). */
const idx = (i: number) => ({ "--i": i }) as CSSProperties;

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.64v3h3.88c2.27-2.09 3.54-5.17 3.54-8.88z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.09A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29A7.2 7.2 0 0 1 4.9 12c0-.8.14-1.57.37-2.29V6.62H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.38l4-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.62l4 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

export default function AuthForm({ mode, active, onSwitch, className = "" }: Props) {
  const router = useRouter();
  const copy = AUTH_COPY[mode];
  const emailId = useId();
  const passwordId = useId();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  // Saat form ini tidak lagi aktif, bersihkan pesan dan kata sandinya
  const [wasActive, setWasActive] = useState(active);
  if (wasActive !== active) {
    setWasActive(active);
    if (!active) {
      setMessage(null);
      setPassword("");
      setShowPassword(false);
    }
  }

  const fail = (text: string) => setMessage({ tone: "error", text, id: Date.now() });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const value = email.trim();
    if (!EMAIL_RE.test(value)) return fail("Masukkan alamat email yang valid.");
    if (!password) return fail("Kata sandi wajib diisi.");
    if (mode === "signup" && password.length < 8) {
      return fail("Kata sandi minimal 8 karakter.");
    }

    setMessage(null);
    setLoading(true);

    try {
      const res = await (mode === "signup" ? register : login)({ email: value, password });
      saveSession(res);
      router.push(homePathFor(res.user.role)); // admin ke /admin, pengguna biasa ke /dashboard
    } catch (err) {
      setLoading(false);
      if (err instanceof ApiError) {
        fail(
          err.status === 429
            ? "Terlalu banyak percobaan. Coba lagi sebentar lagi."
            : err.message,
        );
      } else {
        fail("Tidak dapat terhubung ke server. Periksa koneksi Anda.");
      }
    }
  };

  const googleSoon = () =>
    setMessage({ tone: "info", text: "Masuk dengan Google akan segera tersedia.", id: Date.now() });

  return (
    <div
      data-active={active}
      aria-hidden={!active}
      inert={!active}
      className={`auth-form flex flex-col justify-center px-6 pb-8 pt-4 data-[active=false]:pointer-events-none md:overflow-y-auto md:px-10 md:py-8 lg:px-14 ${className}`}
    >
      <form onSubmit={submit} noValidate className="mx-auto w-full max-w-sm">
        <div className="auth-field" style={idx(0)}>
          <h1 className="font-display text-3xl font-extrabold leading-tight text-ink lg:text-[2.1rem]">
            {copy.heading}
          </h1>
        </div>
        <p className="auth-field mt-2 text-sm leading-6 text-muted" style={idx(1)}>
          {copy.subtitle}
        </p>

        <div className="auth-field mt-7" style={idx(2)}>
          <label htmlFor={emailId} className={label}>
            Email
          </label>
          <input
            id={emailId}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={input}
          />
        </div>

        <div className="auth-field mt-5" style={idx(3)}>
          <label htmlFor={passwordId} className={label}>
            Kata Sandi
          </label>
          <div className="relative">
            <input
              id={passwordId}
              type={showPassword ? "text" : "password"}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${input} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              aria-pressed={showPassword}
              className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-muted transition hover:bg-softgrey hover:text-ink"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {copy.passwordHint && <p className="mt-2 text-xs text-muted">{copy.passwordHint}</p>}
        </div>

        <div aria-live="polite">
          {message && (
            <p
              key={message.id}
              role={message.tone === "error" ? "alert" : "status"}
              className={`mt-4 rounded-2xl px-4 py-3 text-[13px] font-medium ${
                message.tone === "error"
                  ? "auth-shake bg-bear/10 text-bear"
                  : "bg-sapphire/10 text-sapphire"
              }`}
            >
              {message.text}
            </p>
          )}
        </div>

        <div className="auth-field mt-6" style={idx(4)}>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(15,23,42,0.7)] ring-1 ring-sapphire/30 transition hover:-translate-y-0.5 hover:shadow-[0_16px_28px_-12px_rgba(15,23,42,0.8)] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> {copy.submitting}
              </>
            ) : (
              copy.submit
            )}
          </button>
        </div>

        <div
          className="auth-field mt-6 flex items-center gap-3 text-xs text-muted"
          style={idx(5)}
        >
          <span className="h-px flex-1 bg-softgrey" />
          atau lanjutkan dengan
          <span className="h-px flex-1 bg-softgrey" />
        </div>

        <div className="auth-field mt-4 flex justify-center" style={idx(6)}>
          <button
            type="button"
            onClick={googleSoon}
            aria-label="Lanjutkan dengan Google"
            className="grid h-11 w-11 place-items-center rounded-full border border-softgrey bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <GoogleIcon />
          </button>
        </div>

        {/* HP: tombol pindah mode. Di desktop tombolnya ada di panel oranye. */}
        <p className="auth-field mt-6 text-center text-sm text-muted md:hidden" style={idx(7)}>
          {copy.switchLead}{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="font-semibold text-brand hover:underline"
          >
            {copy.switchAction}
          </button>
        </p>
      </form>
    </div>
  );
}