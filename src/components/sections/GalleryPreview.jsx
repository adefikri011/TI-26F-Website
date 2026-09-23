import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'
import OrnamentDivider from '../ui/OrnamentDivider'
import { useGallery } from '../../hooks/useGallery'

function GalleryPreview() {
  const { data: photos, loading } = useGallery()
  const preview = photos.slice(0, 6)

  return (
    <section className="px-5 py-16 sm:py-20 bg-inkbrown">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="font-body text-[11px] tracking-[0.25em] uppercase text-gold/80 text-center mb-3">
            The Pensieve
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-gold text-center leading-snug">
            Galeri Kenangan
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.12} className="mt-6 mb-10">
          <OrnamentDivider />
        </ScrollReveal>

        {loading && (
          <p className="font-body text-center text-parchment/60 text-sm">
            Membuka pensieve…
          </p>
        )}

        {!loading && preview.length === 0 && (
          <ScrollReveal>
            <p className="font-body text-center text-parchment/70 text-sm max-w-md mx-auto leading-relaxed">
              Pensieve masih kosong. Foto-foto seru kelas akan muncul di sini
              setelah diunggah.
            </p>
          </ScrollReveal>
        )}

        {!loading && preview.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {preview.map((p, i) => (
              <ScrollReveal key={p.id} delay={Math.min(i * 0.06, 0.3)}>
                <figure className="group relative overflow-hidden rounded-sm border border-gold/40 bg-inkbrown/60">
                  <img
                    src={p.image_url}
                    alt={p.caption || 'Kenangan kelas TI26F'}
                    loading="lazy"
                    className="w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {p.caption && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-inkbrown/90 to-transparent px-3 pt-8 pb-2 font-body text-[11px] text-parchment/90">
                      {p.caption}
                    </figcaption>
                  )}
                </figure>
              </ScrollReveal>
            ))}
          </div>
        )}

        {!loading && photos.length > 0 && (
          <ScrollReveal delay={0.2} className="mt-10 text-center">
            <Link
              to="/gallery"
              className="font-display text-sm text-gold px-6 py-3 border-2 border-gold/50 hover:border-gold hover:bg-gold/10 transition-colors inline-block"
            >
              Buka Pensieve Lengkap
            </Link>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
export default GalleryPreview
