import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import CountdownScreen from './components/CountdownScreen';
import LoadingScreen   from './components/LoadingScreen';
import HeroSection     from './components/HeroSection';
import SurprisePanel   from './components/SurprisePanel';
import PhotoStory1     from './components/PhotoStory1';
import PhotoStory2     from './components/PhotoStory2';
import PhotoStory3     from './components/PhotoStory3';
import VideoSurprises  from './components/VideoSurprises';
import VoiceMessage    from './components/VoiceMessage';
import SecretSection   from './components/SecretSection';
import FinalSection    from './components/FinalSection';
import Footer          from './components/Footer';
import './index.css';

const TARGET     = new Date('2025-05-25T00:00:00');
const isUnlocked = () => Date.now() >= TARGET.getTime();
const SOUNDTRACK = [
  { src: '/photos/AUDIO-1.mp3', label: 'Part I' },
  { src: '/photos/AUDIO-2.mp3', label: 'Part II' },
];
const SOUNDTRACK_VOLUME = 0.72;

/* Accent color per surprise for the panel light leak */
const ACCENT = {
  1: '#f9a8d4', 2: '#c4b5fd', 3: '#fda4af',
  4: '#6ee7b7', 5: '#93c5fd', 6: '#fcd34d',
  7: '#f9a8d4', 8: '#fda4af', 9: '#c4b5fd', 10: '#f9a8d4',
};

/* Which video index (0-3) to show for surprises 4-7 */
const VIDEO_INDEX = { 4: 0, 5: 1, 6: 2, 7: 3 };

export default function App() {
  const [phase, setPhase]                  = useState(() => isUnlocked() ? 'loading' : 'countdown');
  const [revealed, setRevealed]            = useState(false);
  const [musicPlaying, setMusicPlaying]    = useState(false);
  const [soundtrackStarted, setStarted]    = useState(false);
  const [sequenceComplete, setComplete]    = useState(false);
  const [currentTrackIndex, setTrackIndex] = useState(0);
  const [isTrackTransitioning, setTransitioning] = useState(false);
  const [activeSurprise, setActive]        = useState(null); // 1-10 or null
  const audioRef = useRef(null);
  const queuedAutoplayRef = useRef(false);

  const currentTrack = SOUNDTRACK[currentTrackIndex];

  const handleCountdownUnlock = () => setPhase('loading');
  const handleLoadingComplete = () => { setPhase('main'); setTimeout(() => setRevealed(true), 100); };

  const playCurrentTrack = async ({ restart = false } = {}) => {
    const audio = audioRef.current;
    if (!audio) return false;

    gsap.killTweensOf(audio);
    if (restart) audio.currentTime = 0;
    audio.volume = 0.04;

    try {
      await audio.play();
      setMusicPlaying(true);
      setStarted(true);
      setComplete(false);
      setTransitioning(false);
      gsap.to(audio, { volume: SOUNDTRACK_VOLUME, duration: 1.4, ease: 'sine.out' });
      return true;
    } catch {
      setMusicPlaying(false);
      setTransitioning(false);
      return false;
    }
  };

  useEffect(() => {
    if (!queuedAutoplayRef.current) return;
    queuedAutoplayRef.current = false;
    void playCurrentTrack({ restart: true });
  }, [currentTrackIndex]);

  const pauseSoundtrack = () => {
    const audio = audioRef.current;
    if (!audio) return;

    gsap.killTweensOf(audio);
    gsap.to(audio, {
      volume: 0,
      duration: 0.35,
      ease: 'sine.inOut',
      onComplete: () => {
        audio.pause();
        audio.volume = SOUNDTRACK_VOLUME;
        setMusicPlaying(false);
      },
    });
  };

  const stopSoundtrack = () => {
    const audio = audioRef.current;
    if (!audio) return;

    queuedAutoplayRef.current = false;
    gsap.killTweensOf(audio);
    audio.pause();
    audio.currentTime = 0;
    audio.volume = SOUNDTRACK_VOLUME;
    setMusicPlaying(false);
    setStarted(false);
    setComplete(false);
    setTransitioning(false);
    if (currentTrackIndex !== 0) setTrackIndex(0);
  };

  const startOrResumeSoundtrack = async ({ restart = false } = {}) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (restart || sequenceComplete) {
      queuedAutoplayRef.current = currentTrackIndex !== 0;
      setComplete(false);
      setTransitioning(true);
      gsap.killTweensOf(audio);
      audio.pause();
      audio.currentTime = 0;

      if (currentTrackIndex === 0) {
        await playCurrentTrack({ restart: true });
      } else {
        setTrackIndex(0);
      }
      return;
    }

    if (!soundtrackStarted) {
      audio.currentTime = 0;
      await playCurrentTrack({ restart: true });
      return;
    }

    await playCurrentTrack();
  };

  const toggleMusic = () => {
    if (musicPlaying) {
      pauseSoundtrack();
      return;
    }
    void startOrResumeSoundtrack();
  };

  const handleTrackEnd = () => {
    if (currentTrackIndex < SOUNDTRACK.length - 1) {
      setTransitioning(true);
      queuedAutoplayRef.current = true;
      setTrackIndex(currentTrackIndex + 1);
      return;
    }

    setMusicPlaying(false);
    setComplete(true);
    setTransitioning(false);
  };

  const handleSurpriseSelect = (surpriseId) => setActive(surpriseId);

  /* Render the correct surprise content */
  const renderSurprise = (n) => {
    if (n === 1) return <PhotoStory1 />;
    if (n === 2) return <PhotoStory2 />;
    if (n === 3) return <PhotoStory3 />;
    if (n >= 4 && n <= 7) return <VideoSurprises only={VIDEO_INDEX[n]} />;
    if (n === 8) {
      return (
        <VoiceMessage
          musicPlaying={musicPlaying}
          soundtrackStarted={soundtrackStarted}
          sequenceComplete={sequenceComplete}
          isTrackTransitioning={isTrackTransitioning}
          onTogglePlaylist={toggleMusic}
          onRestartPlaylist={() => { void startOrResumeSoundtrack({ restart: true }); }}
          onStopPlaylist={stopSoundtrack}
        />
      );
    }
    if (n === 9) return <SecretSection audioRef={audioRef} />;
    if (n === 10) return <FinalSection />;
    return null;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="auto"
        onEnded={handleTrackEnd}
        onPlay={() => setMusicPlaying(true)}
        onPause={() => {
          if (!audioRef.current?.ended && !isTrackTransitioning) {
            setMusicPlaying(false);
          }
        }}
      />

      <AnimatePresence>
        {phase === 'countdown' && <CountdownScreen onUnlock={handleCountdownUnlock} />}
      </AnimatePresence>
      <AnimatePresence>
        {phase === 'loading' && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {phase === 'main' && (
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 1.03 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── HERO (always visible as base) ── */}
          <HeroSection onSurpriseSelect={handleSurpriseSelect} />

          <Footer />

          {/* ── SURPRISE PANEL OVERLAY ── */}
          <SurprisePanel
            active={activeSurprise !== null}
            onClose={() => {
              stopSoundtrack();
              setActive(null);
            }}
            accentColor={ACCENT[activeSurprise] ?? '#f9a8d4'}
          >
            {activeSurprise !== null && renderSurprise(activeSurprise)}
          </SurprisePanel>
        </motion.div>
      )}
    </>
  );
}
