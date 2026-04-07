// Shown by Next.js Suspense while the Server Component fetches the invitee record.
export default function Loading() {
  return (
    <div className="min-h-[100dvh] bg-ink flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-48 h-1.5 bg-ink-border rounded-full animate-pulse" />
        <div className="w-28 h-1.5 bg-ink-border rounded-full animate-pulse" />
      </div>
    </div>
  )
}
