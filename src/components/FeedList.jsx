import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import FeedItem from './FeedItem';
import ListingDetailModal from './ListingDetailModal';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeedList = () => {
  const { posts } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Nearest'); // Nearest, Expiring Soon, Food Type

  // Filter out expired posts for the demo feed, and only show 'available'
  const availablePosts = useMemo(() => {
    let filtered = posts.filter(p => 
      p.status === 'available' && new Date(p.expiresAt) > new Date()
    );

    if (activeFilter === 'Nearest') {
      filtered.sort((a, b) => a.distance - b.distance);
    } else if (activeFilter === 'Expiring Soon') {
      filtered.sort((a, b) => new Date(a.expiresAt) - new Date(b.expiresAt));
    } else if (activeFilter === 'Cooked Meals') {
      filtered = filtered.filter(p => p.foodType === 'Cooked meal');
    }

    return filtered;
  }, [posts, activeFilter]);

  return (
    <div className="animate-fade-in screen-content">
      <div className="flex-row mb-2" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <ArrowLeft size={20} color="var(--color-primary)" />
        <h2 style={{ margin: 0, color: 'var(--color-primary)' }}>{t('liveFeed')}</h2>
      </div>
      
      <div className="chip-group" style={{ marginBottom: '16px' }}>
        <div 
          className={`chip ${activeFilter === 'Nearest' ? 'active' : ''}`}
          onClick={() => setActiveFilter('Nearest')}
        >{t('nearest')}</div>
        <div 
          className={`chip ${activeFilter === 'Expiring Soon' ? 'active' : ''}`}
          onClick={() => setActiveFilter('Expiring Soon')}
        >{t('expiringSoon')}</div>
        <div 
          className={`chip ${activeFilter === 'Cooked Meals' ? 'active' : ''}`}
          onClick={() => setActiveFilter('Cooked Meals')}
        >{t('cookedMeals')}</div>
      </div>

      <div style={{ paddingBottom: '20px' }}>
        {availablePosts.length === 0 ? (
          <div className="empty-state">
            <p>{t('noFoodNearby')}</p>
          </div>
        ) : (
          availablePosts.map(post => (
            <FeedItem 
              key={post.id} 
              post={post} 
              onClick={() => setSelectedPost(post)} 
            />
          ))
        )}
      </div>

      {selectedPost && (
        <ListingDetailModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}
    </div>
  );
};

export default FeedList;
