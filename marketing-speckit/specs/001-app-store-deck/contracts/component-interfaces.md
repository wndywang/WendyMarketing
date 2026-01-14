# Component Contracts: App Store Repositioning Presentation Deck

**Feature**: App Store Repositioning Presentation Deck  
**Date**: 2025-01-27  
**Phase**: 1 - Design & Contracts

## Component Interfaces

### Presentation Component

**Purpose**: Main container component that orchestrates the entire presentation.

**Props**:
```typescript
interface PresentationProps {
  slides: Slide[];  // Array of slide data objects
  initialLanguage?: 'en' | 'zh';  // Optional, defaults to 'en'
  initialSlide?: number;  // Optional, defaults to 0
}
```

**State**:
- Manages `LanguageState` and `NavigationState` internally
- Exposes state to child components via Context or props

**Responsibilities**:
- Initialize language and navigation state
- Handle keyboard navigation events
- Provide language toggle functionality
- Render current slide based on navigation state
- Render navigation controls
- Render language toggle

**Events Handled**:
- `keydown` (ArrowLeft, ArrowRight) → Navigation
- Language toggle click → Language state update
- Navigation button clicks → Navigation state update
- Progress indicator clicks → Navigation state update

---

### Slide Component

**Purpose**: Renders individual slide content based on slide type and current language.

**Props**:
```typescript
interface SlideProps {
  slide: Slide;  // Slide data object
  language: 'en' | 'zh';  // Current language
  isActive: boolean;  // Whether this slide is currently visible
  slideIndex: number;  // Zero-based index for animation calculations
}
```

**Responsibilities**:
- Render slide content in specified language
- Apply slide-specific styling based on `type`
- Handle slide enter/exit animations based on `isActive`
- Ensure content fits within viewport (no overflow)

**Content Rendering**:
- Cover slides: Title, subtitle, optional description
- Strategy/Features slides: Title, points list (max 4), optional visual element
- Feature detail slides: Title, feature name, description, key points (max 3), optional icon
- Next steps slides: Title, action items list, optional timeline/roadmap

---

### LanguageToggle Component

**Purpose**: Button component that toggles between English and Simplified Chinese.

**Props**:
```typescript
interface LanguageToggleProps {
  currentLanguage: 'en' | 'zh';
  onToggle: (newLanguage: 'en' | 'zh') => void;
  className?: string;  // Optional additional CSS classes
}
```

**Responsibilities**:
- Display current language indicator (EN/中文 or flag icons)
- Handle click to toggle language
- Provide visual feedback (hover, active states)
- Apply micro animations on toggle

**Visual States**:
- Default: Shows current language
- Hover: Slight scale or color change
- Active/Click: Brief scale animation
- Disabled: Not applicable (always enabled)

---

### Navigation Component

**Purpose**: Provides navigation controls (previous/next buttons, progress indicator).

**Props**:
```typescript
interface NavigationProps {
  currentSlide: number;  // Zero-based current slide index
  totalSlides: number;  // Total number of slides
  onPrevious: () => void;  // Callback for previous action
  onNext: () => void;  // Callback for next action
  onGoToSlide: (index: number) => void;  // Callback for direct navigation
  language: 'en' | 'zh';  // Current language for button labels
}
```

**Responsibilities**:
- Render previous/next buttons (disabled at boundaries)
- Render progress indicator (dots or bar)
- Render slide counter (current/total)
- Handle navigation interactions
- Apply micro animations on interactions

**Button States**:
- Previous button: Disabled when `currentSlide === 0`
- Next button: Disabled when `currentSlide === totalSlides - 1`
- Progress dots: Active state for current slide, clickable for all

---

### SlideCounter Component

**Purpose**: Displays current slide number and total slides.

**Props**:
```typescript
interface SlideCounterProps {
  current: number;  // Current slide number (1-based)
  total: number;  // Total slides
  language: 'en' | 'zh';  // Current language (affects separator text if any)
  className?: string;  // Optional additional CSS classes
}
```

**Responsibilities**:
- Display "current / total" format (e.g., "3 / 8")
- Update when navigation changes
- Apply consistent styling with theme

---

## Hook Contracts

### useLanguage Hook

**Purpose**: Manages language state and provides toggle functionality.

**Returns**:
```typescript
{
  language: 'en' | 'zh';
  toggleLanguage: () => void;
  setLanguage: (lang: 'en' | 'zh') => void;
  availableLanguages: ('en' | 'zh')[];
}
```

**State Management**:
- Uses React `useState` internally
- Persists language choice in sessionStorage (optional enhancement)
- Provides immediate state updates (<1 second requirement)

---

### useNavigation Hook

**Purpose**: Manages slide navigation state and provides navigation functions.

**Parameters**:
```typescript
{
  totalSlides: number;
  initialSlide?: number;  // Optional, defaults to 0
}
```

**Returns**:
```typescript
{
  currentSlide: number;  // Zero-based index
  canGoPrevious: boolean;
  canGoNext: boolean;
  goToNext: () => void;
  goToPrevious: () => void;
  goToSlide: (index: number) => void;
}
```

**State Management**:
- Uses React `useState` internally
- Validates navigation boundaries
- Triggers slide transition animations

---

## Data Contracts

### Slide Data Structure

**Location**: `src/data/slides.js`

**Format**:
```javascript
export const slides = [
  {
    id: 1,
    type: 'cover',
    order: 1,
    content: {
      en: { /* English content */ },
      zh: { /* Chinese content */ }
    }
  },
  // ... more slides
];
```

**Validation**:
- All slides must have unique `id`
- `order` must be sequential
- `content.en` and `content.zh` must have matching structure
- Content must comply with word/point limits (FR-015)

---

## Animation Contracts

### Slide Transition

**Trigger**: Navigation state change (`currentSlideIndex` updates)

**Duration**: 300ms (SC-004 requirement)

**Easing**: `ease-in-out` or `cubic-bezier(0.4, 0, 0.2, 1)`

**Properties**: 
- `transform: translateX()` for slide effect
- `opacity` for fade effect (optional)
- `will-change: transform` during animation

**Performance**: Must maintain 60fps, use GPU acceleration

---

### Micro Animations

**Button Hover**:
- Duration: 150ms
- Effect: Scale (1.05x) or color change
- Easing: `ease-out`

**Button Click**:
- Duration: 100ms
- Effect: Scale (0.95x) then return
- Easing: `ease-in-out`

**Progress Indicator Update**:
- Duration: 200ms
- Effect: Active dot scales up, previous scales down
- Easing: `ease-out`

**Language Toggle**:
- Duration: 200ms
- Effect: Text fade out/in or slide
- Easing: `ease-in-out`

---

## Error Handling

**Invalid Slide Index**:
- If `goToSlide(index)` called with invalid index, no-op or clamp to valid range
- Log warning in development mode

**Missing Content**:
- If slide content missing for current language, fallback to English
- Log error in development mode

**Navigation at Boundaries**:
- Previous at first slide: Button disabled, no action
- Next at last slide: Button disabled, no action

---

## Performance Contracts

**Language Toggle**: <1 second (SC-001)
- All content updates must complete within 1 second
- No API calls or async operations

**Slide Transition**: <300ms (SC-004)
- Animation must complete within 300ms
- No layout shifts or content jumps

**Initial Load**: <2 seconds
- All slides data loaded
- First slide rendered
- Navigation ready

**Animation Frame Rate**: 60fps
- All animations must maintain 60fps
- Use GPU-accelerated properties (transform, opacity)
