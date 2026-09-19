import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Splash from './components/Splash';
import { Legal } from './components/Legal';
import DonorHome from './components/DonorHome';
import FoodPostForm from './components/FoodPostForm';
import FeedList from './components/FeedList';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import { PieChart, List, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MainLayout = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { logOut, userProfile } = useAppContext();

  const isSplash = location.pathname === '/';
  const showBottomNav = location.pathname === '/feed' || location.pathname === '/impact';

  return (
    <div className="app-container">
      {/* Top Nav for non-splash screens */}
      {!isSplash && (
        <div className="top-nav">
          <h1 style={{ margin: 0, fontSize: '20px', color: 'var(--color-primary)' }}>FoodBridge</h1>
          
          <div className="flex-row" style={{ gap: '16px' }}>
            <div 
              className="flex-row" 
              style={{ color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer', background: 'rgba(0,0,0,0.05)', padding: '4px 8px', borderRadius: '12px' }}
              onClick={() => {
                const langs = ['EN', 'HI', 'MR'];
                const nextIndex = (langs.indexOf(i18n.language) + 1) % langs.length;
                i18n.changeLanguage(langs[nextIndex]);
              }}
            >
              <Globe size={16} />
              <span style={{ fontWeight: i18n.language === 'EN' ? 'bold' : 'normal' }}>EN</span> / 
              <span style={{ fontWeight: i18n.language === 'HI' ? 'bold' : 'normal', marginLeft: '4px' }}>HI</span> / 
              <span style={{ fontWeight: i18n.language === 'MR' ? 'bold' : 'normal', marginLeft: '4px' }}>MR</span>
            </div>

            {userProfile && (
              <div 
                style={{ fontSize: '14px', color: 'var(--color-danger)', cursor: 'pointer', fontWeight: '500' }}
                onClick={async () => {
                  await logOut();
                  navigate('/');
                }}
              >
                Log out
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/donor" element={<DonorHome />} />
        <Route path="/post" element={<FoodPostForm />} />
        <Route path="/feed" element={<FeedList />} />
        <Route path="/impact" element={<Dashboard />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {/* Bottom Nav for NGO */}
      {showBottomNav && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-color)',
          display: 'flex', justifyContent: 'space-around', padding: '12px 0 24px',
          zIndex: 50, maxWidth: '480px', margin: '0 auto'
        }}>
          <div 
            onClick={() => navigate('/feed')}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', color: location.pathname === '/feed' ? 'var(--color-primary)' : 'var(--text-secondary)' }}
          >
            <List size={24} />
            <span style={{ fontSize: '12px', fontWeight: '500' }}>{t('liveFeed')}</span>
          </div>
          <div 
            onClick={() => navigate('/impact')}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', color: location.pathname === '/impact' ? 'var(--color-primary)' : 'var(--text-secondary)' }}
          >
            <PieChart size={24} />
            <span style={{ fontSize: '12px', fontWeight: '500' }}>{t('impactDashboard')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </Router>
  );
}

export default App;
