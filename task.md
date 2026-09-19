# Phase 3: Verification & Operations

## 1. NGO Verification Flow
- [x] Update `AppContext.jsx` so new NGOs are marked `verified: false` by default
- [x] Create an `AdminDashboard.jsx` screen that lists all unverified NGOs
- [x] Add a function to approve NGOs (update their `verified` status to `true`)
- [x] Restrict claiming food so that only `verified` NGOs can claim
- [x] Add `/admin` route to `App.jsx`

## 2. Operations (CI/CD & Monitoring)
- [x] Note: Vercel already handles CI/CD for the frontend automatically on push to `main`.
- [x] Skip Sentry (unless specifically requested) to keep the hackathon codebase clean.
