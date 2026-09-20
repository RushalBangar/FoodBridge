import React from 'react';
import { useTranslation } from 'react-i18next';

const FeedItem = ({ post, onClick }) => {
  const { t } = useTranslation();

  // Determine urgency color
  const hoursUntilExpiry = (new Date(post.expiresAt) - new Date()) / (1000 * 60 * 60);
  const isUrgent = hoursUntilExpiry < 2;

  return (
    <article 
      className="w-full bg-surface-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group cursor-pointer mb-space-md"
      onClick={onClick}
    >
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-0">
        {/* Image / Thumbnail */}
        <div className="sm:col-span-4 relative h-48 sm:h-auto min-h-[160px] bg-surface-container-low flex items-center justify-center">
          {post.imageUrl ? (
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              src={post.imageUrl} 
              alt={post.foodType} 
            />
          ) : (
            <span className="material-symbols-outlined text-[48px] text-outline opacity-50">restaurant</span>
          )}
          
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold shadow-sm flex items-center gap-1 ${isUrgent ? 'bg-error text-on-error animate-pulse' : 'bg-honey-light text-honey-deep'}`}>
              <span className="material-symbols-outlined text-[14px]">timer</span>
              {isUrgent ? 'Expiring Soon' : 'Active'}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-white/95 backdrop-blur font-label-sm text-label-sm text-primary font-bold shadow-sm inline-block w-max">
              {post.foodType === 'Cooked meal' ? '🍲 Hot Prepared' : (post.foodType === 'Produce' ? '🥦 Fresh Produce' : '🥖 Bakery/Pantry')}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="sm:col-span-8 p-space-md flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <span className="font-caption text-caption uppercase tracking-wider text-outline font-semibold">{post.donorName || 'Local Donor'}</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors leading-tight">
                  {post.foodType} - {post.quantity} servings
                </h3>
              </div>
              <button className="text-outline hover:text-primary transition-colors p-1" title="Bookmark">
                <span className="material-symbols-outlined text-[20px]">bookmark</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 my-2 text-on-surface-variant font-body-sm text-body-sm">
              <span className="flex items-center gap-1 font-semibold text-primary">
                <span className="material-symbols-outlined text-[16px]">groups</span>
                {post.quantity} {t('servings')}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-outline">
                <span className="material-symbols-outlined text-[16px]">near_me</span>
                {post.distance || '0.5'} {t('kmAway')}
              </span>
            </div>
            
            <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-3">
              {post.description || 'No detailed description provided.'}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 pt-space-xs">
            <button className="font-label-md text-label-md text-primary hover:text-tertiary flex items-center gap-0.5" onClick={(e) => { e.stopPropagation(); onClick(); }}>
              <span>View Details</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
            {post.status === 'available' ? (
              <button className="px-space-md py-2 rounded-full font-label-md text-label-md font-bold bg-primary text-on-primary hover:bg-tertiary shadow-md transition-all flex items-center gap-1.5" onClick={(e) => { e.stopPropagation(); onClick(); }}>
                <span className="material-symbols-outlined text-[18px]">bolt</span>
                Claim Food
              </button>
            ) : (
              <span className="px-space-md py-2 rounded-full font-label-md text-label-md font-bold bg-surface-container-high text-on-surface-variant shadow-sm flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Claimed
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeedItem;
