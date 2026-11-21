"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Activity, RefreshCw } from "lucide-react";
import { requestStatus, StatusAccessError, type SystemStatus } from "@/lib/status";

export default function LabPage() {
  const [data, setData] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ title: string; message: string } | null>(null);
  const controller = useRef<AbortController | null>(null);

  const loadStatus = useCallback((signal: AbortSignal) =>
    requestStatus(signal).then((response) => {
      if (!signal.aborted) {
        setData(response);
        setError(null);
      }
    }).catch((cause: unknown) => {
      if (signal.aborted) return;
      setError(
        cause instanceof StatusAccessError
          ? { title: "Access denied", message: "Sign in with GitHub, then try again. If access is still denied, return to the public portfolio." }
          : { title: "Status unavailable", message: "The Lab could not load a valid status response. Retry the request or return to the public portfolio." }
      );
    }).finally(() => {
      if (!signal.aborted) setLoading(false);
    }), []);

  useEffect(() => {
    const request = new AbortController();
    controller.current = request;
    void loadStatus(request.signal);
    return () => request.abort();
  }, [loadStatus]);

  const refreshStatus = () => {
    controller.current?.abort();
    const request = new AbortController();
    controller.current = request;
    setLoading(true);
    setError(null);
    void loadStatus(request.signal);
  };

  useEffect(() => () => controller.current?.abort(), []);

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-20">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-white transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="p-5 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <Activity className="w-5 h-5 shrink-0 text-emerald-400" aria-hidden="true" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">System Lab &amp; Telemetry</h1>
          </div>
          <button
            type="button"
            onClick={refreshStatus}
            disabled={loading}
            className="inline-flex min-h-11 items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
            {loading ? "Loading..." : error ? "Retry" : "Ping API"}
          </button>
        </div>

        <p className="mb-5 text-sm text-neutral-400">
          Private Lab. GitHub sign-in is required on the deployed site.
        </p>
        {loading && (
          <p role="status" className="mb-4 text-sm text-neutral-300">
            {data ? "Refreshing system status..." : "Querying /api/status..."}
          </p>
        )}
        {error && (
          <div role="alert" className="mb-5 rounded-xl border border-neutral-700 p-4">
            <h2 className="font-semibold text-white">{error.title}</h2>
            <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{error.message}</p>
            {error.title === "Access denied" && (
              <a
                href="/.auth/login/github?post_login_redirect_uri=/lab"
                className="mt-3 inline-flex min-h-11 items-center text-sm text-emerald-300 hover:underline"
              >
                Sign in with GitHub
              </a>
            )}
          </div>
        )}
        {data && (
          <>
          {(error || loading) && (
            <p className="mb-2 text-xs text-neutral-400">Last successful response</p>
          )}
          <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs font-mono text-emerald-400 overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
          </>
        )}
      </div>
    </main>
  );
}