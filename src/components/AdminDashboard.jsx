import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useAppContext } from '../context/AppContext';
import { ShieldCheck, ShieldAlert, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { userProfile, verifyNGO } = useAppContext();
  const navigate = useNavigate();
  const [ngos, setNgos] = useState([]);

  // In a real app, you would have an 'admin' role. 
  // For the hackathon, we can just let any logged-in user see it for demo purposes,
  // or restrict it to a specific email.
  
  useEffect(() => {
    const q = query(
      collection(db, "users"), 
      where("role", "==", "ngo"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      }));
      setNgos(fetched);
    });

    return () => unsubscribe();
  }, []);

  if (!userProfile) {
    return <div style={{ padding: '24px', textAlign: 'center' }}>Access Denied</div>;
  }

  const unverified = ngos.filter(n => !n.verified);
  const verified = ngos.filter(n => n.verified);

  return (
    <div className="animate-fade-in screen-content">
      <div className="flex-row mb-4" style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
        <ArrowLeft size={20} color="var(--color-primary)" />
        <h2 style={{ margin: 0, color: 'var(--color-primary)' }}>Admin: NGO Approvals</h2>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-danger)' }}>
          <ShieldAlert size={20} />
          Pending Approvals ({unverified.length})
        </h3>
        
        {unverified.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No NGOs waiting for approval.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            {unverified.map(ngo => (
              <div key={ngo.uid} style={{ border: '1px solid var(--border-color)', padding: '16px', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 4px' }}>{ngo.name}</h4>
                <p style={{ margin: '0 0 12px', fontSize: '12px', color: 'var(--text-secondary)' }}>Joined: {ngo.createdAt?.toDate().toLocaleDateString()}</p>
                
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', backgroundColor: 'var(--color-success)' }}
                  onClick={() => verifyNGO(ngo.uid)}
                >
                  Verify NGO
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-success)' }}>
          <ShieldCheck size={20} />
          Verified NGOs ({verified.length})
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
          {verified.map(ngo => (
            <div key={ngo.uid} style={{ border: '1px solid var(--border-color)', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 4px' }}>{ngo.name}</h4>
              </div>
              <ShieldCheck color="var(--color-success)" size={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
