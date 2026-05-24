// ─────────────────────────────────────────────
//  src/data/assets.js
//  Single source of truth for all media assets.
//  All paths resolve from /public/photos/
// ─────────────────────────────────────────────

/** Hero portrait — NEVER changes, always /photos/5.jpeg */
export const HERO_IMAGE = '/photos/5.jpeg';

/** Surprise 1 — Photo Story (3 images + quotes) */
export const PHOTO_STORIES = [
  { src: '/photos/1.jpeg', quote: 'Soft souls leave lasting warmth ✨' },
  { src: '/photos/2.jpg',  quote: 'Grace speaks in quiet ways 🌸' },
  { src: '/photos/3.jpg',  quote: 'Your laughter feels like sunlight ☀️' },
];

/** Surprise 2 — Memory Gallery (3 images + quotes) */
export const GALLERY_IMAGES = [
  { src: '/photos/4.jpeg', quote: 'Kind hearts glow without trying 💫' },
  { src: '/photos/6.jpeg', quote: 'Some smiles make the world gentler 🌷' },
  { src: '/photos/7.jpeg', quote: 'Your presence feels comforting 🤍' },
];

/** Surprise 3 — Portrait Showcase (3 images + quotes) */
export const PORTRAIT_IMAGES = [
  { src: '/photos/8.jpeg',  quote: 'Calm beauty lingers softly 🩷' },
  { src: '/photos/9.jpeg',  quote: 'Tender moments settle around you 🌙' },
  { src: '/photos/10.jpeg', quote: 'Bright eyes carry their own magic 💐' },
];

/** Surprises 4–7 — Video cards */
export const VIDEOS = [
  {
    src:   '/photos/DivVideo.mp4',
    num:   4,
    label: 'A Moment to Remember',
    color: '#6ee7b7',
    bg:    'linear-gradient(180deg, #f0fdf4 0%, #d1fae5 40%, #f0fdf4 100%)',
  },
  {
    src:   '/photos/IMG_2563.mp4',
    num:   5,
    label: 'Captured With Love',
    color: '#93c5fd',
    bg:    'linear-gradient(180deg, #eff6ff 0%, #dbeafe 40%, #eff6ff 100%)',
  },
  {
    src:   '/photos/IMG_2616.mp4',
    num:   6,
    label: 'A Beautiful Memory',
    color: '#fcd34d',
    bg:    'linear-gradient(180deg, #fffbeb 0%, #fef3c7 40%, #fffbeb 100%)',
  },
  {
    src:   '/photos/IMG_2617.mp4',
    num:   7,
    label: 'Forever in My Heart',
    color: '#f9a8d4',
    bg:    'linear-gradient(180deg, #fff0f6 0%, #fce7f3 40%, #fff0f6 100%)',
  },
];
