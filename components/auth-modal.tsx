"use client";

import { useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { Modal } from "./modal";
import { Logo } from "./logo";
import { createClient } from "@/lib/supabase/client";

export function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    const supabase = createClient();

    if (!supabase) {
      await new Promise((resolve) => setTimeout(resolve, 650));
      setMessage("Demo mode active. Add Supabase keys to enable real accounts.");
      setLoading(false);
      return;
    }

    const result =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });
    setMessage(result.error?.message ?? (mode === "login" ? "Welcome back." : "Check your email to confirm your account."));
    setLoading(false);
    if (!result.error && mode === "login") setTimeout(onClose, 600);
  }

  return (
    <Modal onClose={onClose} label="Account access">
      <div className="p-7 sm:p-9">
        <Logo />
        <h2 className="mt-8 font-display text-3xl font-bold">
          {mode === "login" ? "Welcome back" : "Join CINEVERS"}
        </h2>
        <p className="mt-2 text-sm text-white/50">
          {mode === "login" ? "Your universe is right where you left it." : "Free forever. No credit card needed."}
        </p>
        <form className="mt-7 space-y-4" onSubmit={submit}>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/50">Email</span>
            <input name="email" type="email" required placeholder="you@example.com" className="w-full rounded-lg border border-white/10 bg-white/[.04] px-4 py-3 outline-none transition placeholder:text-white/25 focus:border-brand" />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/50">Password</span>
            <span className="relative block">
              <input name="password" type={showPassword ? "text" : "password"} minLength={6} required placeholder="At least 6 characters" className="w-full rounded-lg border border-white/10 bg-white/[.04] px-4 py-3 pr-11 outline-none transition placeholder:text-white/25 focus:border-brand" />
              <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white" aria-label="Toggle password visibility">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>
          <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 font-bold text-white transition hover:bg-red-600 disabled:opacity-60">
            {loading && <LoaderCircle size={18} className="animate-spin" />}
            {mode === "login" ? "Sign in" : "Create free account"}
          </button>
          {message && <p className="rounded-lg bg-white/[.05] p-3 text-sm text-white/70">{message}</p>}
        </form>
        <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setMessage(""); }} className="mt-6 text-sm text-white/55 hover:text-white">
          {mode === "login" ? "New here? Create an account" : "Already have an account? Sign in"}
        </button>
      </div>
    </Modal>
  );
}

