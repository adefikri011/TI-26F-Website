function TornEdge({ className = "" }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className={`w-full h-10 sm:h-14 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0,60 L0,22 L48,34 L96,14 L144,30 L192,10 L240,28 L288,16 L336,32 L384,12 L432,26 L480,8 L528,30 L576,18 L624,34 L672,14 L720,28 L768,10 L816,32 L864,16 L912,30 L960,12 L1008,26 L1056,8 L1104,32 L1152,18 L1200,30 L1248,14 L1296,28 L1344,10 L1392,26 L1440,16 L1440,60 Z"
        fill="var(--color-parchment)"
      />
    </svg>
  )
}
export default TornEdge