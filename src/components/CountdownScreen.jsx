import { useState, useEffect, useRef, useEffectEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import ReactConfetti from 'react-confetti';

const TARGET = new Date('2025-05-25T00:00:00');

function getTimeLeft() {
  const diff = TARGET - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function pad(n) { return String(n).padStart(2, '0'); }

function TimerCard({ label, value, prevValue }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        key={value}
        initial={value !== prevValue ? { y: -16, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        className="glass-soft rounded-2xl flex items-center justify-center shadow-soft"
        style={{ width: 'clamp(64px, 18vw, 88px)', height: 'clamp(72px, 20vw, 96px)' }}
      >
        <span
          className="font-playfair font-bold"
          style={{
            fontSize: 'clamp(1.8rem, 7vw, 2.8rem)',
            background: 'linear-gradient(135deg, #be185d, #9333ea)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {pad(value)}
        </span>
      </motion.div>
      <span className="text-rose-400 text-xs tracking-widest uppercase font-light">{label}</span>
    </div>
  );
}

export default function CountdownScreen({ onUnlock }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [unlocking, setUnlocking] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [prevTime, setPrevTime] = useState(getTimeLeft());
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  const triggerUnlock = useEffectEvent(() => {
    setUnlocking(true);
    setShowConfetti(true);
    gsap.timeline()
      .to(overlayRef.current, { opacity: 1, duration: 0.4 })
      .to(overlayRef.current, { opacity: 0, duration: 0.6 })
      .to(overlayRef.current, { opacity: 1, duration: 0.3 })
      .to(overlayRef.current, { opacity: 0, duration: 0.8 })
      .to(contentRef.current, { opacity: 0, y: -50, duration: 1.2, ease: 'power3.inOut' })
      .call(() => {
        setTimeout(() => {
          setShowConfetti(false);
          onUnlock();
        }, 400);
      });
  });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      const t = getTimeLeft();
      setPrevTime(timeLeft);
      setTimeLeft(t);
      if (!t && !unlocking) {
        clearInterval(tick);
        triggerUnlock();
      }
    }, 1000);
    return () => clearInterval(tick);
  }, [timeLeft, unlocking]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #fdf6f9 0%, #fce7f3 40%, #f5f3ff 100%)' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        {showConfetti && (
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={400}
            colors={['#f9a8d4', '#c084fc', '#a5b4fc', '#fde68a', '#fbcfe8', '#ddd6fe', '#fff']}
          />
        )}

        {/* Flash overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none opacity-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,240,248,0.95) 0%, rgba(192,132,252,0.3) 60%, transparent 100%)',
            zIndex: 10,
          }}
        />

        {/* Soft background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-80 h-80 rounded-full opacity-30 animate-float-soft"
            style={{ background: 'radial-gradient(circle, #fce7f3, transparent)', top: '5%', left: '5%', filter: 'blur(60px)' }} />
          <div className="absolute w-72 h-72 rounded-full opacity-25 animate-float-soft"
            style={{ background: 'radial-gradient(circle, #ede9fe, transparent)', bottom: '10%', right: '5%', filter: 'blur(60px)', animationDelay: '2s' }} />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${(i * 5.1) % 100}%`,
                top: `${(i * 7.9) % 100}%`,
                fontSize: `${10 + (i % 4) * 4}px`,
                animation: `sparkleFloat ${2 + (i % 3)}s ease-in-out ${(i % 5) * 0.5}s infinite`,
                opacity: 0.4,
              }}
            >
              {['✨', '🌸', '💫', '🌷', '💕'][i % 5]}
            </div>
          ))}
        </div>

        {/* Rising petals */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: `${8 + i * 11}%`,
              bottom: '-20px',
              fontSize: `${12 + (i % 3) * 5}px`,
              animation: `floatUp ${7 + i * 1.3}s ease-in-out ${i * 1}s infinite`,
              opacity: 0.45,
            }}
          >
            🌸
          </div>
        ))}

        {/* Main content */}
        <div ref={contentRef} className="relative z-10 text-center px-6 max-w-lg mx-auto w-full">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 140, delay: 0.2 }}
            className="text-6xl mb-5 inline-block animate-float-soft"
            style={{ filter: 'drop-shadow(0 8px 20px rgba(249,168,212,0.5))' }}
          >
            💝
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-great-vibes text-rose-500 text-2xl md:text-3xl mb-4 tracking-wide"
          >
            Something Special is Waiting for You ❤️
          </motion.p>

          {timeLeft ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: 'spring' }}
              className="glass-soft rounded-3xl p-6 md:p-10 mt-4 shadow-soft animate-soft-pulse"
            >
              <div className="flex items-end justify-center gap-2 md:gap-4">
                <TimerCard label="Days" value={timeLeft.days} prevValue={prevTime?.days} />
                <span className="text-pink-400 font-bold mb-8" style={{ fontSize: 'clamp(1.4rem, 5vw, 2.2rem)' }}>:</span>
                <TimerCard label="Hours" value={timeLeft.hours} prevValue={prevTime?.hours} />
                <span className="text-pink-400 font-bold mb-8" style={{ fontSize: 'clamp(1.4rem, 5vw, 2.2rem)' }}>:</span>
                <TimerCard label="Minutes" value={timeLeft.minutes} prevValue={prevTime?.minutes} />
                <span className="text-pink-400 font-bold mb-8" style={{ fontSize: 'clamp(1.4rem, 5vw, 2.2rem)' }}>:</span>
                <TimerCard label="Seconds" value={timeLeft.seconds} prevValue={prevTime?.seconds} />
              </div>
              <p className="text-rose-400 mt-5 text-xs tracking-widest uppercase font-light">
                Your surprise opens at midnight ✨
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 120 }}
              className="glass-soft rounded-3xl p-10 mt-4 shadow-soft animate-soft-pulse"
            >
              <p
                className="font-great-vibes text-3xl md:text-4xl glow-soft"
                style={{
                  background: 'linear-gradient(135deg, #be185d, #9333ea)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Wish You Happy Birthday My Sister ❤️
              </p>
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-5 text-rose-400 text-xs tracking-widest uppercase font-light"
          >
            May 25 · 12:00 AM · Your Special Day 🌙
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
