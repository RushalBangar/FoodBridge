import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const TopNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Return true if current path matches
  const isActive = (path) => location.pathname === path;

  // Active/Inactive classes for nav items
  const activeClass = "px-space-md py-space-xs transition-colors bg-sage-surface text-primary font-bold rounded-full";
  const inactiveClass = "px-space-md py-space-xs font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors";

  // Active/Inactive for mobile nav items
  const activeMobileClass = "px-space-md py-2 transition-colors bg-sage-surface text-primary font-bold rounded-lg";
  const inactiveMobileClass = "px-space-md py-2 font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-glass-bg backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-space-md">
        
        {/* Left: Logo & Stats */}
        <div className="flex items-center gap-space-md shrink-0">
          <a 
            className="flex items-center gap-space-sm cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <img 
              alt="FoodBridge Logo" 
              className="h-8 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1Xz2bwctCCBTGIMQmH80qFSvboetyKJlhPjZS3OjgM3G-SeLVPzdIqO06PsEZ363WV4suji8GtJjqtnCmz-A4og5AXLm6-mdNuVHd7Gs_4EQtVieVhK9HK2RV9WBRKMpI4yo9LhW8GXgsaafPAIvIYvNxapD6ib6JnVuQ9e2u5k9QPADkIMWe4dVDjzKX9AJyAdVjaxbI4W1dJjthyzHRvjkJq5sasOJ7HvTfeM1yO7Ww"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight">FoodBridge</span>
              <span className="hidden sm:inline-block font-caption text-caption text-outline -mt-1">No plate left empty</span>
            </div>
          </a>
          <div className="hidden xl:flex items-center gap-space-xs px-space-sm py-1 bg-sage-surface rounded-full shadow-[0_1px_3px_rgba(4,120,87,0.08)]">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-primary">12,480+ meals rescued</span>
          </div>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-space-xs p-1 bg-surface-container-lowest/70 rounded-full">
          <a 
            className={isActive('/') ? activeClass : inactiveClass} 
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            Home
          </a>
          <a 
            className={isActive('/feed') ? activeClass : inactiveClass} 
            onClick={() => navigate('/feed')}
            style={{ cursor: 'pointer' }}
          >
            Find Food (Feed)
          </a>
          <a 
            className={isActive('/donor') ? activeClass : inactiveClass} 
            onClick={() => navigate('/donor')}
            style={{ cursor: 'pointer' }}
          >
            Donate (Donor)
          </a>
          <a 
            className={isActive('/impact') ? activeClass : inactiveClass} 
            onClick={() => navigate('/impact')}
            style={{ cursor: 'pointer' }}
          >
            Impact
          </a>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-space-sm shrink-0">
          {!userProfile ? (
            <a 
              className="inline-flex items-center justify-center px-space-md py-2 font-label-lg text-label-lg text-on-primary bg-primary hover:bg-tertiary rounded-full shadow-[0_2px_8px_rgba(4,120,87,0.25)] transition-all cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Sign In / Auth
            </a>
          ) : (
            <a 
              className="inline-flex items-center justify-center px-space-md py-2 font-label-lg text-label-lg text-on-primary bg-primary hover:bg-tertiary rounded-full shadow-[0_2px_8px_rgba(4,120,87,0.25)] transition-all cursor-pointer"
              onClick={() => navigate('/donor')}
            >
              Dashboard
            </a>
          )}
          <button 
            aria-label="Toggle Menu" 
            className="lg:hidden p-2 text-on-surface hover:bg-surface-container-low rounded-lg transition-colors" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-white px-margin-mobile py-space-lg shadow-[0_10px_25px_-5px_rgba(6,95,70,0.08)] flex flex-col gap-space-sm">
          <div className="flex items-center gap-space-xs px-space-sm py-1 bg-sage-surface rounded-full w-fit mb-space-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-primary">12,480+ meals rescued</span>
          </div>
          <nav className="flex flex-col gap-space-xs">
            <a 
              className={isActive('/') ? activeMobileClass : inactiveMobileClass} 
              onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
              style={{ cursor: 'pointer' }}
            >
              Home
            </a>
            <a 
              className={isActive('/feed') ? activeMobileClass : inactiveMobileClass} 
              onClick={() => { navigate('/feed'); setMobileMenuOpen(false); }}
              style={{ cursor: 'pointer' }}
            >
              Find Food (Feed)
            </a>
            <a 
              className={isActive('/donor') ? activeMobileClass : inactiveMobileClass} 
              onClick={() => { navigate('/donor'); setMobileMenuOpen(false); }}
              style={{ cursor: 'pointer' }}
            >
              Donate (Donor)
            </a>
            <a 
              className={isActive('/impact') ? activeMobileClass : inactiveMobileClass} 
              onClick={() => { navigate('/impact'); setMobileMenuOpen(false); }}
              style={{ cursor: 'pointer' }}
            >
              Impact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default TopNav;
