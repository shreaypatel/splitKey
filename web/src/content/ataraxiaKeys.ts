/**
 * Keycap positions extracted from Ataraxia DXFs and mapped into the
 * same 140×130 viewBox as the case outlines:
 * - leftKeyOutlineMain.dxf / leftkeyOutlineThumbCluster.dxf
 * - rightkeyoutlinemain.dxf / rightkeyoutlinethumbcluster.dxf
 */
export type BoardKey = {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const LABEL: Record<string, string> = {
  tab: "⇥",
  shift: "⇧",
  ctrl: "⌃",
  backspace: "⌫",
  enter: "⏎",
  " ": "␣",
};

function L(id: string, x: number, y: number, s = 11.69): BoardKey {
  return { id, label: LABEL[id] ?? id, x, y, w: s, h: s };
}

function R(id: string, x: number, y: number, s = 11.68): BoardKey {
  return { id, label: LABEL[id] ?? id, x, y, w: s, h: s };
}

/** Left half — outer column to inner, then thumbs. */
export const LEFT_KEYS: BoardKey[] = [
  L("1", 18.64, 28.66),
  L("tab", 18.64, 43.91),
  L("shift", 18.64, 59.15),
  L("ctrl", 18.64, 74.4),
  L("2", 33.89, 24.85),
  L("q", 33.89, 40.09),
  L("a", 33.89, 55.34),
  L("z", 33.89, 70.59),
  L("3", 49.14, 21.04),
  L("w", 49.14, 36.28),
  L("s", 49.14, 51.53),
  L("x", 49.14, 66.78),
  L("4", 64.38, 21.04),
  L("e", 64.38, 36.28),
  L("d", 64.38, 51.53),
  L("c", 64.38, 66.78),
  L("5", 79.63, 24.85),
  L("r", 79.63, 40.09),
  L("f", 79.63, 55.34),
  L("v", 79.63, 70.59),
  L("6", 94.88, 28.66),
  L("t", 94.88, 43.91),
  L("g", 94.88, 59.15),
  L("b", 94.88, 74.4),
  L(" ", 79.63, 93.46),
  L("backspace", 94.88, 97.27),
];

/** Right half — inner column to outer, then thumbs. */
export const RIGHT_KEYS: BoardKey[] = [
  R("7", 33.38, 28.64),
  R("y", 33.38, 43.88),
  R("h", 33.38, 59.12),
  R("n", 33.38, 74.36),
  R("8", 48.62, 24.83),
  R("u", 48.62, 40.07),
  R("j", 48.62, 55.31),
  R("m", 48.62, 70.55),
  R("9", 63.87, 21.02),
  R("i", 63.87, 36.26),
  R("k", 63.87, 51.5),
  R(",", 63.87, 66.74),
  R("0", 79.11, 21.02),
  R("o", 79.11, 36.26),
  R("l", 79.11, 51.5),
  R(".", 79.11, 66.74),
  R("=", 94.35, 24.83),
  R("p", 94.35, 40.07),
  R(";", 94.35, 55.31),
  R("/", 94.35, 70.55),
  R("backspace", 109.59, 28.64),
  R("enter", 109.59, 43.88),
  R("shift", 109.59, 59.12),
  R("ctrl", 109.59, 74.36),
  R("enter", 33.38, 97.23),
  R(" ", 48.62, 93.42),
];
