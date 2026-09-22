import { useState } from 'react'
import { Plus, Pencil, Trash2, Megaphone } from 'lucide-react'
import { useAnnouncements } from '../../hooks/useAnnouncements'
import {
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../../services/announcementsService'
import { AnnouncementForm } from '../../components/admin/AnnouncementForm'
import { ConfirmDialog } from '../../components/admin/ConfirmDialog'

const TYPE_BADGE = {
  info: 'bg-inkbrown/10 text-inkbrown border-inkbrown/30',
  urgent: 'bg-maroon/15 text-maroon border-maroon/40',
  event: 'bg-gold/25 text-inkbrown border-gold/60',
}

const TYPE_LABEL = {
  info: 'Info',
  urgent: 'Penting',
  event: 'Acara',
}

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function AdminAnnouncements() {
  const { data, loading, error, refetch } = useAnnouncements()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [busy, setBusy] = useState(false)

  const openAdd = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (item) => {
    setEditing(item)
    setFormOpen(true)
  }

  const handleSave = async (payload) => {
    if (editing) {
      await updateAnnouncement(editing.id, payload)
    } else {
      await addAnnouncement(payload)
    }
    setFormOpen(false)
    setEditing(null)
    refetch()
  }

  const handleDelete = async () => {
    if (!deleting) return
    setBusy(true)
    try {
      await deleteAnnouncement(deleting.id)
      setDeleting(null)
      refetch()
    } catch (err) {
      alert(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="font-display text-2xl text-maroon">Announcements</h2>
          <p className="font-body text-sm text-inkbrown/70">{data.length} pengumuman</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 font-display text-sm bg-maroon text-gold px-4 py-2.5 border-2 border-gold rounded hover:bg-gold hover:text-maroon transition-colors"
        >
          <Plus size={16} />
          Buat
        </button>
      </div>

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-inkbrown/10 rounded-md animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <p className="font-body text-sm text-maroon bg-maroon/10 border border-maroon/30 rounded px-3 py-2 mb-4">
          {error}
        </p>
      )}

      {!loading && data.length === 0 && (
        <div className="flex flex-col items-center text-center py-14 border-2 border-dashed border-inkbrown/20 rounded-md">
          <Megaphone size={32} className="text-inkbrown/30 mb-3" />
          <p className="font-body text-inkbrown/60">Belum ada pengumuman.</p>
          <p className="font-body text-sm text-inkbrown/40">Tekan "Buat" untuk mulai.</p>
        </div>
      )}

      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white/70 border border-inkbrown/15 rounded-md p-4 hover:border-gold/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span
                    className={`font-display text-xs px-2 py-0.5 rounded border ${
                      TYPE_BADGE[item.type] ?? TYPE_BADGE.info
                    }`}
                  >
                    {TYPE_LABEL[item.type] ?? item.type}
                  </span>
                  <span className="font-body text-xs text-inkbrown/50">
                    {formatDate(item.published_at)}
                  </span>
                </div>
                <p className="font-display text-inkbrown text-lg leading-snug mb-1">
                  {item.title}
                </p>
                <p className="font-body text-sm text-inkbrown/70 whitespace-pre-line line-clamp-3">
                  {item.content}
                </p>
              </div>

              <div className="flex gap-1 shrink-0">
                <button
                  onClick={() => openEdit(item)}
                  className="p-2.5 text-inkbrown/70 hover:text-maroon hover:bg-maroon/10 rounded transition-colors"
                  aria-label={`Edit ${item.title}`}
                >
                  <Pencil size={17} />
                </button>
                <button
                  onClick={() => setDeleting(item)}
                  className="p-2.5 text-inkbrown/70 hover:text-maroon hover:bg-maroon/10 rounded transition-colors"
                  aria-label={`Hapus ${item.title}`}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {formOpen && (
        <AnnouncementForm
          initial={editing}
          onCancel={() => {
            setFormOpen(false)
            setEditing(null)
          }}
          onSave={handleSave}
        />
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Hapus pengumuman?"
        message={`"${deleting?.title}" akan dihapus permanen.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
        busy={busy}
      />
    </div>
  )
}
