import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Plus, ArrowLeft } from 'lucide-react';
import FeedItem from './FeedItem';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase';

const DonorHome = () => {
  const { posts } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const myPosts = posts.filter(p => p.donorId === auth.currentUser?.uid || p.distance === 0);

  return (
    <div className="animate-fade-in screen-content">
      <div className="flex-row mb-4" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <ArrowLeft size={20} color="var(--color-primary)" />
        <h2 style={{ margin: 0, color: 'var(--color-primary)' }}>{t('myActiveListings')}</h2>
      </div>

      <div style={{ marginBottom: '24px' }}>
        {myPosts.length === 0 ? (
          <div className="empty-state">
            <p>{t('noListings')}</p>
          </div>
        ) : (
          myPosts.map(post => (
            <FeedItem key={post.id} post={post} onClick={() => {}} />
          ))
        )}
      </div>

      <button 
        className="btn btn-primary" 
        onClick={() => navigate('/post')}
        style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}
      >
        <Plus size={20} />
        {t('postSurplusFood')}
      </button>
    </div>
  );
};

export default DonorHome;
