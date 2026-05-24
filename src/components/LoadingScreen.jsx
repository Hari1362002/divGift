import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const heartRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.to(heartRef.current, {
      scale: 1.25,
      duration: 0.7,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    const timer = setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete,
      });
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(160deg, #fdf6f9 0%, #fce7f3 40%, #f5f3ff 100%)',
      }}
    >
      {/* Soft sparkles */}
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${(i * 6.5) % 100}%`,
            top: `${(i * 9.1) % 100}%`,
            fontSize: `${8 + (i % 4) * 3}px`,
            animation: `sparkleFloat ${1.5 + (i % 3)}s ease-in-out ${(i % 5) * 0.4}s infinite`,
            opacity: 0.4,
          }}
        >
          ✨
        </div>
      ))}

      <div
        ref={heartRef}
        className="text-7xl mb-7"
        style={{ filter: 'drop-shadow(0 8px 24px rgba(249,168,212,0.5))' }}
      >
        💖
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="font-playfair text-xl md:text-2xl text-center px-6 glow-soft"
        style={{
          background: 'linear-gradient(135deg, #be185d, #9333ea)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        A Special Surprise is Loading… 💖
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 flex gap-3"
      >
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #f472b6, #c084fc)',
              animation: `softPulse 1s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
