'use client'

import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type SpinnerButtonProps = React.ComponentProps<typeof Button> & {
  loading?: boolean
  loadingText?: string
}

export function SpinnerButton({
  loading = false,
  loadingText,
  children,
  disabled,
  className,
  ...props
}: SpinnerButtonProps) {
  return (
    <Button
      disabled={loading || disabled}
      className={cn('relative', className)}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" aria-hidden="true" />}
      {loading ? (loadingText ?? children) : children}
    </Button>
  )
}
