import { memo, useMemo } from "react";
import {
  LEFT_CASE_PATH,
  OUTLINE_VIEWBOX,
  RIGHT_CASE_PATH,
} from "../content/ataraxiaOutlines";
import { LEFT_KEYS, RIGHT_KEYS, type BoardKey } from "../content/ataraxiaKeys";
import { normalizeBoardKey } from "../lib/keys";
import "./SplitHint.css";

type Props = {
  highlightKeys: string[];
  activeKey?: string | null;
};

function keyClassName(on: boolean, isActive: boolean): string {
  const classes = ["split-hint__key"];
  if (on) classes.push("split-hint__key--on");
  if (isActive) classes.push("split-hint__key--active");
  return classes.join(" ");
}

function labelClassName(on: boolean, isActive: boolean): string {
  return [
    "split-hint__label",
    on || isActive ? "split-hint__label--on" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

/** Classic backspace legend: left-pointing delete key with an ×. */
function BackspaceIcon({
  x,
  y,
  w,
  h,
  on,
  isActive,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  on: boolean;
  isActive: boolean;
}) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const iw = w * 0.52;
  const ih = h * 0.34;
  const tip = iw * 0.32;
  const left = cx - iw / 2;
  const right = cx + iw / 2;
  const top = cy - ih / 2;
  const bottom = cy + ih / 2;
  const bodyLeft = left + tip;

  const outline = [
    `M ${bodyLeft} ${top}`,
    `L ${right} ${top}`,
    `L ${right} ${bottom}`,
    `L ${bodyLeft} ${bottom}`,
    `L ${left} ${cy}`,
    "Z",
  ].join(" ");

  const cross = w * 0.09;
  const crossCx = cx + iw * 0.06;
  const crossCy = cy;

  return (
    <g
      className={`split-hint__glyph${on || isActive ? " split-hint__glyph--on" : ""}`}
    >
      <path d={outline} />
      <path
        d={`M ${crossCx - cross} ${crossCy - cross} L ${crossCx + cross} ${crossCy + cross} M ${crossCx + cross} ${crossCy - cross} L ${crossCx - cross} ${crossCy + cross}`}
      />
    </g>
  );
}

function KeyLabel({
  keycap,
  on,
  isActive,
}: {
  keycap: BoardKey;
  on: boolean;
  isActive: boolean;
}) {
  if (keycap.id === "backspace") {
    return (
      <BackspaceIcon
        x={keycap.x}
        y={keycap.y}
        w={keycap.w}
        h={keycap.h}
        on={on}
        isActive={isActive}
      />
    );
  }

  return (
    <text
      className={labelClassName(on, isActive)}
      x={keycap.x + keycap.w / 2}
      y={keycap.y + keycap.h / 2 + 0.35}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {keycap.label}
    </text>
  );
}

function HalfBoard({
  side,
  keys,
  highlight,
  active,
}: {
  side: "left" | "right";
  keys: BoardKey[];
  highlight: Set<string>;
  active: string | null;
}) {
  const path = side === "left" ? LEFT_CASE_PATH : RIGHT_CASE_PATH;

  return (
    <svg
      className={`split-hint__board split-hint__board--${side}`}
      viewBox={OUTLINE_VIEWBOX}
      role="presentation"
    >
      <path className="split-hint__case" d={path} />
      {keys.map((key, index) => {
        const on = highlight.has(key.id);
        const isActive = active !== null && key.id === active;
        return (
          <g key={`${side}-${index}`}>
            <rect
              className={keyClassName(on, isActive)}
              x={key.x}
              y={key.y}
              width={key.w}
              height={key.h}
              rx={2}
            />
            <KeyLabel keycap={key} on={on} isActive={isActive} />
          </g>
        );
      })}
    </svg>
  );
}

function SplitHintComponent({ highlightKeys, activeKey = null }: Props) {
  const highlight = useMemo(
    () => new Set(highlightKeys.map(normalizeBoardKey)),
    [highlightKeys],
  );
  const active = activeKey ? normalizeBoardKey(activeKey) : null;

  return (
    <div className="split-hint" aria-hidden>
      <HalfBoard
        side="left"
        keys={LEFT_KEYS}
        highlight={highlight}
        active={active}
      />
      <HalfBoard
        side="right"
        keys={RIGHT_KEYS}
        highlight={highlight}
        active={active}
      />
    </div>
  );
}

export const SplitHint = memo(SplitHintComponent);
