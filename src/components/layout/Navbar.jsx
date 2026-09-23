import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import WaxSeal from '../ui/WaxSeal'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/members', label: 'Members' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/announcements', label: 'News' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
          scrolled
            ? 'bg-inkbrown/95 backdrop-blur-md border-b border-gold/25 shadow-lg shadow-black/20'
            : 'bg-inkbrown/70 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="TI26F Home">
            <span className="scale-75 sm:scale-90 origin-left">
              <WaxSeal />
            </span>
            <span className="font-display text-gold text-lg sm:text-xl tracking-wide">
              TI26F
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {links.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `relative font-body text-sm tracking-wide transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-gold after:transition-transform after:duration-300 after:origin-left ${
                    isActive
                      ? 'text-gold after:scale-x-100'
                      : 'text-parchment/75 hover:text-gold after:scale-x-0 hover:after:scale-x-100'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 -mr-2 text-gold hover:text-parchment transition-colors"
            aria-label="Buka menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-inkbrown lg:hidden flex flex-col"
          >
            <div className="h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between border-b border-gold/20">
              <span className="font-display text-gold text-lg">TI26F</span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 -mr-2 text-gold hover:text-parchment transition-colors"
                aria-label="Tutup menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
              {links.map(({ to, label, end }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.35, ease: 'easeOut' }}
                >
                  <NavLink
                    to={to}
                    end={end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block font-display text-2xl sm:text-3xl py-2.5 pl-1 transition-colors ${
                        isActive
                          ? 'text-gold'
                          : 'text-parchment/70 hover:text-gold'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <p className="px-8 pb-10 font-body italic text-sm text-parchment/45">
              Our Little Hogwarts
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
export default Navbar
