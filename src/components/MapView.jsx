import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { useAppContext } from '../context/AppContext';

const MapView = () => {
  const { posts, userType } = useAppContext();
  
  // Use NYC as center for demo
  const defaultCenter = { lat: 40.7128, lng: -74.0060 };
  
  // NOTE: For a real deployment, provide a valid API key via env variable.
  // We use a blank/dummy one here, which will show the "Development purposes only" map.
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE';

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '1rem', marginBottom: '2rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>Nearby Activity</h3>
      <div className="map-container">
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <Map 
            defaultCenter={defaultCenter} 
            defaultZoom={13}
            mapId="FOODBRIDGE_DEMO_MAP"
            disableDefaultUI={true}
          >
            {posts.filter(p => p.status === 'available').map(post => (
              <Marker 
                key={post.id} 
                position={post.location} 
                title={post.foodType}
              />
            ))}
          </Map>
        </APIProvider>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
        {userType === 'donor' 
          ? "Showing nearby NGO demand (mocked)" 
          : "Showing available surplus food near you"}
      </p>
    </div>
  );
};

export default MapView;
