import { ShieldAlert } from 'lucide-react'

export function FooterDisclaimer() {
  return (
    <footer className="border-t border-border bg-background/80 px-6 py-3 backdrop-blur">
      <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
        <ShieldAlert className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
        AI-generated content may require human review
      </p>
    </footer>
  )
}
