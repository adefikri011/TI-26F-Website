import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'
import OrnamentDivider from '../ui/OrnamentDivider'
import GoldFrame from '../ui/GoldFrame'
import { useMembers } from '../../hooks/useMembers'

function MembersPreview() {
  const { data: members, loading } = useMembers()
  const preview = members.slice(0, 8)

  return (
    <section className="px-5 py-16 sm:py-20 bg-parchment border-t border-gold/25">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="font-body text-[11px] tracking-[0.25em] uppercase text-gold text-center mb-3">
            The Homes
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-maroon text-center leading-snug">
            Penghuni Asrama
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.12} className="mt-6 mb-10">
          <OrnamentDivider />
        </ScrollReveal>

        {loading && (
          <p className="font-body text-center text-inkbrown/60 text-sm">
            Memanggil para penghuni…
          </p>
        )}

        {!loading && preview.length === 0 && (
          <ScrollReveal>
            <p className="font-body text-center text-inkbrown/70 text-sm max-w-md mx-auto leading-relaxed">
              Belum ada foto yang dipajang di dinding asrama. Admin akan segera
              mengunggahnya.
            </p>
          </ScrollReveal>
        )}

        {!loading && preview.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {preview.map((m, i) => (
              <ScrollReveal key={m.id} delay={Math.min(i * 0.06, 0.36)}>
                <GoldFrame image={m.image_url} name={m.name} />
                {m.role && (
                  <p className="font-body text-[11px] text-inkbrown/60 text-center mt-1.5">
                    {m.role}
                  </p>
                )}
              </ScrollReveal>
            ))}
          </div>
        )}

        {!loading && members.length > 0 && (
          <ScrollReveal delay={0.2} className="mt-10 text-center">
            <Link
              to="/members"
              className="font-display text-sm text-maroon px-6 py-3 border-2 border-gold/60 hover:border-gold hover:bg-gold/10 transition-colors inline-block"
            >
              Lihat Semua Penghuni
            </Link>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
export default MembersPreview
