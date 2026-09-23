function WaxNote({ title, children }) {
  return (
    <div className="relative bg-parchment border-t-2 border-gold px-6 pt-7 pb-6 shadow-[3px_4px_12px_rgba(0,0,0,0.15)]">
      <div
        className="absolute top-0 right-0 w-5 h-5 bg-black/10"
        style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
      />
      <h3 className="font-display text-maroon text-lg mb-2">{title}</h3>
      <p className="font-body text-inkbrown/80 text-sm leading-relaxed">
        {children}
      </p>
    </div>
  )
}
export default WaxNote