# Phase 5: AI, Urgency, & Impact

## 1. AI-Powered Listing from a Photo (Tier 1)
- [ ] Add Gemini API key to `.env.local`
- [ ] Install `@google/generative-ai`
- [ ] Update `FoodPostForm.jsx` to include an image upload/camera button
- [ ] Implement `analyzeImageWithGemini` function in `FoodPostForm.jsx`
- [ ] Auto-fill the form state (`foodType`, `quantity`, `expiresAt`) with Gemini's response

## 2. Smart Urgency-Based Matching (Tier 1)
- [ ] Update `AppContext.jsx` to calculate an `urgencyScore` based on distance and time left
- [ ] Update the `fetchedPosts.sort()` logic to sort by `urgencyScore`

## 3. CO2 Equivalent Tracking (Tier 2)
- [ ] Update `src/utils/calculations.js` to calculate `co2Avoided`
- [ ] Update `src/utils/calculations.test.js` to verify `co2Avoided` math
- [ ] Update `src/components/Dashboard.jsx` to display the new CO2 metric
