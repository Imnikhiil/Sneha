/**
 * ============================================
 *  EASY EDIT FILE — add photos, videos, quotes, funny stuff here
 * ============================================
 *
 * 1) Photos  → put files in  public/photos/     then add path below
 * 2) Videos  → put files in  public/videos/     then add path below
 * 3) Quotes  → just type text below (no files)
 * 4) Funny   → text + optional photo/video
 *
 * Example photo:  src: "/photos/diwali.jpg"
 * Example video:  src: "/videos/dance.mp4"
 */

export type Memory = {
  id: string
  title: string
  caption: string
  date?: string
  image?: string
  accent: string
}

export type Wish = {
  id: string
  text: string
  x: number
  y: number
}

export type TimelineBeat = {
  id: string
  year: string
  title: string
  detail: string
}

export type QuizQuestion = {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
  reactionRight: string
  reactionWrong: string
}

export type Reason = {
  id: string
  text: string
}

/** Drop images in /public/photos/ */
export type PhotoItem = {
  id: string
  src: string
  caption: string
  tag?: string
}

/** Drop videos in /public/videos/ (mp4/webm). poster optional image */
export type VideoItem = {
  id: string
  src: string
  poster?: string
  title: string
  caption: string
}

export type QuoteItem = {
  id: string
  text: string
  by?: string
  vibe?: 'soft' | 'loud' | 'chaos'
}

/** Funny moments — text roast / meme caption, optional media */
export type FunnyItem = {
  id: string
  title: string
  punchline: string
  image?: string
  video?: string
}

const name = 'Riya'
const fromName = 'Nikhil'

export const birthday = {
  name,
  nickname: 'Riri',
  tagline: 'to my sister, my chaos partner',
  fromName,
  birthdayDate: '2026-12-01',
  secretCode: 'riri',
  secretMessage:
    'Okay, real talk — you’re the person I call when life gets weird, funny, or both. Never change that.',
  giftTitle: 'One last thing',
  giftReveal:
    'A promise: whenever you need a co-pilot for chaos, adventures, or late-night overthinking — I’m in. Always.',
  playlistNote: 'If this night had a soundtrack, it would be loud laughter with soft endings.',
  interludes: [
    'Chapter one — before the cake, a little time travel.',
    'Chapter two — frames, films, and feelings.',
    'Chapter three — quotes & chaos.',
    'Chapter four — prove you know us.',
    'Chapter five — a vault only you can open.',
  ],

  // ─────────────────────────────────────────
  // PHOTOS — add as many as you want
  // File goes in: public/photos/yourfile.jpg
  // Then: src: "/photos/yourfile.jpg"
  // ─────────────────────────────────────────
  photos: [
    {
      id: 'p1',
      src: '',
      caption: 'That one smile that starts every good day.',
      tag: 'Home',
    },
    {
      id: 'p2',
      src: '',
      caption: 'Proof we can turn any outing into a saga.',
      tag: 'Chaos',
    },
    {
      id: 'p3',
      src: '',
      caption: 'Festival lights, louder laughs.',
      tag: 'Festive',
    },
    {
      id: 'p4',
      src: '',
      caption: 'Quiet frame. Loud memory.',
      tag: 'Soft',
    },
    {
      id: 'p5',
      src: '',
      caption: 'Same team energy. Always.',
      tag: 'Us',
    },
    {
      id: 'p6',
      src: '',
      caption: 'Add your real photos — this wall grows with you.',
      tag: 'Soon',
    },
  ] as PhotoItem[],

  // ─────────────────────────────────────────
  // VIDEOS — mp4/webm in public/videos/
  // ─────────────────────────────────────────
  videos: [
    {
      id: 'v1',
      src: '',
      poster: '',
      title: 'The laugh clip',
      caption: 'Drop a funny video here — the one that still gets us.',
    },
    {
      id: 'v2',
      src: '',
      poster: '',
      title: 'Tiny adventure',
      caption: 'A short clip from a day that felt longer than it was.',
    },
    {
      id: 'v3',
      src: '',
      poster: '',
      title: 'Birthday energy preview',
      caption: 'Optional: a wish video from you or family.',
    },
  ] as VideoItem[],

  // ─────────────────────────────────────────
  // QUOTES — no files needed, just text
  // ─────────────────────────────────────────
  quotes: [
    {
      id: 'q1',
      text: 'You’re the plot twist that made the whole story better.',
      by: fromName,
      vibe: 'soft',
    },
    {
      id: 'q2',
      text: 'Sister by default. Best friend by outstanding performance.',
      by: fromName,
      vibe: 'loud',
    },
    {
      id: 'q3',
      text: 'May your year be as unhinged and wonderful as our group chat.',
      vibe: 'chaos',
    },
    {
      id: 'q4',
      text: 'Some people share blood. We share snacks, secrets, and Wi‑Fi rage.',
      by: fromName,
      vibe: 'chaos',
    },
    {
      id: 'q5',
      text: 'Happy birthday to the person who makes “family” feel like a vibe.',
      vibe: 'soft',
    },
    {
      id: 'q6',
      text: 'If kindness had a chaotic younger-sister energy — that would be you.',
      by: fromName,
      vibe: 'loud',
    },
  ] as QuoteItem[],

  // ─────────────────────────────────────────
  // FUNNY — roasts, inside jokes, meme moments
  // Optional: image or video path
  // ─────────────────────────────────────────
  funny: [
    {
      id: 'f1',
      title: 'Exhibit A',
      punchline: 'Still waiting for you to “come in 2 minutes” from 2019.',
    },
    {
      id: 'f2',
      title: 'Talent unlocked',
      punchline: 'World-class at finding my stuff… that you borrowed.',
    },
    {
      id: 'f3',
      title: 'Emergency protocol',
      punchline: 'Crisis? First we laugh. Then we fix it. Then we laugh again.',
    },
    {
      id: 'f4',
      title: 'Fashion court',
      punchline: 'Your honest opinions have ended more outfits than laundry day.',
    },
    {
      id: 'f5',
      title: 'Voice note legend',
      punchline: '3-second question. 4-minute reply. Iconic.',
    },
    {
      id: 'f6',
      title: 'Final boss',
      punchline: 'Beating you in an argument requires evidence, witnesses, and luck.',
    },
  ] as FunnyItem[],

  reasons: [
    { id: 'r1', text: 'You laugh at my worst jokes like they’re award-winning.' },
    { id: 'r2', text: 'You remember the tiny details everyone else forgets.' },
    { id: 'r3', text: 'You turn stress into a plan — and somehow make it fun.' },
    { id: 'r4', text: 'You’re honest without being cruel.' },
    { id: 'r5', text: 'You make home feel like a place, not just a room.' },
    { id: 'r6', text: 'You defend me harder than I defend myself.' },
    { id: 'r7', text: 'You’re the friend I didn’t have to find.' },
    { id: 'r8', text: 'You make ordinary Tuesdays feel like stories.' },
  ] as Reason[],
  timeline: [
    {
      id: 't1',
      year: 'Then',
      title: 'Same house, different worlds',
      detail: 'We learned early that “siblings” can also mean “ride or die.”',
    },
    {
      id: 't2',
      year: 'Later',
      title: 'The friendship upgrade',
      detail: 'Somewhere between fights and food runs, we became actual friends.',
    },
    {
      id: 't3',
      year: 'Often',
      title: 'The emergency contact',
      detail: 'Not just family — the person who answers on the weird days too.',
    },
    {
      id: 't4',
      year: 'Now',
      title: 'This night',
      detail: 'A little digital sky, built so you feel how much you matter.',
    },
  ] as TimelineBeat[],
  quiz: [
    {
      id: 'q1',
      prompt: 'What’s our unofficial love language?',
      options: ['Long speeches', 'Roasting + snacks', 'Silent staring', 'Formal emails'],
      correctIndex: 1,
      reactionRight: 'Correct. We communicate in crumbs and comedy.',
      reactionWrong: 'Nope — it’s roasting with a side of snacks.',
    },
    {
      id: 'q2',
      prompt: 'When plans fall apart, we usually…',
      options: ['Panic forever', 'Build a chaos plan B', 'Blame the weather', 'Go to sleep angry'],
      correctIndex: 1,
      reactionRight: 'Yes. Disaster → comedy → somehow it works.',
      reactionWrong: 'Wrong. We invent Plan B mid-chaos.',
    },
    {
      id: 'q3',
      prompt: 'Best description of us?',
      options: [
        'Just siblings',
        'Sister + best friend combo',
        'Professional rivals',
        'Two strangers who share Wi‑Fi',
      ],
      correctIndex: 1,
      reactionRight: 'Exactly. Rare combo. Locked in.',
      reactionWrong: 'Come on — sister and best friend. Easy.',
    },
    {
      id: 'q4',
      prompt: 'Ideal birthday energy for you?',
      options: ['Quiet & thoughtful', 'Loud & messy', 'Both, somehow', 'Corporate brunch'],
      correctIndex: 2,
      reactionRight: 'Both. Soft heart, loud laugh. That’s you.',
      reactionWrong: 'It’s both — thoughtful with a spark.',
    },
  ] as QuizQuestion[],
  memories: [
    {
      id: 'm1',
      title: 'The early days',
      caption: 'Same roof, different worlds — somehow always on the same team.',
      date: 'Then',
      accent: '#c9a87c',
    },
    {
      id: 'm2',
      title: 'Midnight talks',
      caption: 'The ones that started with “quick question” and ended at 3 a.m.',
      date: 'Often',
      accent: '#e8c4a8',
    },
    {
      id: 'm3',
      title: 'Chaos & laughter',
      caption: 'You turn ordinary days into stories worth retelling.',
      date: 'Always',
      accent: '#d4b896',
    },
    {
      id: 'm4',
      title: 'Roadside wisdom',
      caption: 'Half the best advice I’ve ever gotten came between errands and nonsense.',
      date: 'Random Tuesdays',
      accent: '#c9b08a',
    },
    {
      id: 'm5',
      title: 'My safe person',
      caption: 'Sister by blood, friend by choice — the rarest combination.',
      date: 'Forever',
      accent: '#f0d9b5',
    },
    {
      id: 'm6',
      title: 'This year',
      caption: 'Whatever comes next — I’m still your chaos co-pilot.',
      date: '2026',
      accent: '#e0c4a0',
    },
  ] as Memory[],
  wishes: [
    { id: 'w1', text: 'May your year feel light and loud in all the right ways.', x: 22, y: 28 },
    { id: 'w2', text: 'More wins, fewer overthinking nights.', x: 48, y: 18 },
    { id: 'w3', text: 'Someone who gets your weird humor — wait, that’s me.', x: 72, y: 32 },
    { id: 'w4', text: 'Soft mornings. Bold choices. Zero dull weeks.', x: 35, y: 55 },
    { id: 'w5', text: 'You deserve the kind of joy you give so easily.', x: 62, y: 58 },
    { id: 'w6', text: 'Happy birthday, chaos partner. Stay brilliantly you.', x: 50, y: 78 },
  ] as Wish[],
  constellationLinks: [
    ['w1', 'w2'],
    ['w2', 'w3'],
    ['w1', 'w4'],
    ['w2', 'w5'],
    ['w4', 'w6'],
    ['w5', 'w6'],
    ['w3', 'w5'],
  ] as [string, string][],
  finaleMessage: `Hey ${name},

If the universe handed me a sibling and a best friend in one person — that was you.

Thank you for the laughter, the honesty, the ridiculous inside jokes, and for always showing up.

This little night sky is my way of saying: I’m proud of you. I’m rooting for you. And I’m endlessly glad you’re mine to celebrate.

Happy birthday.
With love,
${fromName}`,
}

export const journeyNav = [
  { id: 'countdown', label: 'Time' },
  { id: 'timeline', label: 'Story' },
  { id: 'photos', label: 'Photos' },
  { id: 'videos', label: 'Videos' },
  { id: 'quotes', label: 'Quotes' },
  { id: 'funny', label: 'Funny' },
  { id: 'memories', label: 'Frames' },
  { id: 'reasons', label: 'Reasons' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'vault', label: 'Vault' },
  { id: 'wishes', label: 'Stars' },
  { id: 'candle', label: 'Wish' },
  { id: 'gift', label: 'Gift' },
  { id: 'finale', label: 'Letter' },
] as const
