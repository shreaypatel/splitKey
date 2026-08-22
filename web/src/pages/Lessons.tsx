import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { lessonIds, lessons, LESSON_COUNT } from "../lib/lessons";
import {
  isLessonCompleted,
  isLessonUnlocked,
  loadProgress,
  resetProgress,
  setUnlockedAll,
  type ProgressState,
} from "../lib/progress";
import "./Lessons.css";

function LockIcon() {
  return (
    <svg
      className="lessons__icon"
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function LessonCell({
  lessonId,
  title,
  index,
  completed,
  unlocked,
}: {
  lessonId: string;
  title: string;
  index: number;
  completed: boolean;
  unlocked: boolean;
}) {
  const indexLabel = String(index + 1).padStart(2, "0");

  if (unlocked) {
    return (
      <Link
        className={`lessons__link${completed ? " lessons__link--done" : ""}`}
        to={`/lessons/${lessonId}`}
      >
        <span className="lessons__index">{indexLabel}</span>
        <span className="lessons__name">{title}</span>
        <span className="lessons__status">
          {completed ? "Done" : ""}
        </span>
      </Link>
    );
  }

  return (
    <div className="lessons__link lessons__link--locked" aria-disabled="true">
      <span className="lessons__index">{indexLabel}</span>
      <span className="lessons__name">{title}</span>
      <span className="lessons__status" aria-label="Locked">
        <LockIcon />
      </span>
    </div>
  );
}

export function Lessons() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());

  const onReset = useCallback(() => {
    const confirmed = window.confirm(
      "Clear all lesson progress? This cannot be undone.",
    );
    if (!confirmed) return;
    setProgress(resetProgress(loadProgress()));
  }, []);

  const onToggleUnlock = useCallback(() => {
    const current = loadProgress();
    setProgress(setUnlockedAll(current, !current.unlockedAll));
  }, []);

  const rows: { left: number; right: number | null }[] = [];
  for (let i = 0; i < lessons.length; i += 2) {
    rows.push({ left: i, right: i + 1 < lessons.length ? i + 1 : null });
  }

  return (
    <section className="page lessons">
      <header className="lessons__header">
        <div className="lessons__top">
          <div className="lessons__actions">
            <button
              type="button"
              className={`btn-ghost lessons__action${progress.unlockedAll ? " lessons__action--on" : ""}`}
              onClick={onToggleUnlock}
              aria-pressed={progress.unlockedAll}
              aria-label={
                progress.unlockedAll
                  ? "Lock lesson order"
                  : "Unlock all lessons"
              }
              title={
                progress.unlockedAll
                  ? "Lock lesson order"
                  : "Unlock all lessons"
              }
            >
              {progress.unlockedAll ? (
                <svg
                  className="lessons__icon"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
              ) : (
                <svg
                  className="lessons__icon"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 7.5-1.9" />
                </svg>
              )}
            </button>
            <button
              type="button"
              className="btn-ghost lessons__action"
              onClick={onReset}
              aria-label="Reset progress"
              title="Reset progress"
            >
              <svg
                className="lessons__icon"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3.5 12a8.5 8.5 0 1 0 2.1-5.6" />
                <path d="M3.5 4.5v5h5" />
              </svg>
            </button>
          </div>
        </div>
        <h1 className="lessons__title">Lessons</h1>
        <p className="lessons__subtitle">One step at a time.</p>
        <p className="lessons__intro muted">
          Index fingers on F and J. {LESSON_COUNT} short drills cover foundation,
          spaced review, digraphs, numbers, and shift, with focus cues on each
          line. Finish one to open the next, or unlock the whole list.
        </p>
      </header>

      <ol className="lessons__list">
        {rows.map(({ left, right }) => {
          const leftLesson = lessons[left]!;
          const rightLesson = right !== null ? lessons[right] : null;

          return (
            <li key={leftLesson.id} className="lessons__row">
              <LessonCell
                lessonId={leftLesson.id}
                title={leftLesson.title}
                index={left}
                completed={isLessonCompleted(progress, leftLesson.id)}
                unlocked={isLessonUnlocked(progress, lessonIds, left)}
              />
              {rightLesson ? (
                <LessonCell
                  lessonId={rightLesson.id}
                  title={rightLesson.title}
                  index={right as number}
                  completed={isLessonCompleted(progress, rightLesson.id)}
                  unlocked={isLessonUnlocked(progress, lessonIds, right as number)}
                />
              ) : (
                <div className="lessons__link lessons__link--empty" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
