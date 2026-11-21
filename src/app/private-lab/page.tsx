import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function PrivateLabAccessPage() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-16">
      <Navbar />
      <section className="mt-14">
        <div className="flex items-center gap-3">
          <Lock className="w-6 h-6 text-emerald-400" aria-hidden="true" />
          <h1 className="text-3xl font-bold tracking-tight text-white">Private Lab</h1>
        </div>
        <p className="mt-5 text-neutral-300 leading-relaxed">
          A GitHub sign-in is required to enter the deployed Lab. This area contains
          system status and telemetry, separate from the public portfolio.
        </p>
        <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
          Continuing may take you to GitHub to sign in, then return you to the Lab.
          You can explore Builds and Schoolwork without signing in.
        </p>
        <Link
          href="/lab"
          prefetch={false}
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-4 py-2.5 text-sm font-medium text-emerald-300 hover:bg-emerald-500/25 transition-colors"
        >
          Enter Private Lab
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
