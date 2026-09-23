function CornerFlourish({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 ${className}`} aria-hidden="true">
      <path
        d="M2 2 L2 16 Q2 2 16 2"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="1.5"
        opacity="0.55"
      />
      <circle cx="2" cy="2" r="2.2" fill="var(--color-gold)" opacity="0.55" />
    </svg>
  )
}
export default CornerFlourish