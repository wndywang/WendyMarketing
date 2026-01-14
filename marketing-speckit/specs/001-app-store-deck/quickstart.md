# Quickstart Guide: App Store Repositioning Presentation Deck

**Feature**: App Store Repositioning Presentation Deck  
**Date**: 2025-01-27

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Modern web browser (Chrome, Safari, Firefox)
- MacBook 13" or similar viewport for testing (1280x800 to 1440x900)

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   - Navigate to `http://localhost:5173` (or port shown in terminal)
   - Presentation should load with cover slide

## Project Structure

```
src/
├── components/
│   ├── Presentation.jsx      # Main container
│   ├── Slide.jsx            # Individual slide
│   ├── LanguageToggle.jsx   # Language switch
│   ├── Navigation.jsx      # Nav controls
│   └── SlideCounter.jsx    # Slide counter
├── data/
│   └── slides.js            # Slide content data
├── hooks/
│   ├── useLanguage.js       # Language state
│   └── useNavigation.js    # Navigation state
├── styles/
│   └── animations.css       # Animation keyframes
└── App.jsx                  # Entry point
```

## Adding Slide Content

Edit `src/data/slides.js`:

```javascript
export const slides = [
  {
    id: 1,
    type: 'cover',
    order: 1,
    content: {
      en: {
        title: 'App Store Repositioning',
        subtitle: 'Strategic Shift to Wellness Platform'
      },
      zh: {
        title: '应用商店重新定位',
        subtitle: '向健康平台的战略转变'
      }
    }
  },
  // Add more slides...
];
```

**Content Guidelines**:
- Maximum 4 points per slide (readability)
- Maximum 75 words per slide excluding title
- Keep English and Chinese content structurally identical
- Test Chinese text length (may be longer than English)

## Customizing Theme

Edit `tailwind.config.js` or `src/App.css`:

**Colors**:
- Primary Orange: `#FF6B35`
- Primary Black: `#1A1A1A`
- Light Orange: `#FF8C5A`
- Dark Black: `#0D0D0D`

**Border Radius**:
- Slides: `24px`
- Cards: `16px`
- Buttons: `12px`
- Small elements: `8px`

## Navigation

**Keyboard**:
- `←` (Left Arrow): Previous slide
- `→` (Right Arrow): Next slide

**Mouse/Touch**:
- Click "Previous" / "Next" buttons
- Click progress indicator dots
- Click language toggle button

## Testing

**Run Tests** (when test suite is added):
```bash
npm test
```

**Manual Testing Checklist**:
- [ ] Language toggle switches all content
- [ ] Navigation works (keyboard, buttons, progress dots)
- [ ] Slide transitions are smooth (<300ms)
- [ ] All slides render correctly on MacBook 13" viewport
- [ ] Orange/black theme applied consistently
- [ ] Rounded corners on all elements
- [ ] Micro animations work (hover, click, transitions)
- [ ] Chinese text doesn't overflow
- [ ] Buttons disabled at first/last slide

## Building for Production

```bash
npm run build
```

Output: `dist/` directory with optimized production build.

## Viewport Testing

**MacBook 13" Dimensions**:
- Non-Retina: 1280x800
- Retina (scaled): 1280x800 or 1440x900

**Browser DevTools**:
1. Open DevTools (F12)
2. Toggle device toolbar (Cmd+Shift+M)
3. Set custom dimensions: 1280x800 or 1440x900
4. Test presentation

## Troubleshooting

**Language toggle not working**:
- Check that `useLanguage` hook is properly connected
- Verify slide content has both `en` and `zh` keys

**Animations not smooth**:
- Check browser supports CSS transforms
- Verify `will-change` property is set during animations
- Test on actual device (not just browser)

**Content overflow**:
- Reduce text content per slide
- Check Chinese text length
- Adjust container min-height

**Navigation not working**:
- Check keyboard event listeners are attached
- Verify `useNavigation` hook state updates
- Check browser console for errors

## Next Steps

1. Add slide content from App Store Resubmission Strategy document
2. Create Simplified Chinese translations
3. Test on actual MacBook 13" device
4. Fine-tune animations and transitions
5. Add tests for components and hooks

## Resources

- [Specification](./spec.md)
- [Implementation Plan](./plan.md)
- [Data Model](./data-model.md)
- [Component Contracts](./contracts/component-interfaces.md)
