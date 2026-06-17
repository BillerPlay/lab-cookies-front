"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/auth");
  }

  return (
    <header className="relative flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/[0.06] bg-white/[0.01] backdrop-blur-md z-10">
      <span className="text-white text-xl font-bold tracking-[0.2em] transition-opacity hover:opacity-80 cursor-pointer">
        DEVFORGE
      </span>

      {/* Avoid flashing the wrong state while the initial /api/me check
          is still in flight. */}
      {loading ? null : user ? (
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 text-sm text-white/80 font-medium hover:text-white transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            @{user.name}
          </Link>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/5"
          >
            {"> log_out"}
          </Button>
        </div>
      ) : (
        <Button
          href="/auth"
          variant="outline"
          size="sm"
          className="border-white/20 text-white hover:bg-white/5"
        >
          &gt; access_terminal
        </Button>
      )}
    </header>
  );
}
