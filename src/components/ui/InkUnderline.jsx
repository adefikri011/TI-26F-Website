import { motion, useReducedMotion } from 'framer-motion'

function InkUnderline({ className = "" }) {
  const reduced = useReducedMotion()
  return (
    <svg viewBox="0 0 220 14" className={`w-40 h-3 mx-auto ${className}`} aria-hidden="true">
      <motion.path
        d="M4 8 C 40 2, 80 12, 110 6 S 180 2, 216 8"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={reduced ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 0.3 }}
      />
    </svg>
  )
}
export default InkUnderline