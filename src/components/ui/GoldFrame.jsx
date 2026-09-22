function GoldFrame({ image, name }) {
  return (
    <div className="relative border-8 border-gold rounded-md overflow-hidden shadow-lg bg-inkbrown">
      <img src={image} alt={name} className="w-full h-56 object-cover" />
      <p className="font-display text-center text-parchment bg-inkbrown/80 py-2 uppercase tracking-wide">
        {name}
      </p>
    </div>
  )
}
export default GoldFrame
