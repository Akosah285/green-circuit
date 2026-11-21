import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { projectHref, type ProjectItem } from "@/data/portfolio";

interface ProjectCollectionProps {
  title: string;
  description: string;
  items: ProjectItem[];
  legacy?: boolean;
}

export function ProjectCollection({
  title,
  description,
  items,
  legacy = false,
}: ProjectCollectionProps) {
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-16">
      <Navbar />
      <section className="mt-14">
        <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
        <p className="mt-3 text-neutral-300 leading-relaxed">{description}</p>
        {legacy && (
          <div className="mt-5 flex flex-wrap gap-6 text-sm text-emerald-300">
            <Link href="/builds" className="min-h-11 inline-flex items-center hover:underline">
              Explore Builds
            </Link>
            <Link href="/schoolwork" className="min-h-11 inline-flex items-center hover:underline">
              Explore Schoolwork
            </Link>
          </div>
        )}
        <div className="mt-10 divide-y divide-neutral-800 border-t border-neutral-800">
          {items.length === 0 ? (
            <p className="py-8 text-sm text-neutral-400">
              Project notes are being prepared. Check back as this collection grows.
            </p>
          ) : (
            items.map((item) => (
              <article
                key={item.slug}
                id={item.slug}
                className="py-9 scroll-mt-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                  <span className="text-xs font-mono text-neutral-400">{item.period}</span>
                </div>
                <p className="mt-3 text-sm text-neutral-300 leading-relaxed">{item.summary}</p>
                <ul aria-label="Topics" className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-emerald-300">
                  {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <div className="mt-6 rounded-xl border border-dashed border-neutral-700 px-5 py-6">
                  <p className="text-sm text-neutral-300">Artifact placeholder</p>
                  <p className="mt-1 text-xs text-neutral-400">
                    Images and diagrams will be added as the portfolio takes shape.
                  </p>
                </div>
                <details className="mt-5">
                  <summary className="min-h-11 cursor-pointer content-center text-sm text-emerald-300 hover:text-emerald-200">
                    Project notes
                  </summary>
                  <dl className="mt-3 space-y-5 text-sm leading-relaxed">
                    {[
                      ["Context", item.context],
                      ["Approach", item.approach],
                      ["Takeaway", item.takeaway],
                    ].map(([label, text]) => (
                      <div key={label}>
                        <dt className="font-medium text-white">{label}</dt>
                        <dd className="mt-1 text-neutral-300">{text}</dd>
                      </div>
                    ))}
                  </dl>
                </details>
                {(item.link || legacy) && (
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-emerald-300">
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noreferrer" className="min-h-11 inline-flex items-center gap-2 hover:underline">
                        View source
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                    {legacy && (
                      <Link href={projectHref(item)} className="min-h-11 inline-flex items-center hover:underline">
                        Open in {item.category === "Schoolwork" ? "Schoolwork" : "Builds"}
                      </Link>
                    )}
                  </div>
                )}
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
