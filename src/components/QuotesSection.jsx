import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUOTES = [
  { text: 'The gentlest hearts leave the deepest comfort 💗', icon: '❤️' },
  { text: 'There is beauty in your quiet kindness 🌸',       icon: '✨' },
  { text: 'Light feels softer around you ✨',                icon: '☀️' },
  { text: 'A calm soul is its own rare gift 🤍',            icon: '💖' },
  { text: 'Sweet moments stay longer with you 🌷',          icon: '🌸' },
  { text: 'Your warmth is felt before words 💫',            icon: '🌷' },
];

export default function QuotesSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(i => (i + 1) % QUOTES.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="relative py-20 px-5 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fff0f6 0%, #f5f0ff 50%, #fff0f6 100%)' }}
    >
      {/* Light leak top-left */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: '260px', height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 25% 25%, rgba(255,215,240,0.55) 0%, rgba(220,200,255,0.22) 55%, transparent 100%)',
          filter: 'blur(36px)',
          animation: 'lightLeakB 10s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: '220px', height: '220px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(237,233,254,0.45), transparent)',
          filter: 'blur(44px)',
        }}
      />

      <div className="max-w-md mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-12"
        >
          <p className="font-dancing text-pink-400 text-xl mb-3 tracking-wide">Words of the Heart</p>
          <h2
            className="font-playfair font-bold glow-soft"
            style={{
              fontSize: 'clamp(1.8rem, 6.5vw, 2.8rem)',
              background: 'linear-gradient(135deg, #be185d, #9333ea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            For a Soul Like Yours 💌
          </h2>
          <div className="mt-4 w-20 h-px mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, #f9a8d4, #c084fc)' }} />
        </motion.div>

        {/* Sliding hero quote */}
        <div className="relative flex items-center justify-center mb-10" style={{ minHeight: '200px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -28, scale: 0.96 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="glass-soft rounded-3xl px-8 py-8 text-center w-full animate-soft-pulse"
              style={{
                boxShadow: '0 12px 48px rgba(249,168,212,0.18), 0 2px 12px rgba(0,0,0,0.05)',
              }}
            >
              <div className="text-4xl mb-4">{QUOTES[current].icon}</div>
              <p
                className="font-cormorant italic leading-relaxed"
                style={{ fontSize: 'clamp(1.1rem, 4vw, 1.35rem)', fontWeight: 400, color: '#9d2a50' }}
              >
                "{QUOTES[current].text}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-12">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300 cursor-pointer border-0 outline-none"
              style={{
                width: i === current ? '22px' : '7px',
                height: '7px',
                background: i === current ? 'linear-gradient(90deg, #f472b6, #c084fc)' : 'rgba(244,114,182,0.22)',
              }}
            />
          ))}
        </div>

        {/* Quote grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {QUOTES.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.65 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-soft rounded-2xl p-5 shadow-soft cursor-default"
            >
              <span className="text-xl">{q.icon}</span>
              <p
                className="font-cormorant italic mt-2 leading-relaxed"
                style={{ fontSize: 'clamp(0.95rem, 3vw, 1.05rem)', fontWeight: 400, color: '#9d2a50' }}
              >
                "{q.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
