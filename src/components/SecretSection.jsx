import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const FIRST_NOTE = [
  'I will always be there for you…',
  'As your brother and friend, no matter what happens,',
  'your happiness and smile mean everything to me ❤️',
];

const FINAL_NOTE = [
  'As a brother, your smile means a lot to me.',
  'This whole little effort was only to make you feel special.',
  'No matter how much effort it takes,',
  'I will always do it happily…',
  'because you are my special one ❤️',
];

const SPARKLES = [
  { left: '12%', top: '18%', icon: '✨', delay: 0.1 },
  { left: '82%', top: '22%', icon: '🌸', delay: 0.35 },
  { left: '18%', top: '78%', icon: '💫', delay: 0.22 },
  { left: '80%', top: '74%', icon: '✨', delay: 0.5 },
];

export default function SecretSection({ audioRef }) {
  const [step, setStep] = useState(0);
  const [showFirstNote, setShowFirstNote] = useState(false);
  const [showFinalNote, setShowFinalNote] = useState(false);
  const glowRef = useRef(null);

  const handleOpen = () => {
    if (step !== 0) return;

    if (audioRef?.current && !audioRef.current.paused) {
      gsap.to(audioRef.current, {
        volume: Math.min(audioRef.current.volume + 0.18, 1),
        duration: 1.8,
      });
    }

    gsap.timeline()
      .to(glowRef.current, { opacity: 1, scale: 1.06, duration: 0.55, ease: 'power2.out' })
      .to(glowRef.current, { scale: 1, duration: 0.9, ease: 'power2.inOut' }, '-=0.1');

    setStep(1);
    setShowFirstNote(false);
    setShowFinalNote(false);
    window.setTimeout(() => setShowFirstNote(true), 420);
  };

  const handleNext = () => {
    if (step !== 1) return;
    setStep(2);
    setShowFinalNote(false);
    window.setTimeout(() => setShowFinalNote(true), 260);
  };

  return (
    <section
      className="relative min-h-screen px-5 py-20 overflow-hidden flex items-center justify-center"
      style={{ background: 'linear-gradient(160deg, #fff4f8 0%, #fce7f3 38%, #f5f0ff 72%, #fff4f8 100%)' }}
    >
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 22% 20%, rgba(255,212,236,0.62) 0%, rgba(220,195,255,0.22) 58%, transparent 100%)',
          filter: 'blur(42px)',
          animation: 'lightLeak 11s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(237,233,254,0.56), transparent)',
          filter: 'blur(48px)',
          animation: 'lightLeakB 13s ease-in-out infinite',
        }}
      />
      <motion.div
        animate={{ opacity: step > 0 ? 1 : 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      />
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0,
          background: 'radial-gradient(ellipse at 50% 48%, rgba(255,208,232,0.34) 0%, rgba(216,180,255,0.16) 50%, transparent 80%)',
        }}
      />

      <div className="relative z-10 w-full max-w-md mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="font-playfair font-bold px-3"
          style={{
            fontSize: 'clamp(1.8rem, 6.4vw, 2.6rem)',
            lineHeight: 1.12,
            background: 'linear-gradient(135deg, #9d2a50, #c06c93, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          A Letter From Your Brother ❤️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-cormorant italic mt-4 px-4"
          style={{
            fontSize: '1.04rem',
            lineHeight: 1.7,
            color: '#a1547b',
          }}
        >
          Something written specially for you.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.16, ease: 'easeOut' }}
          className="mx-auto mt-5 mb-10 h-px w-24 rounded-full"
          style={{ background: 'linear-gradient(90deg, #f9a8d4, #c084fc)' }}
        />

        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div
              key="closed"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div
                className="absolute inset-0 rounded-[34px] pointer-events-none"
                style={{
                  border: '1px solid rgba(255,255,255,0.75)',
                  boxShadow: '0 24px 64px rgba(249,168,212,0.16), 0 8px 24px rgba(0,0,0,0.05)',
                }}
              />
              <div
                className="relative glass-soft rounded-[34px] px-7 py-10 sm:px-9 sm:py-11 flex flex-col items-center"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)' }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [0, -2, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                  className="text-6xl select-none"
                  style={{ filter: 'drop-shadow(0 6px 16px rgba(249,168,212,0.42))' }}
                >
                  ✉️
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleOpen}
                  className="animate-btn-glow mt-8 w-full max-w-[240px] rounded-full border-0 px-8 py-3.5 text-sm font-semibold text-white cursor-pointer outline-none"
                  style={{
                    background: 'linear-gradient(135deg, #f472b6, #a78bfa)',
                    boxShadow: '0 14px 34px rgba(244,114,182,0.24), 0 10px 26px rgba(167,139,250,0.16)',
                    letterSpacing: '0.05em',
                  }}
                >
                  Open The Letter ✨
                </motion.button>
              </div>
            </motion.div>
          ) : step === 1 ? (
            <motion.div
              key="first-note"
              initial={{ opacity: 0, y: 26, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
              >
                <div
                  className="absolute inset-0 rounded-[34px] pointer-events-none"
                  style={{
                    background: 'linear-gradient(145deg, rgba(249,168,212,0.52), rgba(255,255,255,0.84), rgba(192,132,252,0.38))',
                  filter: 'blur(1px)',
                }}
              />

              {SPARKLES.map((sparkle) => (
                <motion.div
                  key={`${sparkle.left}-${sparkle.top}`}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 0.5, scale: 1, y: [0, -5, 0] }}
                  transition={{
                    opacity: { delay: sparkle.delay, duration: 0.6 },
                    scale: { delay: sparkle.delay, duration: 0.6 },
                    y: { repeat: Infinity, duration: 3, delay: sparkle.delay, ease: 'easeInOut' },
                  }}
                  className="absolute pointer-events-none select-none"
                  style={{
                    left: sparkle.left,
                    top: sparkle.top,
                    fontSize: '0.95rem',
                  }}
                >
                  {sparkle.icon}
                </motion.div>
              ))}

              <div
                className="relative overflow-hidden rounded-[34px] border border-white/70 bg-white/48 px-7 py-9 sm:px-9 sm:py-10"
                style={{
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  boxShadow: '0 26px 70px rgba(249,168,212,0.18), 0 8px 24px rgba(0,0,0,0.06)',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: -14, rotateX: 18 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(244,114,182,0.16), rgba(167,139,250,0.18))',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)',
                  }}
                >
                  <span className="text-4xl select-none">💌</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scaleY: 0.92, y: 18 }}
                  animate={{ opacity: 1, scaleY: 1, y: 0 }}
                  transition={{ duration: 0.78, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'top center' }}
                  className="relative rounded-[28px] bg-white/58 px-6 py-7"
                >
                  <div
                    className="absolute inset-x-6 top-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.46), transparent)' }}
                  />
                  <div className="flex flex-col items-center gap-3 text-center">
                    {showFirstNote && FIRST_NOTE.map((line, index) => (
                      <motion.p
                        key={line}
                        initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{
                          delay: 0.16 + index * 0.3,
                          duration: 0.8,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="font-cormorant italic"
                        style={{
                          fontSize: index === FIRST_NOTE.length - 1
                            ? 'clamp(1.08rem, 4vw, 1.22rem)'
                            : 'clamp(1rem, 3.8vw, 1.14rem)',
                          lineHeight: 1.85,
                          fontWeight: index === FIRST_NOTE.length - 1 ? 600 : 500,
                          color: index === FIRST_NOTE.length - 1 ? '#b04e7d' : '#8f345d',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 16 }}
                  animate={{
                    opacity: showFirstNote ? 1 : 0,
                    y: showFirstNote ? [0, -3, 0] : 16,
                    boxShadow: showFirstNote
                      ? [
                          '0 12px 26px rgba(249,168,212,0.16)',
                          '0 18px 34px rgba(167,139,250,0.2)',
                          '0 12px 26px rgba(249,168,212,0.16)',
                        ]
                      : '0 10px 24px rgba(249,168,212,0.12)',
                  }}
                  transition={{
                    opacity: { delay: 0.92, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                    y: { delay: 1.12, duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
                    boxShadow: { delay: 1.12, duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  whileHover={{ scale: 1.045, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNext}
                  className="mt-7 inline-flex items-center justify-center gap-3 rounded-full border px-6 py-3 text-sm cursor-pointer outline-none"
                  style={{
                    borderColor: 'rgba(255,255,255,0.52)',
                    background: 'linear-gradient(135deg, rgba(244,114,182,0.74), rgba(167,139,250,0.72))',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    color: '#fffafc',
                    letterSpacing: '0.03em',
                  }}
                >
                  <span
                    className="font-cormorant"
                    style={{ fontSize: '0.98rem', fontWeight: 600 }}
                  >
                    Continue Reading 💌
                  </span>
                  <motion.span
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ fontSize: '1rem' }}
                  >
                    ↓
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="final-note"
              initial={{ opacity: 0, y: 26, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div
                className="absolute inset-0 rounded-[34px] pointer-events-none"
                style={{
                  background: 'linear-gradient(145deg, rgba(249,168,212,0.52), rgba(255,255,255,0.84), rgba(192,132,252,0.38))',
                  filter: 'blur(1px)',
                }}
              />

              {SPARKLES.map((sparkle) => (
                <motion.div
                  key={`final-${sparkle.left}-${sparkle.top}`}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 0.5, scale: 1, y: [0, -5, 0] }}
                  transition={{
                    opacity: { delay: sparkle.delay, duration: 0.6 },
                    scale: { delay: sparkle.delay, duration: 0.6 },
                    y: { repeat: Infinity, duration: 3, delay: sparkle.delay, ease: 'easeInOut' },
                  }}
                  className="absolute pointer-events-none select-none"
                  style={{
                    left: sparkle.left,
                    top: sparkle.top,
                    fontSize: '0.95rem',
                  }}
                >
                  {sparkle.icon}
                </motion.div>
              ))}

              <div
                className="relative overflow-hidden rounded-[34px] border border-white/70 bg-white/48 px-7 py-9 sm:px-9 sm:py-10"
                style={{
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  boxShadow: '0 26px 70px rgba(249,168,212,0.18), 0 8px 24px rgba(0,0,0,0.06)',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: -14, rotateX: 18 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(244,114,182,0.16), rgba(167,139,250,0.18))',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)',
                  }}
                >
                  <span className="text-4xl select-none">💌</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scaleY: 0.92, y: 18 }}
                  animate={{ opacity: 1, scaleY: 1, y: 0 }}
                  transition={{ duration: 0.78, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'top center' }}
                  className="relative rounded-[28px] bg-white/58 px-6 py-7"
                >
                  <div
                    className="absolute inset-x-6 top-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.46), transparent)' }}
                  />
                  <div className="flex flex-col items-center gap-3 text-center">
                    {showFinalNote && FINAL_NOTE.map((line, index) => (
                      <motion.p
                        key={line}
                        initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{
                          delay: 0.16 + index * 0.28,
                          duration: 0.8,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="font-cormorant italic"
                        style={{
                          fontSize: index === FINAL_NOTE.length - 1
                            ? 'clamp(1.08rem, 4vw, 1.22rem)'
                            : 'clamp(1rem, 3.8vw, 1.14rem)',
                          lineHeight: 1.85,
                          fontWeight: index === FINAL_NOTE.length - 1 ? 600 : 500,
                          color: index === FINAL_NOTE.length - 1 ? '#b04e7d' : '#8f345d',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
