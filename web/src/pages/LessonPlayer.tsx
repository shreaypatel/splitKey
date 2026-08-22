import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { SplitHint } from "../components/SplitHint";
import { TypeSurface } from "../components/TypeSurface";
import { getAdjacentLessonIds, getLessonById, lessonIds } from "../lib/lessons";
import {
  isLessonUnlocked,
  loadProgress,
  markLessonComplete,
} from "../lib/progress";
import {
  createSession,
  isErrorFlashing,
  type TypingSession,
} from "../lib/typingEngine";
import { useTypingInput } from "../lib/useTypingInput";
import "./LessonPlayer.css";

const ERROR_FLASH_MS = 350;

/** Remount on lesson id so session/progress effects never leak across lessons. */
export function LessonPlayer() {
  const { id = "" } = useParams();
  return <LessonPlayerInner key={id} id={id} />;
}

function LessonPlayerInner({ id }: { id: string }) {
  const lesson = getLessonById(id);
  const { prevId, nextId } = getAdjacentLessonIds(id);
  const lessonIndex = lessonIds.indexOf(id);
  const [progress, setProgress] = useState(() => loadProgress());
  const [session, setSession] = useState<TypingSession | null>(() =>
    lesson ? createSession(lesson.prompt) : null,
  );
  const [now, setNow] = useState(() => Date.now());
  const savedRef = useRef(false);

  const unlocked =
    lessonIndex >= 0 && isLessonUnlocked(progress, lessonIds, lessonIndex);
  const nextUnlocked =
    nextId !== null &&
    lessonIndex >= 0 &&
    (Boolean(session?.finished) ||
      isLessonUnlocked(progress, lessonIds, lessonIndex + 1));

  useEffect(() => {
    if (!lesson || !session?.finished || savedRef.current) return;
    if (session.prompt !== lesson.prompt) return;
    savedRef.current = true;
    setProgress(markLessonComplete(loadProgress(), lesson.id));
  }, [lesson, session]);

  useTypingInput(session, {
    enabled: Boolean(lesson && unlocked && session && !session.finished),
    onSessionChange: setSession,
    onTick: () => setNow(Date.now()),
  });

  useEffect(() => {
    if (!session?.lastErrorAt) return;
    const remaining = ERROR_FLASH_MS - (Date.now() - session.lastErrorAt);
    if (remaining <= 0) return;
    const timer = window.setTimeout(() => setNow(Date.now()), remaining + 16);
    return () => window.clearTimeout(timer);
  }, [session?.lastErrorAt]);

  const restart = useCallback(() => {
    if (!lesson) return;
    setSession(createSession(lesson.prompt));
    savedRef.current = false;
    setNow(Date.now());
  }, [lesson]);

  if (!lesson || !unlocked) {
    return <Navigate to="/lessons" replace />;
  }

  if (!session) return null;

  const showErrorFlash = isErrorFlashing(session, now, ERROR_FLASH_MS);
  const activeKey = session.finished
    ? null
    : (session.prompt[session.caret] ?? null);

  return (
    <section className="page lesson-player">
      <header className="lesson-player__header">
        <div className="lesson-player__trail">
          {prevId ? (
            <Link className="btn-text" to={`/lessons/${prevId}`}>
              Previous
            </Link>
          ) : (
            <span className="lesson-player__trail-spacer" aria-hidden />
          )}
          <Link className="btn-text" to="/lessons">
            All lessons
          </Link>
          {nextId && nextUnlocked ? (
            <Link className="btn-text" to={`/lessons/${nextId}`}>
              Next
            </Link>
          ) : (
            <span className="lesson-player__trail-spacer" aria-hidden />
          )}
        </div>
        <p className="lesson-player__eyebrow">
          Lesson {lessonIndexLabel(id)}
        </p>
        <h1 className="lesson-player__title">{lesson.title}</h1>
        <p className="lesson-player__hint muted">
          {lesson.focus ??
            "Type the line. Wrong keys stay put until you hit the right one."}
        </p>
      </header>

      <div className="lesson-player__stage glass-panel">
        <TypeSurface session={session} showErrorFlash={showErrorFlash} />
        <SplitHint highlightKeys={lesson.keys} activeKey={activeKey} />
      </div>

      {session.finished && (
        <div className="lesson-player__complete" role="status">
          <p className="lesson-player__complete-title">That’s it.</p>
          <p className="muted">Line finished. Go again or move on.</p>
          <div className="lesson-player__actions">
            <button type="button" className="btn-ghost" onClick={restart}>
              Again
            </button>
            {nextId && nextUnlocked ? (
              <Link className="btn" to={`/lessons/${nextId}`}>
                Next lesson
              </Link>
            ) : (
              <Link className="btn" to="/lessons">
                All lessons
              </Link>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function lessonIndexLabel(id: string): string {
  const match = /^(\d+)/.exec(id);
  return match?.[1] ?? "—";
}
