import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { db, auth } from '../firebase';
import { 
  collection, query, onSnapshot, 
  addDoc, doc, runTransaction, updateDoc, GeoPoint, getDoc, setDoc
} from 'firebase/firestore';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';

const AppContext = createContext();

// Haversine distance helper
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

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

  // 3. Real-time Firebase Listener
  useEffect(() => {
    if (!userLocation) return; 
    const q = query(collection(db, "listings"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(docSnap => {
        const data = docSnap.data();
        let distance = 0;
        if (data.location && typeof data.location.latitude !== 'undefined') {
          distance = getDistanceKm(
            userLocation.lat, userLocation.lng, 
            data.location.latitude, data.location.longitude
          );
        }
        return {
          id: docSnap.id,
          ...data,
          distance: parseFloat(distance.toFixed(1)),
          expiresAt: data.expiresAt ? data.expiresAt.toDate().toISOString() : new Date().toISOString()
        };
      });

      fetchedPosts.sort((a, b) => new Date(a.expiresAt) - new Date(b.expiresAt));
      setPosts(fetchedPosts);
    }, (error) => {
      console.error("Firestore listener error (check your .env keys!):", error);
    });

    return () => unsubscribe();
  }, [userLocation]);

  // 4. Dynamic Impact Stats
  const impactStats = useMemo(() => {
    let meals = 0;
    let donors = new Set();
    
    posts.forEach(p => {
      if (p.status === 'picked_up') {
        const quantityNum = parseInt(p.quantity.split(' ')[0]) || 0;
        meals += quantityNum;
      }
      if (p.donorId) donors.add(p.donorId);
    });

    // Approximate 1 meal = 0.4kg
    return {
      mealsSaved: meals,
      kgDiverted: parseFloat((meals * 0.4).toFixed(1)),
      activeDonors: donors.size
    };
  }, [posts]);


  const assignRole = async (name, role, uid) => {
    try {
      const newProfile = {
        name,
        role,
        verified: true, // Auto verify for demo
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
      
      await addDoc(collection(db, "listings"), {
        donorId: auth.currentUser?.uid || "anonymous",
        donorName: userProfile?.name || "Unknown Donor",
        foodType: postData.foodType,
        quantity: postData.quantity,
        location: new GeoPoint(lat, lng),
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
      logOut
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
