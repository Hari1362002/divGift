import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const MEMORIES = [
  { src: '/photos/2.jpg',   quote: 'Grace rests naturally around you 🌸',           layout: 'left'   },
  { src: '/photos/3.jpg',   quote: 'Little smiles leave lasting light ✨',          layout: 'right'  },
  { src: '/photos/4.jpg',   quote: 'Some hearts make everything softer 🌷',         layout: 'center' },
  { src: '/photos/1.jpeg',  quote: 'Your calm carries a quiet glow 🤍',             layout: 'left'   },
  { src: '/photos/6.jpg',   quote: 'Kindness always looks lovely on you 💫',        layout: 'right'  },
  { src: '/photos/7.jpg',   quote: 'Gentle souls are never forgotten 🩷',           layout: 'center' },
  { src: '/photos/8.jpg',   quote: 'The warmest memories feel like you 💐',         layout: 'left'   },
  { src: '/photos/9.jpg',   quote: 'Peace follows your presence 🌙',                layout: 'right'  },
  { src: '/photos/10.jpg',  quote: 'Lovely moments seem to find you ☀️',            layout: 'center' },
];

const ICONS = ['❤️', '✨', '🌸', '💖', '🌷', '💫', '🌺', '🩷', '⭐'];

function PhotoFrame({ src, alt = 'memory' }) {
  return (
    <div className="relative group" style={{ borderRadius: '22px', overflow: 'hidden' }}>
      {/* Gradient border */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          inset: 0,
          borderRadius: '22px',
          border: '1.5px solid rgba(255,255,255,0.85)',
          boxShadow: '0 20px 56px rgba(0,0,0,0.09), 0 4px 18px rgba(249,168,212,0.18)',
        }}
      />
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        style={{ display: 'block' }}
      />
      {/* Hover shimmer */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(249,168,212,0.12) 100%)', borderRadius: '22px' }}
      />
    </div>
  );
}

function QuoteCard({ quote, icon, align = 'center' }) {
  return (
    <div
      className="glass-soft rounded-3xl px-7 py-7 shadow-soft"
      style={{ textAlign: align }}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <p
        className="font-cormorant italic leading-relaxed"
        style={{ fontSize: 'clamp(1.05rem, 3.5vw, 1.25rem)', fontWeight: 400, color: '#9d2a50' }}
      >
        "{quote}"
      </p>
      <div
        className="mt-4 h-px w-10 rounded-full"
        style={{
          background: 'linear-gradient(90deg, #f9a8d4, #c084fc)',
          margin: align === 'center' ? '16px auto 0' : '16px 0 0',
        }}
      />
    </div>
  );
}

function MemoryCard({ item, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-70px' });
  const isLeft   = item.layout === 'left';
  const isRight  = item.layout === 'right';
  const isCenter = item.layout === 'center';

  if (isCenter) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 44, scale: 0.96 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-6"
      >
        <div className="w-full max-w-[300px]" style={{ aspectRatio: '4/5' }}>
          <PhotoFrame src={item.src} />
        </div>
        <div className="w-full max-w-[300px]">
          <QuoteCard quote={item.quote} icon={ICONS[index % ICONS.length]} align="center" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -44 : 44, y: 20 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-6 ${isRight ? 'items-end' : 'items-start'}`}
    >
      <div className="w-full" style={{ aspectRatio: '4/5', maxHeight: '400px' }}>
        <PhotoFrame src={item.src} />
      </div>
      <div className="w-full">
        <QuoteCard
          quote={item.quote}
          icon={ICONS[index % ICONS.length]}
          align={isRight ? 'right' : 'left'}
        />
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section
      className="relative py-20 px-5 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fff0f6 0%, #fce7f3 25%, #f5f0ff 65%, #fff0f6 100%)' }}
    >
      {/* Cinematic light leak — top right */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: '320px', height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 70% 20%, rgba(255,210,240,0.55) 0%, rgba(220,200,255,0.25) 50%, transparent 100%)',
          filter: 'blur(40px)',
          animation: 'lightLeak 11s ease-in-out infinite',
        }}
      />
      {/* Bottom left blob */}
      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: '280px', height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(237,233,254,0.55), transparent)',
          filter: 'blur(50px)',
        }}
      />

      <div className="max-w-md mx-auto">
        {/* Title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-14"
        >
          <p className="font-dancing text-pink-400 text-xl mb-3 tracking-wide">Scrolling Through</p>
          <h2
            className="font-playfair font-bold glow-soft"
            style={{
              fontSize: 'clamp(1.9rem, 7vw, 3rem)',
              background: 'linear-gradient(135deg, #be185d, #9333ea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Beautiful Story 🌸
          </h2>
          <div className="mt-4 w-20 h-px mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, #f9a8d4, #c084fc)' }} />
        </motion.div>

        <div className="flex flex-col gap-14">
          {MEMORIES.map((item, i) => (
            <MemoryCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
