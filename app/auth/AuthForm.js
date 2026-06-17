"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Field from "./Field";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

export default function AuthForm() {
  const [mode, setMode] = useState("login");
  const [errors, setErrors] = useState({ confirm: "", form: "" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const confirmRef = useRef(null);

  const isLogin = mode === "login";
  const router = useRouter();
  const { login, signup } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await login(email, password);
      setErrors({ confirm: "", form: "" });
      router.push("/");
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: err.message }));
    }
  }

  async function handleSignup(e) {
    e.preventDefault();

    if (password !== confirm) {
      setErrors((prev) => ({ ...prev, confirm: "Passwords do not match" }));
      confirmRef.current?.focus();
      return;
    }

    try {
      await signup(name, email, password);
      setErrors({ confirm: "", form: "" });
      router.push("/");
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: err.message }));
    }
  }

  return (
    <div className="w-full max-w-md bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] z-10">
      <Link
        href="/"
        className="block text-center text-white hover:text-white/80 text-2xl font-bold tracking-[0.2em] mb-1 cursor-pointer transition-colors"
      >
        DEVFORGE
      </Link>

      <p className="text-center text-xs text-white/40 tracking-widest mb-8">
        {"// access_terminal"}
      </p>

      <form
        onSubmit={isLogin ? handleLogin : handleSignup}
        className="flex flex-col gap-4"
      >
        {!isLogin && (
          <Field
            id="name"
            label="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, confirm: "" }));
            }}
            placeholder="n3on_rider"
          />
        )}

        <Field
          label="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@grid.net"
        />

        <Field
          id="password"
          label="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, confirm: "" }));
          }}
          placeholder="••••••••"
        />

        {!isLogin && (
          <Field
            id="confirm-password"
            label="confirm password"
            type="password"
            value={confirm}
            inputRef={confirmRef}
            onChange={(e) => {
              setConfirm(e.target.value);
              setErrors((prev) => ({ ...prev, confirm: "" }));
            }}
            error={errors.confirm}
            placeholder="••••••••"
          />
        )}

        {errors.form && (
          <p
            role="alert"
            aria-live="polite"
            className="text-xs text-red-400 font-medium tracking-wide bg-red-500/10 border border-red-500/20 p-3 rounded-xl"
          >
            {"// "}
            {errors.form}
          </p>
        )}

        <Button type="submit" variant="primary" className="mt-2 w-full">
          {isLogin ? "Log in" : "Register"}
        </Button>
      </form>

      <p className="text-center text-xs text-white/40 mt-6">
        {isLogin ? "No account yet? " : "Already wired in? "}
        <button
          type="button"
          onClick={() => {
            setMode(isLogin ? "signup" : "login");
            setErrors({ confirm: "", form: "" });
          }}
          className="text-white hover:text-white/80 font-semibold underline underline-offset-4 cursor-pointer transition-colors"
        >
          {isLogin ? "Register" : "Log in"}
        </button>
      </p>

      <Link
        href="/"
        className="block text-center text-xs text-white/30 hover:text-white/60 mt-5 transition-colors cursor-pointer"
      >
        ← back to home
      </Link>
    </div>
  );
}