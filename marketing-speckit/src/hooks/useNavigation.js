import { useState, useCallback } from 'react';

export function useNavigation(totalSlides, initialSlide = 0) {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);

  const canGoPrevious = currentSlide > 0;
  const canGoNext = currentSlide < totalSlides - 1;

  const goToNext = useCallback(() => {
    if (canGoNext) {
      setCurrentSlide(prev => prev + 1);
    }
  }, [canGoNext]);

  const goToPrevious = useCallback(() => {
    if (canGoPrevious) {
      setCurrentSlide(prev => prev - 1);
    }
  }, [canGoPrevious]);

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  }, [totalSlides]);

  return {
    currentSlide,
    canGoPrevious,
    canGoNext,
    goToNext,
    goToPrevious,
    goToSlide
  };
}
