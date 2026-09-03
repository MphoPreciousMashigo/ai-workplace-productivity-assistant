'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { AppSidebar } from '@/components/app-sidebar'
import { FooterDisclaimer } from '@/components/footer-disclaimer'
import { DashboardOverview } from '@/components/features/dashboard-overview'
import { EmailGenerator } from '@/components/features/email-generator'
import { MeetingSummarizer } from '@/components/features/meeting-summarizer'
import { TaskPlanner } from '@/components/features/task-planner'
import { ResearchAssistant } from '@/components/features/research-assistant'
import { Chatbot } from '@/components/features/chatbot'
import { features, type FeatureId } from '@/lib/features'

export default function Page() {
  const [active, setActive] = useState<FeatureId>('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)

  const current = features.find((f) => f.id === active)!

  const select = (id: FeatureId) => {
    setActive(id)
    setMobileOpen(false)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar
        active={active}
        onSelect={select}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-border px-5 py-4 md:px-8">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground md:hidden"
          >
            <Menu className="size-5" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-foreground">{current.label}</h1>
            <p className="truncate text-sm text-muted-foreground">{current.description}</p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-5 py-6 md:px-8">
          {active === 'dashboard' && <DashboardOverview onNavigate={select} />}
          {active === 'email' && <EmailGenerator />}
          {active === 'meetings' && <MeetingSummarizer />}
          {active === 'tasks' && <TaskPlanner />}
          {active === 'research' && <ResearchAssistant />}
          {active === 'chat' && <Chatbot />}
        </main>

        <FooterDisclaimer />
      </div>
    </div>
  )
}
