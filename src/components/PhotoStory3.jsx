import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTRAIT_IMAGES } from '../data/assets';

function PortraitCard({ photo, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1.0, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative" style={{ width: '100%', maxWidth: '280px' }}>
        <div className="absolute pointer-events-none" style={{
          inset: '-2px', borderRadius: '28px',
          background: 'linear-gradient(145deg, rgba(249,168,212,0.75), rgba(255,255,255,0.90), rgba(192,132,252,0.55))',
        }} />
        <div className="relative overflow-hidden" style={{
          borderRadius: '26px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.10), 0 6px 24px rgba(249,168,212,0.20)',
        }}>
          <img
            src={photo.src}
            alt="portrait"
            className="w-full object-cover"
            style={{ aspectRatio: '3/4', display: 'block', objectFit: 'cover', objectPosition: 'center 15%' }}
          />
          <div className="absolute bottom-0 left-0 w-full h-16 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(255,240,250,0.45), transparent)' }} />
        </div>
      </div>

      <div className="glass-soft rounded-2xl px-6 py-5 shadow-soft w-full max-w-[280px] text-center">
        <p className="font-playfair text-center leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 3.6vw, 1.18rem)', fontWeight: 600, color: '#b06090' }}>
          "{photo.quote}"
        </p>
        <div className="mt-3 h-px w-10 rounded-full mx-auto"
          style={{ background: 'linear-gradient(90deg, #f9a8d4, #c084fc)' }} />
      </div>
    </motion.div>
  );
}

export default function PhotoStory3() {
  return (
    <section className="relative py-16 px-5 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fff0f6 0%, #fce7f3 30%, #f5f0ff 70%, #fff0f6 100%)' }}>
      <div className="absolute bottom-0 right-0 pointer-events-none" style={{
        width: '240px', height: '240px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(237,233,254,0.50), transparent)',
        filter: 'blur(44px)', animation: 'lightLeakB 12s ease-in-out infinite',
      }} />

      <div className="max-w-sm mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-10">
          {/* <p className="font-dancing text-pink-400 text-lg mb-2 tracking-wide">Surprise 3 · Portrait Showcase</p> */}
          <h2 className="font-playfair font-bold glow-soft" style={{
            fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
            background: 'linear-gradient(135deg, #be185d, #7c3aed)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Portraits of You 🌺
          </h2>
          <div className="mt-3 w-16 h-px mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, #f9a8d4, #c084fc)' }} />
        </motion.div>

        <div className="flex flex-col items-center gap-12">
          {PORTRAIT_IMAGES.map((p, i) => <PortraitCard key={p.src} photo={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
