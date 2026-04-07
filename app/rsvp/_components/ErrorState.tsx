import { ERROR } from '@/constants/strings'

export function ErrorState() {
  return (
    <div className="min-h-[100dvh] bg-ink flex items-center justify-center px-6">
      <p className="font-body text-cream-dim text-center max-w-sm leading-relaxed">
        {ERROR.invalidToken}
      </p>
    </div>
  )
}
