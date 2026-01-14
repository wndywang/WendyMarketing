# Tasks: App Store Repositioning Presentation Deck

**Input**: Design documents from `/specs/001-app-store-deck/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project structure per implementation plan (src/components, src/data, src/hooks, src/styles)
- [X] T002 Initialize React project with Vite + Tailwind CSS dependencies (already exists)
- [X] T003 [P] Configure linting and formatting tools (ESLint already configured)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [X] T004 Create slide content data structure with bilingual support in src/data/slides.js
- [X] T005 [P] Implement useLanguage hook in src/hooks/useLanguage.js
- [X] T006 [P] Implement useNavigation hook in src/hooks/useNavigation.js
- [X] T007 Create animation utilities in src/styles/animations.css
- [X] T008 Setup orange/black theme color scheme (#FF6B35, #1A1A1A)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Presentation in Preferred Language (Priority: P1) 🎯 MVP

**Goal**: Product team members can view the presentation in their preferred language (English or Simplified Chinese)

**Independent Test**: Toggle between English and Simplified Chinese and verify all content (headings, body text, labels, navigation) translates correctly.

### Implementation for User Story 1

- [X] T009 [US1] Create LanguageToggle component in src/components/LanguageToggle.jsx
- [X] T010 [US1] Create LanguageToggle styles in src/components/LanguageToggle.css
- [X] T011 [US1] Integrate useLanguage hook with Presentation component
- [X] T012 [US1] Update Slide component to render content based on current language
- [X] T013 [US1] Add language toggle button to presentation header

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Navigate Through Presentation Slides (Priority: P1)

**Goal**: Product team members can navigate through slides (forward, backward, and jump to specific slides)

**Independent Test**: Use keyboard arrows, navigation buttons, and progress indicators to move between slides.

### Implementation for User Story 2

- [X] T014 [US2] Create Navigation component in src/components/Navigation.jsx
- [X] T015 [US2] Create Navigation styles in src/components/Navigation.css
- [X] T016 [US2] Create SlideCounter component in src/components/SlideCounter.jsx
- [X] T017 [US2] Create SlideCounter styles in src/components/SlideCounter.css
- [X] T018 [US2] Integrate useNavigation hook with Presentation component
- [X] T019 [US2] Add keyboard event listeners for arrow key navigation
- [X] T020 [US2] Add previous/next buttons with disabled states
- [X] T021 [US2] Add progress indicator with clickable dots

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - View Key Features and Repositioning Strategy (Priority: P1)

**Goal**: Product team members can clearly see the new key features and understand the repositioning strategy

**Independent Test**: View dedicated slides that showcase each key feature with clear visual hierarchy and minimal text.

### Implementation for User Story 3

- [X] T022 [US3] Create Slide component in src/components/Slide.jsx
- [X] T023 [US3] Create Slide styles in src/components/Slide.css
- [X] T024 [US3] Implement slide content rendering for different slide types (cover, strategy, features, feature-detail, next-steps)
- [X] T025 [US3] Add slide content data for all 8 slides in src/data/slides.js
- [X] T026 [US3] Ensure content follows readability limits (max 4 points, 75 words per slide)

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently

---

## Phase 6: User Story 4 - View Next Steps and Action Plan (Priority: P1)

**Goal**: Product team members can see the next steps and action plan clearly outlined

**Independent Test**: View the next steps slide and verify all action items are clearly listed with timelines or priorities.

### Implementation for User Story 4

- [X] T027 [US4] Add next-steps slide type rendering in Slide component
- [X] T028 [US4] Create next-steps slide content in src/data/slides.js
- [X] T029 [US4] Style next-steps slide with numbered list and visual hierarchy

**Checkpoint**: At this point, User Stories 1, 2, 3, AND 4 should all work independently

---

## Phase 7: User Story 5 - Experience Premium Visual Design (Priority: P2)

**Goal**: Product team members experience a premium, polished presentation with orange/black theme, rounded corners, and micro animations

**Independent Test**: View the presentation and verify the orange/black color scheme, rounded corners on all elements, and smooth micro animations on interactions.

### Implementation for User Story 5

- [X] T030 [US5] Create Presentation component in src/components/Presentation.jsx
- [X] T031 [US5] Create Presentation styles in src/components/Presentation.css
- [X] T032 [US5] Apply orange/black theme (#FF6B35, #1A1A1A) across all components
- [X] T033 [US5] Add rounded corners (12px-24px) to all UI elements
- [X] T034 [US5] Implement slide transition animations (300ms, fade/slide effect)
- [X] T035 [US5] Add micro animations for button hover and click states
- [X] T036 [US5] Add micro animations for progress indicator updates
- [X] T037 [US5] Optimize for MacBook 13" viewport (1280x800 to 1440x900)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 8: Integration & Polish

**Purpose**: Final integration and polish

- [X] T038 Update App.jsx to use Presentation component
- [X] T039 Update App.css with global styles and reset
- [X] T040 Verify all slides render correctly with bilingual content
- [X] T041 Verify keyboard navigation works (arrow keys)
- [X] T042 Verify button navigation works (previous/next)
- [X] T043 Verify progress indicator navigation works (clickable dots)
- [X] T044 Verify language toggle works and updates all content
- [X] T045 Verify slide transitions are smooth (300ms)
- [X] T046 Verify all animations maintain 60fps
- [X] T047 Verify MacBook 13" viewport optimization (no horizontal scrolling)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories implemented sequentially in priority order (P1 → P2)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Uses same Presentation component as US1
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - Uses Slide component from US1/US2
- **User Story 4 (P1)**: Can start after Foundational (Phase 2) - Uses Slide component from US3
- **User Story 5 (P2)**: Can start after Foundational (Phase 2) - Enhances all previous stories

### Within Each User Story

- Components before styles
- Hooks before components that use them
- Data structure before components that render it
- Core implementation before integration

---

## Implementation Status

**All tasks completed**: ✅

All 47 tasks across 8 phases have been completed. The presentation deck is fully functional with:
- Bilingual support (English/Simplified Chinese)
- Keyboard and button navigation
- Progress indicator
- Premium orange/black theme
- Rounded corners
- Micro animations
- MacBook 13" viewport optimization
