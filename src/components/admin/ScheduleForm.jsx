import { useState } from 'react'
import { X } from 'lucide-react'

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

const inputClass =
  'w-full px-3 py-2.5 bg-white/70 border border-inkbrown/25 rounded font-body text-inkbrown focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold'

export function ScheduleForm({ initial, onCancel, onSave }) {
  const [day, setDay] = useState(initial?.day ?? 'Senin')
  const [subject, setSubject] = useState(initial?.subject ?? '')
  const [timeStart, setTimeStart] = useState(initial?.time_start ?? '08:00')
  const [timeEnd, setTimeEnd] = useState(initial?.time_end ?? '10:00')
  const [room, setRoom] = useState(initial?.room ?? '')
  const [lecturer, setLecturer] = useState(initial?.lecturer ?? '')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!subject.trim()) {
      setError('Mata kuliah wajib diisi.')
      return
    }

    setSubmitting(true)
    try {
      await onSave({
        day,
        subject: subject.trim(),
        time_start: timeStart,
        time_end: timeEnd,
        room: room.trim() || null,
        lecturer: lecturer.trim() || null,
        sort_order: initial?.sort_order ?? 0,
      })
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center">
      <div className="w-full sm:max-w-lg bg-parchment border-t border-gold/40 sm:border-2 sm:border-gold/60 rounded-t-2xl sm:rounded-md max-h-[92vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-parchment flex items-center justify-between px-5 py-4 border-b border-inkbrown/15">
          <h3 className="font-display text-maroon text-lg">
            {initial ? 'Edit Jadwal' : 'Tambah Jadwal'}
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
            <label className="block font-body text-sm mb-1 text-inkbrown" htmlFor="s-day">
              Hari
            </label>
            <select
              id="s-day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className={inputClass}
            >
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-body text-sm mb-1 text-inkbrown" htmlFor="s-subject">
              Mata Kuliah *
            </label>
            <input
              id="s-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-body text-sm mb-1 text-inkbrown" htmlFor="s-start">
                Mulai
              </label>
              <input
                id="s-start"
                type="time"
                value={timeStart}
                onChange={(e) => setTimeStart(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block font-body text-sm mb-1 text-inkbrown" htmlFor="s-end">
                Selesai
              </label>
              <input
                id="s-end"
                type="time"
                value={timeEnd}
                onChange={(e) => setTimeEnd(e.target.value)}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-body text-sm mb-1 text-inkbrown" htmlFor="s-room">
                Ruangan
              </label>
              <input
                id="s-room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Ruang 301"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block font-body text-sm mb-1 text-inkbrown" htmlFor="s-lecturer">
                Dosen
              </label>
              <input
                id="s-lecturer"
                value={lecturer}
                onChange={(e) => setLecturer(e.target.value)}
                className={inputClass}
              />
            </div>
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
