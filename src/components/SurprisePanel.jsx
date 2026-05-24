import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SurprisePanel({ active, onClose, children, accentColor = '#f9a8d4' }) {
  /* Lock body scroll while panel is open */
  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
            style={{
              background: 'rgba(255, 247, 251, 0.42)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
            }}
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 1.03,
              clipPath: 'inset(8% 5% 16% 5% round 42px)',
              filter: 'blur(16px)',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              clipPath: 'inset(0% 0% 0% 0% round 0px)',
              filter: 'blur(0px)',
            }}
            exit={{
              opacity: 0,
              scale: 0.985,
              clipPath: 'inset(4% 4% 10% 4% round 30px)',
              filter: 'blur(10px)',
            }}
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 overflow-y-auto"
            style={{
              background: 'linear-gradient(160deg, #fff3f8 0%, #f9f2ff 46%, #fff3f8 100%)',
              willChange: 'clip-path, transform, opacity, filter',
            }}
          >
            <div
              className="fixed top-0 left-0 pointer-events-none"
              style={{
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background: `radial-gradient(ellipse at 25% 20%, ${accentColor}55 0%, transparent 70%)`,
                filter: 'blur(48px)',
                animation: 'lightLeak 10s ease-in-out infinite',
                zIndex: 0,
              }}
            />
            <div
              className="fixed bottom-0 right-0 pointer-events-none"
              style={{
                width: '260px',
                height: '260px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${accentColor}2d 0%, transparent 72%)`,
                filter: 'blur(56px)',
                animation: 'lightLeakB 13s ease-in-out infinite',
                zIndex: 0,
              }}
            />

            <motion.button
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.28, duration: 0.5 }}
              whileHover={{ scale: 1.04, x: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onClose}
              className="fixed z-50 flex items-center gap-2 rounded-full border-0 px-4 py-2.5 outline-none cursor-pointer"
              style={{
                top: 'calc(env(safe-area-inset-top, 0px) + 14px)',
                left: 'calc(env(safe-area-inset-left, 0px) + 14px)',
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(244,114,182,0.2)',
                boxShadow: '0 10px 24px rgba(244,114,182,0.10), inset 0 1px 0 rgba(255,255,255,0.44)',
              }}
            >
              <span style={{ fontSize: '0.8rem', color: '#9d2a50' }}>←</span>
              <span
                className="font-cormorant"
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1,
                  letterSpacing: '0.04em',
                  color: '#9d2a50',
                }}
              >
                Back
              </span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ delay: 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 pb-16"
              style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 82px)' }}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
