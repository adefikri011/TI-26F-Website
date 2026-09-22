export function ConfirmDialog({ open, title, message, onConfirm, onCancel, busy }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full sm:max-w-sm bg-parchment border-t-4 sm:border-4 border-gold rounded-t-xl sm:rounded-md p-5 shadow-2xl">
        <h3 className="font-display text-maroon text-lg mb-2">{title}</h3>
        <p className="font-body text-inkbrown/80 text-sm mb-5">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={busy}
            className="flex-1 font-body py-2.5 border-2 border-inkbrown/30 rounded text-inkbrown hover:bg-inkbrown/10 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={busy}
            className="flex-1 font-body py-2.5 bg-maroon text-gold border-2 border-maroon rounded hover:bg-maroon/90 transition-colors disabled:opacity-60"
          >
            {busy ? 'Menghapus...' : 'Hapus'}
          </button>
        </div>
      </div>
    </div>
  )
}
