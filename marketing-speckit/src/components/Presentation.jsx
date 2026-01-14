import { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useNavigation } from '../hooks/useNavigation';
import { Slide } from './Slide';
import { Navigation } from './Navigation';
import { LanguageToggle } from './LanguageToggle';
import { SlideCounter } from './SlideCounter';
import './Presentation.css';

export function Presentation({ slides, initialLanguage = 'en', initialSlide = 0 }) {
  const { language, toggleLanguage } = useLanguage(initialLanguage);
  const {
    currentSlide,
    canGoPrevious,
    canGoNext,
    goToNext,
    goToPrevious,
    goToSlide
  } = useNavigation(slides.length, initialSlide);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' && canGoNext) {
        goToNext();
      } else if (e.key === 'ArrowLeft' && canGoPrevious) {
        goToPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [canGoNext, canGoPrevious, goToNext, goToPrevious]);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="presentation-container">
      {/* Language Toggle */}
      <div className="presentation-header">
        <LanguageToggle
          currentLanguage={language}
          onToggle={toggleLanguage}
          className="presentation-language-toggle"
        />
        <SlideCounter
          current={currentSlide + 1}
          total={slides.length}
          language={language}
          className="presentation-slide-counter"
        />
      </div>

      {/* Slide Display */}
      <div className="presentation-slides">
        <Slide
          key={currentSlide}
          slide={currentSlideData}
          language={language}
          isActive={true}
          slideIndex={currentSlide}
        />
      </div>

      {/* Navigation */}
      <Navigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onGoToSlide={goToSlide}
        language={language}
      />
    </div>
  );
}
