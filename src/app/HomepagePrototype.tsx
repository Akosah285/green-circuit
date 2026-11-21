"use client";

// Development-only comparison of homepage designs via ?variant=.
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { profile, projects, projectHref } from "@/data/portfolio";
import { OriginalHomepage } from "./OriginalHomepage";
import { PersonalPortal } from "./PersonalPortal";

const variants = [
  { key: "current", label: "Original layout" },
  { key: "quiet", label: "Quiet column" },
  { key: "index", label: "Compact index" },
  { key: "portal", label: "Personal portal" },
];
const featured = [
  projects.find((project) => project.category === "Work & Builds"),
  projects.find((project) => project.category === "Schoolwork"),
].filter((project) => project !== undefined);

function PrototypeFooter() {
  return (
    <footer className="mt-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs text-neutral-400">
      <span>© 2026 {profile.name}</span>
      <div className="flex items-center gap-5">
        <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center hover:text-white hover:underline">
          GitHub<span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a href={profile.email} className="inline-flex min-h-11 items-center hover:text-white hover:underline">
          Say Hello
        </a>
      </div>
    </footer>
  );
}

export function QuietColumn() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 pt-12 pb-44 sm:pb-32">
      <Navbar />
      <section className="mt-12">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white">
          {profile.headline}
        </h1>
        <p className="mt-5 text-base leading-7 text-neutral-300">{profile.intro}</p>
        <Link href="/journey" className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm text-emerald-300 hover:underline">
          Read My Journey<ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
      <section className="mt-9">
        <h2 className="text-sm font-medium text-white">Currently</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-400">{profile.currently}</p>
      </section>
      <section className="mt-12">
        <h2 className="text-base font-semibold text-white">Selected Highlights</h2>
        <p className="mt-2 text-xs text-neutral-400">One build, one school project</p>
        <div className="mt-4 divide-y divide-neutral-800">
          {featured.map((project) => (
            <Link key={project.slug} href={projectHref(project)} className="group flex items-start gap-5 py-5">
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-medium leading-6 text-neutral-100 group-hover:text-emerald-300">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-400">{project.summary}</p>
                <p className="mt-2 text-xs text-neutral-400">
                  {project.category === "Schoolwork" ? "Schoolwork" : "Builds"} · {project.period}
                </p>
              </div>
              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-neutral-400 group-hover:text-emerald-300" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
      <PrototypeFooter />
    </main>
  );
}

export function CompactIndex() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 pt-12 pb-44 sm:pb-32">
      <Navbar />
      <section className="mt-12">
        <h1 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-white">
          {profile.headline}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-300">{profile.intro}</p>
      </section>
      <div className="mt-12 grid gap-12 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-10">
        <aside>
          <h2 className="text-sm font-medium text-white">Currently</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-400">{profile.currently}</p>
          <Link href="/journey" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-emerald-300 hover:underline">
            Read My Journey<ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </aside>
        <section>
          <h2 className="text-base font-semibold text-white">Selected Highlights</h2>
          <p className="mt-2 text-xs text-neutral-400">One build, one school project</p>
          <div className="mt-6 space-y-8">
            {featured.map((project) => (
              <article key={project.slug}>
                <h3>
                  <Link href={projectHref(project)} className="inline-flex min-h-11 items-center gap-3 text-base font-medium leading-6 text-neutral-100 hover:text-emerald-300 hover:underline">
                    {project.title}<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-400">{project.summary}</p>
                <p className="mt-3 text-xs text-neutral-400">
                  {project.category === "Schoolwork" ? "Schoolwork" : "Builds"} · {project.period}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
      <PrototypeFooter />
    </main>
  );
}

function PrototypeSwitcher({ index }: { index: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cycle = useCallback((direction: number) => {
    const next = variants[(index + direction + variants.length) % variants.length];
    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", next.key);
    router.replace(`/?${params.toString()}`, { scroll: false });
  }, [index, router, searchParams]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.target instanceof HTMLElement && (
        event.target.isContentEditable ||
        event.target.closest("input, textarea, select, [role='menu'], [role='tablist']")
      )) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        cycle(event.key === "ArrowLeft" ? -1 : 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cycle]);

  return (
    <nav aria-label="Homepage prototype comparison" className="fixed inset-x-4 bottom-20 z-50 mx-auto flex max-w-md items-center justify-between gap-2 rounded-2xl border border-neutral-700 bg-neutral-900 p-2 text-sm shadow-lg shadow-black/30 sm:bottom-4">
      <button type="button" aria-label="Previous prototype" onClick={() => cycle(-1)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-neutral-200 hover:bg-neutral-800">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      </button>
      <div className="min-w-0 text-center">
        <span className="block text-xs text-emerald-300">Homepage prototype · {index + 1} of {variants.length}</span>
        <span aria-live="polite" className="block font-medium text-white">{variants[index].label}</span>
      </div>
      <button type="button" aria-label="Next prototype" onClick={() => cycle(1)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-neutral-200 hover:bg-neutral-800">
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}

export function HomepagePrototype() {
  const searchParams = useSearchParams();
  const index = variants.findIndex((variant) => variant.key === searchParams.get("variant"));
  if (index < 0) return <PersonalPortal />;

  return (
    <>
      {index === 1 ? <QuietColumn /> : index === 2 ? <CompactIndex /> : index === 3 ? <div className="portal-comparison"><PersonalPortal /></div> : <div className="pb-44 sm:pb-28"><OriginalHomepage /></div>}
      <PrototypeSwitcher index={index} />
    </>
  );
}
