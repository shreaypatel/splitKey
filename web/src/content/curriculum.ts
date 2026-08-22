export type Lesson = {
  id: string;
  title: string;
  keys: string[];
  prompt: string;
  /** Short coaching line shown under the title. */
  focus?: string;
};

type LessonDraft = {
  title: string;
  keys: string[];
  prompt: string;
  focus?: string;
};

function slug(title: string, index: number): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${String(index + 1).padStart(2, "0")}-${base}`;
}

const HOME = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"] as const;
const HOME_LEFT = ["a", "s", "d", "f", "g"] as const;
const HOME_RIGHT = ["h", "j", "k", "l", ";"] as const;
const TOP = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"] as const;
const BOTTOM = ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"] as const;
const LETTERS = [
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  ";",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  ",",
  ".",
  "/",
] as const;
const ALPHA = [...LETTERS] as string[];
const NUM = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "="] as const;
const FULL = [...ALPHA, ...NUM, "shift"] as string[];

const FOCUS = {
  slow: "Go slow. Accuracy first. Speed comes later.",
  still: "Hands still. Eyes on the line, not the keys.",
  breath: "One calm breath, then type the next cluster.",
  review: "Spaced review. Let familiar keys settle again.",
  rhythm: "Even rhythm. Alternate hands without rushing.",
  digraph: "Feel the digraph as one motion, not two taps.",
  stretch: "Reach, return home. Do not leave the home row early.",
  shift: "Hold Shift, tap the letter, release. Stay centered.",
  numbers: "Numbers live above. Home fingers guide the reach.",
  mix: "Interleaved practice. Mix old and new on purpose.",
  words: "Read a word, then type it. Do not chase letter by letter.",
  mastery: "Full board. Quiet mind. Finish the line clean.",
} as const;

/**
 * Foundation (1–50): keep titles/prompts stable so existing progress IDs stay valid.
 * Mastery (51+): spaced review, digraphs, numbers, shift, interleaved focus drills.
 */
const drafts: LessonDraft[] = [
  // —— Foundation ——
  { title: "F", keys: ["f"], prompt: "f f f f f f f f", focus: FOCUS.slow },
  { title: "J", keys: ["j"], prompt: "j j j j j j j j", focus: FOCUS.slow },
  { title: "F and J", keys: ["f", "j"], prompt: "f j f j f j f j", focus: FOCUS.rhythm },
  { title: "F and J again", keys: ["f", "j"], prompt: "ff jj f j fj jf f j" },
  { title: "D", keys: ["d", "f"], prompt: "d d d d f d f d" },
  { title: "K", keys: ["j", "k"], prompt: "k k k k j k j k" },
  { title: "D and K", keys: ["d", "f", "j", "k"], prompt: "d k d k f j d k", focus: FOCUS.rhythm },
  { title: "Index stretch", keys: ["d", "f", "j", "k"], prompt: "df jk fd kj d f j k" },
  { title: "S", keys: ["s", "d", "f"], prompt: "s s s s d f s d" },
  { title: "L", keys: ["j", "k", "l"], prompt: "l l l l k j l k" },
  { title: "S and L", keys: ["s", "d", "f", "j", "k", "l"], prompt: "s l s l d k f j" },
  { title: "Middle six", keys: ["s", "d", "f", "j", "k", "l"], prompt: "sdf jkl fds lkj" },
  { title: "A", keys: ["a", "s", "d", "f"], prompt: "a a a a s d f a" },
  { title: "Semicolon", keys: ["j", "k", "l", ";"], prompt: "; ; ; ; l k j ;" },
  { title: "Home row", keys: ["a", "s", "d", "f", "j", "k", "l", ";"], prompt: "asdf jkl; asdf jkl;" },
  { title: "Home row slow", keys: ["a", "s", "d", "f", "j", "k", "l", ";"], prompt: "a s d f j k l ;", focus: FOCUS.slow },
  { title: "Home pairs", keys: ["a", "s", "d", "f", "j", "k", "l", ";"], prompt: "as df jk l; sa fd" },
  { title: "Left hand home", keys: ["a", "s", "d", "f"], prompt: "asdf fdsa asdf asdf" },
  { title: "Right hand home", keys: ["j", "k", "l", ";"], prompt: "jkl; ;lkj jkl; jkl;" },
  { title: "Home words I", keys: ["a", "s", "d", "f", "j", "k", "l", ";"], prompt: "as ask sad dad all", focus: FOCUS.words },
  { title: "Home words II", keys: ["a", "s", "d", "f", "j", "k", "l", ";"], prompt: "fall salad flask" },
  { title: "Home words III", keys: ["a", "s", "d", "f", "j", "k", "l", ";"], prompt: "lad asks dad; lass" },
  { title: "G", keys: ["a", "s", "d", "f", "g"], prompt: "g g g f g f g a", focus: FOCUS.stretch },
  { title: "H", keys: ["h", "j", "k", "l", ";"], prompt: "h h h j h j h ;", focus: FOCUS.stretch },
  { title: "G and H", keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"], prompt: "g h f j g h as hj" },
  { title: "Full home", keys: [...HOME], prompt: "asdfg hjkl; glass" },
  { title: "Home line", keys: [...HOME], prompt: "a sad lad has a flask", focus: FOCUS.words },
  { title: "R", keys: ["a", "s", "d", "f", "r"], prompt: "r r r f r d r a" },
  { title: "U", keys: ["u", "j", "k", "l", ";"], prompt: "u u u j u k u ;" },
  { title: "R and U", keys: ["a", "s", "d", "f", "r", "u", "j", "k", "l"], prompt: "r u far jar dark" },
  { title: "E", keys: ["a", "s", "d", "f", "e"], prompt: "e e e d e s e a" },
  { title: "I", keys: ["i", "j", "k", "l", ";"], prompt: "i i i k i j i ;" },
  { title: "E and I", keys: ["a", "s", "d", "f", "e", "i", "j", "k", "l"], prompt: "e i side like desk" },
  { title: "W", keys: ["a", "s", "d", "f", "w"], prompt: "w w w s w a w d" },
  { title: "O", keys: ["o", "j", "k", "l", ";"], prompt: "o o o l o k o ;" },
  { title: "W and O", keys: ["a", "s", "d", "f", "w", "o", "r", "j", "k", "l"], prompt: "w o word fold also" },
  { title: "Q", keys: ["a", "s", "d", "f", "q"], prompt: "q q q a q s q f" },
  { title: "P", keys: ["p", "j", "k", "l", ";"], prompt: "p p p ; p l p j" },
  { title: "Top row left", keys: ["q", "w", "e", "r", "a", "s", "d", "f"], prompt: "qwer asdf wear read" },
  { title: "Top row right", keys: ["u", "i", "o", "p", "j", "k", "l", ";"], prompt: "uiop jkl; oil; pull" },
  { title: "T", keys: ["a", "s", "d", "f", "t"], prompt: "t t t f t d t a" },
  { title: "Y", keys: ["y", "j", "k", "l", ";"], prompt: "y y y j y k y ;" },
  { title: "T and Y", keys: ["a", "s", "d", "f", "t", "y", "i", "j", "k", "l"], prompt: "t y stay tidy last" },
  { title: "V", keys: ["a", "s", "d", "f", "v"], prompt: "v v v f v d v a" },
  { title: "M", keys: ["m", "j", "k", "l", ";"], prompt: "m m m j m k m ;" },
  { title: "C and N", keys: ["c", "n", "a", "s", "d", "f", "j", "k", "l"], prompt: "c n can scan land" },
  { title: "B and comma", keys: ["b", ",", "a", "s", "d", "f", "j", "k", "l"], prompt: "b , ball, ask, fall," },
  { title: "Z X period", keys: ["z", "x", ".", "a", "s", "d", "f", "j", "k", "l"], prompt: "z x . jazz. sax. lax." },
  {
    title: "Short lines",
    keys: [...ALPHA],
    prompt: "type a calm line. rest. type again.",
    focus: FOCUS.breath,
  },
  {
    title: "One more pass",
    keys: [...ALPHA],
    prompt: "keep your hands still. let the keys find you.",
    focus: FOCUS.still,
  },

  // —— Spaced home review ——
  {
    title: "Home return",
    keys: [...HOME],
    prompt: "asdf jkl; fdsa ;lkj asdfg hjkl;",
    focus: FOCUS.review,
  },
  {
    title: "Home focus slow",
    keys: [...HOME],
    prompt: "a s d f g h j k l ;",
    focus: FOCUS.slow,
  },
  {
    title: "Left home pulse",
    keys: [...HOME_LEFT],
    prompt: "asdfg gfdsa as df fg ga",
    focus: FOCUS.rhythm,
  },
  {
    title: "Right home pulse",
    keys: [...HOME_RIGHT],
    prompt: "hjkl; ;lkjh hj kl l; ;h",
    focus: FOCUS.rhythm,
  },
  {
    title: "Home words review",
    keys: [...HOME],
    prompt: "a flask; a salad; a sad lad asks",
    focus: FOCUS.words,
  },

  // —— Digraphs & high-frequency pairs ——
  {
    title: "TH digraph",
    keys: ["t", "h", "e", "a", "s", "d", "f", "j", "k", "l"],
    prompt: "th th the that this then",
    focus: FOCUS.digraph,
  },
  {
    title: "ER digraph",
    keys: ["e", "r", "a", "s", "d", "f", "j", "k", "l"],
    prompt: "er er her were there after",
    focus: FOCUS.digraph,
  },
  {
    title: "IN digraph",
    keys: ["i", "n", "a", "s", "d", "f", "j", "k", "l"],
    prompt: "in in find kind land inland",
    focus: FOCUS.digraph,
  },
  {
    title: "ON digraph",
    keys: ["o", "n", "a", "s", "d", "f", "j", "k", "l"],
    prompt: "on on one only onto none",
    focus: FOCUS.digraph,
  },
  {
    title: "AN digraph",
    keys: ["a", "n", "d", "s", "f", "j", "k", "l"],
    prompt: "an an and land sand hand",
    focus: FOCUS.digraph,
  },
  {
    title: "ING ending",
    keys: ["i", "n", "g", "a", "s", "d", "f", "j", "k", "l", "t", "r"],
    prompt: "ing typing resting finding",
    focus: FOCUS.digraph,
  },
  {
    title: "Common pairs",
    keys: [...HOME, "e", "r", "t", "i", "n", "o"],
    prompt: "he the to of in on er at",
    focus: FOCUS.mix,
  },
  {
    title: "Alternating hands",
    keys: [...HOME, "e", "i", "r", "u"],
    prompt: "if he is as or to for the",
    focus: FOCUS.rhythm,
  },

  // —— Top row mastery ——
  {
    title: "Top row review",
    keys: [...TOP, ...HOME],
    prompt: "qwerty uiop read write type quiet",
    focus: FOCUS.review,
  },
  {
    title: "WE and OR",
    keys: ["w", "e", "o", "r", "a", "s", "d", "f", "j", "k", "l"],
    prompt: "we or word were lower power",
    focus: FOCUS.digraph,
  },
  {
    title: "QU cluster",
    keys: ["q", "u", "a", "s", "d", "f", "j", "k", "l", "e", "i", "t"],
    prompt: "qu quiet quite equal request",
    focus: FOCUS.digraph,
  },
  {
    title: "TY and OU",
    keys: ["t", "y", "o", "u", "a", "s", "d", "f", "j", "k", "l", "e", "r"],
    prompt: "ty ou you your they out",
    focus: FOCUS.digraph,
  },
  {
    title: "Top words I",
    keys: [...TOP, ...HOME],
    prompt: "write quiet poetry. type with ease.",
    focus: FOCUS.words,
  },
  {
    title: "Top words II",
    keys: [...TOP, ...HOME],
    prompt: "please report your weekly output.",
    focus: FOCUS.words,
  },

  // —— Bottom row mastery ——
  {
    title: "Bottom review",
    keys: [...BOTTOM, ...HOME],
    prompt: "zxcv bnm,./ calm. next. move.",
    focus: FOCUS.review,
  },
  {
    title: "CN and VM",
    keys: ["c", "n", "v", "m", "a", "s", "d", "f", "j", "k", "l"],
    prompt: "cn vm can van move calm",
    focus: FOCUS.stretch,
  },
  {
    title: "Comma and period",
    keys: [",", ".", ...HOME, "t", "h", "e", "i", "n"],
    prompt: "yes, no. wait, then. go, now.",
    focus: FOCUS.slow,
  },
  {
    title: "Slash path",
    keys: ["/", ...HOME, "t", "o", "p", "i", "n"],
    prompt: "to/from in/out tip/top",
    focus: FOCUS.stretch,
  },
  {
    title: "Bottom words",
    keys: [...BOTTOM, ...HOME, "e", "i", "o", "u", "r", "t"],
    prompt: "mix. combine. next move, then rest.",
    focus: FOCUS.words,
  },

  // —— Interleaved full-letter practice ——
  {
    title: "Interleave A",
    keys: [...ALPHA],
    prompt: "the quick brown fox jumps.",
    focus: FOCUS.mix,
  },
  {
    title: "Interleave B",
    keys: [...ALPHA],
    prompt: "pack my box with five dozen.",
    focus: FOCUS.mix,
  },
  {
    title: "Focus clusters",
    keys: [...ALPHA],
    prompt: "asdf. jkl;. qwer. uiop. zxcv.",
    focus: FOCUS.breath,
  },
  {
    title: "Same finger care",
    keys: [...ALPHA],
    prompt: "ede kik frf juj sws lol",
    focus: FOCUS.slow,
  },
  {
    title: "Reach and return",
    keys: [...ALPHA],
    prompt: "t g b y h n r f v u j m",
    focus: FOCUS.stretch,
  },
  {
    title: "Sentence calm I",
    keys: [...ALPHA],
    prompt: "breathe in. type the next word. breathe out.",
    focus: FOCUS.breath,
  },
  {
    title: "Sentence calm II",
    keys: [...ALPHA],
    prompt: "keep a steady pace. let mistakes wait.",
    focus: FOCUS.still,
  },

  // —— Numbers ——
  {
    title: "Left numbers",
    keys: ["1", "2", "3", "4", "5", "6", "a", "s", "d", "f"],
    prompt: "1 2 3 4 5 6 12 34 56",
    focus: FOCUS.numbers,
  },
  {
    title: "Right numbers",
    keys: ["7", "8", "9", "0", "=", "j", "k", "l", ";"],
    prompt: "7 8 9 0 = 78 90 70",
    focus: FOCUS.numbers,
  },
  {
    title: "Number row",
    keys: [...NUM, "a", "s", "d", "f", "j", "k", "l"],
    prompt: "123456 7890= 135 246 70",
    focus: FOCUS.numbers,
  },
  {
    title: "Dates and codes",
    keys: [...NUM, ...HOME],
    prompt: "2026 10 01 code 42 = 7",
    focus: FOCUS.numbers,
  },
  {
    title: "Mixed digits",
    keys: [...NUM, ...ALPHA],
    prompt: "room 12. aisle 3. gate 7.",
    focus: FOCUS.mix,
  },

  // —— Shift / capitals (exact case required) ——
  {
    title: "Shift left",
    keys: ["shift", "a", "s", "d", "f", "g"],
    prompt: "A S D F G As Df",
    focus: FOCUS.shift,
  },
  {
    title: "Shift right",
    keys: ["shift", "h", "j", "k", "l"],
    prompt: "H J K L Hj Kl",
    focus: FOCUS.shift,
  },
  {
    title: "Capital starts",
    keys: ["shift", ...ALPHA],
    prompt: "The. And. But. For. Not.",
    focus: FOCUS.shift,
  },
  {
    title: "Names",
    keys: ["shift", ...ALPHA],
    prompt: "Ada. Linus. Grace. Alan.",
    focus: FOCUS.shift,
  },
  {
    title: "Title case line",
    keys: ["shift", ...ALPHA],
    prompt: "Learn To Type On This Board.",
    focus: FOCUS.shift,
  },

  // —— Common English flow ——
  {
    title: "Function words",
    keys: [...ALPHA],
    prompt: "the of and to a in that is for",
    focus: FOCUS.words,
  },
  {
    title: "Short sentences",
    keys: [...ALPHA],
    prompt: "it is time. you can do this.",
    focus: FOCUS.words,
  },
  {
    title: "Everyday line",
    keys: [...ALPHA],
    prompt: "meet me at the desk after lunch.",
    focus: FOCUS.words,
  },
  {
    title: "Work words",
    keys: [...ALPHA],
    prompt: "send the file. review the plan. ship it.",
    focus: FOCUS.words,
  },
  {
    title: "Soft focus passage",
    keys: [...ALPHA],
    prompt: "when attention drifts, return to the next key.",
    focus: FOCUS.breath,
  },

  // —— Split coordination ——
  {
    title: "Left lead",
    keys: [...HOME_LEFT, "q", "w", "e", "r", "t", "z", "x", "c", "v", "b"],
    prompt: "was were great create better",
    focus: FOCUS.rhythm,
  },
  {
    title: "Right lead",
    keys: [...HOME_RIGHT, "y", "u", "i", "o", "p", "n", "m", ",", ".", "/"],
    prompt: "you only look up. join in.",
    focus: FOCUS.rhythm,
  },
  {
    title: "Cross board",
    keys: [...ALPHA],
    prompt: "left then right then both together.",
    focus: FOCUS.rhythm,
  },
  {
    title: "Thumb space focus",
    keys: [...HOME, "e", "t", "i", "o", "n"],
    prompt: "a soft  space  between  each  word",
    focus: FOCUS.slow,
  },

  // —— Accuracy / attention drills ——
  {
    title: "No rush",
    keys: [...ALPHA],
    prompt: "s l o w   a n d   c l e a n",
    focus: FOCUS.slow,
  },
  {
    title: "Error recovery",
    keys: [...ALPHA],
    prompt: "miss then fix. wait for the right key.",
    focus: FOCUS.still,
  },
  {
    title: "Three word bursts",
    keys: [...ALPHA],
    prompt: "type this now. pause. type this now.",
    focus: FOCUS.breath,
  },
  {
    title: "Punctuation flow",
    keys: [...ALPHA],
    prompt: "yes; no. maybe, later. done.",
    focus: FOCUS.slow,
  },

  // —— Numbers + letters mastery ——
  {
    title: "Addr style",
    keys: [...FULL],
    prompt: "apt 4b. floor 12. box 90.",
    focus: FOCUS.mix,
  },
  {
    title: "Version line",
    keys: [...FULL],
    prompt: "v1.2.0 build 48 = ready",
    focus: FOCUS.numbers,
  },
  {
    title: "Mixed case code",
    keys: [...FULL],
    prompt: "Key Set 7. Path /home/user.",
    focus: FOCUS.shift,
  },

  // —— Bridging drills (fill to full mastery path) ——
  {
    title: "Home echo",
    keys: [...HOME],
    prompt: "ask dad; fall; glass; flask; hall",
    focus: FOCUS.review,
  },
  {
    title: "ST and ND",
    keys: ["s", "t", "n", "d", "a", "e", "i", "o", "f", "j", "k", "l"],
    prompt: "st nd first stand end and",
    focus: FOCUS.digraph,
  },
  {
    title: "ED ending",
    keys: ["e", "d", "a", "s", "f", "j", "k", "l", "t", "r", "n"],
    prompt: "ed typed rested learned",
    focus: FOCUS.digraph,
  },
  {
    title: "Number words",
    keys: [...NUM, ...ALPHA],
    prompt: "one 1 two 2 ten 10 zero 0",
    focus: FOCUS.numbers,
  },
  {
    title: "Shift sentence",
    keys: ["shift", ...ALPHA],
    prompt: "Start slow. Finish clean. Repeat often.",
    focus: FOCUS.shift,
  },
  {
    title: "Attention reset",
    keys: [...ALPHA],
    prompt: "stop. look at the line. begin again.",
    focus: FOCUS.breath,
  },
  {
    title: "Balance both sides",
    keys: [...ALPHA],
    prompt: "left hand, right hand, then both in time.",
    focus: FOCUS.rhythm,
  },

  // —— Final mastery ——
  {
    title: "Pangram I",
    keys: [...ALPHA],
    prompt: "the five boxing wizards jump quickly.",
    focus: FOCUS.mastery,
  },
  {
    title: "Pangram II",
    keys: [...ALPHA],
    prompt: "how vexingly quick daft zebras jump.",
    focus: FOCUS.mastery,
  },
  {
    title: "Master line I",
    keys: [...FULL],
    prompt: "Ataraxia. Calm hands, clear mind, clean keys.",
    focus: FOCUS.mastery,
  },
  {
    title: "Master line II",
    keys: [...FULL],
    prompt: "Practice on day 1. Review on day 7. Keep going.",
    focus: FOCUS.mastery,
  },
  {
    title: "Master line III",
    keys: [...FULL],
    prompt: "Type what you mean. Rest when you finish. Begin again.",
    focus: FOCUS.mastery,
  },
  {
    title: "Quiet finish",
    keys: [...ALPHA],
    prompt: "hands still. eyes soft. one last clean line.",
    focus: FOCUS.still,
  },
];

function keysCoveringPrompt(keys: string[], prompt: string): string[] {
  const set = new Set(keys);
  for (const ch of prompt) {
    if (ch === " ") continue;
    if (/[A-Z]/.test(ch)) {
      set.add("shift");
      set.add(ch.toLowerCase());
    } else {
      set.add(ch);
    }
  }
  return [...set];
}

export const lessons: Lesson[] = drafts.map((draft, index) => ({
  id: slug(draft.title, index),
  title: draft.title,
  keys: keysCoveringPrompt(draft.keys, draft.prompt),
  prompt: draft.prompt,
  ...(draft.focus ? { focus: draft.focus } : {}),
}));

export const LESSON_COUNT = lessons.length;

if (LESSON_COUNT !== drafts.length) {
  throw new Error("Lesson map length drifted from drafts");
}

if (LESSON_COUNT < 100) {
  throw new Error(`Expected at least 100 lessons, found ${LESSON_COUNT}`);
}

/** Dev-time guard: every non-space prompt char must be highlightable. */
const curriculumIssues: string[] = [];
for (const lesson of lessons) {
  const keySet = new Set(lesson.keys.map((k) => k.toLowerCase()));
  for (const ch of lesson.prompt) {
    if (ch === " ") continue;
    const id = /[A-Z]/.test(ch) ? ch.toLowerCase() : ch;
    if (!keySet.has(id)) {
      curriculumIssues.push(
        `Lesson "${lesson.id}" prompt uses "${ch}" but keys omit "${id}"`,
      );
    }
    if (/[A-Z]/.test(ch) && !keySet.has("shift")) {
      curriculumIssues.push(
        `Lesson "${lesson.id}" uses capital "${ch}" but keys omit "shift"`,
      );
    }
  }
}
if (curriculumIssues.length > 0) {
  throw new Error(curriculumIssues.join("\n"));
}

export const lessonIds = lessons.map((l) => l.id);

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getAdjacentLessonIds(id: string): {
  prevId: string | null;
  nextId: string | null;
} {
  const index = lessonIds.indexOf(id);
  if (index < 0) return { prevId: null, nextId: null };
  return {
    prevId: index > 0 ? lessonIds[index - 1] : null,
    nextId: index < lessonIds.length - 1 ? lessonIds[index + 1] : null,
  };
}
