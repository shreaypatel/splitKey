import "./MobileGate.css";

export function MobileGate() {
  return (
    <div className="mobile-gate" role="dialog" aria-modal="true" aria-labelledby="mobile-gate-title">
      <p className="mobile-gate__brand">Ataraxia</p>
      <h1 id="mobile-gate-title" className="mobile-gate__title">
        This site is built for a computer
      </h1>
      <p className="mobile-gate__body">
        Open it on a PC or laptop with a keyboard. Touch typing lessons need a
        full keyboard. Phones and tablets won’t work well here.
      </p>
    </div>
  );
}
