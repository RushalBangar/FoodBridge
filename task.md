# Phase 2: Scale & Location Tasks

## 1. Geohashing (geofire-common)
- [x] Install `geofire-common` library
- [x] Update `AppContext.jsx` addPost to generate and save a `geohash`
- [x] Update `AppContext.jsx` listener to perform a true Firestore radius query (e.g., 50km radius) instead of fetching all

## 2. Server-Side Validation (Cloud Functions)
- [x] Initialize Firebase Functions in the project
- [x] Write an `onCreate` trigger to validate listings (quantity, expiry, required fields)
- [x] Write rate limiting logic (max 5 posts per hour per UID)
