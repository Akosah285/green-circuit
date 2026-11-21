"use client";

import { useState } from "react";
import { Award, BookOpen, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { honors, citations, courseGroups } from "@/data/portfolio";

export default function AcademicsPage() {
  const [openPillar, setOpenPillar] = useState<string | null>(
    courseGroups[0]?.pillar ?? null
  );

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-16">
      <Navbar />

      <section className="mt-14">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Academics &amp; Honors
        </h1>
        <p className="mt-3 text-neutral-400 leading-relaxed">
          Scholarships, faculty citations, and coursework spanning engineering
          systems, computer science, applied mathematics, and German studies.
        </p>

        {/* Major Honors & Scholarships */}
        <div className="mt-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-5">
            <Award className="w-4 h-4" />
            <span>Honors &amp; Scholarships</span>
          </div>

          <div className="space-y-3">
            {honors.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-base font-semibold text-white">
                    {item.title}
                  </h2>
                  <span className="text-xs font-mono text-neutral-400">
                    {item.issuer} · {item.year}
                  </span>
                </div>
                {item.highlight && (
                  <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                    {item.highlight}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Faculty Citations */}
        <div className="mt-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-5">
            <Sparkles className="w-4 h-4" />
            <span>Faculty Citations for Meritorious Performance</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {citations.map((cite) => (
              <div
                key={cite.course}
                className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/80"
              >
                <span className="text-xs font-mono text-emerald-400">
                  {cite.term}
                </span>
                <h3 className="mt-1 text-sm font-medium text-white">
                  {cite.course}
                </h3>
                <p className="mt-1.5 text-xs text-neutral-400 leading-relaxed">
                  {cite.faculty}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Coursework Grouped by Discipline */}
        <div className="mt-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Selected Coursework by Discipline</span>
          </div>
          <p className="text-xs text-neutral-500 mb-5">
            Select a discipline below to view individual Dartmouth courses.
          </p>

          <div className="space-y-3">
            {courseGroups.map((group, index) => {
              const isOpen = openPillar === group.pillar;
              const panelId = `coursework-panel-${index}`;
              const buttonId = `coursework-toggle-${index}`;

              return (
                <div
                  key={group.pillar}
                  className="rounded-2xl bg-neutral-900/60 border border-neutral-800 overflow-hidden"
                >
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenPillar(isOpen ? null : group.pillar)
                    }
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-neutral-900/90 transition-colors"
                  >
                    <div>
                      <span className="text-base font-semibold text-white">
                        {group.pillar}{" "}
                        <span className="text-xs font-mono font-normal text-neutral-500">
                          ({group.courses.length})
                        </span>
                      </span>
                      <p className="mt-1 text-xs text-neutral-400">
                        {group.summary}
                      </p>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" aria-hidden="true" />
                    )}
                  </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!isOpen}
                      className="px-5 pb-5 pt-2 border-t border-neutral-800/80 divide-y divide-neutral-800/50"
                    >
                      {group.courses.map((course) => (
                        <div
                          key={course.code}
                          className="py-2.5 flex flex-wrap items-center justify-between gap-2 text-sm"
                        >
                          <div className="min-w-0 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                            <span className="font-mono text-xs text-neutral-400 sm:w-36 sm:shrink-0">
                              {course.code}
                            </span>
                            <span className="text-neutral-200">
                              {course.name}
                            </span>
                          </div>
                          {course.citation && (
                            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Faculty Citation
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
