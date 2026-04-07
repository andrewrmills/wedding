'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { CEREMONY, RECEPTION, MAP } from '@/constants/strings'
import type { Invitee } from '@/lib/types/invitee'

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────

function buildPath(
  from: google.maps.LatLngLiteral,
  to: google.maps.LatLngLiteral,
  steps = 60
): google.maps.LatLngLiteral[] {
  return Array.from({ length: steps + 1 }, (_, i) => ({
    lat: from.lat + (to.lat - from.lat) * (i / steps),
    lng: from.lng + (to.lng - from.lng) * (i / steps),
  }))
}

function xMarkerWithLabel(color: string, label: string): google.maps.Icon {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="40" viewBox="0 0 64 40">
    <line x1="24" y1="2" x2="40" y2="18" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="2" x2="24" y2="18" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
    <text x="32" y="36" font-family="sans-serif" font-size="9" font-weight="600" fill="${color}" text-anchor="middle" letter-spacing="1.5">${label.toUpperCase()}</text>
  </svg>`
  return {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
    scaledSize: new google.maps.Size(64, 40),
    anchor: new google.maps.Point(32, 10),
  }
}

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry',                                stylers: [{ color: '#e8ede5' }] },
  { elementType: 'labels',                                  stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry',           stylers: [{ color: '#d4ddd0' }] },
  { featureType: 'road', elementType: 'geometry.stroke',    stylers: [{ color: '#c4d0bf' }] },
  { featureType: 'water',                                   stylers: [{ color: '#b8d4c4' }] },
  { featureType: 'landscape',                               stylers: [{ color: '#e4ebe1' }] },
  { featureType: 'poi',                                     stylers: [{ visibility: 'off' }] },
  { featureType: 'transit',                                 stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ visibility: 'off' }] },
]

// ─────────────────────────────────────────
// Component
// ─────────────────────────────────────────

type Props = {
  invitee: Invitee
}

export function MapSection({ invitee }: Props) {
  const firstName = invitee.name.split(' ')[0]
  const mapDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!apiKey || !mapDivRef.current) return

    const init = () => {
      if (!mapDivRef.current) return

      const ceremony: google.maps.LatLngLiteral = { lat: CEREMONY.lat, lng: CEREMONY.lng }
      const reception: google.maps.LatLngLiteral = { lat: RECEPTION.lat, lng: RECEPTION.lng }

      const map = new google.maps.Map(mapDivRef.current, {
        center: {
          lat: (ceremony.lat + reception.lat) / 2,
          lng: (ceremony.lng + reception.lng) / 2,
        },
        zoom: 16,
        styles: MAP_STYLES,
        disableDefaultUI: true,
        gestureHandling: 'none',
        keyboardShortcuts: false,
      })

      new google.maps.Marker({
        map,
        position: ceremony,
        icon: xMarkerWithLabel('#4a7a58', 'Ceremony'),
        title: CEREMONY.venueName,
      })

      const polyline = new google.maps.Polyline({
        map,
        path: [],
        strokeOpacity: 0,
        icons: [{
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#4a7a58',
            fillOpacity: 1,
            strokeOpacity: 0,
            scale: 3,
          },
          offset: '0',
          repeat: '14px',
        }],
      })

      const receptionMarker = new google.maps.Marker({
        map,
        position: reception,
        icon: xMarkerWithLabel('#1a2e1c', 'Party'),
        title: RECEPTION.venueName,
        visible: false,
      })

      const fullPath = buildPath(ceremony, reception)

      const progress = { value: 0 }
      const mapTween = gsap.to(progress, {
        value: 1,
        duration: 3,
        ease: 'none',
        repeat: -1,
        repeatDelay: 0.8,
        onUpdate: () => {
          const sliceEnd = Math.max(1, Math.ceil(progress.value * fullPath.length))
          polyline.setPath(fullPath.slice(0, sliceEnd))
          const complete = progress.value >= 0.98
          if (complete !== receptionMarker.getVisible()) {
            receptionMarker.setVisible(complete)
          }
        },
        onRepeat: () => {
          polyline.setPath([])
          receptionMarker.setVisible(false)
        },
      })
      return () => { mapTween.kill() }
    }

    if (window.google?.maps) {
      init()
      return
    }

    const existing = document.getElementById('gmaps-script')
    if (existing) {
      existing.addEventListener('load', init)
      return
    }

    const script = document.createElement('script')
    script.id = 'gmaps-script'
    // loading=async suppresses the sync-load warning; libraries=marker enables AdvancedMarkerElement
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
    script.async = true
    script.onload = init
    document.head.appendChild(script)

  }, [])

  return (
    <section className="bg-ink px-6 md:px-16 py-20">
      <div className="max-w-6xl mx-auto">
        <p className="font-body text-cream text-xl leading-relaxed mb-16 text-center">
          {MAP.intro(firstName)}
        </p>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">

        {/* Left column: date + venue info */}
        <div className="flex-1 min-w-0">

          {/* Date */}
          <div className="mb-14">
            <p className="font-body text-cream-dim text-[0.625rem] tracking-[0.25em] uppercase mb-3">When</p>
            <p className="font-display text-cream text-[clamp(2rem,5vw,4rem)] leading-none">
              {CEREMONY.date}
            </p>
            <p className="font-body text-cream-dim text-lg mt-2">{CEREMONY.time}</p>
          </div>

          {/* Ceremony */}
          <div className="mb-12">
            <div className="w-8 h-px bg-clay mb-6" />
            <p className="font-body text-cream-dim text-[0.625rem] tracking-[0.25em] uppercase mb-3">
              Ceremony
            </p>
            <h2 className="font-display text-cream text-2xl mb-3">{CEREMONY.venueName}</h2>
            {CEREMONY.addressLines.map((line) => (
              <p key={line} className="font-body text-cream-dim text-sm leading-relaxed">{line}</p>
            ))}
          </div>

          {/* Reception */}
          <div>
            <div className="w-8 h-px bg-clay mb-6" />
            <p className="font-body text-cream-dim text-[0.625rem] tracking-[0.25em] uppercase mb-3">
              Reception
            </p>
            <h2 className="font-display text-cream text-2xl mb-3">{RECEPTION.venueName}</h2>
            {RECEPTION.addressLines.map((line) => (
              <p key={line} className="font-body text-cream-dim text-sm leading-relaxed">{line}</p>
            ))}
          </div>

        </div>

        {/* Right column: map */}
        <div className="w-full md:w-[45%] self-end">
          <div
            ref={mapDivRef}
            className="w-full rounded-xl overflow-hidden"
            style={{ height: 'clamp(280px, 50vw, 480px)' }}
          />
        </div>

      </div>
    </section>
  )
}
