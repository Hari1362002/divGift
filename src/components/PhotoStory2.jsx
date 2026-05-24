import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GALLERY_IMAGES } from '../data/assets';

function GalleryCard({ photo, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const fromX  = index % 2 === 0 ? -32 : 32;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromX, y: 20 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative w-full max-w-[290px] group"
        style={{ borderRadius: '22px', overflow: 'hidden', aspectRatio: '4/5' }}>
        <div className="absolute pointer-events-none z-10" style={{
          inset: 0, borderRadius: '22px',
          border: '1.5px solid rgba(255,255,255,0.85)',
          boxShadow: '0 20px 56px rgba(0,0,0,0.09), 0 4px 18px rgba(192,132,252,0.18)',
        }} />
        <img
          src={photo.src}
          alt="memory"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          style={{ display: 'block', objectPosition: 'center' }}
        />
      </div>

      <div className="glass-soft rounded-2xl px-6 py-5 shadow-soft w-full max-w-[290px] text-center">
        <p className="font-playfair leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 3.6vw, 1.18rem)', fontWeight: 600, color: '#9464b2' }}>
          "{photo.quote}"
        </p>
        <div className="mt-3 h-px w-10 rounded-full mx-auto"
          style={{ background: 'linear-gradient(90deg, #c084fc, #f9a8d4)' }} />
      </div>
    </motion.div>
  );
}

export default function PhotoStory2() {
  return (
    <section className="relative py-16 px-5 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f5f0ff 0%, #ede9fe 40%, #f5f0ff 100%)' }}>
      <div className="absolute top-0 left-0 pointer-events-none" style={{
        width: '260px', height: '260px', borderRadius: '50%',
        background: 'radial-gradient(ellipse at 25% 25%, rgba(220,200,255,0.50) 0%, transparent 70%)',
        filter: 'blur(40px)', animation: 'lightLeakB 10s ease-in-out infinite',
      }} />

      <div className="max-w-sm mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-10">
          {/* <p className="font-dancing text-purple-400 text-lg mb-2 tracking-wide">Surprise 2 · Memory Gallery</p> */}
          <h2 className="font-playfair font-bold glow-soft" style={{
            fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
            background: 'linear-gradient(135deg, #7c3aed, #be185d)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Moments of Grace 💜
          </h2>
          <div className="mt-3 w-16 h-px mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, #c084fc, #f9a8d4)' }} />
        </motion.div>

        <div className="flex flex-col gap-10">
          {GALLERY_IMAGES.map((p, i) => <GalleryCard key={p.src} photo={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
