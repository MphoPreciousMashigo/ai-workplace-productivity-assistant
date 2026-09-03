'use client'

import { useMemo, useState } from 'react'
import { ListChecks, Plus, Trash2, TrendingUp } from 'lucide-react'
import { SpinnerButton } from '@/components/spinner-button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Task = {
  id: string
  title: string
  impact: number
  effort: number
  urgency: number
}

const scale = [1, 2, 3, 4, 5]

// Priority model: reward impact + urgency, lightly penalize effort. Normalized to 0-100.
// Range of raw: min (1,5,1) = 3.0 - 3.5 = -0.5 ... approx; scaled so scores spread across the band.
function priorityScore(t: Task) {
  const raw = t.impact * 2 + t.urgency * 1.6 - t.effort * 0.9
  // raw spans roughly [-0.9, 17.1]; map to 5-99 for readable spread.
  const score = ((raw + 0.9) / 18) * 94 + 5
  return Math.round(Math.max(5, Math.min(99, score)))
}

function tier(score: number) {
  if (score >= 70) return { label: 'Do now', className: 'bg-destructive/15 text-destructive' }
  if (score >= 45) return { label: 'Schedule', className: 'bg-chart-3/15 text-chart-3' }
  return { label: 'Backlog', className: 'bg-muted text-muted-foreground' }
}

const seed: Task[] = [
  { id: '1', title: 'Fix checkout payment bug', impact: 5, effort: 2, urgency: 5 },
  { id: '2', title: 'Write Q4 planning doc', impact: 4, effort: 3, urgency: 3 },
  { id: '3', title: 'Refactor legacy CSS', impact: 2, effort: 4, urgency: 1 },
]

export function TaskPlanner() {
  const [tasks, setTasks] = useState<Task[]>(seed)
  const [title, setTitle] = useState('')
  const [impact, setImpact] = useState(3)
  const [effort, setEffort] = useState(3)
  const [urgency, setUrgency] = useState(3)
  const [loading, setLoading] = useState(false)
  const [prioritized, setPrioritized] = useState(false)

  const ranked = useMemo(() => {
    const withScores = tasks.map((t) => ({ ...t, score: priorityScore(t) }))
    return prioritized ? withScores.sort((a, b) => b.score - a.score) : withScores
  }, [tasks, prioritized])

  const addTask = () => {
    if (!title.trim()) return
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: title.trim(), impact, effort, urgency },
    ])
    setTitle('')
    setImpact(3)
    setEffort(3)
    setUrgency(3)
    setPrioritized(false)
  }

  const prioritize = () => {
    setLoading(true)
    setTimeout(() => {
      setPrioritized(true)
      setLoading(false)
    }, 1200)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
          <ListChecks className="size-4 text-primary" aria-hidden="true" />
          Add a task
        </h2>

        <label htmlFor="task-title" className="mt-4 block text-xs font-medium text-muted-foreground">
          Task
        </label>
        <input
          id="task-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) addTask()
          }}
          placeholder="e.g. Prepare investor deck"
          className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
        />

        {(
          [
            ['Impact', impact, setImpact],
            ['Effort', effort, setEffort],
            ['Urgency', urgency, setUrgency],
          ] as const
        ).map(([label, value, setter]) => (
          <div key={label} className="mt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{label}</span>
              <span className="text-xs font-semibold text-foreground">{value}</span>
            </div>
            <div className="mt-1.5 flex gap-1.5">
              {scale.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setter(n)}
                  aria-label={`${label} ${n}`}
                  className={cn(
                    'h-8 flex-1 rounded-md border text-xs font-medium transition-colors',
                    value >= n
                      ? 'border-primary bg-primary/15 text-primary'
                      : 'border-border bg-background text-muted-foreground hover:border-input',
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ))}

        <Button onClick={addTask} variant="secondary" size="lg" className="mt-5 w-full">
          <Plus className="size-4" aria-hidden="true" />
          Add task
        </Button>
      </div>

      <div className="lg:col-span-3 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-card-foreground">
            Backlog{' '}
            <span className="text-muted-foreground">({tasks.length})</span>
          </h2>
          <SpinnerButton
            onClick={prioritize}
            loading={loading}
            loadingText="Analyzing..."
            disabled={tasks.length === 0}
          >
            <TrendingUp className="size-4" aria-hidden="true" />
            Prioritize with AI
          </SpinnerButton>
        </div>

        <div className="mt-4 space-y-2.5">
          {ranked.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No tasks yet. Add one to build your plan.
            </p>
          )}
          {ranked.map((t, i) => {
            const tr = tier(t.score)
            return (
              <div
                key={t.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-background/50 p-3"
              >
                {prioritized && (
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/15 text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{t.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Impact {t.impact} · Effort {t.effort} · Urgency {t.urgency}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2.5">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">score</p>
                    <p className="text-sm font-semibold text-foreground">{t.score}</p>
                  </div>
                  <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', tr.className)}>
                    {tr.label}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${t.title}`}
                    onClick={() => setTasks((prev) => prev.filter((p) => p.id !== t.id))}
                    className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
