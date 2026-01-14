import './SlideCounter.css';

export function SlideCounter({ current, total, language, className = '' }) {
  return (
    <div className={`slide-counter ${className}`}>
      <span className="slide-counter-current">{current}</span>
      <span className="slide-counter-separator"> / </span>
      <span className="slide-counter-total">{total}</span>
    </div>
  );
}
