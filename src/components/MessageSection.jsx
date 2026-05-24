import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MESSAGE = `Happy Birthday to the most amazing sister in the world ❤️

Thank you for always supporting me, caring for me, and making life beautiful.

I wish your life becomes filled with happiness, success, peace, love, and endless smiles.

You truly deserve the best in the world 💕`;

export default function MessageSection({ musicPlaying, onMusicToggle }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < MESSAGE.length) {
        setDisplayed(MESSAGE.slice(0, i + 1));
        i++;
      } else clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, [started]);

  return (
    <section
      className="relative py-20 px-5 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdf6f9 0%, #fce7f3 50%, #fdf6f9 100%)' }}
    >
      {/* Soft blobs */}
      <div className="absolute top-0 left-1/3 w-72 h-72 rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #fce7f3, transparent)', filter: 'blur(60px)' }} />

      <div className="max-w-xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="font-dancing text-pink-400 text-xl mb-3 tracking-wide">From My Heart</p>
          <h2
            className="font-playfair font-bold glow-soft"
            style={{
              fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
              background: 'linear-gradient(135deg, #be185d, #9333ea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            A Special Message 💌
          </h2>
          <div className="mt-4 w-20 h-px mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, #f9a8d4, #c084fc)' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-soft rounded-3xl p-8 md:p-10 shadow-soft relative"
        >
          {/* Corner sparkles */}
          {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
            <span key={i} className={`absolute ${pos} text-pink-300 opacity-60 text-sm`}>✨</span>
          ))}

          {!started ? (
            <div className="text-center py-6">
              <div className="text-5xl mb-5 animate-float-soft">💌</div>
              <p className="text-rose-400 mb-7 font-light font-cormorant italic text-lg">A heartfelt message awaits you...</p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setStarted(true)}
                className="px-8 py-3 rounded-full text-white font-semibold cursor-pointer border-0 outline-none shadow-soft"
                style={{ background: 'linear-gradient(135deg, #f472b6, #c084fc)' }}
              >
                Read My Message 💖
              </motion.button>
            </div>
          ) : (
            <p className="font-playfair text-rose-800 text-base md:text-lg leading-relaxed whitespace-pre-line" style={{ minHeight: '180px' }}>
              {displayed}
              <span className="text-pink-400 animate-pulse">|</span>
            </p>
          )}
        </motion.div>

        {/* Music toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-6"
        >
          <button
            onClick={onMusicToggle}
            className="glass-soft flex items-center gap-3 px-6 py-3 rounded-full text-rose-500 hover:text-rose-600 transition-all duration-300 cursor-pointer border-0 outline-none shadow-soft"
          >
            <span className="text-lg">{musicPlaying ? '🔊' : '🔇'}</span>
            <span className="text-sm font-light">{musicPlaying ? 'Music Playing ♪' : 'Play Background Music'}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
