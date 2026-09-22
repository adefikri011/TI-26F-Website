import { useState } from 'react'
import { Plus, Pencil, Trash2, Users } from 'lucide-react'
import { useMembers } from '../../hooks/useMembers'
import { addMember, updateMember, deleteMember } from '../../services/membersService'
import { deleteImage } from '../../services/uploadService'
import { MemberForm } from '../../components/admin/MemberForm'
import { ConfirmDialog } from '../../components/admin/ConfirmDialog'

export function AdminMembers() {
  const { data, loading, error, refetch } = useMembers()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [busy, setBusy] = useState(false)

  const openAdd = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (member) => {
    setEditing(member)
    setFormOpen(true)
  }

  const handleSave = async (payload) => {
    if (editing) {
      await updateMember(editing.id, payload)
    } else {
      await addMember(payload)
    }
    setFormOpen(false)
    setEditing(null)
    refetch()
  }

  const handleDelete = async () => {
    if (!deleting) return
    setBusy(true)
    try {
      if (deleting.image_url) {
        await deleteImage('members', deleting.image_url).catch(() => {})
      }
      await deleteMember(deleting.id)
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
          <h2 className="font-display text-2xl text-maroon">Members</h2>
          <p className="font-body text-sm text-inkbrown/70">
            {data.length} anggota terdaftar
          </p>
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
            <div key={i} className="h-20 bg-inkbrown/10 rounded-md animate-pulse" />
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
          <Users size={32} className="text-inkbrown/30 mb-3" />
          <p className="font-body text-inkbrown/60">Belum ada member.</p>
          <p className="font-body text-sm text-inkbrown/40">Tekan "Tambah" untuk mulai.</p>
        </div>
      )}

      <div className="space-y-3">
        {data.map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-3 bg-white/70 border border-inkbrown/15 rounded-md p-3 hover:border-gold/50 transition-colors"
          >
            {m.image_url ? (
              <img
                src={m.image_url}
                alt={m.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-gold shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-inkbrown/10 border-2 border-gold/40 shrink-0" />
            )}

            <div className="flex-1 min-w-0">
              <p className="font-display text-inkbrown truncate">{m.name}</p>
              <p className="font-body text-sm text-inkbrown/60 truncate">
                {m.role || 'Anggota'}
                {m.quote ? ` — "${m.quote}"` : ''}
              </p>
            </div>

            <div className="flex gap-1 shrink-0">
              <button
                onClick={() => openEdit(m)}
                className="p-2.5 text-inkbrown/70 hover:text-maroon hover:bg-maroon/10 rounded transition-colors"
                aria-label={`Edit ${m.name}`}
              >
                <Pencil size={17} />
              </button>
              <button
                onClick={() => setDeleting(m)}
                className="p-2.5 text-inkbrown/70 hover:text-maroon hover:bg-maroon/10 rounded transition-colors"
                aria-label={`Hapus ${m.name}`}
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {formOpen && (
        <MemberForm
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
        title="Hapus member?"
        message={`"${deleting?.name}" akan dihapus permanen.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
        busy={busy}
      />
    </div>
  )
}
