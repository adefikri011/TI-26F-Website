import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Images,
  Megaphone,
  ExternalLink,
  LogOut,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/members', label: 'Members', icon: Users },
  { to: '/admin/schedule', label: 'Schedule', icon: CalendarDays },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
  { to: '/admin/announcements', label: 'Announcements', icon: Megaphone },
]

export function AdminSidebar({ open, onClose }) {
  const { signOut } = useAuth()

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-inkbrown border-r-2 border-gold/40 flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-5 py-6 border-b border-gold/30">
          <p className="font-display text-gold text-lg">TI26F</p>
          <p className="font-body text-parchment/60 text-sm">Admin Panel</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded font-body text-sm transition-colors ${
                  isActive
                    ? 'bg-gold/10 text-gold'
                    : 'text-parchment/80 hover:bg-parchment/5 hover:text-gold'
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-gold/30 space-y-1">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded font-body text-sm text-parchment/80 hover:bg-parchment/5 hover:text-gold transition-colors"
          >
            <ExternalLink size={17} />
            Lihat Website
          </NavLink>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded font-body text-sm text-parchment/80 hover:bg-maroon/20 hover:text-gold transition-colors"
          >
            <LogOut size={17} />
            Keluar
          </button>
        </div>
      </aside>
    </>
  )
}
