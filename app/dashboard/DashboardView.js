"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

function DashboardContent() {
  const { user, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/auth");
  }

  return (
    <div className="relative flex flex-col flex-1 bg-[#05060a] text-white/90 min-h-screen overflow-hidden">
      <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <header className="relative flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/[0.06] bg-white/[0.01] backdrop-blur-md z-10">
        <Link
          href="/"
          className="text-white text-xl font-bold tracking-[0.2em] hover:opacity-80 transition-opacity"
        >
          DEVFORGE
        </Link>
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="border-white/20 text-white hover:bg-white/5"
        >
          {"> log_out"}
        </Button>
      </header>

      <main className="relative flex-1 flex items-center justify-center px-6 py-20 z-10">
        <div className="w-full max-w-md bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]">
          <p className="text-center text-xs text-emerald-400 tracking-widest mb-2">
            {"// access granted"}
          </p>
          <h1 className="text-center text-2xl font-bold text-white mb-6">
            Welcome back, @{user.name}
          </h1>

          <dl className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-white/[0.06] pb-2">
              <dt className="text-white/40">handle</dt>
              <dd className="text-white/90 font-medium">@{user.name}</dd>
            </div>
            <div className="flex justify-between border-b border-white/[0.06] pb-2">
              <dt className="text-white/40">email</dt>
              <dd className="text-white/90 font-medium">{user.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-white/40">user_id</dt>
              <dd className="text-white/90 font-medium">{user.id}</dd>
            </div>
          </dl>

          <p className="text-center text-xs text-white/30 mt-8">
            {"// this page only renders for an authenticated session"}
          </p>
        </div>
      </main>
    </div>
  );
}

export default function DashboardView() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
