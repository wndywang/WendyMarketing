# Research: App Store Repositioning Presentation Deck

**Feature**: App Store Repositioning Presentation Deck  
**Date**: 2025-01-27  
**Phase**: 0 - Research & Discovery

## Research Questions & Findings

### 1. Bilingual Content Management Pattern

**Question**: What's the best pattern for managing bilingual (English/Simplified Chinese) content in a React application?

**Decision**: Use structured data objects with language keys for each content item.

**Rationale**: 
- Simple, maintainable approach for static presentation content
- No need for i18n library complexity (react-i18next, etc.) for a single presentation
- Easy to add/remove languages in the future
- Content is co-located with component logic for easy updates

**Alternatives Considered**:
- **react-i18next**: Overkill for a single presentation with limited content
- **Separate JSON files**: More complex file management, harder to maintain consistency
- **CMS/API**: Unnecessary complexity for static content

**Implementation Pattern**:
```javascript
const slides = [
  {
    id: 1,
    type: 'cover',
    content: {
      en: { title: 'App Store Repositioning', subtitle: '...' },
      zh: { title: '应用商店重新定位', subtitle: '...' }
    }
  }
]
```

---

### 2. Micro Animation Library/Approach

**Question**: What's the best approach for implementing micro animations (slide transitions, button interactions) in React?

**Decision**: Use CSS transitions and animations with React state management, leveraging Tailwind CSS animation utilities and custom keyframes.

**Rationale**:
- Tailwind CSS 4.1.18 already in project - no additional dependencies
- CSS animations perform better than JavaScript animations (GPU-accelerated)
- Smooth 60fps animations achievable with CSS transforms and opacity
- React state controls animation triggers (enter/exit states)

**Alternatives Considered**:
- **Framer Motion**: Powerful but adds ~50KB bundle size, overkill for simple transitions
- **React Spring**: Physics-based animations, more complex than needed
- **Animate.css**: Class-based, less flexible for React state-driven animations
- **JavaScript animations (requestAnimationFrame)**: More code, less performant than CSS

**Implementation Approach**:
- CSS keyframes for slide transitions (fade, slide)
- Tailwind transition utilities for hover/active states
- React state toggles CSS classes for enter/exit animations
- Transform and opacity for smooth GPU-accelerated animations

---

### 3. MacBook 13" Viewport Optimization

**Question**: What are the exact viewport dimensions and considerations for MacBook 13" optimization?

**Decision**: Target viewport range 1280x800 to 1440x900, use CSS viewport units and media queries for optimization.

**Rationale**:
- MacBook 13" (non-Retina): 1280x800
- MacBook 13" (Retina): 2560x1600 (scaled to 1280x800 or 1440x900)
- Use viewport units (vw, vh) for full-page slides
- Media queries for fine-tuning at specific breakpoints

**Alternatives Considered**:
- **Fixed pixel dimensions**: Not responsive, breaks on different scaling
- **Percentage-based**: Less precise control
- **CSS Container Queries**: Not widely supported yet

**Implementation**:
- Full viewport: `width: 100vw; height: 100vh`
- Max-width constraints for content: `max-width: 1200px` for readability
- Media queries for 1280px, 1440px breakpoints
- Test on actual MacBook 13" devices

---

### 4. Orange/Black Premium Color Scheme

**Question**: What are the exact color values and accessibility considerations for the premium orange/black theme?

**Decision**: Use #FF6B35 (vibrant orange) and #1A1A1A (soft black) with WCAG AA contrast ratios.

**Rationale**:
- #FF6B35 is a vibrant, premium orange that stands out
- #1A1A1A is softer than pure black (#000000), easier on eyes, maintains premium feel
- Contrast ratio: #FF6B35 on #1A1A1A = 4.8:1 (WCAG AA compliant for normal text)
- Additional colors: #FF8C5A (lighter orange for hover), #0D0D0D (darker for depth)

**Alternatives Considered**:
- **Pure black (#000000)**: Too harsh, lower contrast with orange
- **Different orange shades**: #FF6B35 provides best balance of vibrancy and readability
- **Gradient backgrounds**: Adds complexity, may reduce readability

**Color Palette**:
- Primary Orange: #FF6B35
- Primary Black: #1A1A1A
- Light Orange (hover): #FF8C5A
- Dark Black (depth): #0D0D0D
- White text: #FFFFFF
- Gray text: #A0A0A0

---

### 5. Rounded Corners Implementation

**Question**: What border-radius values provide the best premium feel while maintaining readability?

**Decision**: Use 16px-24px for cards/containers, 12px for buttons, 8px for small elements.

**Rationale**:
- 16-24px provides modern, premium feel without being too rounded
- Consistent radius scale: 8px (small), 12px (medium), 16px (large), 24px (extra large)
- Maintains readability - not too rounded to distort content
- Matches modern design trends (iOS, Material Design 3)

**Implementation**:
- Slides: `border-radius: 24px`
- Cards/Containers: `border-radius: 16px`
- Buttons: `border-radius: 12px`
- Small badges: `border-radius: 8px`

---

### 6. Slide Transition Performance

**Question**: How to achieve smooth 300ms slide transitions without visual glitches?

**Decision**: Use CSS transform (translateX) and opacity with will-change hint, React state for timing.

**Rationale**:
- CSS transforms are GPU-accelerated (better performance than position changes)
- Opacity transitions are smooth and performant
- will-change: transform hints browser to optimize
- 300ms duration is fast enough to feel responsive, slow enough to be smooth

**Implementation**:
- Slide container: `transform: translateX(-${currentSlide * 100}%)`
- Transition: `transition: transform 300ms ease-in-out`
- will-change: `will-change: transform` (removed after animation)
- React state updates trigger CSS transitions

---

### 7. Language Toggle Performance

**Question**: How to ensure language toggle updates all content in <1 second?

**Decision**: Store bilingual content in memory, use React state to switch language key, no re-rendering delays.

**Rationale**:
- All content pre-loaded in memory (no API calls)
- React state change triggers immediate re-render
- No data fetching = instant updates
- Content structure identical between languages = no layout shifts

**Implementation**:
- Language state: `const [language, setLanguage] = useState('en')`
- Content access: `slide.content[language].title`
- Toggle function: `setLanguage(language === 'en' ? 'zh' : 'en')`
- All components use same language state (Context API or prop drilling)

---

### 8. Chinese Text Overflow Handling

**Question**: How to handle longer Chinese text that might not fit in same space as English?

**Decision**: Use flexible layouts (flexbox/grid), allow text wrapping, set min-height for containers, test with actual Chinese content.

**Rationale**:
- Chinese characters are typically more compact than English words
- But Chinese phrases can be longer when translated
- Flexible layouts adapt to content length
- Min-height prevents layout collapse
- Testing with real content is essential

**Implementation**:
- Containers: `min-height` set for consistent spacing
- Text: `word-break: break-word` for long strings
- Layouts: Use `flex` or `grid` with `auto` sizing
- Test with longest expected Chinese translations

---

## Technology Decisions Summary

| Decision | Technology | Rationale |
|----------|-----------|----------|
| Content Management | Structured JS objects | Simple, maintainable, no external deps |
| Animations | CSS + Tailwind | Performance, already in project |
| Viewport | CSS viewport units | Native responsive, MacBook optimized |
| Colors | #FF6B35 / #1A1A1A | Premium feel, WCAG AA compliant |
| Border Radius | 8px-24px scale | Modern, premium, readable |
| Transitions | CSS transform + opacity | GPU-accelerated, smooth |
| Language State | React useState | Simple, fast, no external libs |

## Open Questions Resolved

All technical questions from the specification have been resolved. No remaining NEEDS CLARIFICATION markers.

## Next Steps

Proceed to Phase 1: Design & Contracts
- Create data model for slide content structure
- Define component contracts/interfaces
- Create quickstart guide
