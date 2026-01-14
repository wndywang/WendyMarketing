# Data Model: App Store Repositioning Presentation Deck

**Feature**: App Store Repositioning Presentation Deck  
**Date**: 2025-01-27  
**Phase**: 1 - Design & Contracts

## Entities

### Slide

Represents a single slide in the presentation with bilingual content.

**Attributes**:
- `id` (number, required): Unique identifier for the slide (1-based index)
- `type` (string, required): Slide type - `'cover' | 'strategy' | 'features' | 'feature-detail' | 'next-steps'`
- `content` (object, required): Bilingual content object
  - `en` (object, required): English content
  - `zh` (object, required): Simplified Chinese content
- `order` (number, required): Display order in presentation (1-based)

**Content Structure** (varies by slide type):

**Cover Slide**:
```javascript
content: {
  en: {
    title: string,
    subtitle: string,
    description: string (optional)
  },
  zh: {
    title: string,
    subtitle: string,
    description: string (optional)
  }
}
```

**Strategy/Features/Next Steps Slide**:
```javascript
content: {
  en: {
    title: string,
    points: string[] (max 4 items),
    visualElement: string (optional, e.g., "chart", "list", "timeline")
  },
  zh: {
    title: string,
    points: string[] (max 4 items),
    visualElement: string (optional)
  }
}
```

**Feature Detail Slide**:
```javascript
content: {
  en: {
    title: string,
    featureName: string,
    description: string,
    keyPoints: string[] (max 3 items),
    icon: string (optional)
  },
  zh: {
    title: string,
    featureName: string,
    description: string,
    keyPoints: string[] (max 3 items),
    icon: string (optional)
  }
}
```

**Validation Rules**:
- `id` must be unique across all slides
- `order` must be sequential (1, 2, 3, ...)
- `content.en` and `content.zh` must have matching structure
- `points` arrays must not exceed 4 items (readability requirement)
- All required string fields must be non-empty
- Text content per slide must not exceed 75 words (excluding title)

**State Transitions**: None - slides are static content, no state changes

---

### LanguageState

Represents the current language selection for the presentation.

**Attributes**:
- `currentLanguage` (string, required): Current language - `'en' | 'zh'`
- `availableLanguages` (string[], required): Array of available language codes - `['en', 'zh']`

**Validation Rules**:
- `currentLanguage` must be one of `availableLanguages`
- `availableLanguages` must contain at least 'en' and 'zh'

**State Transitions**:
- `toggleLanguage()`: Switches between 'en' and 'zh'
- `setLanguage(lang)`: Sets language to specified value (must be in availableLanguages)

---

### NavigationState

Represents the current slide position and navigation capabilities.

**Attributes**:
- `currentSlideIndex` (number, required): Zero-based index of current slide (0 to totalSlides-1)
- `totalSlides` (number, required): Total number of slides in presentation
- `canGoPrevious` (boolean, computed): `currentSlideIndex > 0`
- `canGoNext` (boolean, computed): `currentSlideIndex < totalSlides - 1`

**Validation Rules**:
- `currentSlideIndex` must be >= 0 and < `totalSlides`
- `totalSlides` must be > 0
- `canGoPrevious` and `canGoNext` are computed from `currentSlideIndex` and `totalSlides`

**State Transitions**:
- `goToNext()`: Increments `currentSlideIndex` if `canGoNext` is true
- `goToPrevious()`: Decrements `currentSlideIndex` if `canGoPrevious` is true
- `goToSlide(index)`: Sets `currentSlideIndex` to specified value (must be valid index)

---

## Relationships

- **Slide** ↔ **LanguageState**: Slides display content based on `LanguageState.currentLanguage`
- **Slide** ↔ **NavigationState**: `NavigationState.currentSlideIndex` determines which slide is displayed
- **LanguageState** ↔ **NavigationState**: Independent - language change doesn't affect navigation, navigation doesn't affect language

## Data Flow

1. **Initial Load**: 
   - Load all slides from `slides.js` data file
   - Initialize `LanguageState` with `currentLanguage: 'en'`
   - Initialize `NavigationState` with `currentSlideIndex: 0`

2. **Language Toggle**:
   - User clicks language toggle
   - `LanguageState.currentLanguage` updates ('en' ↔ 'zh')
   - All slide components re-render with new language content
   - No navigation state change

3. **Navigation**:
   - User navigates (keyboard/button/click)
   - `NavigationState.currentSlideIndex` updates
   - Slide transition animation triggers
   - New slide displays with current language content

4. **Content Access**:
   - Component reads: `slides[navigationState.currentSlideIndex].content[languageState.currentLanguage]`
   - Displays appropriate bilingual content

## Storage

**Type**: In-memory (React state)  
**Persistence**: None required - presentation is stateless, resets on page reload  
**Data Source**: Static JavaScript file (`src/data/slides.js`) containing slide content array

## Constraints

- Maximum 8 slides total (performance and UX consideration)
- Each slide's `points` array limited to 4 items (readability requirement FR-015)
- Text content per slide limited to 75 words excluding title (readability requirement FR-015)
- Language state must be consistent across all components (use React Context or prop drilling)
- Navigation state must be consistent across all navigation components
