import { useEffect, useRef } from "react";
import { isTypingKey } from "./keys";
import { handleKey, type TypingSession } from "./typingEngine";

type Options = {
  enabled: boolean;
  /** May return an adjusted session (e.g. live prompt top-up). */
  onSessionChange: (session: TypingSession) => void | TypingSession;
  onTick?: () => void;
};

/**
 * Global keydown handler for typing surfaces.
 * Reads the latest session from a ref so the listener stays stable.
 */
export function useTypingInput(
  session: TypingSession | null,
  { enabled, onSessionChange, onTick }: Options,
): void {
  const sessionRef = useRef(session);
  const enabledRef = useRef(enabled);
  const onSessionChangeRef = useRef(onSessionChange);
  const onTickRef = useRef(onTick);

  sessionRef.current = session;
  enabledRef.current = enabled;
  onSessionChangeRef.current = onSessionChange;
  onTickRef.current = onTick;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const current = sessionRef.current;
      if (!enabledRef.current || !current || current.finished) return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      if (event.key === "Tab") {
        event.preventDefault();
        return;
      }

      if (!isTypingKey(event.key)) return;

      event.preventDefault();
      const next = handleKey(current, event.key);
      if (next !== current) {
        const applied = onSessionChangeRef.current(next) ?? next;
        sessionRef.current = applied;
      }
      onTickRef.current?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
