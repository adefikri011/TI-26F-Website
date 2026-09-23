import { useRef, useState } from 'react'
import { ImagePlus, X } from 'lucide-react'
import { uploadImage, deleteImage } from '../../services/uploadService'

const inputClass =
  'w-full px-3 py-2.5 bg-white/70 border border-inkbrown/25 rounded font-body text-inkbrown focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold'

export function MemberForm({ initial, onCancel, onSave }) {
  const [name, setName] = useState(initial?.name ?? '')
  const [role, setRole] = useState(initial?.role ?? '')
  const [quote, setQuote] = useState(initial?.quote ?? '')
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(initial?.image_url ?? '')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  const pickFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!name.trim()) {
      setError('Nama wajib diisi.')
      return
    }
    if (!file && !preview) {
      setError('Foto wajib dipilih.')
      return
    }

    setSubmitting(true)
    try {
      let image_url = initial?.image_url ?? ''

      if (file) {
        if (image_url) {
          await deleteImage('members', image_url).catch(() => {})
        }
        image_url = await uploadImage('members', file)
      }

      await onSave({
        name: name.trim(),
        role: role.trim() || null,
        quote: quote.trim() || null,
        image_url,
        sort_order: Number(sortOrder) || 0,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center">
      <div className="w-full sm:max-w-lg bg-parchment border-t border-gold/40 sm:border-2 sm:border-gold/60 rounded-t-2xl sm:rounded-md max-h-[92vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-parchment flex items-center justify-between px-5 py-4 border-b border-inkbrown/15">
          <h3 className="font-display text-maroon text-lg">
            {initial ? 'Edit Member' : 'Tambah Member'}
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
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gold/60 rounded-md py-6 hover:border-gold hover:bg-gold/5 transition-colors"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full border-2 border-gold"
              />
            ) : (
              <ImagePlus size={28} className="text-gold" />
            )}
            <span className="font-body text-sm text-inkbrown/70">
              {preview ? 'Ganti foto' : 'Pilih foto'}
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={pickFile}
            className="hidden"
          />

          <div>
            <label className="block font-body text-sm mb-1 text-inkbrown" htmlFor="m-name">
              Nama *
            </label>
            <input
              id="m-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-body text-sm mb-1 text-inkbrown" htmlFor="m-role">
                Role
              </label>
              <input
                id="m-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Ketua, Anggota..."
                className={inputClass}
              />
            </div>
            <div>
              <label className="block font-body text-sm mb-1 text-inkbrown" htmlFor="m-sort">
                Urutan
              </label>
              <input
                id="m-sort"
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block font-body text-sm mb-1 text-inkbrown" htmlFor="m-quote">
              Quote (opsional)
            </label>
            <textarea
              id="m-quote"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              rows={2}
              className={inputClass}
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
