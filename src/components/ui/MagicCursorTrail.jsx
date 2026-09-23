import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const MAX_SPARKS = 48
const COLORS = ['#D4AF37', '#F1E5C8', '#E8C468', '#fff4cc']

function createSpark(x, y) {
  const el = document.createElement('span')
  el.className = 'magic-spark'
  const size = 3 + Math.random() * 5
  const angle = Math.random() * Math.PI * 2
  const dist = 12 + Math.random() * 28
  el.style.left = `${x}px`
  el.style.top = `${y}px`
  el.style.width = `${size}px`
  el.style.height = `${size}px`
  el.style.background = COLORS[(Math.random() * COLORS.length) | 0]
  el.style.setProperty('--dx', `${Math.cos(angle) * dist}px`)
  el.style.setProperty('--dy', `${Math.sin(angle) * dist - 8}px`)
  el.style.setProperty('--dur', `${0.55 + Math.random() * 0.45}s`)
  document.body.appendChild(el)
  el.addEventListener('animationend', () => el.remove(), { once: true })
}

export default function MagicCursorTrail() {
  const reduced = useReducedMotion()
  const lastRef = useRef({ x: 0, y: 0, t: 0 })
  const countRef = useRef(0)

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    let raf = 0
    let pending = []

    const flush = () => {
      raf = 0
      if (countRef.current >= MAX_SPARKS) {
        pending = []
        return
      }
      for (const { x, y } of pending) {
        if (countRef.current >= MAX_SPARKS) break
        createSpark(x, y)
        countRef.current += 1
        // hanya 1 sparkle per event flush biar ringan
        break
      }
      pending = []
      window.setTimeout(() => {
        countRef.current = Math.max(0, countRef.current - 1)
      }, 700)
    }

    const onMove = (e) => {
      const now = performance.now()
      const last = lastRef.current
      const dx = e.clientX - last.x
      const dy = e.clientY - last.y
      const dist = Math.hypot(dx, dy)
      // butuh gerakan cukup jauh & jeda minimum → hemat CPU
      if (dist < 18 || now - last.t < 45) return
      lastRef.current = { x: e.clientX, y: e.clientY, t: now }
      pending.push({ x: e.clientX, y: e.clientY })
      if (!raf) raf = requestAnimationFrame(flush)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduced])

  return null
}
