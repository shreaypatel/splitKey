export type TypingSession = {
  prompt: string;
  caret: number;
  correct: number;
  errors: number;
  startedAt: number | null;
  finished: boolean;
  lastErrorAt: number | null;
};

export function createSession(prompt: string): TypingSession {
  return {
    prompt,
    caret: 0,
    correct: 0,
    errors: 0,
    startedAt: null,
    finished: false,
    lastErrorAt: null,
  };
}

/**
 * Lowercase letter drills accept either case (Caps Lock shouldn't block).
 * Uppercase expected chars require an exact match so Shift practice sticks.
 */
function keysMatch(typed: string, expected: string): boolean {
  if (typed === expected) return true;
  if (/^[a-z]$/.test(expected) && /^[a-z]$/i.test(typed)) {
    return typed.toLowerCase() === expected;
  }
  return false;
}

/**
 * Apply a keystroke. Wrong keys count as errors and do not advance.
 * Backspace moves the caret back and decrements the correct count.
 */
export function handleKey(
  session: TypingSession,
  key: string,
  now = Date.now(),
): TypingSession {
  if (session.finished) return session;

  if (key === "Backspace") {
    if (session.caret === 0) return session;
    return {
      ...session,
      caret: session.caret - 1,
      correct: Math.max(0, session.correct - 1),
      lastErrorAt: null,
    };
  }

  if (key.length !== 1) return session;

  const expected = session.prompt[session.caret];
  if (expected === undefined) return session;

  if (!keysMatch(key, expected)) {
    return {
      ...session,
      errors: session.errors + 1,
      lastErrorAt: now,
    };
  }

  const startedAt = session.startedAt ?? now;
  const caret = session.caret + 1;
  return {
    ...session,
    startedAt,
    caret,
    correct: session.correct + 1,
    finished: caret >= session.prompt.length,
    lastErrorAt: null,
  };
}

/** True while an error flash should still be visible. */
export function isErrorFlashing(
  session: TypingSession,
  now = Date.now(),
  durationMs = 350,
): boolean {
  return (
    session.lastErrorAt !== null && now - session.lastErrorAt < durationMs
  );
}

export function countWordsInPrefix(text: string, caret: number): number {
  const typed = text.slice(0, caret);
  if (typed.trim() === "") return 0;
  const words = typed.match(/\S+/g);
  if (!words) return 0;
  const lastWordComplete = /\s$/.test(typed) || caret >= text.length;
  return lastWordComplete ? words.length : words.length - 1;
}
