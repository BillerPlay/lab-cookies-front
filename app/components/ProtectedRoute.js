"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

/**
 * Wrap any page's content in <ProtectedRoute> to require a logged-in user.
 *
 * AuthProvider's `loading` flag is true only while the initial /api/me
 * check is in flight, so we wait for that to settle before deciding
 * whether to redirect — otherwise a logged-in user would get bounced to
 * /auth for a frame on every page load.
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen bg-[#05060a]">
        <p className="text-white/40 text-xs uppercase tracking-[0.3em]">
          {loading ? "// authenticating..." : "// redirecting..."}
        </p>
      </div>
    );
  }

  return children;
}
