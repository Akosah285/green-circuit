"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { portalSections, profile, projectHref, spacedTrainerProject } from "@/data/portfolio";

function PortalSculpture() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="portal-sculpture"
      aria-hidden="true"
    >
      <path
        className="portal-sculpture-shadow"
        d="M-180 330C120 190 300 350 500 285C700 220 790 280 980 190C1180 95 1320 95 1620-95L1650 195C1360 385 1200 400 1000 540C790 680 620 650 440 750C220 870 40 840-150 1010Z"
      />
      <path
        className="portal-sculpture-main"
        d="M-180 290C130 150 305 320 505 250C700 180 790 240 980 150C1180 55 1320 55 1620-135L1650 155C1360 345 1205 355 1005 495C790 635 620 610 440 705C220 825 40 800-150 965Z"
      />
      <path
        className="portal-circuit-line"
        d="M-34 712C158 620 306 630 500 505C650 410 758 460 914 350C1070 240 1230 235 1490 60"
      />
      <path
        className="portal-circuit-line portal-circuit-line-secondary"
        d="M80 555C232 460 360 490 520 390C676 292 780 350 940 245C1100 140 1260 120 1500 10"
      />
      <g className="portal-circuit-node">
        <circle cx="278" cy="595" r="8" />
        <circle cx="644" cy="442" r="8" />
        <circle cx="1018" cy="292" r="8" />
        <circle cx="1310" cy="126" r="8" />
      </g>
    </svg>
  );
}

const menuStepMs = 300;
const decodeGlyphs = "abcdefghjkmnpqrstuvwxyz:;=<>^_#%+";

function PortalLabel({ label, entranceDelay }: { label: string; entranceDelay?: number }) {
  const frameRef = useRef<HTMLSpanElement>(null);
  const lastLabel = useRef(label);

  useEffect(() => {
    const frame = frameRef.current;
    const control = frame?.closest<HTMLElement>("button, a");
    if (!frame || !control) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const letters = Array.from(label);
    let timer = 0;
    const settle = () => {
      window.clearTimeout(timer);
      frame.textContent = "";
    };
    const play = (delay = 0) => {
      settle();
      if (reduced.matches || document.hidden || control.closest("[inert]")) return;
      const start = () => {
        const began = performance.now();
        const draw = () => {
          const elapsed = performance.now() - began;
          if (elapsed >= 720 || reduced.matches || document.hidden) {
            settle();
            return;
          }
          frame.textContent = letters.map((letter, i) => {
            const age = elapsed - (i / Math.max(1, letters.length - 1)) * 400;
            return letter === " " || age < 0 || age >= 320
              ? letter
              : decodeGlyphs[Math.floor(Math.random() * decodeGlyphs.length)];
          }).join("");
          timer = window.setTimeout(draw, 48);
        };
        draw();
      };
      if (delay > 0) timer = window.setTimeout(start, delay);
      else start();
    };
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "touch") play();
    };
    const onFocus = () => {
      if (control.matches(":focus-visible")) play();
    };

    if (entranceDelay !== undefined || lastLabel.current !== label) play(entranceDelay);
    lastLabel.current = label;
    control.addEventListener("pointerenter", onPointer);
    control.addEventListener("focus", onFocus);
    return () => {
      settle();
      control.removeEventListener("pointerenter", onPointer);
      control.removeEventListener("focus", onFocus);
    };
  }, [entranceDelay, label]);

  // The real label always supplies both the intrinsic width and the accessible name.
  return (
    <span className="portal-label">
      <span className="portal-label-frame" ref={frameRef} aria-hidden="true" />
      <span className="portal-label-text">{label}</span>
    </span>
  );
}

function PortalTitleWords({ text }: { text: string }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={`${word}-${i}`}>
      {i > 0 && " "}
      <span className="portal-word-mask">
        <span className="portal-title-word" style={{ "--word": i } as CSSProperties}>{word}</span>
      </span>
    </Fragment>
  ));
}

export function PersonalPortal() {
  const rootRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sections = root.querySelectorAll<HTMLElement>("[data-portal-section]");
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(
      (entries, watcher) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.closest<HTMLElement>("[data-portal-section]")?.setAttribute("data-revealed", "true");
          watcher.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;
      const hero = root.querySelector<HTMLElement>(".portal-hero");
      if (hero && hero.getBoundingClientRect().bottom > viewportCenter) {
        setSelectedIndex(null);
        return;
      }
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        const index = Number(section.dataset.portalSection);
        if (distance < closestDistance && Number.isInteger(index)) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setSelectedIndex(closestIndex);
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    sections.forEach((section) => {
      const content = section.querySelector(".portal-story-content");
      if (observer && content && section.dataset.revealed !== "true") {
        section.dataset.revealed = "false";
        observer.observe(content);
      }
    });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    updateActiveSection();
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToSection = (index: number, restoreMenuFocus = false) => {
    const section = rootRef.current?.querySelector<HTMLElement>(
      `[data-portal-section="${index}"]`,
    );
    setSelectedIndex(index);
    setMenuOpen(false);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    section?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    if (restoreMenuFocus) {
      window.requestAnimationFrame(() =>
        menuToggleRef.current?.focus({ preventScroll: true }),
      );
    } else {
      section?.querySelector("h2")?.focus({ preventScroll: true });
    }
  };

  return (
    <main ref={rootRef} id="portal-top" className="portal-page min-h-screen overflow-x-clip">
      <header className="portal-header">
        <div
          className="portal-primary-nav"
          data-expanded={menuOpen}
          onKeyDown={(event) => {
            if (event.key !== "Escape" || !menuOpen) return;
            event.preventDefault();
            setMenuOpen(false);
            menuToggleRef.current?.focus({ preventScroll: true });
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false);
          }}
        >
          <a href="#portal-top" className="portal-wordmark">
            <span className="portal-wordmark-mark" aria-hidden="true">a.</span>
            <span>{profile.handle}</span>
          </a>
          <button
            ref={menuToggleRef}
            type="button"
            className="portal-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="portal-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <PortalLabel label={menuOpen ? "Close" : "Menu"} />
          </button>
          <nav
            id="portal-menu"
            className="portal-nav-links"
            aria-label="Portal sections"
            aria-hidden={!menuOpen}
            inert={!menuOpen}
          >
            {portalSections.map((section, index) => (
              <button
                key={section.id}
                type="button"
                aria-current={selectedIndex === index ? "location" : undefined}
                onClick={() => scrollToSection(index, true)}
                className="portal-nav-link"
                style={{
                  "--arrive": `${index * menuStepMs}ms`,
                  "--retire": `${(portalSections.length - 1 - index) * 45}ms`,
                } as CSSProperties}
              >
                <PortalLabel
                  label={section.menuLabel}
                  entranceDelay={menuOpen ? 300 + index * menuStepMs : undefined}
                />
              </button>
            ))}
          </nav>
        </div>
        <a href={profile.email} className="portal-contact-pill">
          <span className="portal-contact-name"><PortalLabel label="Contact" /></span>
          <span className="portal-contact-cap" aria-hidden="true">
            <ArrowUpRight className="portal-contact-arrow h-3.5 w-3.5" />
          </span>
        </a>
      </header>

      <section className="portal-hero" aria-labelledby="portal-hero-title">
        <div className="portal-art-field" aria-hidden="true"><PortalSculpture /></div>
        <div className="portal-hero-copy">
          <h1 id="portal-hero-title"><PortalTitleWords text={profile.portalHeading} /></h1>
          <p>
            {profile.portalIntro} {profile.portalNote}
          </p>
        </div>
        <button
          type="button"
          className="portal-scroll-cue"
          onClick={() => scrollToSection(0)}
        >
          Start somewhere
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </button>
      </section>

      {portalSections.map((section, index) => (
        <section
          key={section.id}
          data-portal-section={index}
          className="portal-story-section"
          aria-labelledby={`portal-section-${section.id}`}
        >
          <div className="portal-story-content">
            <p className="portal-section-label">{section.eyebrow}</p>
            <h2 id={`portal-section-${section.id}`} tabIndex={-1}>
              <PortalTitleWords text={section.title} />
            </h2>
            <div className="portal-story-bottom">
              {section.id === "learning" ? (
                <div className="portal-learning-grid">
                  {section.reading.map((group) => (
                    <div className="portal-learning-group" key={group.label}>
                      <h3>{group.label}</h3>
                      <ul>
                        {group.books.map((book) => (
                          <li key={book.title}>
                            <span className="portal-book-title">{book.title}</span>
                            <span className="portal-book-author">{book.author}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="portal-learning-group">
                    <h3>Exploring</h3>
                    <ul>
                      {section.tags.map((topic) => <li key={topic}>{topic}</li>)}
                    </ul>
                  </div>
                </div>
              ) : (
                <>
                  <p>{section.description}</p>
                  <div className="portal-story-actions">
                    <div className="portal-tags" aria-label="Topics">
                      {section.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    {"href" in section && section.href && (
                      <Link href={section.href} className="portal-section-link">
                        {section.action}
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                  {section.id === "building" && (
                    <div className="portal-featured-project">
                      <p>Also building</p>
                      <div>
                        <Link href={projectHref(spacedTrainerProject)} className="portal-section-link">
                          {spacedTrainerProject.title}
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <p>{spacedTrainerProject.summary}</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      ))}

      <footer className="portal-footer">
        <span>{profile.name} · Personal site</span>
        <div>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href={profile.email}>Email</a>
        </div>
      </footer>
    </main>
  );
}
