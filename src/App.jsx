import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Splash from './components/Splash';
import { Legal } from './components/Legal';
import LandingPage from './components/LandingPage';
import DonorHome from './components/DonorHome';
import FoodPostForm from './components/FoodPostForm';
import FeedList from './components/FeedList';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import TopNav from './components/TopNav';

const MainLayout = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isLogin = location.pathname === '/login';
  const showTopNav = !isLanding && !isLogin;

  return (
    <div className="app-container">
      {showTopNav && <TopNav />}
      {/* Main Content Area */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Splash />} />
        <Route path="/donor" element={<DonorHome />} />
        <Route path="/post" element={<FoodPostForm />} />
        <Route path="/feed" element={<FeedList />} />
        <Route path="/impact" element={<Dashboard />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
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
