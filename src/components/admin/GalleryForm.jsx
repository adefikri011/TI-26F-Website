import { useRef, useState } from 'react'
import { ImagePlus, X } from 'lucide-react'
import { uploadImage } from '../../services/uploadService'

const inputClass =
  'w-full px-3 py-2.5 bg-white/70 border border-inkbrown/25 rounded font-body text-inkbrown focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold'

export function GalleryForm({ onCancel, onSave }) {
  const [caption, setCaption] = useState('')
  const [photoDate, setPhotoDate] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
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
    if (!file) {
      setError('Foto wajib dipilih.')
      return
    }

    setSubmitting(true)
    try {
      const image_url = await uploadImage('gallery', file)
      await onSave({
        caption: caption.trim() || null,
        image_url,
        photo_date: photoDate || null,
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
          <h3 className="font-display text-maroon text-lg">Upload Foto</h3>
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
            className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gold/60 rounded-md py-8 hover:border-gold hover:bg-gold/5 transition-colors"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-52 object-cover rounded border-2 border-gold"
              />
            ) : (
              <>
                <ImagePlus size={28} className="text-gold" />
                <span className="font-body text-sm text-inkbrown/70">Pilih foto</span>
              </>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={pickFile}
            className="hidden"
          />

          <div>
            <label className="block font-body text-sm mb-1 text-inkbrown" htmlFor="g-caption">
              Caption (opsional)
            </label>
            <input
              id="g-caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Keterangan foto"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block font-body text-sm mb-1 text-inkbrown" htmlFor="g-date">
              Tanggal (opsional)
            </label>
            <input
              id="g-date"
              type="date"
              value={photoDate}
              onChange={(e) => setPhotoDate(e.target.value)}
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
              {submitting ? 'Mengunggah...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
