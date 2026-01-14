import './Navigation.css';

export function Navigation({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onGoToSlide,
  language
}) {
  return (
    <div className="navigation">
      {/* Previous Button */}
      <button
        className={`nav-button nav-button-prev ${currentSlide === 0 ? 'disabled' : ''}`}
        onClick={onPrevious}
        disabled={currentSlide === 0}
        aria-label={language === 'en' ? 'Previous slide' : '上一页'}
      >
        ←
      </button>

      {/* Progress Indicator */}
      <div className="progress-indicator">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`progress-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => onGoToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Next Button */}
      <button
        className={`nav-button nav-button-next ${currentSlide === totalSlides - 1 ? 'disabled' : ''}`}
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        aria-label={language === 'en' ? 'Next slide' : '下一页'}
      >
        →
      </button>
    </div>
  );
}
