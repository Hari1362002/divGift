import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const VIDEOS = [
  // { src: '/photos/DivVideo.mov', label: 'A Moment to Remember' },
  // { src: '/photos/IMG_2563.MOV', label: 'Captured With Love' },
];

function VideoCard({ video, index }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl overflow-hidden shadow-soft group cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.6)',
        border: '1px solid rgba(249,168,212,0.25)',
      }}
      onClick={toggle}
    >
      {/* Blurred background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          src={video.src}
          className="w-full h-full object-cover scale-110"
          style={{ filter: 'blur(12px) brightness(0.7) saturate(1.2)' }}
          muted
          loop
          autoPlay
          playsInline
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(253,246,249,0.3) 0%, rgba(237,233,254,0.4) 100%)' }}
        />
      </div>

      {/* Main video */}
      <div className="relative z-10 flex items-center justify-center" style={{ minHeight: '280px' }}>
        <video
          ref={videoRef}
          src={video.src}
          className="w-full max-h-72 object-contain rounded-2xl"
          style={{ maxWidth: '90%' }}
          muted={!playing}
          playsInline
          loop
        />

        {/* Play overlay */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-soft"
              style={{
                background: 'linear-gradient(135deg, #f472b6, #c084fc)',
                boxShadow: '0 8px 32px rgba(244,114,182,0.4)',
              }}
            >
              <span className="text-white text-xl ml-1">▶</span>
            </motion.div>
          </div>
        )}
      </div>

      {/* Label */}
      <div
        className="relative z-10 px-6 py-4 text-center"
        style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)' }}
      >
        <p className="font-dancing text-rose-600 text-lg">{video.label}</p>
      </div>
    </motion.div>
  );
}

export default function VideoSection() {
  return (
    <section
      className="relative py-20 px-5 md:px-10 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdf6f9 0%, #fce7f3 50%, #fdf6f9 100%)' }}
    >
      {/* Soft blobs */}
      <div className="absolute top-10 right-0 w-72 h-72 rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #fce7f3, transparent)', filter: 'blur(50px)' }} />
      <div className="absolute bottom-10 left-0 w-72 h-72 rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #ede9fe, transparent)', filter: 'blur(50px)' }} />

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* <p className="font-dancing text-pink-400 text-xl mb-3 tracking-wide">Relive The Magic</p> */}
          <h2
            className="font-playfair font-bold glow-soft"
            style={{
              fontSize: 'clamp(1.8rem, 6vw, 3rem)',
              background: 'linear-gradient(135deg, #be185d, #9333ea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {/* Moments that deserve forever ❤️ */}
          </h2>
          <div className="mt-4 w-20 h-px mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, #f9a8d4, #c084fc)' }} />
        </motion.div>

        <div className="flex flex-col gap-8">
          {VIDEOS.map((v, i) => (
            <VideoCard key={i} video={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
