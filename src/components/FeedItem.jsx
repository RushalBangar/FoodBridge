import React from 'react';
import { MapPin } from 'lucide-react';
import CountdownTimer from './common/CountdownTimer';
import { useTranslation } from 'react-i18next';

const FeedItem = ({ post, onClick }) => {
  const { t } = useTranslation();

  return (
    <div className="card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="card-header">
        <div>
          <h3 style={{ margin: 0 }}>{post.foodType}</h3>
          <p className="caption" style={{ marginTop: '4px' }}>{post.donorName}</p>
        </div>
        <CountdownTimer expiresAt={post.expiresAt} />
      </div>
      
      <div className="flex-between mt-2">
        <div style={{ fontWeight: '500', fontSize: '15px' }}>
          {post.quantity}
        </div>
        <div className="flex-row" style={{ color: 'var(--text-secondary)', fontSize: '14px', gap: '4px' }}>
          <MapPin size={16} />
          {post.distance} {t('kmAway')}
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
