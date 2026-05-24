import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ReactConfetti from 'react-confetti';

const FLOATING_MARKS = ['✨', '✦', '🌸', '💫'];
const FINAL_WISH_LINES = [
  'I hope your future days become more beautiful,',
  'more peaceful,',
  'and filled with happiness.',
  '',
  'Never lose your hope.',
  'Keep smiling always…',
  'because your smile makes people around you happy too ✨',
];

export default function FinalSection() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize]     = useState({ width: window.innerWidth, height: window.innerHeight });
  const cakeRef    = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const onResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShowConfetti(true);
        gsap.fromTo(cakeRef.current,
          { scale: 0.84, y: 20, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.18 }
        );
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }, { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 overflow-hidden flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(160deg, #fff0f6 0%, #fce7f3 30%, #f5f0ff 65%, #fff0f6 100%)' }}
    >
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={96}
          colors={['#f9a8d4', '#c084fc', '#a5b4fc', '#fde68a', '#fbcfe8', '#ddd6fe', '#fff', '#fca5a5']}
          gravity={0.07}
        />
      )}

      {/* Cinematic light leak — top left */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: '380px', height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 25% 20%, rgba(255,215,240,0.65) 0%, rgba(220,200,255,0.28) 50%, transparent 100%)',
          filter: 'blur(40px)',
          animation: 'lightLeak 10s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: '300px', height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(237,233,254,0.50), transparent)',
          filter: 'blur(55px)',
          animation: 'lightLeakB 13s ease-in-out infinite',
        }}
      />

      {/* Floating marks */}
      {FLOATING_MARKS.map((emoji, i) => (
        <div
          key={i}
          className="absolute text-2xl md:text-3xl pointer-events-none select-none"
          style={{
            left: `${14 + i * 20}%`,
            top: `${18 + (i % 2) * 58}%`,
            animation: `floatSoft ${4.2 + i * 0.8}s ease-in-out ${i * 0.35}s infinite`,
            opacity: 0.38,
          }}
        >
          {emoji}
        </div>
      ))}

      {/* Sparkles */}
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${(i * 6.3) % 100}%`,
            top: `${(i * 9.1) % 100}%`,
            fontSize: `${10 + (i % 4) * 4}px`,
            animation: `sparkleFloat ${2 + (i % 3)}s ease-in-out ${(i % 5) * 0.6}s infinite`,
            opacity: 0.45,
          }}
        >
          ✨
        </div>
      ))}

      <div className="relative z-10 text-center max-w-lg mx-auto w-full">
        {/* Cake */}
        <div
          ref={cakeRef}
          className="text-6xl md:text-7xl mb-8 inline-block animate-float-soft"
          style={{
            filter: 'drop-shadow(0 8px 28px rgba(249,168,212,0.55))',
            transform: 'scale(0.84)',
            opacity: 0,
          }}
        >
          🎂
        </div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-cormorant uppercase mb-3"
          style={{
            fontSize: '0.8rem',
            letterSpacing: '0.24em',
            color: '#b76b8f',
          }}
        >
          Once again…
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-playfair font-bold leading-tight mb-6 glow-soft"
          style={{
            fontSize: 'clamp(2.4rem, 9vw, 4rem)',
            background: 'linear-gradient(135deg, #9d2a50, #bf6c91, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% 200%',
            animation: 'gradientDrift 5s ease infinite',
          }}
        >
          Wish you a very Happy Birthday ❤️
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.7, type: 'spring' }}
          className="glass-soft rounded-[30px] px-7 py-8 sm:px-9 sm:py-9 animate-soft-pulse"
          style={{ boxShadow: '0 18px 56px rgba(249,168,212,0.18), 0 2px 12px rgba(0,0,0,0.05)' }}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            {FINAL_WISH_LINES.map((line, index) => (
              <motion.p
                key={`${line}-${index}`}
                initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.82, delay: 0.82 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="font-playfair italic leading-relaxed"
                style={{
                  minHeight: line === '' ? '0.7rem' : undefined,
                  fontSize: index === FINAL_WISH_LINES.length - 1
                    ? 'clamp(1.06rem, 3.9vw, 1.2rem)'
                    : 'clamp(1rem, 3.8vw, 1.16rem)',
                  fontWeight: index >= FINAL_WISH_LINES.length - 2 ? 500 : 400,
                  color: index === FINAL_WISH_LINES.length - 1 ? '#b04e7d' : '#9d2a50',
                }}
              >
                {line}
              </motion.p>
            ))}
          </div>
          <div className="mt-4 w-14 h-px mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, #f9a8d4, #c084fc)' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.55 }}
          className="mt-6"
        >
          <p
            className="font-cormorant"
            style={{
              fontSize: '1rem',
              color: '#b76b8f',
              letterSpacing: '0.06em',
            }}
          >
            Forever cheering for you 🤍
          </p>
        </motion.div>
      </div>
    </section>
  );
}
