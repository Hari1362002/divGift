import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer
      className="relative py-14 px-6 text-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fff0f6, #fce7f3)' }}
    >
      {/* Light leak */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '300px', height: '160px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(255,210,235,0.50) 0%, transparent 70%)',
          filter: 'blur(30px)',
          animation: 'lightLeak 9s ease-in-out infinite',
        }}
      />

      {/* Rising petals */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${12 + i * 18}%`,
            bottom: 0,
            fontSize: `${12 + (i % 3) * 4}px`,
            animation: `floatUp ${6 + i * 1.5}s ease-in-out ${i * 1.2}s infinite`,
            opacity: 0.38,
          }}
        >
          🌸
        </div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative z-10"
      >
        <div className="text-3xl mb-4 animate-float-soft select-none">💖</div>
        <p
          className="font-dancing text-2xl md:text-3xl"
          style={{
            background: 'linear-gradient(135deg, #be185d, #9333ea)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Made with love
        </p>
        <p
          className="mt-3 font-light tracking-widest text-sm"
          style={{ color: '#b5446e' }}
        >
          For My Special One
        </p>
        <div className="mt-5 w-14 h-px mx-auto rounded-full"
          style={{ background: 'linear-gradient(90deg, #f9a8d4, #c084fc)' }} />
      </motion.div>
    </footer>
  );
}
