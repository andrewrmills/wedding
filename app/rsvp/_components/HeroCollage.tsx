'use client'

import { useState, useEffect } from 'react'

// Images available to all guest types
const BASE_IMAGES = [
  'IMG_2268.jpeg',
  '113749.JPEG',
  'IMG_2897.jpeg',
  '58358.JPEG',
  '57690.JPEG',
  '58334.jpeg',
  'IMG_2910.jpeg',
  '58333.JPEG',
  '78d79f4e-dfa0-48b6-846d-f7084da7d09b.JPG',
  'IMG_2537.jpeg',
  '113778.JPEG',
  '116254.JPEG',
  '57244.JPEG',
  '114770.JPEG',
  'f642fbb0-13d3-48a3-ad92-c0afc4b7c250.JPG',
  'IMG_2503.jpeg',
  'FullSizeRender.jpeg',
  '58737.JPEG',
  '58213.JPEG',
  '113747.JPEG',
  'imagejpeg_0.JPG',
  'IMG_2378.jpeg',
  '114774.JPEG',
  '66801c89-ddd9-4638-9549-5006c2543cc9.JPG',
  '58072.JPEG',
  'IMG_2861.jpeg',
  '57108.JPEG',
  'IMG_2565.jpeg',
]

// Only shown to Aus guests
const AUS_ONLY_IMAGES = ['AUS_1.JPEG', 'AUS_2.JPEG']

const IMAGES_PER_COLUMN = 3

function randomShuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

type Props = {
  inviteeType: string
}

export function HeroCollage({ inviteeType }: Props) {
  const [selected, setSelected] = useState<string[]>([])
  const [columnCount, setColumnCount] = useState(0)

  useEffect(() => {
    const cols = window.innerWidth >= 768 ? 6 : 3
    const pool = inviteeType === 'Aus'
      ? [...BASE_IMAGES, ...AUS_ONLY_IMAGES]
      : BASE_IMAGES
    setSelected(randomShuffle(pool).slice(0, cols * IMAGES_PER_COLUMN))
    setColumnCount(cols)
  }, [inviteeType])

  const columns = Array.from({ length: columnCount }, (_, i) =>
    selected.slice(i * IMAGES_PER_COLUMN, (i + 1) * IMAGES_PER_COLUMN)
  )

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="w-full h-full p-1.5 flex gap-1.5">
        {columns.map((images, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col justify-center gap-1.5">
            {images.map((filename) => (
              <img
                key={filename}
                src={`/img/${filename}`}
                alt=""
                className="w-full h-auto block"
              />
            ))}
          </div>
        ))}
      </div>
      {/* Frosted overlay — keeps text readable while photos show through */}
      <div className="absolute inset-0 bg-white/60" />
    </div>
  )
}
