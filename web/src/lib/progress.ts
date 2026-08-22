const STORAGE_KEY = "ataraxia-typing-progress-v4";

export type LessonResult = {
  completedAt: string;
};

export type ProgressState = {
  completed: Record<string, LessonResult>;
  /** When true, every lesson is open regardless of order. */
  unlockedAll: boolean;
};

function emptyProgress(): ProgressState {
  return { completed: {}, unlockedAll: false };
}

function isLessonResult(value: unknown): value is LessonResult {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as LessonResult).completedAt === "string"
  );
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) {
      return emptyProgress();
    }

    const record = parsed as Record<string, unknown>;
    const completedRaw =
      typeof record.completed === "object" && record.completed !== null
        ? (record.completed as Record<string, unknown>)
        : {};

    const completed: Record<string, LessonResult> = {};
    for (const [id, result] of Object.entries(completedRaw)) {
      if (isLessonResult(result)) completed[id] = result;
    }

    return {
      completed,
      unlockedAll: record.unlockedAll === true,
    };
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Quota or private-mode failures should not break typing.
  }
}

export function isLessonCompleted(
  state: ProgressState,
  lessonId: string,
): boolean {
  return Boolean(state.completed[lessonId]);
}

/** First lesson is always open; later ones need the previous done unless unlocked. */
export function isLessonUnlocked(
  state: ProgressState,
  lessonIds: string[],
  index: number,
): boolean {
  if (state.unlockedAll || index <= 0) return true;
  const previousId = lessonIds[index - 1];
  return previousId ? isLessonCompleted(state, previousId) : false;
}

export function markLessonComplete(
  state: ProgressState,
  lessonId: string,
): ProgressState {
  const updated: ProgressState = {
    ...state,
    completed: {
      ...state.completed,
      [lessonId]: {
        completedAt: new Date().toISOString(),
      },
    },
  };
  saveProgress(updated);
  return updated;
}

export function resetProgress(state: ProgressState): ProgressState {
  const updated: ProgressState = {
    completed: {},
    unlockedAll: state.unlockedAll,
  };
  saveProgress(updated);
  return updated;
}

export function setUnlockedAll(
  state: ProgressState,
  unlockedAll: boolean,
): ProgressState {
  const updated: ProgressState = {
    ...state,
    unlockedAll,
  };
  saveProgress(updated);
  return updated;
}
