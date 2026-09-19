import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { MapPin, Navigation, Phone, CheckCircle, X } from 'lucide-react';
import CountdownTimer from './common/CountdownTimer';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { useTranslation } from 'react-i18next';

const ListingDetailModal = ({ post, onClose }) => {
  const { claimPost, markPickedUp } = useAppContext();
  const { t } = useTranslation();
  
  const [localStatus, setLocalStatus] = useState(post.status);
  const [isClaiming, setIsClaiming] = useState(false);
  
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE';

  const handleClaim = () => {
    setIsClaiming(true);
    setTimeout(() => {
      claimPost(post.id);
      setLocalStatus('claimed');
      setIsClaiming(false);
    }, 500);
  };

  const handlePickedUp = () => {
    markPickedUp(post.id);
    setLocalStatus('picked-up');
    setTimeout(() => onClose(), 2000);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      zIndex: 100, padding: '16px'
    }}>
      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '480px', margin: 0, position: 'relative' }}>
        
        <button 
          onClick={onClose}
          style={{ position: 'absolute', right: '16px', top: '16px', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <X size={24} color="var(--text-secondary)" />
        </button>

        <h2 style={{ paddingRight: '32px' }}>{post.foodType}</h2>
        <p className="caption" style={{ marginBottom: '16px' }}>{t('donatedBy')} {post.donorName}</p>

        <div className="flex-row mb-2">
          <div style={{ fontWeight: '500', fontSize: '15px' }}>{post.quantity}</div>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <CountdownTimer expiresAt={post.expiresAt} />
        </div>

        <div className="card" style={{ backgroundColor: 'var(--bg-app)', border: 'none', marginBottom: '24px', padding: 0, overflow: 'hidden' }}>
          
          {/* Map Snippet */}
          <div style={{ height: '120px', width: '100%' }}>
            <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
              <Map 
                defaultCenter={post.location || { lat: 40.7128, lng: -74.0060 }} 
                defaultZoom={14}
                disableDefaultUI={true}
                mapId="FOODBRIDGE_MODAL_MAP"
              >
                <Marker position={post.location || { lat: 40.7128, lng: -74.0060 }} />
              </Map>
            </APIProvider>
          </div>

          <div style={{ padding: '16px' }}>
            <div className="flex-row" style={{ color: 'var(--text-secondary)' }}>
              <MapPin size={18} />
              <span>{post.distance} {t('kmAway')}</span>
            </div>
            {localStatus === 'claimed' && (
              <p style={{ marginTop: '8px', fontSize: '14px', color: 'var(--text-primary)' }}>
                123 Demo Street, City Center, 10001
              </p>
            )}
          </div>
        </div>

        {localStatus === 'available' && (
          <button 
            className="btn btn-primary" 
            onClick={handleClaim}
            disabled={isClaiming}
          >
            {isClaiming ? t('claiming') : t('claimFood')}
          </button>
        )}

        {localStatus === 'claimed' && (
          <div className="animate-fade-in">
            <div className="flex-row mb-2" style={{ color: 'var(--color-success)', fontWeight: '500', justifyContent: 'center' }}>
              <CheckCircle size={20} />
              {t('claimedSuccess')}
            </div>
            
            <div className="flex-row" style={{ gap: '8px', marginBottom: '16px' }}>
              <button className="btn btn-outline" style={{ flex: 1, padding: '12px' }} onClick={() => alert('Calling donor... (Demo)')}>
                <Phone size={18} />
                {t('callDonor')}
              </button>
              <button className="btn btn-primary" style={{ flex: 1, padding: '12px' }} onClick={() => alert('Opening maps... (Demo)')}>
                <Navigation size={18} />
                {t('directions')}
              </button>
            </div>

            <button className="btn btn-accent" onClick={handlePickedUp}>
              {t('markPickedUp')}
            </button>
          </div>
        )}

        {localStatus === 'picked-up' && (
          <div className="text-center animate-fade-in" style={{ padding: '24px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle size={32} color="white" />
            </div>
            <h3>{t('pickupConfirmed')}</h3>
            <p className="caption">{t('thankYou')}</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ListingDetailModal;
