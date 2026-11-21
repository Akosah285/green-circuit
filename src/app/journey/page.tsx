import { Navbar } from "@/components/Navbar";
import { journey, profile, toolkit } from "@/data/portfolio";

export default function JourneyPage() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-16">
      <Navbar />

      <section className="mt-14">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          My Journey
        </h1>
        <p className="mt-3 text-neutral-400 leading-relaxed">
          A short snapshot of the path, coursework, and curiosity that brought me
          here.
        </p>

        <div className="mt-12 relative border-l border-neutral-800 ml-3 space-y-10">
          {journey.map((step) => (
            <div key={step.title} className="pl-7 relative">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-neutral-950 absolute -left-[5px] top-1.5" />
              <span className="text-xs font-mono text-emerald-400">
                {step.period}
              </span>
              <h2 className="mt-1 text-lg font-semibold text-white">
                {step.title}
              </h2>
              <p className="text-xs font-mono text-neutral-500 mt-0.5">
                {step.subtitle}
              </p>
              <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-neutral-800/80">
          <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-5">
            Technical Toolkit
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {toolkit.map((group) => (
              <div
                key={group.category}
                className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/80"
              >
                <h3 className="text-xs font-mono text-neutral-400 mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-neutral-950 text-neutral-200 border border-neutral-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-white">
              Want to connect or compare notes?
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              Always glad to chat about software, school, or ideas.
            </p>
          </div>
          <a
            href={profile.email}
            className="px-4 py-2 rounded-xl text-xs font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors"
          >
            Send an Email
          </a>
        </div>
      </section>
    </main>
  );
}
