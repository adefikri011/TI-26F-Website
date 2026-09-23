function Candle({ className = "" }) {
  return (
    <div className={`relative w-6 h-16 ${className}`} aria-hidden="true">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-10 bg-parchment border border-maroon/20 rounded-sm" />
      <div className="candle-flame absolute -top-2 left-1/2 -translate-x-1/2 w-2.5 h-4 rounded-full bg-gradient-to-t from-gold via-yellow-300 to-transparent" />
    </div>
  )
}
export default Candle