import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PHOTO_STORIES } from '../data/assets';

function StoryCard({ photo, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.95, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative w-full group"
        style={{ borderRadius: '22px', overflow: 'hidden', aspectRatio: '4/5' }}>
        <div className="absolute pointer-events-none z-10" style={{
          inset: 0, borderRadius: '22px',
          border: '1.5px solid rgba(255,255,255,0.85)',
          boxShadow: '0 20px 56px rgba(0,0,0,0.09), 0 4px 18px rgba(249,168,212,0.18)',
        }} />
        <img
          src={photo.src}
          alt="memory"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          style={{ display: 'block', objectPosition: 'center' }}
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(249,168,212,0.12) 100%)', borderRadius: '22px' }} />
      </div>

      <div className="glass-soft rounded-2xl px-6 py-5 w-full text-center shadow-soft">
        <p className="font-cormorant italic leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 3.5vw, 1.2rem)', fontWeight: 400, color: '#9d2a50' }}>
          "{photo.quote}"
        </p>
      </div>
    </motion.div>
  );
}

export default function PhotoStory1() {
  return (
    <section className="relative py-16 px-5 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fff0f6 0%, #fce7f3 40%, #fff0f6 100%)' }}>
      <div className="absolute top-0 right-0 pointer-events-none" style={{
        width: '260px', height: '260px', borderRadius: '50%',
        background: 'radial-gradient(ellipse at 70% 20%, rgba(255,210,240,0.50) 0%, transparent 70%)',
        filter: 'blur(40px)', animation: 'lightLeak 11s ease-in-out infinite',
      }} />

      <div className="max-w-sm mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-10">
          {/* <p className="font-dancing text-pink-400 text-lg mb-2 tracking-wide">Surprise 1 · Photo Story</p> */}
          <h2 className="font-playfair font-bold glow-soft" style={{
            fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
            background: 'linear-gradient(135deg, #be185d, #9333ea)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            A Story of You 🌸
          </h2>
          <div className="mt-3 w-16 h-px mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, #f9a8d4, #c084fc)' }} />
        </motion.div>

        <div className="flex flex-col gap-10">
          {PHOTO_STORIES.map((p, i) => <StoryCard key={p.src} photo={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
