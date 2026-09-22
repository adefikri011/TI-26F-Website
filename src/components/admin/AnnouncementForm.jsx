import { useState } from 'react'
import { X } from 'lucide-react'

const TYPES = [
  { value: 'info', label: 'Info' },
  { value: 'urgent', label: 'Penting' },
  { value: 'event', label: 'Acara' },
]

const inputClass =
  'w-full px-3 py-2.5 bg-white/70 border border-inkbrown/25 rounded font-body text-inkbrown focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold'

export function AnnouncementForm({ initial, onCancel, onSave }) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [content, setContent] = useState(initial?.content ?? '')
  const [type, setType] = useState(initial?.type ?? 'info')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!title.trim() || !content.trim()) {
      setError('Judul dan isi pengumuman wajib diisi.')
      return
    }

    setSubmitting(true)
    try {
      await onSave({
        title: title.trim(),
        content: content.trim(),
        type,
      })
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center">
      <div className="w-full sm:max-w-lg bg-parchment border-t-4 sm:border-4 border-gold rounded-t-2xl sm:rounded-md max-h-[92vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-parchment flex items-center justify-between px-5 py-4 border-b border-inkbrown/15">
          <h3 className="font-display text-maroon text-lg">
            {initial ? 'Edit Pengumuman' : 'Buat Pengumuman'}
          </h3>
          <button
            onClick={onCancel}
            className="p-2 -mr-2 text-inkbrown hover:text-maroon"
            aria-label="Tutup"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block font-body text-sm mb-1 text-inkbrown" htmlFor="a-type">
              Tipe
            </label>
            <select
              id="a-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={inputClass}
            >
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-body text-sm mb-1 text-inkbrown" htmlFor="a-title">
              Judul *
            </label>
            <input
              id="a-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block font-body text-sm mb-1 text-inkbrown" htmlFor="a-content">
              Isi Pengumuman *
            </label>
            <textarea
              id="a-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className={inputClass}
              required
            />
          </div>

          {error && (
            <p className="font-body text-sm text-maroon bg-maroon/10 border border-maroon/30 rounded px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="flex-1 font-body py-3 border-2 border-inkbrown/30 rounded text-inkbrown hover:bg-inkbrown/10 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 font-display py-3 bg-maroon text-gold border-2 border-gold rounded hover:bg-gold hover:text-maroon transition-colors disabled:opacity-60"
            >
              {submitting ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
