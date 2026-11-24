"use client";

// Two development-only journey directions, compared on /journey via ?variant=.
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { journey, profile, toolkit } from "@/data/portfolio";
import "./JourneyPrototype.css";

const variants = [
  { key: "original", label: "Current journey" },
  { key: "story", label: "A · Editorial story" },
  { key: "index", label: "B · Personal index" },
] as const;

function JourneyIndex() {
  return (
    <main className="journeyPrototype-page journeyPrototype-index">
      <div className="journeyPrototype-nav"><Navbar /></div>
      <div className="journeyPrototype-content">
        <header className="journeyPrototype-intro">
          <p className="journeyPrototype-kicker">A little more about me</p>
          <h1>A bit of my story.</h1>
          <p className="journeyPrototype-introCopy">
            {profile.portalIntro} Here’s a closer look at the places, work, and learning that brought me here.
          </p>
          <Link className="journeyPrototype-backLink" href="/">
            Back to the homepage <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </header>

        <div className="journeyPrototype-details">
          <section aria-labelledby="journey-heading" className="journeyPrototype-timeline">
            <div className="journeyPrototype-sectionHeading">
              <h2 id="journey-heading">The journey</h2>
              <span>Work, education, and the places along the way</span>
            </div>
            {journey.map((step) => (
              <article className="journeyPrototype-milestone" key={step.title}>
                <p className="journeyPrototype-period">{step.period}</p>
                <div>
                  <h3>{step.title}</h3>
                  <p className="journeyPrototype-location">{step.subtitle}</p>
                  <p className="journeyPrototype-description">{step.description}</p>
                </div>
              </article>
            ))}
          </section>

          <section aria-labelledby="toolkit-heading" className="journeyPrototype-toolkit">
            <div className="journeyPrototype-sectionHeading">
              <h2 id="toolkit-heading">Technical toolkit</h2>
              <span>Tools and areas I work with</span>
            </div>
            <div className="journeyPrototype-toolkitGroups">
              {toolkit.map((group) => (
                <div className="journeyPrototype-toolkitGroup" key={group.category}>
                  <h3>{group.category}</h3>
                  <p>{group.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </section>

          <footer className="journeyPrototype-contact">
            <div>
              <h2>Let’s compare notes.</h2>
              <p>Always glad to chat about software, school, or ideas.</p>
            </div>
            <a href={profile.email}>Send an email <ArrowUpRight size={16} aria-hidden="true" /></a>
          </footer>
        </div>
      </div>
    </main>
  );
}

export function JourneyPrototype({ children, story }: { children: ReactNode; story: ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const index = variants.findIndex((variant) => variant.key === searchParams.get("variant"));
  const cycle = useCallback((direction: number) => {
    const next = variants[(index + direction + variants.length) % variants.length];
    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", next.key);
    router.replace(`/journey?${params.toString()}`, { scroll: false });
  }, [index, router, searchParams]);

  useEffect(() => {
    if (index < 0) return;
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
  }, [cycle, index]);

  if (index < 0) return story;

  return (
    <>
      {variants[index].key === "original"
        ? children
        : variants[index].key === "story"
          ? story
          : <JourneyIndex />}
      <nav aria-label="Journey prototype comparison" className="journeyPrototype-switcher">
        <button type="button" aria-label="Previous prototype" onClick={() => cycle(-1)}>
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <div>
          <span>Journey prototype · {index + 1} of {variants.length}</span>
          <strong aria-live="polite">{variants[index].label}</strong>
        </div>
        <button type="button" aria-label="Next prototype" onClick={() => cycle(1)}>
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </nav>
    </>
  );
}
