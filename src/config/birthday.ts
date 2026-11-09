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

export type SuspenseStep = {
  id: string
  kind: 'wait' | 'tap' | 'hold' | 'riddle'
  title: string
  teaser: string
  lines: string[]
  taps?: number
  holdMs?: number
  riddle?: { options: string[]; answer: number; hint: string }
}

const name = 'Sneha'
const fromName = 'Nikhil'

export const birthday = {
  name,
  nickname: 'Snehu',
  tagline: 'for my favourite person to laugh with',
  fromName,
  birthdayDate: '2026-12-01',
  secretCode: 'snehu',
  secretMessage:
    'Okay, honest moment — some people just make days lighter without trying. You’re one of them. Please never stop being you.',
  giftTitle: 'One last thing',
  giftReveal:
    'A promise: good news, bad day, or a random 2 a.m. thought — I’m always one message away. And I’ll always laugh at your jokes, even the bad ones.',
  playlistNote: 'If this night had a soundtrack, it would be soft laughter with a little glow.',
  interludes: [
    'Chapter one — before the cake, a little time travel.',
    'Chapter two — frames, films, and feelings.',
    'Chapter three — quotes & chaos.',
    'Chapter four — let’s see how well you know us.',
    'Chapter five — a vault only you can open.',
  ],

  // PHOTOS — put files in public/photos/ and set src: "/photos/yourfile.jpg"
  photos: [
    { id: 'p1', src: '', caption: 'That smile that makes any day better.', tag: 'Smile' },
    { id: 'p2', src: '', caption: 'Proof that any plan becomes an adventure with you.', tag: 'Adventure' },
    { id: 'p3', src: '', caption: 'Good light, better company.', tag: 'Glow' },
    { id: 'p4', src: '', caption: 'A quiet frame with a loud memory.', tag: 'Soft' },
    { id: 'p5', src: '', caption: 'Same team energy. Always.', tag: 'Us' },
    { id: 'p6', src: '', caption: 'More frames coming — this wall keeps growing.', tag: 'Soon' },
  ] as PhotoItem[],

  // VIDEOS — put files in public/videos/ (mp4/webm)
  videos: [
    { id: 'v1', src: '', poster: '', title: 'The laugh clip', caption: 'The one that still makes us laugh.' },
    { id: 'v2', src: '', poster: '', title: 'Tiny adventure', caption: 'A short clip from a day that felt longer than it was.' },
    { id: 'v3', src: '', poster: '', title: 'Birthday wishes', caption: 'A little something for your day.' },
  ] as VideoItem[],

  quotes: [
    { id: 'q1', text: 'Some people make a room warmer just by walking in. You’re one of them.', by: fromName, vibe: 'soft' },
    { id: 'q2', text: 'Best friend energy with main-character sparkle.', by: fromName, vibe: 'loud' },
    { id: 'q3', text: 'May your year be as bright and unpredictable as your best ideas.', vibe: 'chaos' },
    { id: 'q4', text: 'Good days have a way of showing up when you’re around.', by: fromName, vibe: 'soft' },
    { id: 'q5', text: 'You make “just a normal day” feel like a story worth telling.', vibe: 'soft' },
    { id: 'q6', text: 'Your laugh should come with a warning: highly contagious.', by: fromName, vibe: 'loud' },
  ] as QuoteItem[],

  funny: [
    { id: 'f1', title: 'Exhibit A', punchline: '“I’ll be there in 5 minutes.” Reality: see you next chapter.' },
    { id: 'f2', title: 'Talent unlocked', punchline: 'Can turn any plain plan into a full-blown saga.' },
    { id: 'f3', title: 'Emergency protocol', punchline: 'Crisis? First we laugh. Then we fix it. Then we laugh again.' },
    { id: 'f4', title: 'Voice note legend', punchline: '3-second question. 4-minute reply. Iconic.' },
    { id: 'f5', title: 'Snack court', punchline: 'You’ve never refused food. Not once. Respect.' },
    { id: 'f6', title: 'Final boss', punchline: 'Winning an argument with you requires evidence, witnesses, and luck.' },
  ] as FunnyItem[],

  // SUSPENSE STEPS — 11 locked gates, opened one by one (kinds: wait | tap | hold | riddle)
  suspense: [
    { id: 's1', kind: 'wait', title: 'The first envelope', teaser: 'Someone has been planning this for weeks. Ready to find out who?', lines: ['Checking the guest list…', 'Dimming the lights…', 'Almost there…'] },
    { id: 's2', kind: 'tap', title: 'The sealed door', teaser: 'Behind this door is where our story starts. It only opens for brave knockers.', taps: 5, lines: ['Knock…', 'Something creaked.', 'A crack of light!', 'One more…', 'It’s opening!'] },
    { id: 's3', kind: 'riddle', title: 'The frozen frames', teaser: 'These photos were hidden. Solve this to thaw them.', lines: [], riddle: { options: ['A quiet corner', 'Wherever there’s food and laughter', 'An empty room'], answer: 1, hint: 'Think snacks, stories, and laughing too loud.' } },
    { id: 's4', kind: 'hold', title: 'The film reel', teaser: 'The projector is jammed. Hold the lever to crank it.', holdMs: 2600, lines: ['Keep holding…', 'It’s spinning up…', 'Don’t let go!'] },
    { id: 's5', kind: 'wait', title: 'Whispers in the dark', teaser: 'Someone left words for you. Wait while they arrive.', lines: ['Listening closely…', 'Was that a voice?', 'Words are forming…'] },
    { id: 's6', kind: 'tap', title: 'The evidence locker', teaser: 'Warning: contains classified roasts. Crack the lock to read them.', taps: 6, lines: ['Click.', 'Click click.', 'The lock is sweating.', 'Nearly open…', 'One last tap!', 'Busted!'] },
    { id: 's7', kind: 'riddle', title: 'The memory box', teaser: 'A box of frames stays shut until you answer correctly.', lines: [], riddle: { options: ['A stranger', 'Just a classmate', 'A friend who gets you'], answer: 2, hint: 'It’s the answer with the warmest ending.' } },
    { id: 's8', kind: 'hold', title: 'The orbit of reasons', teaser: 'Eight reasons are circling out of reach. Hold to pull them in.', holdMs: 3000, lines: ['Gravity is building…', 'They’re coming closer…', 'Hold steady…'] },
    { id: 's9', kind: 'riddle', title: 'The final exam', teaser: 'Only a true best friend passes this gate. Think carefully.', lines: [], riddle: { options: ['Laughs + snacks', 'Formal emails', 'Silent staring'], answer: 0, hint: 'It’s loud, it’s funny, and it’s edible.' } },
    { id: 's10', kind: 'wait', title: 'The vault corridor', teaser: 'A long dark hallway leads to a vault. Walk it slowly.', lines: ['Footsteps echo…', 'A light flickers…', 'The vault hums…'] },
    { id: 's11', kind: 'hold', title: 'The last star', teaser: 'One star is still hiding. Hold on until it shines.', holdMs: 3400, lines: ['Looking up…', 'There’s a glimmer…', 'Don’t blink!'] },
  ] as SuspenseStep[],

  reasons: [
    { id: 'r1', text: 'You laugh at my worst jokes like they’re award-winning.' },
    { id: 'r2', text: 'You remember the tiny details everyone else forgets.' },
    { id: 'r3', text: 'You turn stress into a plan — and somehow make it fun.' },
    { id: 'r4', text: 'You’re honest without ever being unkind.' },
    { id: 'r5', text: 'You make any place feel a little more like home.' },
    { id: 'r6', text: 'You show up — on easy days and on weird ones.' },
    { id: 'r7', text: 'Your smile is a free upgrade for the whole day.' },
    { id: 'r8', text: 'You make ordinary Tuesdays feel like stories.' },
  ] as Reason[],
  timeline: [
    { id: 't1', year: 'Then', title: 'Hello, new friend', detail: 'Neither of us knew how many inside jokes were waiting.' },
    { id: 't2', year: 'Later', title: 'The friendship upgrade', detail: 'Somewhere between random chats and long talks, it became something special.' },
    { id: 't3', year: 'Often', title: 'The go-to person', detail: 'The one I message first when something is funny, strange, or good.' },
    { id: 't4', year: 'Now', title: 'This night', detail: 'A little digital sky, built so you know how much you matter.' },
  ] as TimelineBeat[],
  quiz: [
    { id: 'q1', prompt: 'What’s our unofficial friendship language?', options: ['Long speeches', 'Laughs + snacks', 'Silent staring', 'Formal emails'], correctIndex: 1, reactionRight: 'Correct. We communicate in crumbs and comedy.', reactionWrong: 'Nope — it’s laughter with a side of snacks.' },
    { id: 'q2', prompt: 'When plans fall apart, we usually…', options: ['Panic forever', 'Invent a better Plan B', 'Blame the weather', 'Go to sleep'], correctIndex: 1, reactionRight: 'Yes. Disaster → comedy → somehow it works.', reactionWrong: 'Wrong. We invent Plan B mid-chaos.' },
    { id: 'q3', prompt: 'Best description of us?', options: ['Just classmates', 'Great friends with great stories', 'Professional rivals', 'Two strangers sharing Wi‑Fi'], correctIndex: 1, reactionRight: 'Exactly. Rare combo. Locked in.', reactionWrong: 'Come on — great friends, great stories.' },
    { id: 'q4', prompt: 'Ideal birthday energy for you?', options: ['Quiet & thoughtful', 'Loud & messy', 'Both, somehow', 'Corporate brunch'], correctIndex: 2, reactionRight: 'Both. Soft heart, loud laugh. That’s you.', reactionWrong: 'It’s both — thoughtful with a spark.' },
  ] as QuizQuestion[],
  memories: [
    { id: 'm1', title: 'The first hello', caption: 'A small moment that turned into a lot of good ones.', date: 'Then', accent: '#e8a5b0' },
    { id: 'm2', title: 'Midnight talks', caption: 'The ones that started with “quick question” and ended at 3 a.m.', date: 'Often', accent: '#f3cfc6' },
    { id: 'm3', title: 'Laughter, loudly', caption: 'You turn ordinary days into stories worth retelling.', date: 'Always', accent: '#e9b8c0' },
    { id: 'm4', title: 'Random wisdom', caption: 'Half the best advice I’ve heard came between errands and nonsense.', date: 'Random Tuesdays', accent: '#f0c4b8' },
    { id: 'm5', title: 'My safe person', caption: 'Someone you can be yourself around — that’s rare, and you’re it.', date: 'Always', accent: '#fbe3dc' },
    { id: 'm6', title: 'This year', caption: 'Whatever comes next, I’m cheering for you.', date: '2026', accent: '#e8b4bc' },
  ] as Memory[],
  wishes: [
    { id: 'w1', text: 'May your year feel light and loud in all the right ways.', x: 22, y: 28 },
    { id: 'w2', text: 'More wins, fewer overthinking nights.', x: 48, y: 18 },
    { id: 'w3', text: 'Someone who gets your weird humor — hopefully they’re nearby.', x: 72, y: 32 },
    { id: 'w4', text: 'Soft mornings. Bold choices. Zero dull weeks.', x: 35, y: 55 },
    { id: 'w5', text: 'You deserve the kind of joy you give so easily.', x: 62, y: 58 },
    { id: 'w6', text: 'Happy birthday, Sneha. Stay brilliantly you.', x: 50, y: 78 },
  ] as Wish[],
  constellationLinks: [
    ['w1', 'w2'], ['w2', 'w3'], ['w1', 'w4'], ['w2', 'w5'], ['w4', 'w6'], ['w5', 'w6'], ['w3', 'w5'],
  ] as [string, string][],
  finaleMessage: `Hey ${name},

Some people just make life feel lighter — and you’re definitely one of them.

Thank you for the laughs, the honesty, the ridiculous inside jokes, and for always being you.

This little night sky is my way of saying: you matter, I’m glad you’re in my life, and I hope this year is as kind to you as you are to everyone around you.

Happy birthday.
With a big smile,
${fromName}

P.S. Treat is on me. Pick the place. 😄`,
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