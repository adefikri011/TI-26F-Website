import { useState } from 'react'
import { Plus, Trash2, Images } from 'lucide-react'
import { useGallery } from '../../hooks/useGallery'
import { addGallery, deleteGallery } from '../../services/galleryService'
import { deleteImage } from '../../services/uploadService'
import { GalleryForm } from '../../components/admin/GalleryForm'
import { ConfirmDialog } from '../../components/admin/ConfirmDialog'

function formatDate(value) {
  if (!value) return null
  return new Date(value).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function AdminGallery() {
  const { data, loading, error, refetch } = useGallery()
  const [formOpen, setFormOpen] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [busy, setBusy] = useState(false)

  const handleSave = async (payload) => {
    await addGallery(payload)
    setFormOpen(false)
    refetch()
  }

  const handleDelete = async () => {
    if (!deleting) return
    setBusy(true)
    try {
      await deleteImage('gallery', deleting.image_url).catch(() => {})
      await deleteGallery(deleting.id)
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
          <h2 className="font-display text-2xl text-maroon">Gallery</h2>
          <p className="font-body text-sm text-inkbrown/70">{data.length} foto</p>
        </div>
        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center gap-1.5 font-display text-sm bg-maroon text-gold px-4 py-2.5 border-2 border-gold rounded hover:bg-gold hover:text-maroon transition-colors"
        >
          <Plus size={16} />
          Upload
        </button>
      </div>

      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-inkbrown/10 rounded-md animate-pulse" />
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
          <Images size={32} className="text-inkbrown/30 mb-3" />
          <p className="font-body text-inkbrown/60">Belum ada foto.</p>
          <p className="font-body text-sm text-inkbrown/40">Tekan "Upload" untuk mulai.</p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-square bg-inkbrown/10 border border-inkbrown/15 rounded-md overflow-hidden hover:border-gold/60 transition-colors"
          >
            <img
              src={item.image_url}
              alt={item.caption ?? 'Foto gallery'}
              className="w-full h-full object-cover"
              loading="lazy"
            />

            {(item.caption || item.photo_date) && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-2 pt-6">
                {item.caption && (
                  <p className="font-body text-xs text-white truncate">{item.caption}</p>
                )}
                {item.photo_date && (
                  <p className="font-body text-[10px] text-white/70">
                    {formatDate(item.photo_date)}
                  </p>
                )}
              </div>
            )}

            <button
              onClick={() => setDeleting(item)}
              className="absolute top-2 right-2 p-2 bg-black/55 text-white rounded-full hover:bg-maroon transition-colors"
              aria-label="Hapus foto"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>

      {formOpen && (
        <GalleryForm onCancel={() => setFormOpen(false)} onSave={handleSave} />
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Hapus foto?"
        message="Foto akan dihapus dari galeri dan storage."
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
        busy={busy}
      />
    </div>
  )
}
