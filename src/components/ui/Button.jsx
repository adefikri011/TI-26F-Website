function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="font-display bg-maroon text-gold px-6 py-3 rounded-md border-2 border-gold hover:bg-gold hover:text-maroon transition-colors"
    >
      {children}
    </button>
  )
}
export default Button
