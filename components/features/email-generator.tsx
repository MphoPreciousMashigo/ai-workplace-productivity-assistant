'use client'

import { useState } from 'react'
import { Copy, Check, Mail, Wand2 } from 'lucide-react'
import { SpinnerButton } from '@/components/spinner-button'
import { cn } from '@/lib/utils'

const tones = ['Professional', 'Friendly', 'Persuasive', 'Concise', 'Empathetic', 'Formal']
const lengths = ['Short', 'Medium', 'Detailed']

function buildEmail(prompt: string, tone: string, length: string) {
  const topic = prompt.trim() || 'the project update'
  const openers: Record<string, string> = {
    Professional: 'I hope this message finds you well.',
    Friendly: 'Hope you are having a great week!',
    Persuasive: 'I wanted to reach out with an opportunity I think you will value.',
    Concise: 'Quick note regarding the item below.',
    Empathetic: 'Thank you for your patience — I truly appreciate it.',
    Formal: 'I am writing to formally address the matter outlined below.',
  }
  const body =
    length === 'Short'
      ? `Regarding ${topic}, here is where things stand and the single next step I recommend.`
      : length === 'Detailed'
        ? `Regarding ${topic}, I have outlined the current status, the key considerations, the risks we should keep an eye on, and a clear set of next steps so we can keep momentum and stay aligned on outcomes.`
        : `Regarding ${topic}, here is a brief summary of the current status and the next steps I propose so we can stay aligned.`

  return `Subject: ${topic.charAt(0).toUpperCase() + topic.slice(1)}

Hi [Name],

${openers[tone]}

${body}

Please let me know if you have any questions or would like to adjust the approach.

Best regards,
[Your Name]`
}

export function EmailGenerator() {
  const [prompt, setPrompt] = useState('')
  const [tone, setTone] = useState(tones[0])
  const [length, setLength] = useState(lengths[1])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    setLoading(true)
    setCopied(false)
    setTimeout(() => {
      setResult(buildEmail(prompt, tone, length))
      setLoading(false)
    }, 1300)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
          <Mail className="size-4 text-primary" aria-hidden="true" />
          Compose
        </h2>

        <label htmlFor="email-prompt" className="mt-4 block text-xs font-medium text-muted-foreground">
          What is this email about?
        </label>
        <textarea
          id="email-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={5}
          placeholder="e.g. Follow up with a client about the delayed Q3 delivery and reassure them"
          className="mt-1.5 w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
        />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email-tone" className="block text-xs font-medium text-muted-foreground">
              Tone
            </label>
            <select
              id="email-tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
            >
              {tones.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="email-length" className="block text-xs font-medium text-muted-foreground">
              Length
            </label>
            <select
              id="email-length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
            >
              {lengths.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        <SpinnerButton
          onClick={generate}
          loading={loading}
          loadingText="Generating..."
          size="lg"
          className="mt-5 w-full"
        >
          <Wand2 className="size-4" aria-hidden="true" />
          Generate Email
        </SpinnerButton>
      </div>

      <div className="flex flex-col rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-card-foreground">Draft</h2>
          {result && (
            <button
              type="button"
              onClick={copy}
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {copied ? <Check className="size-3.5 text-primary" /> : <Copy className="size-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          )}
        </div>

        <div
          className={cn(
            'mt-4 flex-1 rounded-lg border border-dashed border-border bg-background/40 p-4',
            !result && 'flex items-center justify-center',
          )}
        >
          {result ? (
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
              {result}
            </pre>
          ) : (
            <p className="max-w-xs text-center text-sm text-muted-foreground">
              Your generated draft will appear here. Describe the email and pick a tone to begin.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
