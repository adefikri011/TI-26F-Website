import { useMemo } from 'react'

function rand(min, max) {
  return min + Math.random() * (max - min)
}

export default function MagicParticles({ count = 16, className = '' }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: rand(2, 96),
        top: rand(8, 90),
        size: rand(2.5, 5),
        dur: rand(5, 11),
        delay: rand(0, 6),
        peak: rand(0.45, 0.9),
        gold: i % 3 !== 0,
      })),
    [count]
  )

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="magic-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.gold ? '#D4AF37' : '#F1E5C8',
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
            '--peak': p.peak,
          }}
        />
      ))}
    </div>
  )
}
