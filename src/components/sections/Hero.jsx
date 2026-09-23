import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import MagicParticles from '../ui/MagicParticles'
import OrnamentDivider from '../ui/OrnamentDivider'

const STARS = Array.from({ length: 48 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 55,
  size: Math.random() < 0.75 ? 1.5 : 2.5,
  dur: 2.5 + Math.random() * 4,
  delay: Math.random() * 5,
  peak: 0.35 + Math.random() * 0.55,
}))

const EMBERS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 2 + Math.random() * 3,
  duration: 10 + Math.random() * 10,
  delay: Math.random() * 12,
}))

function CastleSilhouette() {
  return (
    <motion.svg
      viewBox="0 0 1440 280"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-x-0 bottom-0 w-full h-[28vh] min-h-[160px] max-h-[280px] pointer-events-none"
      aria-hidden="true"
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <linearGradient id="castleFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#12100C" />
          <stop offset="100%" stopColor="#070605" />
        </linearGradient>
        <linearGradient id="windowGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0D78C" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      <path
        fill="url(#castleFill)"
        d="
          M0 280 V190
          H40 V150 H55 V110 L70 95 L85 110 V150 H100
          V170 H130 V130 H145 V80 L160 60 L175 80 V130 H190
          V160 H230 V200 H260 V140 L275 120 L290 140 V175 H310
          V100 H325 V55 L345 30 L365 55 V100 H380
          V145 H420 V185 H450 V160 H470 V120 L490 100 L510 120 V160 H540
          V210 H600 V175 H620 V140 L640 115 L660 140 V175 H690
          V125 H710 V70 L735 40 L760 70 V125 H780
          V165 H830 V200 H870 V170 H900 V130 L925 105 L950 130 V170 H980
          V210 H1030 V185 H1060 V145 L1080 125 L1100 145 V185 H1140
          V160 H1170 V115 L1195 88 L1220 115 V160 H1250
          V195 H1290 V170 H1320 V140 L1340 120 L1360 140 V170 H1440
          V280 Z
        "
      />
      <path
        fill="#0A0908"
        opacity="0.85"
        d="M0 280 V230 Q360 210 720 235 T1440 228 V280 Z"
      />
      {/* jendela menyala */}
      <g className="castle-windows">
        <rect x="340" y="70" width="6" height="10" fill="url(#windowGlow)" opacity="0.7" />
        <rect x="728" y="55" width="6" height="10" fill="url(#windowGlow)" opacity="0.55" />
        <rect x="154" y="95" width="5" height="8" fill="url(#windowGlow)" opacity="0.6" />
        <rect x="1190" y="105" width="5" height="8" fill="url(#windowGlow)" opacity="0.5" />
        <rect x="485" y="115" width="5" height="8" fill="url(#windowGlow)" opacity="0.65" />
        <rect x="920" y="120" width="5" height="8" fill="url(#windowGlow)" opacity="0.45" />
      </g>
    </motion.svg>
  )
}

function WordReveal({ text, className, delayBase = 0 }) {
  const reduced = useReducedMotion()
  const words = text.split(' ')

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-1 -mb-1 align-bottom">
          <motion.span
            className="inline-block"
            aria-hidden="true"
            initial={reduced ? false : { y: '115%', opacity: 0, rotate: 2 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{
              duration: 0.95,
              delay: delayBase + i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function Hero() {
  const reduced = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const sx = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), {
    stiffness: 60,
    damping: 18,
  })
  const sy = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), {
    stiffness: 60,
    damping: 18,
  })
  const moonX = useSpring(useTransform(mouseX, [-0.5, 0.5], [10, -10]), {
    stiffness: 50,
    damping: 20,
  })
  const moonY = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 50,
    damping: 20,
  })

  function handlePointerMove(e) {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(nx)
    mouseY.set(ny)
  }

  function handlePointerLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  const rise = (delay) => ({
    initial: reduced ? false : { opacity: 0, y: 22, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section
      className="relative min-h-svh flex flex-col items-center justify-center text-center px-5 pt-24 pb-20 overflow-hidden night-bg"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* stars — parallax halus */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={reduced ? undefined : { x: sx, y: sy }}
      >
        {STARS.map((s) => (
          <span
            key={s.id}
            className="star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              '--dur': `${s.dur}s`,
              '--delay': `${s.delay}s`,
              '--peak': s.peak,
            }}
          />
        ))}
      </motion.div>

      {/* moon — napas + parallax berlawanan */}
      <motion.div
        className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full pointer-events-none moon-breathe"
        style={{
          left: '72%',
          top: '12%',
          background:
            'radial-gradient(circle at 38% 38%, rgba(241,229,200,0.95) 0%, rgba(212,175,55,0.35) 42%, transparent 70%)',
          boxShadow:
            '0 0 60px 20px rgba(212,175,55,0.12), 0 0 120px 40px rgba(241,229,200,0.06)',
          ...(reduced ? {} : { x: moonX, y: moonY }),
        }}
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <MagicParticles count={22} />

      {!reduced &&
        EMBERS.map((e) => (
          <span
            key={e.id}
            className="ember"
            style={{
              left: `${e.left}%`,
              width: e.size,
              height: e.size,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`,
            }}
          />
        ))}

      <div className="mist mist-a" aria-hidden="true" />
      <div className="mist mist-b" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl">
        <motion.p
          {...rise(0.15)}
          className="font-body text-[11px] sm:text-xs tracking-[0.35em] uppercase text-gold/75 mb-5 eyebrow-in"
        >
          Teknik Informatika &middot; Angkatan 26F
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[280px] sm:max-w-xs mb-4 origin-center"
        >
          <OrnamentDivider animate />
        </motion.div>

        <h1 className="font-display leading-[1.05] text-gold">
          <WordReveal
            text="Our Little"
            className="block text-[13vw] sm:text-6xl md:text-7xl"
            delayBase={0.4}
          />
          <span className="block mt-1 relative">
            <WordReveal
              text="Hogwarts"
              className="hero-glow text-[16vw] sm:text-7xl md:text-8xl hero-shimmer"
              delayBase={0.58}
            />
          </span>
        </h1>

        <motion.p
          {...rise(0.95)}
          className="font-body italic text-parchment/80 text-base sm:text-lg md:text-xl leading-relaxed mt-6 max-w-xl"
        >
          Where codes become spells, deadlines become quests,
          <br className="hidden sm:block" /> and every lesson is a little magic.
        </motion.p>

        <motion.div
          {...rise(1.1)}
          className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
        >
          <a href="#explore" className="btn-spell btn-spell--solid font-display text-sm tracking-wide text-center px-8 py-3.5">
            Masuk Aula Besar
          </a>
          <Link to="/announcements" className="btn-spell btn-spell--ghost font-display text-sm tracking-wide text-center px-8 py-3.5">
            Daily Prophet
          </Link>
        </motion.div>
      </div>

      <motion.a
        href="#explore"
        initial={reduced ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-gold/60 hover:text-gold transition-colors scroll-hint"
        aria-label="Scroll ke bawah"
      >
        <span className="font-body text-[11px] tracking-[0.25em] uppercase">Scroll</span>
        <ChevronDown size={16} className="scroll-nudge" />
      </motion.a>

      <CastleSilhouette />
    </section>
  )
}
export default Hero
