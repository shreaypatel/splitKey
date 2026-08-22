/** Normalize browser key values to Ataraxia board key ids. */
export function normalizeBoardKey(raw: string): string {
  const key = raw.toLowerCase();
  if (key === " ") return " ";
  if (key === "backspace" || key === "bspc") return "backspace";
  if (key === "enter" || key === "return" || key === "ret" || key === "escape" || key === "esc") {
    return "enter";
  }
  if (key === "shift" || key === "lshift" || key === "rshift") return "shift";
  if (key === "control" || key === "ctrl" || key === "lctrl" || key === "rctrl") {
    return "ctrl";
  }
  if (key === "tab") return "tab";
  return key;
}

export function isTypingKey(key: string): boolean {
  return key === "Backspace" || key.length === 1;
}
