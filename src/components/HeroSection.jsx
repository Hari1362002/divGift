import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { HERO_IMAGE } from '../data/assets';

const PETALS = ['🌸', '✨', '🌷', '💫', '🌺'];

const SURPRISES = [
  { id: 1,  label: 'Photo Story',       icon: '📷', grad: ['#fda4af', '#f9a8d4'] },
  { id: 2,  label: 'Memory Gallery',    icon: '🌸', grad: ['#c4b5fd', '#e9d5ff'] },
  { id: 3,  label: 'Portrait Showcase', icon: '🪷', grad: ['#fda4af', '#fbcfe8'] },
  { id: 4,  label: 'Video Surprise',    icon: '🎬', grad: ['#6ee7b7', '#a7f3d0'] },
  { id: 5,  label: 'Video Surprise',    icon: '🎥', grad: ['#93c5fd', '#bfdbfe'] },
  { id: 6,  label: 'Video Surprise',    icon: '🎞️', grad: ['#fcd34d', '#fde68a'] },
  { id: 7,  label: 'Video Surprise',    icon: '📹', grad: ['#f9a8d4', '#c4b5fd'] },
  { id: 8,  label: 'Voice Message',     icon: '🎤', grad: ['#fda4af', '#fecdd3'] },
  { id: 9,  label: 'Secret Gift',       icon: '🎁', grad: ['#c4b5fd', '#ddd6fe'] },
  { id: 10, label: 'Final Ending',      icon: '🎂', grad: ['#f9a8d4', '#fda4af'] },
];

export default function HeroSection({ onSurpriseSelect }) {
  const particlesRef = useRef(null);

  useEffect(() => {
    particlesRef.current?.querySelectorAll('.petal').forEach(el => {
      gsap.to(el, {
        y: `random(-20, 20)`,
        x: `random(-12, 12)`,
        rotation: `random(-22, 22)`,
        duration: `random(3, 7)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 4,
      });
    });
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #fff0f6 0%, #fce7f3 35%, #f5f0ff 70%, #fff0f6 100%)' }}
    >

      {/* ══ BLURRED PHOTO BACKGROUND ══ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{
            objectPosition: 'center 18%',
            filter: 'blur(40px) brightness(1.08) saturate(0.55)',
            transform: 'scale(1.22)',
          }}
        />
        {/* Pastel wash */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(170deg, rgba(255,240,250,0.82) 0%, rgba(245,235,255,0.78) 50%, rgba(255,240,250,0.85) 100%)',
        }} />
        {/* Bottom mist */}
        <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none" style={{
          background: 'linear-gradient(to top, #fff0f6 0%, rgba(255,240,246,0.6) 50%, transparent 100%)',
        }} />
      </div>

      {/* ══ LIGHT LEAK — top-left warm sun flare ══ */}
      <div className="absolute pointer-events-none" style={{
        top: '-80px', left: '-60px',
        width: '420px', height: '420px', borderRadius: '50%',
        background: 'radial-gradient(ellipse at 32% 32%, rgba(255,215,235,0.92) 0%, rgba(255,180,215,0.55) 30%, rgba(235,195,255,0.25) 60%, transparent 100%)',
        filter: 'blur(22px)',
        animation: 'lightLeak 9s ease-in-out infinite',
        zIndex: 1,
      }} />
      {/* Lavender secondary orb */}
      <div className="absolute pointer-events-none" style={{
        top: '-20px', left: '20px',
        width: '220px', height: '220px', borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(210,190,255,0.65) 0%, rgba(190,170,255,0.28) 55%, transparent 100%)',
        filter: 'blur(26px)',
        animation: 'lightLeakB 13s ease-in-out infinite',
        animationDelay: '2.5s',
        zIndex: 1,
      }} />
      {/* Thin warm streak */}
      <div className="absolute pointer-events-none" style={{
        top: '30px', left: '-30px',
        width: '300px', height: '55px', borderRadius: '50%',
        background: 'linear-gradient(108deg, rgba(255,225,240,0.72) 0%, rgba(255,205,230,0.38) 55%, transparent 100%)',
        filter: 'blur(12px)',
        transform: 'rotate(-16deg)',
        animation: 'lightLeak 11s ease-in-out infinite',
        animationDelay: '1.8s',
        zIndex: 1,
      }} />

      {/* ══ FLOATING PARTICLES ══ */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        {[...Array(22)].map((_, i) => (
          <div key={i} className="petal absolute select-none" style={{
            left: `${(i * 4.7) % 100}%`,
            top: `${(i * 9.1) % 100}%`,
            fontSize: `${8 + (i % 5) * 3}px`,
            opacity: 0.22,
          }}>
            {PETALS[i % PETALS.length]}
          </div>
        ))}
      </div>

      {/* ══ RISING PETALS ══ */}
      {[...Array(7)].map((_, i) => (
        <div key={i} className="absolute pointer-events-none select-none" style={{
          left: `${6 + i * 14}%`,
          bottom: 0,
          fontSize: `${11 + (i % 3) * 5}px`,
          animation: `floatUp ${8 + i * 1.4}s ease-in-out ${i * 1.1}s infinite`,
          opacity: 0.28,
          zIndex: 2,
        }}>
          🌸
        </div>
      ))}

      {/* ══ MAIN CONTENT ══ */}
      <div className="relative flex flex-col items-center w-full px-5 pt-10 pb-8" style={{ zIndex: 10 }}>

        {/* ── SECTION 1: PREMIUM HEADING ── */}
        <motion.div
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center w-full max-w-[340px] mb-5"
        >
          {/* Floating sparkle crown */}
          <div className="flex items-center justify-center gap-2 mb-2">
            {['✨', '🌸', '💕', '🌸', '✨'].map((e, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -6, 0], opacity: [0.55, 1, 0.55] }}
                transition={{ repeat: Infinity, duration: 2 + i * 0.35, delay: i * 0.22 }}
                className="select-none"
                style={{ fontSize: '0.88rem', filter: 'drop-shadow(0 2px 5px rgba(249,168,212,0.6))' }}
              >
                {e}
              </motion.span>
            ))}
          </div>

          {/* Eyebrow — Cormorant italic */}
          <p className="font-cormorant italic mb-1" style={{
            fontSize: 'clamp(0.82rem, 2.8vw, 0.96rem)',
            color: '#b06090',
            fontWeight: 300,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>
            A Day Made For You
          </p>

          {/* HAPPY BIRTHDAY — Great Vibes, large, shimmer gradient */}
          <h1
            className="font-great-vibes leading-[1.05]"
            style={{
              fontSize: 'clamp(2.8rem, 11vw, 4.4rem)',
              background: 'linear-gradient(120deg, #c2185b 0%, #9c27b0 40%, #7c3aed 65%, #c2185b 100%)',
              backgroundSize: '300% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmerSweep 4s linear infinite',
              filter: 'drop-shadow(0 3px 16px rgba(194,24,91,0.24))',
            }}
          >
            Happy Birthday
          </h1>

          {/* MY DEAR SISTER — Cinzel, spaced caps */}
          <p
            className="font-cinzel font-semibold mt-1"
            style={{
              fontSize: 'clamp(0.78rem, 3.2vw, 1.05rem)',
              background: 'linear-gradient(135deg, #9333ea, #be185d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.22em',
              filter: 'drop-shadow(0 1px 8px rgba(147,51,234,0.20))',
            }}
          >
            MY DEAR SISTER ❤️
          </p>

          {/* Pulsing hearts */}
          <div className="flex items-center justify-center gap-2 mt-2">
            {['💖', '✨', '💖'].map((e, i) => (
              <motion.span
                key={i}
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ repeat: Infinity, duration: 1.9 + i * 0.45, delay: i * 0.38 }}
                className="select-none"
                style={{ fontSize: '0.82rem' }}
              >
                {e}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── SECTION 2: PORTRAIT FRAME ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.91, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="animate-portrait-float relative"
          style={{ width: '80vw', maxWidth: '310px' }}
        >
          {/* Breathing glow halo */}
          <div
            className="absolute pointer-events-none animate-glow-breathe"
            style={{
              inset: '-22px',
              borderRadius: '46px',
              background: 'radial-gradient(ellipse at 50% 42%, rgba(249,168,212,0.42) 0%, rgba(192,132,252,0.22) 50%, transparent 100%)',
              filter: 'blur(18px)',
            }}
          />

          {/* Gradient border ring */}
          <div className="absolute pointer-events-none" style={{
            inset: '-2.5px',
            borderRadius: '30px',
            background: 'linear-gradient(145deg, rgba(249,168,212,0.85), rgba(255,255,255,0.96), rgba(192,132,252,0.65), rgba(255,255,255,0.92), rgba(249,168,212,0.70))',
          }} />

          {/* Frame shell */}
          <div className="relative overflow-hidden" style={{
            borderRadius: '28px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.13), 0 8px 32px rgba(249,168,212,0.28), inset 0 1px 0 rgba(255,255,255,0.95)',
          }}>
            {/* Slow-zoom image */}
            <div className="overflow-hidden" style={{ borderRadius: '28px' }}>
              <img
                src={HERO_IMAGE}
                alt="Birthday portrait"
                className="animate-slow-zoom"
                style={{
                  width: '100%',
                  height: '54vh',
                  maxHeight: '440px',
                  minHeight: '260px',
                  objectFit: 'cover',
                  objectPosition: 'center 16%',
                  display: 'block',
                  transformOrigin: 'center center',
                }}
              />
            </div>

            {/* Inner bottom mist fade */}
            <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{
              height: '90px',
              background: 'linear-gradient(to top, rgba(255,240,250,0.65) 0%, rgba(255,240,250,0.20) 60%, transparent 100%)',
            }} />

            {/* Inner top soft fade */}
            <div className="absolute top-0 left-0 w-full pointer-events-none" style={{
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(255,248,252,0.30) 0%, transparent 100%)',
            }} />
          </div>
        </motion.div>

        {/* ── SECTION 3: SURPRISE GRID ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 w-full max-w-[360px]"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-14 rounded-full" style={{ background: 'linear-gradient(to right, transparent, rgba(249,168,212,0.55))' }} />
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: 'rgba(249,168,212,0.72)', boxShadow: '0 0 16px rgba(249,168,212,0.65)' }}
            />
            <div className="h-px w-14 rounded-full" style={{ background: 'linear-gradient(to left, transparent, rgba(192,132,252,0.55))' }} />
          </div>

          <div className="grid grid-cols-5 gap-3">
            {SURPRISES.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, scale: 0.76, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 1.32 + i * 0.06,
                  duration: 0.58,
                  type: 'spring',
                  stiffness: 220,
                  damping: 19,
                }}
                whileHover={{ y: -6, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onSurpriseSelect(s.id)}
                aria-label={s.label}
                className="group relative aspect-[0.86] cursor-pointer overflow-hidden border-0 outline-none select-none"
                style={{
                  borderRadius: '24px',
                  background: `linear-gradient(150deg, rgba(255,255,255,0.32) 0%, ${s.grad[0]}22 42%, ${s.grad[1]}2f 100%)`,
                  backdropFilter: 'blur(22px)',
                  WebkitBackdropFilter: 'blur(22px)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  boxShadow: `0 16px 32px ${s.grad[0]}26, inset 0 1px 0 rgba(255,255,255,0.46)`,
                }}
                title={s.label}
              >
                <div
                  className="absolute -top-8 left-1/2 h-[68px] w-[68px] -translate-x-1/2 rounded-full opacity-75 transition-transform duration-700 group-hover:scale-125"
                  style={{
                    background: `radial-gradient(circle, ${s.grad[0]}72 0%, ${s.grad[1]}34 48%, transparent 78%)`,
                    filter: 'blur(16px)',
                  }}
                />
                <div
                  className="absolute inset-[1px] pointer-events-none rounded-[23px]"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.06) 100%)',
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none opacity-72"
                  style={{
                    background: `radial-gradient(ellipse at top, ${s.grad[0]}40 0%, transparent 64%)`,
                  }}
                />
                <div
                  className="absolute inset-x-4 top-3 h-px pointer-events-none rounded-full"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.72), transparent)' }}
                />

                <motion.span
                  animate={{ y: [0, i % 2 === 0 ? -4 : -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4 + i * 0.14,
                    delay: i * 0.1,
                    ease: 'easeInOut',
                  }}
                  className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-1"
                >
                  <span
                    className="font-playfair font-semibold leading-none"
                    style={{
                      fontSize: s.id === 10 ? '0.92rem' : '1rem',
                      color: '#7f274b',
                      textShadow: '0 1px 10px rgba(255,255,255,0.2)',
                    }}
                  >
                    {s.id}
                  </span>
                  <span
                    className="leading-none"
                    style={{
                      fontSize: '1.35rem',
                      filter: 'drop-shadow(0 8px 18px rgba(255,255,255,0.28))',
                    }}
                  >
                    {s.icon}
                  </span>
                </motion.span>

                <span className="sr-only">{s.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
