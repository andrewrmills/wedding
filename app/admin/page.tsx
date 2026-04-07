import { createServiceClient } from '@/lib/supabase/service'
import type { BeerChoice } from '@/lib/types/invitee'

const BEER_ORDER: BeerChoice[] = ['Hazy', 'Lager', 'Sour', 'Ginger Beer', 'Other']

function formatDate(iso: string | null): string {
  if (!iso) return 'Never'
  return new Date(iso).toLocaleString('en-NZ', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function AdminPage() {
  const supabase = createServiceClient()
  const { data } = await supabase
    .from('invitees')
    .select('*')
    .order('name')

  const all = data ?? []
  const attending = all.filter(i => i.rsvp_attending === true)
  const notAttending = all.filter(i => i.rsvp_attending === false)
  const notResponded = all.filter(i => i.rsvp_attending === null)

  // Beer counts — attending guests only
  const beerCounts = new Map<string, number>()
  for (const i of attending) {
    if (i.beer_choice) {
      beerCounts.set(i.beer_choice, (beerCounts.get(i.beer_choice) ?? 0) + 1)
    }
  }
  const beerTally = BEER_ORDER
    .filter(b => beerCounts.has(b))
    .map(b => ({ label: b, count: beerCounts.get(b)! }))
    .sort((a, b) => b.count - a.count)

  const otherBeers = attending.filter(
    i => i.beer_choice === 'Other' && i.beer_other_details
  )

  // Dietary — non-null, all guests
  const dietary = all.filter(i => i.dietary_requirements)

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold tracking-tight">RSVP Admin</h1>
        <p className="text-sm text-gray-500 mt-0.5">Andrew &amp; Gabbi — 13 Feb 2027</p>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-10">

        {/* Summary */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Summary</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card label="Total Invited" value={all.length} />
            <Card label="Attending" value={attending.length} highlight="green" />
            <Card label="Not Attending" value={notAttending.length} highlight="red" />
            <Card label="No Response" value={notResponded.length} highlight="amber" />
          </div>
        </section>

        {/* Beer */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Beer Selection</h2>
          {beerTally.length === 0 ? (
            <p className="text-sm text-gray-400 italic">No beer selections yet.</p>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-4 py-2.5 font-medium text-gray-500">Beer</th>
                    <th className="text-right px-4 py-2.5 font-medium text-gray-500">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {beerTally.map(({ label, count }) => (
                    <tr key={label} className="border-b border-gray-50 last:border-0">
                      <td className="px-4 py-2.5">{label}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums font-medium">{count}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 border-t border-gray-100">
                    <td className="px-4 py-2.5 font-medium text-gray-500">Total</td>
                    <td className="px-4 py-2.5 text-right tabular-nums font-semibold">
                      {beerTally.reduce((s, b) => s + b.count, 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
              {otherBeers.length > 0 && (
                <div className="px-4 py-3 border-t border-gray-100 bg-amber-50">
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-2">
                    Other — details
                  </p>
                  <ul className="space-y-1">
                    {otherBeers.map(i => (
                      <li key={i.id} className="text-sm text-gray-700">
                        <span className="font-medium">{i.name}:</span>{' '}
                        {i.beer_other_details}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Dietary requirements */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Dietary Requirements
          </h2>
          {dietary.length === 0 ? (
            <p className="text-sm text-gray-400 italic">No dietary requirements recorded.</p>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-4 py-2.5 font-medium text-gray-500 w-40">Name</th>
                    <th className="text-left px-4 py-2.5 font-medium text-gray-500">Requirement</th>
                  </tr>
                </thead>
                <tbody>
                  {dietary.map(i => (
                    <tr key={i.id} className="border-b border-gray-50 last:border-0">
                      <td className="px-4 py-2.5 font-medium whitespace-nowrap">{i.name}</td>
                      <td className="px-4 py-2.5 text-gray-700">{i.dietary_requirements}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Full guest list */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            All Guests
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-2.5 font-medium text-gray-500">Name</th>
                  <th className="text-left px-4 py-2.5 font-medium text-gray-500">Type</th>
                  <th className="text-left px-4 py-2.5 font-medium text-gray-500">RSVP</th>
                  <th className="text-left px-4 py-2.5 font-medium text-gray-500">Beer</th>
                  <th className="text-left px-4 py-2.5 font-medium text-gray-500">Link Opened</th>
                </tr>
              </thead>
              <tbody>
                {all.map(i => (
                  <tr key={i.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-2.5 font-medium whitespace-nowrap">{i.name}</td>
                    <td className="px-4 py-2.5 text-gray-500">{i.type}</td>
                    <td className="px-4 py-2.5">
                      <RsvpBadge value={i.rsvp_attending} />
                    </td>
                    <td className="px-4 py-2.5 text-gray-700">
                      {i.beer_choice === 'Other'
                        ? `Other${i.beer_other_details ? ` — ${i.beer_other_details}` : ''}`
                        : (i.beer_choice ?? '—')}
                    </td>
                    <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap text-xs">
                      {formatDate(i.last_accessed_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  )
}

function Card({
  label,
  value,
  highlight,
}: {
  label: string
  value: number
  highlight?: 'green' | 'red' | 'amber'
}) {
  const valueColor =
    highlight === 'green'
      ? 'text-green-600'
      : highlight === 'red'
        ? 'text-red-500'
        : highlight === 'amber'
          ? 'text-amber-500'
          : 'text-gray-900'

  return (
    <div className="bg-white rounded-lg border border-gray-200 px-5 py-4">
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
      <p className={`text-3xl font-bold mt-1 tabular-nums ${valueColor}`}>{value}</p>
    </div>
  )
}

function RsvpBadge({ value }: { value: boolean | null }) {
  if (value === true)
    return (
      <span className="inline-block rounded-full bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5">
        Attending
      </span>
    )
  if (value === false)
    return (
      <span className="inline-block rounded-full bg-red-100 text-red-600 text-xs font-medium px-2 py-0.5">
        Not attending
      </span>
    )
  return (
    <span className="inline-block rounded-full bg-gray-100 text-gray-400 text-xs font-medium px-2 py-0.5">
      Pending
    </span>
  )
}
