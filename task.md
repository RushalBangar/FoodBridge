# Phase 4: Polish & Growth Tasks

## 1. Automated Testing (Vitest/Jest)
- [x] Install `vitest`, `jsdom`, and `@testing-library/react` (Vitest is the modern Jest for Vite apps)
- [x] Create `src/utils/calculations.js` to extract impact logic for pure unit testing
- [x] Write a test suite `src/utils/calculations.test.js` to prove the impact math and geohashing math works
- [x] Add `test` script to `package.json`

## 2. Error Monitoring (Sentry)
- [x] Install `@sentry/react`
- [x] Initialize Sentry in `src/main.jsx` with a placeholder/env DSN
- [x] Add an intentional "Throw Error" hidden button (or just document it) so you can show the judges a real Sentry log
