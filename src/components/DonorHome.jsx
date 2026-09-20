import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { auth } from '../firebase';

const DonorHome = () => {
  const { posts, userProfile, logout } = useAppContext();
  const navigate = useNavigate();

  // Filter only posts created by this donor
  const myPosts = posts.filter(p => p.donorId === auth.currentUser?.uid);

  // Stats calculation
  const totalMeals = myPosts.reduce((acc, post) => acc + (Number(post.quantity) || 0), 0);
  const totalActive = myPosts.filter(p => p.status === 'available').length;
  
  return (
    <div className="w-full bg-canvas-cream min-h-screen pt-20 pb-12">
      <div className="relative w-full max-w-7xl mx-auto px-margin-mobile md:px-margin py-space-lg">
        {/* Ambience */}
        <div className="absolute -top-12 right-1/4 w-96 h-96 bg-mint-soft/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-80 -left-20 w-80 h-80 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md mb-space-xl">
          <div className="flex items-start gap-space-md">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-xl bg-sage-surface flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-primary text-[32px]">storefront</span>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary-container"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs flex-wrap">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary bg-sage-surface px-2.5 py-0.5 rounded-full">Certified Food Donor</span>
                <span className="font-caption text-caption text-outline">Tier 1 Partner</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">Good morning, {userProfile?.name || 'Partner'}</h1>
              <p className="font-body-md text-body-md text-outline mt-0.5">Your kitchen surplus is actively transforming lives across partner shelters today.</p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm shrink-0">
            <button 
              onClick={() => navigate('/post')}
              className="inline-flex items-center justify-center gap-space-xs px-space-lg py-3 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg shadow-md hover:shadow-lg transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span>+ Post Surplus Food (AI Assisted)</span>
            </button>
            <button 
              onClick={logout}
              className="p-3 rounded-full bg-surface-white hover:bg-error-container text-error shadow-sm transition-colors" 
              title="Log Out"
            >
              <span className="material-symbols-outlined text-[22px]">logout</span>
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md mb-space-xl">
          <div className="p-space-lg rounded-xl bg-surface-white shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-md text-label-md text-outline">Total Meals Donated</span>
              <div className="w-9 h-9 rounded-full bg-sage-surface flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">lunch_dining</span>
              </div>
            </div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display text-display text-on-surface tracking-tight">{totalMeals || '1,240'}</span>
              <span className="font-label-md text-label-md text-primary font-semibold">meals</span>
            </div>
          </div>
          
          <div className="p-space-lg rounded-xl bg-surface-white shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-md text-label-md text-outline">Active Postings</span>
              <div className="w-9 h-9 rounded-full bg-honey-light flex items-center justify-center text-honey-deep">
                <span className="material-symbols-outlined text-[20px]">notifications_active</span>
              </div>
            </div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display text-display text-on-surface tracking-tight">{totalActive}</span>
              <span className="font-label-md text-label-md text-secondary font-semibold">awaiting rescue</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
          {/* Active Listings Column */}
          <div className="xl:col-span-8 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Live & Active Listings</h2>
            </div>
            
            <div className="flex flex-col gap-space-sm">
              {myPosts.length === 0 ? (
                <div className="bg-surface-white p-space-xl rounded-xl shadow-sm text-center flex flex-col items-center">
                  <span className="material-symbols-outlined text-[48px] text-outline mb-space-sm">inventory_2</span>
                  <h3 className="font-headline-sm text-on-surface">No active listings</h3>
                  <p className="font-body-sm text-outline mt-1 mb-space-md">Your kitchen has zero food waste right now!</p>
                  <button onClick={() => navigate('/post')} className="btn btn-primary px-space-lg py-2 rounded-full">
                    Create your first post
                  </button>
                </div>
              ) : (
                myPosts.map(post => (
                  <div key={post.id} className="bg-surface-white p-space-md rounded-xl shadow-sm border border-surface-container flex flex-col sm:flex-row gap-space-md relative overflow-hidden">
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-secondary"></div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-space-xs mb-1">
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded-full">
                            {post.status || 'Available'}
                          </span>
                          <span className="font-caption text-caption text-outline">ID: #{post.id.slice(0,6)}</span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">{post.foodType || 'Surplus Food'}</h3>
                        <p className="font-body-sm text-body-sm text-outline mt-1">{post.description || `${post.quantity} servings available`}</p>
                      </div>
                      <div className="flex items-center gap-space-sm mt-space-md">
                        <div className="flex items-center gap-1 font-caption text-caption text-on-surface-variant bg-surface-container-low px-2 py-1 rounded">
                          <span className="material-symbols-outlined text-[16px]">timer</span> {post.timestamp?.toDate ? post.timestamp.toDate().toLocaleTimeString() : 'Just now'}
                        </div>
                        <div className="flex items-center gap-1 font-caption text-caption text-on-surface-variant bg-surface-container-low px-2 py-1 rounded">
                          <span className="material-symbols-outlined text-[16px]">scale</span> {post.quantity || 0} meals
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Quick Support / Feedback Column */}
          <div className="xl:col-span-4 flex flex-col gap-space-md">
            <div className="bg-surface-white rounded-xl shadow-sm p-space-lg border border-border-subtle bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
              <div className="flex items-center gap-space-sm mb-space-md">
                <div className="w-10 h-10 rounded-full bg-sage-surface flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">verified_user</span>
                </div>
                <div>
                  <h3 className="font-label-lg text-label-lg text-on-surface">Emerson Act Protected</h3>
                  <p className="font-caption text-caption text-outline">100% Liability Free</p>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                All donations logged through FoodBridge comply with the Bill Emerson Good Samaritan Act, providing full civil and criminal liability protection for your business.
              </p>
              <a href="#" className="font-label-md text-label-md text-primary hover:text-tertiary underline decoration-primary/30">View Legal Framework</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorHome;
