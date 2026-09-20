import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import FeedItem from './FeedItem';
import ListingDetailModal from './ListingDetailModal';
import MapView from './MapView';
import { useTranslation } from 'react-i18next';

const FeedList = () => {
  const { posts, logout } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All Items'); // All Items, Hot Prepared, Fresh Produce, Bakery
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic
  const availablePosts = useMemo(() => {
    let filtered = posts.filter(p => 
      p.status === 'available' && new Date(p.expiresAt) > new Date()
    );

    if (searchQuery) {
      filtered = filtered.filter(p => 
        (p.foodType || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.donorName || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeFilter === 'Hot Prepared') {
      filtered = filtered.filter(p => p.foodType === 'Cooked meal');
    } else if (activeFilter === 'Fresh Produce') {
      filtered = filtered.filter(p => p.foodType === 'Produce');
    } else if (activeFilter === 'Bakery') {
      filtered = filtered.filter(p => p.foodType !== 'Cooked meal' && p.foodType !== 'Produce');
    }

    // Default sort by distance (assuming nearest is best)
    filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0));

    return filtered;
  }, [posts, activeFilter, searchQuery]);

  return (
    <div className="w-full bg-canvas-cream min-h-screen pt-20 pb-12">
      {/* Live Alert Ticker Bar */}
      <section className="w-full bg-surface-container-low px-margin-mobile md:px-margin py-space-sm shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <span className="flex h-3 w-3 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <div className="flex items-center gap-space-xs font-label-md text-label-md text-primary truncate">
              <span className="font-bold tracking-tight">LIVE RESCUE RADAR:</span>
              <span className="text-on-surface truncate">{availablePosts.length} fresh donations available</span>
            </div>
          </div>
          <div className="flex items-center gap-space-md shrink-0">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-caption text-caption">
              <span className="material-symbols-outlined text-[16px] text-honey-deep">sync</span>
              <span>Auto-sync active</span>
            </div>
            <button 
              onClick={logout}
              className="px-2 py-1 bg-surface-white hover:bg-error-container text-error rounded shadow-sm text-[12px] font-bold"
            >
              Log Out
            </button>
          </div>
        </div>
      </section>

      {/* Main Feed Area */}
      <section className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin py-space-lg">
        
        {/* Filter & Search Toolbar */}
        <div className="w-full bg-surface-white rounded-xl shadow-md p-space-md mb-space-lg border border-border-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-center">
            
            {/* Search */}
            <div className="lg:col-span-6 flex flex-col gap-space-xs">
              <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Search Listings</label>
              <div className="flex items-center px-space-sm py-2 bg-surface-container-low rounded-lg focus-within:bg-surface-white focus-within:ring-2 focus-within:ring-primary transition-all shadow-sm">
                <span className="material-symbols-outlined text-primary text-[20px] mr-2">search</span>
                <input 
                  className="w-full bg-transparent font-body-sm text-body-sm text-on-surface outline-none placeholder:text-outline" 
                  placeholder="Search keyword or donor..." 
                  type="text" 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="text-outline hover:text-on-surface ml-1 text-xs" onClick={() => setSearchQuery('')}>✕</button>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="lg:col-span-6 flex flex-col gap-space-xs">
              <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Food Category</label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {['All Items', 'Hot Prepared', 'Fresh Produce', 'Bakery'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors ${
                      activeFilter === cat ? 'bg-primary text-on-primary font-bold shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:bg-sage-surface'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
          </div>
        </div>

        {/* Master-Detail Split Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
          
          {/* LEFT COLUMN: Feed Stream */}
          <div className="xl:col-span-7 flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-1 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-headline-sm text-on-surface">Available Rescues</span>
                <span className="px-2 py-0.5 rounded-full bg-sage-surface text-primary font-label-sm text-label-sm font-bold">{availablePosts.length} Online</span>
              </div>
            </div>

            <div className="flex flex-col gap-space-sm pt-2">
              {availablePosts.length === 0 ? (
                <div className="bg-surface-white p-space-xl rounded-xl shadow-sm text-center flex flex-col items-center">
                  <span className="material-symbols-outlined text-[48px] text-outline mb-space-sm">search_off</span>
                  <h3 className="font-headline-sm text-on-surface">No rescues match criteria</h3>
                  <p className="font-body-sm text-outline mt-1 mb-space-md">Try expanding your search radius or changing categories.</p>
                  <button onClick={() => {setSearchQuery(''); setActiveFilter('All Items');}} className="btn btn-outline">Clear Filters</button>
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
          </div>

          {/* RIGHT COLUMN: Map View */}
          <div className="xl:col-span-5 flex flex-col gap-space-md sticky top-24">
            <div className="bg-surface-white rounded-xl shadow-md p-space-md border border-border-subtle overflow-hidden flex flex-col h-[600px]">
              <div className="flex items-center justify-between mb-space-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">map</span>
                  <span className="font-label-lg text-label-lg text-on-surface">Live Geo-Radar</span>
                </div>
                <span className="font-caption text-caption text-primary flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                  Updating
                </span>
              </div>
              <div className="w-full flex-1 rounded-lg overflow-hidden border border-surface-container-highest relative">
                <MapView posts={availablePosts} />
              </div>
            </div>
          </div>
        </div>
      </section>

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
