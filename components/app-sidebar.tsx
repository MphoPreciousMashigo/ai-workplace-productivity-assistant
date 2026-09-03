'use client'

import { Sparkles, X } from 'lucide-react'
import { features, type FeatureId } from '@/lib/features'
import { cn } from '@/lib/utils'

type AppSidebarProps = {
  active: FeatureId
  onSelect: (id: FeatureId) => void
  mobileOpen: boolean
  onCloseMobile: () => void
}

export function AppSidebar({
  active,
  onSelect,
  mobileOpen,
  onCloseMobile,
}: AppSidebarProps) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onCloseMobile}
          className="fixed inset-0 z-30 bg-background/70 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 md:static md:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between gap-2 px-5 py-5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-5" aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-sidebar-foreground">Assistant</p>
              <p className="text-xs text-muted-foreground">Workplace AI</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onCloseMobile}
            className="rounded-md p-1 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground md:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2" aria-label="Features">
          {features.map((feature) => {
            const Icon = feature.icon
            const isActive = feature.id === active
            return (
              <button
                key={feature.id}
                type="button"
                onClick={() => onSelect(feature.id)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground',
                )}
              >
                <Icon className="size-4.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{feature.shortLabel}</span>
              </button>
            )
          })}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-lg bg-sidebar-accent/60 p-3">
            <p className="text-xs font-medium text-sidebar-foreground">Pro workspace</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Unlimited generations across every tool.
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
