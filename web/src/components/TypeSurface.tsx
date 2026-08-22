import { memo, useMemo } from "react";
import type { TypingSession } from "../lib/typingEngine";
import "./TypeSurface.css";

type Props = {
  session: TypingSession;
  showErrorFlash: boolean;
};

type PromptToken = {
  text: string;
  start: number;
  isWord: boolean;
};

function TypeSurfaceComponent({ session, showErrorFlash }: Props) {
  const { prompt, caret } = session;

  const tokens = useMemo((): PromptToken[] => {
    const parts = prompt.split(/(\s+)/);
    const out: PromptToken[] = [];
    let start = 0;
    for (const part of parts) {
      if (part.length === 0) continue;
      out.push({
        text: part,
        start,
        isWord: !/^\s+$/.test(part),
      });
      start += part.length;
    }
    return out;
  }, [prompt]);

  return (
    <div
      className={`type-surface${showErrorFlash ? " type-surface--error" : ""}`}
      aria-live="polite"
    >
      <p className="type-surface__prompt">
        {tokens.map((token) => {
          const chars = token.text.split("");
          const body = chars.map((char, offset) => {
            const index = token.start + offset;
            const state =
              index < caret
                ? "correct"
                : index === caret
                  ? "current"
                  : "pending";

            return (
              <span
                key={index}
                className={`type-surface__char type-surface__char--${state}`}
              >
                {index === caret && (
                  <span className="type-surface__caret" aria-hidden />
                )}
                {char === " " ? "\u00A0" : char}
              </span>
            );
          });

          if (token.isWord) {
            return (
              <span key={token.start} className="type-surface__word">
                {body}
              </span>
            );
          }

          return <span key={token.start}>{body}</span>;
        })}
      </p>
    </div>
  );
}

export const TypeSurface = memo(TypeSurfaceComponent);
