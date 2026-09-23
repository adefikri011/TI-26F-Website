function WaxSeal({ className = "" }) {
  return (
    <svg viewBox="0 0 100 110" className={className} aria-hidden="true">
      <path
        d="M50 100 C38 100 30 92 30 84 C30 92 22 96 18 90 C24 84 24 78 30 74 L70 74 C76 78 76 84 82 90 C78 96 70 92 70 84 C70 92 62 100 50 100Z"
        fill="#4a1010"
      />
      <circle cx="50" cy="45" r="42" fill="#7a1f1f" />
      <circle cx="50" cy="45" r="42" fill="url(#waxGloss)" />
      <circle cx="50" cy="45" r="36" fill="none" stroke="#a83232" strokeWidth="1.5" opacity="0.5" />
      <text
        x="50"
        y="57"
        textAnchor="middle"
        fontFamily="Cinzel Decorative, serif"
        fontSize="32"
        fill="#e3c98f"
      >
        T
      </text>
      <defs>
        <radialGradient id="waxGloss" cx="35%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#a83232" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#7a1f1f" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}
export default WaxSeal