import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { VIDEOS } from '../data/assets';

function VideoCard({ video }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else          { videoRef.current.play();  setPlaying(true);  }
  };

  return (
    <section className="relative min-h-screen py-20 px-5 overflow-hidden flex items-center" style={{ background: video.bg }}>
      {/* Light leak */}
      <div className="absolute top-0 left-0 pointer-events-none" style={{
        width: '240px', height: '240px', borderRadius: '50%',
        background: `radial-gradient(ellipse at 25% 25%, ${video.color}55 0%, transparent 70%)`,
        filter: 'blur(40px)', animation: 'lightLeak 10s ease-in-out infinite',
      }} />

      <div className="max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8"
        >
          <p
            className="font-cormorant uppercase"
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.22em',
              color: '#b76b8f',
            }}
          >
            A Little Film For You
          </p>
          <div
            className="mx-auto mt-4 h-px w-24 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${video.color}, transparent)` }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden cursor-pointer"
          style={{
            border: '1.5px solid rgba(255,255,255,0.85)',
            boxShadow: `0 28px 70px rgba(0,0,0,0.10), 0 6px 24px ${video.color}44`,
          }}
          onClick={toggle}
        >
          {/* Blurred background layer */}
          <div className="absolute inset-0 overflow-hidden">
            <video
              src={video.src}
              className="w-full h-full object-cover scale-110"
              style={{ filter: 'blur(14px) brightness(0.75) saturate(1.1)' }}
              muted loop autoPlay playsInline
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(180deg, rgba(255,248,252,0.18) 0%, rgba(70,34,52,0.08) 36%, rgba(46,16,31,0.58) 100%)',
            }} />
          </div>

          {/* Main video */}
          <div className="relative z-10 flex items-center justify-center px-4 py-8" style={{ minHeight: '360px' }}>
            <video
              ref={videoRef}
              src={video.src}
              className="w-full object-contain rounded-2xl"
              style={{ maxHeight: '360px', maxWidth: '92%' }}
              muted={!playing}
              playsInline
              loop
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
            {!playing && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #f472b6, #a78bfa)',
                    boxShadow: '0 8px 28px rgba(244,114,182,0.40)',
                  }}
                >
                  <span className="text-white text-lg ml-1">▶</span>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * @param {number|undefined} only  — if set, renders only VIDEOS[only]
 */
export default function VideoSurprises({ only }) {
  const list = only !== undefined
    ? [{ video: VIDEOS[only] }]
    : VIDEOS.map((video) => ({ video }));

  return (
    <>
      {list.map(({ video }) => (
        <VideoCard key={video.src} video={video} />
      ))}
    </>
  );
}
