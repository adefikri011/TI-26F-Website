import { useState } from 'react'
import { Plus, Pencil, Trash2, CalendarDays, MapPin, User } from 'lucide-react'
import { useSchedule } from '../../hooks/useSchedule'
import { addSchedule, updateSchedule, deleteSchedule } from '../../services/scheduleService'
import { ScheduleForm } from '../../components/admin/ScheduleForm'
import { ConfirmDialog } from '../../components/admin/ConfirmDialog'

const DAY_BADGE = {
  Senin: 'bg-maroon/10 text-maroon border-maroon/30',
  Selasa: 'bg-gold/20 text-inkbrown border-gold/50',
  Rabu: 'bg-maroon/10 text-maroon border-maroon/30',
  Kamis: 'bg-gold/20 text-inkbrown border-gold/50',
  Jumat: 'bg-maroon/10 text-maroon border-maroon/30',
}

export function AdminSchedule() {
  const { data, loading, error, refetch } = useSchedule()
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
      await updateSchedule(editing.id, payload)
    } else {
      await addSchedule(payload)
    }
    setFormOpen(false)
    setEditing(null)
    refetch()
  }

  const handleDelete = async () => {
    if (!deleting) return
    setBusy(true)
    try {
      await deleteSchedule(deleting.id)
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
          <h2 className="font-display text-2xl text-maroon">Schedule</h2>
          <p className="font-body text-sm text-inkbrown/70">{data.length} mata kuliah</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 font-display text-sm bg-maroon text-gold px-4 py-2.5 border-2 border-gold rounded hover:bg-gold hover:text-maroon transition-colors"
        >
          <Plus size={16} />
          Tambah
        </button>
      </div>

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-inkbrown/10 rounded-md animate-pulse" />
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
          <CalendarDays size={32} className="text-inkbrown/30 mb-3" />
          <p className="font-body text-inkbrown/60">Jadwal masih kosong.</p>
          <p className="font-body text-sm text-inkbrown/40">Tekan "Tambah" untuk mengisi.</p>
        </div>
      )}

      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white/70 border border-inkbrown/15 rounded-md p-4 hover:border-gold/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span
                    className={`font-display text-xs px-2 py-0.5 rounded border ${
                      DAY_BADGE[item.day] ?? 'bg-inkbrown/10 text-inkbrown border-inkbrown/30'
                    }`}
                  >
                    {item.day}
                  </span>
                  <span className="font-body text-sm text-inkbrown/70">
                    {item.time_start} – {item.time_end}
                  </span>
                </div>
                <p className="font-display text-inkbrown text-lg leading-snug">
                  {item.subject}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                  {item.room && (
                    <span className="flex items-center gap-1 font-body text-sm text-inkbrown/60">
                      <MapPin size={13} />
                      {item.room}
                    </span>
                  )}
                  {item.lecturer && (
                    <span className="flex items-center gap-1 font-body text-sm text-inkbrown/60">
                      <User size={13} />
                      {item.lecturer}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-1 shrink-0">
                <button
                  onClick={() => openEdit(item)}
                  className="p-2.5 text-inkbrown/70 hover:text-maroon hover:bg-maroon/10 rounded transition-colors"
                  aria-label={`Edit ${item.subject}`}
                >
                  <Pencil size={17} />
                </button>
                <button
                  onClick={() => setDeleting(item)}
                  className="p-2.5 text-inkbrown/70 hover:text-maroon hover:bg-maroon/10 rounded transition-colors"
                  aria-label={`Hapus ${item.subject}`}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {formOpen && (
        <ScheduleForm
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
        title="Hapus jadwal?"
        message={`"${deleting?.subject}" (${deleting?.day}) akan dihapus permanen.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
        busy={busy}
      />
    </div>
  )
}
