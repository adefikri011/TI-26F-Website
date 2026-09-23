import { motion, useReducedMotion } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import TornEdge from '../ui/TornEdge'
import InkUnderline from '../ui/InkUnderline'

const MOTES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 2 + Math.random() * 2.5,
  duration: 10 + Math.random() * 8,
  delay: Math.random() * 10,
}))

const PLEDGES = [
  {
    n: '01',
    title: 'Kode itu mantra',
    body: 'Satu baris yang benar bisa mengubah hasil akhir — kami menulisnya dengan sengaja, bukan asal jalan.',
  },
  {
    n: '02',
    title: 'Gagal itu latihan',
    body: 'Bug, deadline meleset, presentasi kacau: semuanya bagian dari buku teks yang belum selesai ditulis.',
  },
  {
    n: '03',
    title: 'Satu meja, satu asrama',
    body: 'Dikerjakan bareng lebih seru — dan lebih jarang tersesat di tengah tugas akhir.',
  },
]

const PILLARS = [
  {
    title: 'Belajar',
    body: 'Kuliah, praktikum, dan diskusi yang nyambung ke dunia kerja — bukan sekadar lulus ujian.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M8 14 L24 8 L40 14 L24 20 Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 18 V30 C12 34 18 38 24 38 C30 38 36 34 36 30 V18" stroke="currentColor" strokeWidth="1.6" />
        <path d="M40 14 V28" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Berkarya',
    body: 'Proyek, portofolio, dan karya yang siap dipajang — bukan cuma skrip yang hilang di laptop.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M14 34 L30 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M30 10 L36 8 L34 14 Z" fill="currentColor" opacity="0.85" />
        <path d="M10 38 H38" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M18 34 C16 30 14 28 14 24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      </svg>
    ),
  },
  {
    title: 'Bertumbuh',
    body: 'Dari orientasi sampai tugas akhir, tiap semester menambah satu bab baru di cerita kita.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 38 V22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M24 24 C18 24 14 20 14 14 C20 14 24 18 24 24 Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M24 28 C30 28 34 24 34 18 C28 18 24 22 24 28 Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M14 38 H34" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
]

function ChapterRule({ label }) {
  const reduced = useReducedMotion()
  return (
    <div className="flex items-center justify-center gap-4 max-w-md mx-auto" aria-hidden="true">
      <motion.span
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-px flex-1 origin-right bg-gradient-to-r from-transparent to-gold/70"
      />
      <span className="font-body text-[11px] tracking-[0.3em] uppercase text-gold">
        {label}
      </span>
      <motion.span
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-px flex-1 origin-left bg-gradient-to-l from-transparent to-gold/70"
      />
    </div>
  )
}

function CrestSeal() {
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28" aria-hidden="true">
      <circle cx="60" cy="60" r="54" fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity="0.45" />
      <circle cx="60" cy="60" r="46" fill="none" stroke="var(--color-maroon)" strokeWidth="1.5" opacity="0.35" />
      <path
        d="M60 28 L78 38 V58 C78 74 68 86 60 90 C52 86 42 74 42 58 V38 Z"
        fill="none"
        stroke="var(--color-maroon)"
        strokeWidth="1.8"
        opacity="0.7"
      />
      <path d="M52 58 H68 M60 50 V66" stroke="var(--color-gold)" strokeWidth="1.6" strokeLinecap="round" />
      <text
        x="60"
        y="108"
        textAnchor="middle"
        fontFamily="EB Garamond, serif"
        fontSize="9"
        letterSpacing="3"
        fill="var(--color-inkbrown)"
        opacity="0.55"
      >
        EST. MMXXVI
      </text>
    </svg>
  )
}

function AboutSection() {
  return (
    <section id="explore" className="relative bg-parchment overflow-hidden">
      <div className="absolute top-0 left-0 w-full -translate-y-full leading-none">
        <TornEdge />
      </div>

      {/* side hairlines — bingkai manuskrip */}
      <div
        aria-hidden="true"
        className="absolute inset-y-10 left-4 right-4 sm:left-8 sm:right-8 border-x border-gold/25 pointer-events-none"
      />

      {MOTES.map((m) => (
        <span
          key={m.id}
          className="ember-light"
          style={{
            left: `${m.left}%`,
            width: m.size,
            height: m.size,
            animationDuration: `${m.duration}s`,
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}

      <div className="relative px-6 sm:px-12 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto">
          {/* ——— kepala bab ——— */}
          <ScrollReveal>
            <ChapterRule label="Bab Satu" />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="font-body italic text-maroon/75 text-sm sm:text-base text-center mt-6 mb-2">
              dari mana semua ini bermula
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-maroon text-center leading-tight">
              Kelas kecil, sihir besar
            </h2>
            <InkUnderline className="mt-4" />
          </ScrollReveal>

          {/* ——— narasi + lembar janji ——— */}
          <div className="mt-12 sm:mt-16 grid md:grid-cols-12 gap-10 md:gap-12 items-start">
            <ScrollReveal delay={0.12} className="md:col-span-7">
              <p className="drop-cap font-body text-base sm:text-lg text-inkbrown/90 leading-[1.75]">
                TI26F bukan cuma daftar hadir kelas — itu asrama kecil tempat kami
                memperlakukan setiap tugas seperti kuis penyihir, setiap bug
                seperti kutukan yang harus dipecahkan, dan setiap teman sebangku
                seperti rekan seperjuangan.
              </p>
              <p className="font-body text-base sm:text-lg text-inkbrown/80 leading-[1.75] mt-5">
                Website ini kami bangun seperti buku tahunan Hogwarts: berisi
                jadwal yang rapi, wajah-foto penghuni, galeri kenangan, dan
                pengumuman yang dibaca sambil menunggu dosen datang. Sedikit
                sihir, banyak kerja nyata.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <span className="h-px w-12 bg-gold/60" aria-hidden="true" />
                <p className="font-body italic text-sm text-inkbrown/65">
                  Ditulis dengan kopi dingin &amp; syntax highlighter.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.22} className="md:col-span-5">
              <div className="relative bg-[#ebe0c2]/70 border border-gold/50 px-5 sm:px-6 py-7 sm:py-8">
                {/* sudut lipatan */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 right-0 w-6 h-6 bg-parchment border-b border-l border-gold/40"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
                />
                <span
                  aria-hidden="true"
                  className="absolute top-0 right-0 w-6 h-6"
                  style={{
                    background:
                      'linear-gradient(225deg, #0a0908 0%, #0a0908 50%, transparent 50%)',
                    opacity: 0.12,
                  }}
                />

                <p className="font-body text-[11px] tracking-[0.28em] uppercase text-gold mb-4">
                  Lembar Janji Asrama
                </p>

                <ul className="space-y-5">
                  {PLEDGES.map((p, i) => (
                    <motion.li
                      key={p.n}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ delay: 0.25 + i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1"
                    >
                      <span className="font-display text-maroon/70 text-sm leading-6">
                        {p.n}
                      </span>
                      <div>
                        <p className="font-display text-inkbrown text-[15px] leading-6">
                          {p.title}
                        </p>
                        <p className="font-body text-inkbrown/75 text-sm leading-relaxed mt-1">
                          {p.body}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-7 pt-5 border-t border-gold/35 flex items-center justify-between gap-3">
                  <p className="font-body italic text-[12px] text-inkbrown/60 leading-snug">
                    Tanda tangan boleh diwakili
                    <br />
                    e-meeting jam 9 malam.
                  </p>
                  <CrestSeal />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ——— tiga pilar terbuka (bukan kartu) ——— */}
          <ScrollReveal delay={0.1} className="mt-16 sm:mt-20">
            <div className="flex items-center gap-4 max-w-xs mx-auto sm:mx-0" aria-hidden="true">
              <span className="h-px flex-1 bg-gold/40" />
              <span className="font-body text-[11px] tracking-[0.25em] uppercase text-gold">
                Tiga Pilar
              </span>
              <span className="h-px flex-1 bg-gold/40" />
            </div>
          </ScrollReveal>

          <div className="mt-8 grid sm:grid-cols-3 gap-x-8 gap-y-10">
            {PILLARS.map((p, i) => (
              <ScrollReveal key={p.title} delay={0.12 + i * 0.1}>
                <div className="group h-full">
                  <div className="text-maroon w-11 h-11 mb-4 transition-transform duration-300 group-hover:-translate-y-0.5">
                    {p.icon}
                  </div>
                  <div className="h-px w-10 bg-gold/70 mb-3" aria-hidden="true" />
                  <h3 className="font-display text-xl text-inkbrown mb-2">{p.title}</h3>
                  <p className="font-body text-sm sm:text-[15px] text-inkbrown/75 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* ——— pita kutipan ——— */}
          <ScrollReveal delay={0.15} className="mt-16 sm:mt-20">
            <figure className="relative bg-inkbrown text-parchment px-6 sm:px-10 py-10 sm:py-12 overflow-hidden">
              <span
                aria-hidden="true"
                className="absolute inset-2 border border-gold/30 pointer-events-none"
              />
              <span
                aria-hidden="true"
                className="absolute top-2 left-4 font-display text-6xl text-gold/25 leading-none select-none"
              >
                &ldquo;
              </span>
              <blockquote className="relative max-w-2xl mx-auto text-center">
                <p className="font-body italic text-lg sm:text-xl md:text-2xl leading-relaxed text-parchment/95">
                  It is our choices that show what we truly are, far more than
                  our abilities.
                </p>
                <figcaption className="mt-4 font-body text-sm text-gold tracking-wide">
                  — Albus Dumbledore
                </figcaption>
              </blockquote>
            </figure>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
export default AboutSection
