'use client'

import { ArrowUpRight, Clock, Sparkles, TrendingUp, Zap } from 'lucide-react'
import { features, type FeatureId } from '@/lib/features'

type DashboardOverviewProps = {
  onNavigate: (id: FeatureId) => void
}

const stats = [
  { label: 'Emails drafted', value: '128', delta: '+12%', icon: Sparkles },
  { label: 'Hours saved', value: '36.5', delta: '+8%', icon: Clock },
  { label: 'Tasks prioritized', value: '54', delta: '+21%', icon: TrendingUp },
  { label: 'Active streak', value: '9 days', delta: 'Keep going', icon: Zap },
]

const activity = [
  { text: 'Summarized "Q3 Launch Sync" and tracked 4 deadlines', tag: 'Meetings' },
  { text: 'Drafted a persuasive follow-up email to a client', tag: 'Email' },
  { text: 'Prioritized 6 backlog tasks into a focused plan', tag: 'Tasks' },
  { text: 'Researched AI adoption trends in support teams', tag: 'Research' },
]

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const tools = features.filter((f) => f.id !== 'dashboard')

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="size-4.5" aria-hidden="true" />
                </span>
                <span className="text-xs font-medium text-primary">{s.delta}</span>
              </div>
              <p className="mt-4 text-2xl font-semibold text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-foreground">Jump back in</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {tools.map((t) => {
              const Icon = t.icon
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onNavigate(t.id)}
                  className="group flex flex-col rounded-xl border border-border bg-card p-5 text-left transition-colors hover:border-primary/50 hover:bg-accent/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-foreground">{t.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {t.description}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Recent activity</h2>
          <div className="mt-3 rounded-xl border border-border bg-card p-2">
            {activity.map((a) => (
              <div
                key={a.text}
                className="flex gap-3 rounded-lg p-3"
              >
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm leading-snug text-foreground">{a.text}</p>
                  <span className="mt-1 inline-block rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {a.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
