const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// 1. Server-Side Validation & Rate Limiting
exports.validateListing = functions.firestore
  .document("listings/{listingId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const donorId = data.donorId;

    // --- Rate Limiting ---
    // Check if the user has posted more than 5 listings in the last hour
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    const recentListings = await db.collection("listings")
      .where("donorId", "==", donorId)
      .where("postedAt", ">=", oneHourAgo)
      .get();

    if (recentListings.size > 5) {
      console.warn(`Spam detected from ${donorId}. Deleting listing.`);
      return snap.ref.delete();
    }

    // --- Data Validation ---
    const errors = [];

    // Check quantity (must be positive integer starting string)
    const qtyMatch = data.quantity && data.quantity.match(/^(\d+)/);
    if (!qtyMatch || parseInt(qtyMatch[1], 10) <= 0) {
      errors.push("Invalid quantity");
    }

    // Check expiry (must be in the future)
    const expiry = data.expiresAt ? data.expiresAt.toDate() : null;
    if (!expiry || expiry.getTime() <= Date.now()) {
      errors.push("Expiry must be in the future");
    }

    // Check required fields
    if (!data.foodType || data.foodType.length < 3) {
      errors.push("Food type too short or missing");
    }
    if (!data.location || !data.location.latitude) {
      errors.push("Missing location data");
    }

    if (errors.length > 0) {
      console.error(`Validation failed for ${context.params.listingId}:`, errors);
      return snap.ref.delete();
    }

    console.log(`Listing ${context.params.listingId} validated successfully.`);
    return null;
  });
