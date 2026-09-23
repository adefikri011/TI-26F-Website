import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'
import OrnamentDivider from '../ui/OrnamentDivider'
import { useSchedule } from '../../hooks/useSchedule'

function SchedulePreview() {
  const { data: items, loading } = useSchedule()
  const preview = items.slice(0, 4)

  return (
    <section className="px-5 py-16 sm:py-20 bg-parchment border-t border-gold/25">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="font-body text-[11px] tracking-[0.25em] uppercase text-gold text-center mb-3">
            Marauder&rsquo;s Map
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-maroon text-center leading-snug">
            Jadwal Kuliah
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.12} className="mt-6 mb-10">
          <OrnamentDivider />
        </ScrollReveal>

        {loading && (
          <p className="font-body text-center text-inkbrown/60 text-sm">
            Menyusun peta…
          </p>
        )}

        {!loading && preview.length === 0 && (
          <ScrollReveal>
            <p className="font-body text-center text-inkbrown/70 text-sm max-w-md mx-auto leading-relaxed">
              Peta masih dilipat. Jadwal kuliah akan muncul setelah admin
              mengisinya.
            </p>
          </ScrollReveal>
        )}

        {!loading && preview.length > 0 && (
          <ul className="space-y-3">
            {preview.map((s, i) => (
              <ScrollReveal key={s.id} delay={Math.min(i * 0.07, 0.28)}>
                <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 bg-parchment border border-gold/50 rounded-sm px-4 py-3">
                  <span className="font-display text-xs text-maroon sm:w-20 shrink-0">
                    {s.day}
                  </span>
                  <span className="font-body text-sm text-inkbrown font-semibold flex-1">
                    {s.subject}
                  </span>
                  <span className="font-body text-xs text-inkbrown/70">
                    {s.time_start}–{s.time_end}
                    {s.room ? ` · ${s.room}` : ''}
                  </span>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        )}

        {!loading && items.length > 0 && (
          <ScrollReveal delay={0.2} className="mt-10 text-center">
            <Link
              to="/schedule"
              className="font-display text-sm text-maroon px-6 py-3 border-2 border-gold/60 hover:border-gold hover:bg-gold/10 transition-colors inline-block"
            >
              Lihat Peta Lengkap
            </Link>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
export default SchedulePreview
