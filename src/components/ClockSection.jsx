import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function pad(n) { return String(n).padStart(2, '0'); }

export default function ClockSection() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const h = pad(time.getHours());
  const m = pad(time.getMinutes());
  const s = pad(time.getSeconds());
  const digits = [h[0], h[1], ':', m[0], m[1], ':', s[0], s[1]];

  return (
    <section
      className="relative py-20 px-5 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdf6f9 0%, #f5f3ff 50%, #fdf6f9 100%)' }}
    >
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #ede9fe, transparent)', filter: 'blur(50px)' }} />

      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <p className="font-dancing text-pink-400 text-xl mb-3 tracking-wide">Right Now</p>
          <h2
            className="font-playfair font-bold glow-soft"
            style={{
              fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
              background: 'linear-gradient(135deg, #be185d, #9333ea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Celebrating Your Special Day 🎂
          </h2>
          <div className="mt-4 w-20 h-px mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, #f9a8d4, #c084fc)' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-soft rounded-3xl p-8 inline-block shadow-soft animate-soft-pulse"
        >
          <div className="flex items-center justify-center gap-1 md:gap-2">
            {digits.map((d, i) =>
              d === ':' ? (
                <span key={i} className="text-pink-400 text-3xl md:text-5xl font-bold mb-1">:</span>
              ) : (
                <motion.div
                  key={`${i}-${d}`}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="glass-pink rounded-xl w-10 h-14 md:w-14 md:h-18 flex items-center justify-center"
                  style={{ minHeight: '56px' }}
                >
                  <span
                    className="font-playfair text-2xl md:text-3xl font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #be185d, #9333ea)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {d}
                  </span>
                </motion.div>
              )
            )}
          </div>
          <p className="text-rose-400 mt-5 text-xs tracking-widest uppercase font-light">
            {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-5"
        >
          {[
            { label: 'Hours of Joy', value: h, icon: '⏰' },
            { label: 'Minutes of Love', value: m, icon: '💕' },
            { label: 'Seconds of Happiness', value: s, icon: '✨' },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -3 }}
              className="glass-soft rounded-2xl p-5 text-center min-w-[100px] shadow-soft"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div
                className="font-playfair text-2xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #be185d, #9333ea)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {item.value}
              </div>
              <div className="text-rose-400 text-xs mt-1 font-light">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
