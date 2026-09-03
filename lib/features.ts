import {
  LayoutDashboard,
  Mail,
  NotebookPen,
  ListChecks,
  Telescope,
  MessagesSquare,
  type LucideIcon,
} from 'lucide-react'

export type FeatureId =
  | 'dashboard'
  | 'email'
  | 'meetings'
  | 'tasks'
  | 'research'
  | 'chat'

export type Feature = {
  id: FeatureId
  label: string
  shortLabel: string
  description: string
  icon: LucideIcon
}

export const features: Feature[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    shortLabel: 'Dashboard',
    description: 'Your productivity command center',
    icon: LayoutDashboard,
  },
  {
    id: 'email',
    label: 'Smart Email Generator',
    shortLabel: 'Email',
    description: 'Draft polished emails in any tone',
    icon: Mail,
  },
  {
    id: 'meetings',
    label: 'Meeting Notes Summarizer',
    shortLabel: 'Meetings',
    description: 'Turn raw notes into summaries and deadlines',
    icon: NotebookPen,
  },
  {
    id: 'tasks',
    label: 'AI Task Planner',
    shortLabel: 'Tasks',
    description: 'Prioritize work with an AI scoring model',
    icon: ListChecks,
  },
  {
    id: 'research',
    label: 'AI Research Assistant',
    shortLabel: 'Research',
    description: 'Gather insights and sources fast',
    icon: Telescope,
  },
  {
    id: 'chat',
    label: 'AI Chatbot',
    shortLabel: 'Chat',
    description: 'Ask anything, get instant help',
    icon: MessagesSquare,
  },
]
