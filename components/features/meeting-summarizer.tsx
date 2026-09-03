'use client'

import { useState } from 'react'
import { NotebookPen, CalendarClock, CircleDot, Flag } from 'lucide-react'
import { SpinnerButton } from '@/components/spinner-button'
import { cn } from '@/lib/utils'

type Deadline = {
  task: string
  owner: string
  due: string
  urgency: 'High' | 'Medium' | 'Low'
}

type Summary = {
  overview: string[]
  decisions: string[]
  deadlines: Deadline[]
}

const sample = `Team sync — reviewed Q3 launch. Marketing needs final copy by Friday. Priya to ship the API changes next Wednesday, high priority. Design mockups can wait until end of month. We agreed to move the pricing page to phase 2. Sam will send the client update tomorrow.`

function summarize(): Summary {
  return {
    overview: [
      'Team reviewed the Q3 launch readiness and current blockers.',
      'Scope was trimmed to keep the timeline realistic.',
      'Owners were assigned for each outstanding deliverable.',
    ],
    decisions: [
      'Pricing page moved to phase 2.',
      'Launch copy prioritized over design polish.',
    ],
    deadlines: [
      { task: 'Finalize launch copy', owner: 'Marketing', due: 'Fri, Sep 5', urgency: 'High' },
      { task: 'Ship API changes', owner: 'Priya', due: 'Wed, Sep 10', urgency: 'High' },
      { task: 'Send client update', owner: 'Sam', due: 'Thu, Sep 4', urgency: 'Medium' },
      { task: 'Deliver design mockups', owner: 'Design', due: 'Tue, Sep 30', urgency: 'Low' },
    ],
  }
}

const urgencyStyles: Record<Deadline['urgency'], string> = {
  High: 'bg-destructive/15 text-destructive',
  Medium: 'bg-chart-3/15 text-chart-3',
  Low: 'bg-muted text-muted-foreground',
}

export function MeetingSummarizer() {
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<Summary | null>(null)

  const run = () => {
    setLoading(true)
    setTimeout(() => {
      setSummary(summarize())
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
          <NotebookPen className="size-4 text-primary" aria-hidden="true" />
          Raw notes
        </h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={12}
          placeholder="Paste your meeting notes or transcript here..."
          className="mt-4 w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
        />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <SpinnerButton onClick={run} loading={loading} loadingText="Summarizing..." size="lg">
            Summarize & extract deadlines
          </SpinnerButton>
          <button
            type="button"
            onClick={() => setNotes(sample)}
            className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Use sample notes
          </button>
        </div>
      </div>

      <div className="lg:col-span-3 space-y-6">
        {!summary ? (
          <div className="flex h-full min-h-64 items-center justify-center rounded-xl border border-dashed border-border bg-card/40 p-6">
            <p className="max-w-sm text-center text-sm text-muted-foreground">
              A structured summary, key decisions, and a tracked deadline list will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Overview
                </h3>
                <ul className="mt-3 space-y-2">
                  {summary.overview.map((line) => (
                    <li key={line} className="flex gap-2 text-sm text-foreground">
                      <CircleDot className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Key decisions
                </h3>
                <ul className="mt-3 space-y-2">
                  {summary.decisions.map((line) => (
                    <li key={line} className="flex gap-2 text-sm text-foreground">
                      <Flag className="mt-0.5 size-3.5 shrink-0 text-chart-3" aria-hidden="true" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <CalendarClock className="size-4 text-primary" aria-hidden="true" />
                Tracked deadlines
              </h3>
              <div className="mt-3 divide-y divide-border">
                {summary.deadlines.map((d) => (
                  <div key={d.task} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{d.task}</p>
                      <p className="text-xs text-muted-foreground">{d.owner}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-xs font-medium text-foreground">{d.due}</span>
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-xs font-medium',
                          urgencyStyles[d.urgency],
                        )}
                      >
                        {d.urgency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
