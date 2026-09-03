'use client'

import { useEffect, useRef, useState } from 'react'
import { Send, Sparkles, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Message = { id: string; role: 'user' | 'assistant'; content: string }

const suggestions = [
  'Summarize my day',
  'Draft a standup update',
  'Brainstorm blog ideas',
  'Explain OKRs simply',
]

function reply(input: string): string {
  const text = input.toLowerCase()
  if (text.includes('standup') || text.includes('update')) {
    return "Here's a quick standup update:\n\n• Yesterday: closed out the reported bugs\n• Today: pairing on the new feature and reviewing PRs\n• Blockers: none right now\n\nWant me to tailor the tone or add specifics?"
  }
  if (text.includes('okr')) {
    return 'OKRs = Objectives and Key Results. The Objective is the ambitious goal ("Delight new users"), and Key Results are the measurable signals that prove you got there ("Raise activation from 40% to 60%"). Keep 1 objective with 2-4 measurable key results.'
  }
  if (text.includes('brainstorm') || text.includes('idea')) {
    return 'A few directions to explore:\n\n1. A behind-the-scenes look at how your team works\n2. A practical how-to solving one common pain point\n3. A data-backed trends piece for your industry\n\nTell me your audience and I can go deeper on any of these.'
  }
  if (text.includes('summarize') || text.includes('day')) {
    return "Based on a typical workday, here's a summary structure: highlight what moved forward, note one decision made, and flag anything still waiting on someone. Share your notes and I'll turn them into a tidy recap."
  }
  return `Good question. Here's how I'd approach "${input.trim()}": break it into the outcome you want, the constraints you have, and the very next action. Share more context and I can get specific.`
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm your workplace assistant. Ask me to draft, summarize, plan, or explain anything.",
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  const send = (value?: string) => {
    const content = (value ?? input).trim()
    if (!content || typing) return
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', content }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'assistant', content: reply(content) },
      ])
      setTyping(false)
    }, 1400)
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-15rem)] min-h-96 max-w-3xl flex-col rounded-xl border border-border bg-card">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn('flex gap-3', m.role === 'user' && 'flex-row-reverse')}
          >
            <span
              className={cn(
                'flex size-8 shrink-0 items-center justify-center rounded-lg',
                m.role === 'assistant'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground',
              )}
            >
              {m.role === 'assistant' ? <Sparkles className="size-4" /> : <User className="size-4" />}
            </span>
            <div
              className={cn(
                'max-w-[80%] whitespace-pre-wrap rounded-xl px-4 py-2.5 text-sm leading-relaxed',
                m.role === 'assistant'
                  ? 'bg-background/60 text-foreground'
                  : 'bg-primary text-primary-foreground',
              )}
            >
              {m.content}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            <div className="flex items-center gap-1.5 rounded-xl bg-background/60 px-4 py-3.5">
              <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
              <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
              <span className="size-2 animate-bounce rounded-full bg-muted-foreground" />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border p-4">
        {messages.length <= 1 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing &&
                e.keyCode !== 229
              ) {
                e.preventDefault()
                send()
              }
            }}
            rows={1}
            placeholder="Message the assistant..."
            className="max-h-32 flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
          />
          <Button
            onClick={() => send()}
            disabled={!input.trim() || typing}
            size="icon-lg"
            aria-label="Send message"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
