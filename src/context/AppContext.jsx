import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { db, auth } from '../firebase';
import { 
  collection, query, onSnapshot, orderBy, startAt, endAt, 
  addDoc, doc, runTransaction, updateDoc, GeoPoint, getDoc, setDoc
} from 'firebase/firestore';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import * as geofire from 'geofire-common';
import { calculateImpact } from '../utils/calculations';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  // 1. Auth & User Profile Listener
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user profile from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserProfile({ uid: user.uid, ...userDoc.data() });
        } else {
          setUserProfile(null); // No profile yet, needs onboarding
        }
      } else {
        setUserProfile(null);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // 2. Request real geolocation on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }),
        (error) => {
          console.warn("Geolocation denied/failed, falling back to mock", error);
          setUserLocation({ lat: 40.7128, lng: -74.0060 }); // Mock NY fallback
        }
      );
    }
  }, []);

  // 3. Real-time Firebase Listener with Geohashing (50km radius)
  useEffect(() => {
    if (!userLocation) return; 

    const center = [userLocation.lat, userLocation.lng];
    const radiusInM = 50 * 1000;
    const bounds = geofire.geohashQueryBounds(center, radiusInM);

    const unsubscribes = [];
    const docMap = new Map();

    for (const b of bounds) {
      const q = query(
        collection(db, "listings"), 
        orderBy("geohash"), 
        startAt(b[0]), 
        endAt(b[1])
      );

      const unsub = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'removed') {
            docMap.delete(change.doc.id);
          } else {
            const data = change.doc.data();
            if (data.location && typeof data.location.latitude !== 'undefined') {
              const distanceInKm = geofire.distanceBetween(
                [data.location.latitude, data.location.longitude], 
                center
              );
              
              // Only keep items strictly within the radius
              if (distanceInKm * 1000 <= radiusInM) {
                docMap.set(change.doc.id, {
                  id: change.doc.id,
                  ...data,
                  distance: parseFloat(distanceInKm.toFixed(1)),
                  expiresAt: data.expiresAt ? data.expiresAt.toDate().toISOString() : new Date().toISOString()
                });
              }
            }
          }
        });

        const fetchedPosts = Array.from(docMap.values());
        
        // Smart Urgency Matching: 
        // Lower score is better. 1 hour left adds 10 points. 1 km adds 1 point.
        const getUrgencyScore = (post) => {
          const hoursLeft = (new Date(post.expiresAt) - new Date()) / (1000 * 60 * 60);
          return post.distance + (Math.max(0, hoursLeft) * 10);
        };

        fetchedPosts.sort((a, b) => getUrgencyScore(a) - getUrgencyScore(b));
        setPosts([...fetchedPosts]);
      }, (error) => {
        console.error("Firestore listener error (check your .env keys!):", error);
      });
      unsubscribes.push(unsub);
    }

    return () => {
      unsubscribes.forEach(unsub => unsub());
    };
  }, [userLocation]);

  // 4. Dynamic Impact Stats
  const impactStats = useMemo(() => {
    return calculateImpact(posts);
  }, [posts]);


  const assignRole = async (name, role, uid) => {
    try {
      const newProfile = {
        name,
        role,
        verified: role === 'donor', // Donors auto-verified, NGOs need approval
        createdAt: new Date()
      };
      await setDoc(doc(db, "users", uid), newProfile);
      setUserProfile({ uid, ...newProfile });
    } catch (e) {
      console.error("Error assigning role:", e);
    }
  };

  const signUp = async (email, password, name, role) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await assignRole(name, role, userCredential.user.uid);
  };

  const logIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const addPost = async (postData) => {
    try {
      const { lat, lng } = userLocation || { lat: 40.7128, lng: -74.0060 };
      const hash = geofire.geohashForLocation([lat, lng]);
      
      await addDoc(collection(db, "listings"), {
        donorId: auth.currentUser?.uid || "anonymous",
        donorName: userProfile?.name || "Unknown Donor",
        foodType: postData.foodType,
        quantity: postData.quantity,
        location: new GeoPoint(lat, lng),
        geohash: hash,
        postedAt: new Date(),
        expiresAt: new Date(postData.expiresAt),
        status: "available",
        claimedBy: null,
        claimedAt: null
      });
      console.log("Post added successfully to Firestore");
    } catch (e) {
      console.error("Error adding post: ", e);
      alert("Error adding post. Check console and Firebase config.");
    }
  };

  const claimPost = async (postId) => {
    if (userProfile?.role === 'ngo' && !userProfile?.verified) {
      alert("Your NGO account is pending verification. You cannot claim food yet.");
      return;
    }

    const listingRef = doc(db, "listings", postId);
    try {
      await runTransaction(db, async (transaction) => {
        const snap = await transaction.get(listingRef);
        if (!snap.exists()) throw new Error("Listing does not exist");
        if (snap.data().status !== "available") {
          throw new Error("Already claimed");
        }
        transaction.update(listingRef, {
          status: "claimed",
          claimedBy: auth.currentUser?.uid || "anonymous",
          claimedAt: new Date()
        });
      });
      console.log("Transaction success: Claimed");
    } catch (e) {
      console.error("Claim transaction failed: ", e);
      alert(`Claim failed: ${e.message}`);
    }
  };

  const markPickedUp = async (postId) => {
    const listingRef = doc(db, "listings", postId);
    try {
      await updateDoc(listingRef, {
        status: "picked_up",
        pickedUpAt: new Date()
      });
    } catch (e) {
      console.error("Error updating status:", e);
    }
  };

  const verifyNGO = async (uid) => {
    try {
      await updateDoc(doc(db, "users", uid), {
        verified: true
      });
    } catch (e) {
      console.error("Error verifying NGO:", e);
    }
  };

  return (
    <AppContext.Provider value={{ 
      posts, 
      addPost, 
      claimPost, 
      markPickedUp, 
      impactStats,
      userLocation,
      userProfile,
      assignRole,
      signUp,
      logIn,
      logOut,
      verifyNGO
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
