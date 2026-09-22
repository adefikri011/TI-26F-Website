import { Link } from 'react-router-dom'
import { Users, CalendarDays, Images, Megaphone } from 'lucide-react'
import { useMembers } from '../../hooks/useMembers'
import { useSchedule } from '../../hooks/useSchedule'
import { useGallery } from '../../hooks/useGallery'
import { useAnnouncements } from '../../hooks/useAnnouncements'

const cards = [
  { label: 'Members', icon: Users, to: '/admin/members', hook: 'members' },
  { label: 'Schedule', icon: CalendarDays, to: '/admin/schedule', hook: 'schedule' },
  { label: 'Gallery', icon: Images, to: '/admin/gallery', hook: 'gallery' },
  { label: 'Announcements', icon: Megaphone, to: '/admin/announcements', hook: 'announcements' },
]

export function AdminDashboard() {
  const members = useMembers()
  const schedule = useSchedule()
  const gallery = useGallery()
  const announcements = useAnnouncements()

  const counts = {
    members: members.data.length,
    schedule: schedule.data.length,
    gallery: gallery.data.length,
    announcements: announcements.data.length,
  }

  return (
    <div>
      <h2 className="font-display text-2xl text-maroon mb-1">Dashboard</h2>
      <p className="font-body text-inkbrown/70 mb-6">Ringkasan data kelas TI26F</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, icon: Icon, to, hook }) => (
          <Link
            key={label}
            to={to}
            className="bg-white/70 border-2 border-gold/50 rounded-md p-5 hover:border-gold hover:-translate-y-0.5 transition-all shadow-sm"
          >
            <Icon size={22} className="text-gold mb-3" />
            <p className="font-display text-3xl text-maroon">
              {counts[hook]}
            </p>
            <p className="font-body text-sm text-inkbrown/70">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
