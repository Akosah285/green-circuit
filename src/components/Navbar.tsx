"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Lock } from "lucide-react";
import { profile } from "@/data/portfolio";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work & School" },
    { href: "/journey", label: "Journey" },
  ];

  return (
    <header className="flex items-center justify-between border-b border-neutral-800/80 pb-6">
      <Link
        href="/"
        className="font-mono text-sm tracking-tight text-emerald-400 flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <Terminal className="w-4 h-4" />
        {profile.handle}
      </Link>

      <nav className="flex items-center gap-6 text-sm">
        {navLinks.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                isActive
                  ? "text-white font-medium"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}

        <Link
          href="/lab"
          title="Personal Lab (GitHub Auth)"
          className={`inline-flex items-center gap-1 transition-colors ${
            pathname.startsWith("/lab")
              ? "text-emerald-400"
              : "text-neutral-500 hover:text-emerald-400"
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Lab</span>
        </Link>
      </nav>
    </header>
  );
}