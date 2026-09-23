import { motion, useReducedMotion } from 'framer-motion'

export default function OrnamentDivider({ className = '', animate = false }) {
  const reduced = useReducedMotion()
  const shouldAnim = animate && !reduced

  const line = (side) =>
    shouldAnim
      ? {
          initial: { scaleX: 0, opacity: 0 },
          animate: { scaleX: 1, opacity: 1 },
          transition: { duration: 0.85, delay: side === 'l' ? 0.15 : 0.25, ease: [0.22, 1, 0.36, 1] },
        }
      : {}

  const gem = shouldAnim
    ? {
        initial: { scale: 0, rotate: -90, opacity: 0 },
        animate: { scale: 1, rotate: 0, opacity: 1 },
        transition: { duration: 0.55, delay: 0.45, ease: 'backOut' },
      }
    : {}

  return (
    <div
      className={`flex items-center justify-center gap-3 max-w-md mx-auto ${className}`}
      aria-hidden="true"
    >
      <motion.span
        {...line('l')}
        className={`h-px flex-1 bg-gradient-to-r from-transparent via-gold to-gold/60 ${
          shouldAnim ? 'origin-right' : ''
        }`}
      />

      <motion.svg
        {...gem}
        width="34"
        height="14"
        viewBox="0 0 34 14"
        fill="none"
        className={shouldAnim ? 'origin-center' : ''}
      >
        <path
          d="M17 1L21 7L17 13L13 7L17 1Z"
          fill="#D4AF37"
          stroke="#D4AF37"
          strokeWidth="1"
        />
        <circle cx="5" cy="7" r="2" fill="#D4AF37" />
        <circle cx="29" cy="7" r="2" fill="#D4AF37" />
        <path d="M7 7H11" stroke="#D4AF37" strokeWidth="1" />
        <path d="M23 7H27" stroke="#D4AF37" strokeWidth="1" />
      </motion.svg>

      <motion.span
        {...line('r')}
        className={`h-px flex-1 bg-gradient-to-l from-transparent via-gold to-gold/60 ${
          shouldAnim ? 'origin-left' : ''
        }`}
      />
    </div>
  )
}
