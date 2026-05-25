'use client'

import { useState } from 'react'

export function CopyLinkButton({ token }: { token: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(`https://notforavisa.wedding/rsvp?token=${token}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="text-xs px-2 py-1 rounded border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-800 transition-colors"
    >
      {copied ? 'Copied!' : 'Copy link'}
    </button>
  )
}
