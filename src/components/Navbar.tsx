"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Terminal, Lock, ChevronDown } from "lucide-react";
import { profile } from "@/data/portfolio";

export function Navbar() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const isOpen = openPath === pathname;
  const primaryLinks = [
    { href: "/builds", label: "Builds" },
    { href: "/schoolwork", label: "Schoolwork" },
  ];
  const secondaryLinks = [
    { href: "/academics", label: "Academics" },
    { href: "/journey", label: "Journey" },
    { href: "/private-lab", label: "Private Lab" },
  ];

  const renderLink = (item: { href: string; label: string }) => {
    const isActive =
      pathname === item.href ||
      (item.href === "/private-lab" && pathname === "/lab");

    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        onClick={() => setOpenPath(null)}
        className={`inline-flex min-h-11 items-center gap-2 transition-colors ${
          isActive
            ? "text-white font-medium"
            : "text-neutral-400 hover:text-white"
        }`}
      >
        {item.href === "/private-lab" && (
          <Lock className="w-3.5 h-3.5" aria-hidden="true" />
        )}
        {item.label}
      </Link>
    );
  };

  return (
    <header className="flex flex-col gap-3 border-b border-neutral-800/80 pb-5">
      <Link
        href="/"
        aria-label={`${profile.handle} home`}
        aria-current={pathname === "/" ? "page" : undefined}
        className="w-fit min-h-11 font-mono text-sm tracking-tight text-emerald-400 flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <Terminal className="w-4 h-4" aria-hidden="true" />
        {profile.handle}
      </Link>

      <nav
        aria-label="Main navigation"
        className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
        onKeyDown={(event) => {
          if (event.key === "Escape" && isOpen) {
            setOpenPath(null);
            menuButton.current?.focus();
          }
        }}
      >
        {primaryLinks.map(renderLink)}
        <button
          ref={menuButton}
          type="button"
          aria-expanded={isOpen}
          aria-controls="secondary-navigation"
          onClick={() => setOpenPath(isOpen ? null : pathname)}
          className="lg:hidden min-h-11 inline-flex items-center gap-2 text-neutral-300 hover:text-white"
        >
          Menu
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
        <div
          id="secondary-navigation"
          className={`${isOpen ? "flex" : "hidden"} w-full flex-col gap-1 border-t border-neutral-800 pt-2 lg:flex lg:w-auto lg:flex-row lg:gap-6 lg:border-0 lg:pt-0`}
        >
          {secondaryLinks.map(renderLink)}
        </div>
      </nav>
    </header>
  );
}