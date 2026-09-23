export default function QuoteBlock({ children, author, className = '' }) {
  return (
    <blockquote
      className={`relative max-w-2xl mx-auto text-center px-8 py-6 ${className}`}
    >
      <span
        className="absolute -top-2 left-0 font-display text-5xl text-gold/50 select-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <p className="font-body italic text-lg md:text-xl text-inkbrown leading-relaxed">
        {children}
      </p>

      {author && (
        <footer className="mt-3 font-body text-sm text-gold tracking-wide">
          — {author}
        </footer>
      )}

      <span
        className="absolute -bottom-4 right-0 font-display text-5xl text-gold/50 select-none"
        aria-hidden="true"
      >
        &rdquo;
      </span>
    </blockquote>
  )
}
