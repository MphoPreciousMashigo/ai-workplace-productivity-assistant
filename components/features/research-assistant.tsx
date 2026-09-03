'use client'

import { useState } from 'react'
import { Telescope, Search, Lightbulb, Link2, BookOpen } from 'lucide-react'
import { SpinnerButton } from '@/components/spinner-button'

type Insight = { title: string; detail: string }
type Source = { name: string; kind: string }
type Report = {
  summary: string
  insights: Insight[]
  sources: Source[]
  followUps: string[]
}

function research(query: string): Report {
  const q = query.trim() || 'the topic'
  return {
    summary: `Here is a synthesized overview of ${q}, drawing on recent patterns, comparative data, and practical implications you can act on.`,
    insights: [
      { title: 'Momentum is accelerating', detail: `Interest in ${q} has grown steadily, with adoption concentrated among mid-sized teams.` },
      { title: 'Cost is the main barrier', detail: 'Budget and integration complexity are cited most often as blockers to wider rollout.' },
      { title: 'Best-in-class differentiator', detail: 'Leaders pair strong onboarding with measurable early wins in the first 30 days.' },
      { title: 'Watch the regulatory angle', detail: 'Emerging guidelines could reshape requirements within the next few quarters.' },
    ],
    sources: [
      { name: 'Industry Benchmark Report', kind: 'Report' },
      { name: 'Peer-reviewed meta-analysis', kind: 'Journal' },
      { name: 'Market landscape survey', kind: 'Survey' },
      { name: 'Practitioner case studies', kind: 'Case study' },
    ],
    followUps: [
      `What does a 90-day rollout of ${q} look like?`,
      `Which vendors lead in ${q}?`,
      `What are the biggest risks with ${q}?`,
    ],
  }
}

export function ResearchAssistant() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<Report | null>(null)

  const run = (q?: string) => {
    const value = q ?? query
    if (!value.trim()) return
    if (q) setQuery(q)
    setLoading(true)
    setTimeout(() => {
      setReport(research(value))
      setLoading(false)
    }, 1600)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
          <Telescope className="size-4 text-primary" aria-hidden="true" />
          Research a topic
        </h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) run()
              }}
              placeholder="e.g. AI adoption trends in customer support"
              className="w-full rounded-lg border border-input bg-background py-2.5 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
            />
          </div>
          <SpinnerButton onClick={() => run()} loading={loading} loadingText="Researching..." size="lg">
            Gather insights
          </SpinnerButton>
        </div>
      </div>

      {!report ? (
        <div className="flex min-h-56 items-center justify-center rounded-xl border border-dashed border-border bg-card/40 p-6">
          <p className="max-w-sm text-center text-sm text-muted-foreground">
            Enter a topic and the assistant will return a summary, key insights, sources, and
            suggested follow-up questions.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Summary
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground">{report.summary}</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Lightbulb className="size-4 text-chart-3" aria-hidden="true" />
                Key insights
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {report.insights.map((ins) => (
                  <div key={ins.title} className="rounded-lg border border-border bg-background/50 p-3.5">
                    <p className="text-sm font-medium text-foreground">{ins.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{ins.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Link2 className="size-4 text-primary" aria-hidden="true" />
                Sources
              </h3>
              <ul className="mt-3 space-y-2">
                {report.sources.map((s) => (
                  <li key={s.name} className="flex items-center justify-between gap-2 rounded-lg border border-border bg-background/50 px-3 py-2">
                    <span className="truncate text-sm text-foreground">{s.name}</span>
                    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {s.kind}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <BookOpen className="size-4 text-primary" aria-hidden="true" />
                Follow-up questions
              </h3>
              <div className="mt-3 space-y-2">
                {report.followUps.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => run(f)}
                    className="block w-full rounded-lg border border-border bg-background/50 px-3 py-2 text-left text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-accent"
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
