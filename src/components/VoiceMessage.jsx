import { motion } from 'framer-motion';

const BAR_HEIGHTS = [18, 32, 24, 40, 28, 44, 20, 36, 26, 42, 22, 38, 30, 46, 24, 34, 20, 40, 28, 36];
const BAR_PULSE_LEVELS = [0.72, 1.16, 0.84, 1.28, 0.92, 1.36, 0.78, 1.22, 0.88, 1.3, 0.82, 1.18, 0.94, 1.34, 0.8, 1.12, 0.76, 1.26, 0.9, 1.2];

export default function VoiceMessage({
  musicPlaying,
  soundtrackStarted,
  sequenceComplete,
  isTrackTransitioning,
  onTogglePlaylist,
  onRestartPlaylist,
  onStopPlaylist,
}) {
  const statusText = isTrackTransitioning
    ? 'The message is continuing softly…'
    : sequenceComplete
      ? 'The voice message has finished.'
      : musicPlaying
        ? 'Playing your voice message…'
        : soundtrackStarted
          ? 'Your voice message is paused.'
          : 'Press play when you are ready.';

  return (
    <section
      className="relative min-h-screen px-5 py-14 overflow-hidden flex items-center"
      style={{ background: 'linear-gradient(180deg, #fff2f7 0%, #fce7f3 44%, #fff3f8 100%)' }}
    >
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 25% 20%, rgba(255,210,240,0.56) 0%, transparent 72%)',
          filter: 'blur(42px)',
          animation: 'lightLeak 9s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(221,214,254,0.48) 0%, transparent 72%)',
          filter: 'blur(48px)',
          animation: 'lightLeakB 12s ease-in-out infinite',
        }}
      />

      <div className="relative z-10 max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8"
        >
          <p
            className="font-cormorant uppercase mb-3"
            style={{
              fontSize: '0.76rem',
              letterSpacing: '0.24em',
              color: '#b76b8f',
            }}
          >
            A special gift
          </p>
          <h2
            className="font-playfair font-bold glow-soft"
            style={{
              fontSize: 'clamp(1.9rem, 6vw, 2.65rem)',
              background: 'linear-gradient(135deg, #9d2a50, #bf6c91, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.08,
            }}
          >
            A Voice Kept For 
          </h2>
          <p
            className="font-cormorant italic mt-3"
            style={{
              fontSize: '1rem',
              color: '#a1547b',
            }}
          >
            You
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div
            className="absolute pointer-events-none"
            style={{
              inset: '-2px',
              borderRadius: '32px',
              background: 'linear-gradient(145deg, rgba(249,168,212,0.72), rgba(255,255,255,0.92), rgba(192,132,252,0.54))',
            }}
          />

          <div
            className="relative glass-soft rounded-[30px] px-7 py-9 flex flex-col items-center gap-5 overflow-hidden text-center"
            style={{ boxShadow: '0 28px 68px rgba(249,168,212,0.18), 0 4px 16px rgba(0,0,0,0.05)' }}
          >
            <div
              className="absolute -top-8 h-24 w-24 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,220,235,0.48) 0%, transparent 74%)',
                filter: 'blur(14px)',
              }}
            />

            <motion.div
              animate={{ y: [0, -6, 0], scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
              className="text-4xl select-none"
              style={{ filter: 'drop-shadow(0 4px 14px rgba(249,168,212,0.55))' }}
            >
              
            </motion.div>

            <p
              className="font-playfair italic leading-relaxed"
              style={{ fontSize: 'clamp(1.02rem, 3.8vw, 1.18rem)', color: '#9d2a50' }}
            >
         
            </p>

            <div className="flex items-center justify-center gap-[3px] w-full max-w-[280px] px-2" style={{ height: '56px' }}>
              {BAR_HEIGHTS.map((height, index) => (
                <motion.div
                  key={index}
                  animate={musicPlaying || isTrackTransitioning ? { scaleY: [1, BAR_PULSE_LEVELS[index], 1] } : { scaleY: 1 }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.4 + (index % 5) * 0.1,
                    delay: index * 0.04,
                    ease: 'easeInOut',
                  }}
                  className="rounded-full flex-shrink-0"
                  style={{
                    width: '3px',
                    height: `${height}px`,
                    background: musicPlaying || isTrackTransitioning
                      ? 'linear-gradient(to top, #f472b6, #c084fc)'
                      : 'rgba(249,168,212,0.42)',
                    transformOrigin: 'center',
                    transition: 'background 0.4s ease',
                  }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onTogglePlaylist}
              className="animate-btn-glow w-16 h-16 rounded-full flex items-center justify-center cursor-pointer border-0 outline-none"
              style={{
                background: 'linear-gradient(135deg, #f472b6, #a78bfa)',
                boxShadow: musicPlaying
                  ? '0 0 28px rgba(244,114,182,0.28), 0 12px 28px rgba(167,139,250,0.24)'
                  : '0 10px 28px rgba(244,114,182,0.22)',
              }}
            >
              <span className="text-white text-xl" style={{ marginLeft: musicPlaying ? 0 : sequenceComplete ? 0 : '3px' }}>
                {musicPlaying ? '⏸' : sequenceComplete ? '↺' : '▶'}
              </span>
            </motion.button>

            <div className="text-center">
              <p
                className="font-cormorant"
                style={{
                  fontSize: '1rem',
                  color: '#9d2a50',
                  letterSpacing: '0.02em',
                }}
              >
                {statusText}
              </p>
              <p className="mt-2 font-cormorant italic" style={{ fontSize: '0.92rem', color: '#b76b8f' }}>
                Special Gift From Special One
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={onRestartPlaylist}
                className="rounded-full border-0 px-4 py-2 cursor-pointer outline-none"
                style={{
                  background: 'rgba(255,255,255,0.68)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 18px rgba(249,168,212,0.14)',
                  color: '#9d2a50',
                  letterSpacing: '0.05em',
                  fontSize: '0.78rem',
                }}
              >
                Begin again
              </motion.button>

              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={onStopPlaylist}
                className="rounded-full border border-white/45 px-4 py-2 cursor-pointer outline-none"
                style={{
                  background: 'rgba(255,255,255,0.42)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: '#b76b8f',
                  letterSpacing: '0.05em',
                  fontSize: '0.78rem',
                }}
              >
                Stop here
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
