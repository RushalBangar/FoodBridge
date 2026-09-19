import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ChefHat, HeartHandshake, Leaf, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Splash = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { userProfile, signUp, logIn } = useAppContext();
  
  const [selectedRole, setSelectedRole] = useState(null); // 'donor' | 'ngo' | null
  const [isLoginMode, setIsLoginMode] = useState(false);
  
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-redirect if already logged in
  useEffect(() => {
    if (userProfile) {
      navigate(userProfile.role === 'donor' ? '/donor' : '/feed');
    }
  }, [userProfile, navigate]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);
    
    try {
      if (isLoginMode) {
        await logIn(emailInput, passwordInput);
        // Navigation happens automatically via useEffect above
      } else {
        if (!nameInput.trim()) {
          throw new Error("Please provide a name.");
        }
        await signUp(emailInput, passwordInput, nameInput.trim(), selectedRole);
        // Navigation happens automatically via useEffect above
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
      setIsSubmitting(false);
    }
  };

  // If a role is selected (Sign Up) or Login mode is active, show the form
  if (selectedRole || isLoginMode) {
    return (
      <div className="animate-fade-in screen-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <button 
          onClick={() => {
            setSelectedRole(null);
            setIsLoginMode(false);
            setErrorMsg('');
          }} 
          style={{ background: 'none', border: 'none', alignSelf: 'flex-start', cursor: 'pointer', marginBottom: '24px' }}
        >
          <ArrowLeft color="var(--text-secondary)" />
        </button>

        <h2 style={{ color: 'var(--color-primary)' }}>
          {isLoginMode ? 'Welcome Back!' : (selectedRole === 'donor' ? 'Welcome, Donor!' : 'Welcome, Rescuer!')}
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          {isLoginMode ? 'Log in to continue' : 'Create an account to join the movement.'}
        </p>

        {errorMsg && (
          <div style={{ backgroundColor: 'var(--color-danger)', color: 'white', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isLoginMode && (
            <div className="input-group">
              <input 
                type="text" 
                placeholder={selectedRole === 'donor' ? "Restaurant / Org Name" : "Your Name / NGO Name"}
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email Address"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ padding: '16px', marginTop: '8px' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Loading...' : (isLoginMode ? 'Log In' : 'Sign Up')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button 
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setErrorMsg('');
            }}
            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: '600', cursor: 'pointer' }}
          >
            {isLoginMode ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center', paddingTop: '48px', paddingBottom: '32px' }}>
        <img 
          src="/logo.jpg" 
          alt="FoodBridge Logo" 
          style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 24px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
        />
        <h1 style={{ fontSize: '32px', color: 'var(--color-primary)', marginBottom: '12px' }}>FoodBridge</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '80%', margin: '0 auto' }}>
          {t('tagline')}
        </p>
      </div>

      {/* Role Selection */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div className="card" style={{ cursor: 'pointer', border: '2px solid transparent', transition: 'all 0.2s' }} onClick={() => setSelectedRole('donor')}>
          <div className="flex-row" style={{ gap: '16px' }}>
            <div style={{ backgroundColor: 'rgba(31, 122, 84, 0.1)', padding: '12px', borderRadius: '50%', color: 'var(--color-primary)' }}>
              <ChefHat size={32} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 4px' }}>{t('giveFood')}</h3>
              <p className="caption" style={{ margin: 0 }}>{t('lightningFastDesc')}</p>
            </div>
            <ArrowRight color="var(--text-secondary)" />
          </div>
        </div>

        <div className="card" style={{ cursor: 'pointer', border: '2px solid transparent', transition: 'all 0.2s' }} onClick={() => setSelectedRole('ngo')}>
          <div className="flex-row" style={{ gap: '16px' }}>
            <div style={{ backgroundColor: 'rgba(232, 163, 61, 0.1)', padding: '12px', borderRadius: '50%', color: 'var(--color-secondary)' }}>
              <HeartHandshake size={32} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 4px' }}>{t('iCanRescue')}</h3>
              <p className="caption" style={{ margin: 0 }}>{t('iCanRescueDesc')}</p>
            </div>
            <ArrowRight color="var(--text-secondary)" />
          </div>
        </div>

        <button 
          onClick={() => setIsLoginMode(true)}
          className="btn btn-outline" 
          style={{ width: '100%', padding: '12px', marginTop: '8px' }}
        >
          Already have an account? Log In
        </button>

      </div>

      {/* Impact Stats */}
      <div style={{ marginTop: '48px', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', color: 'var(--color-success)' }}>
          <Leaf size={24} />
        </div>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>{t('joinTheMovement')}</h3>
        <p className="caption" style={{ marginBottom: '32px' }}>{t('movementDesc')}</p>
        
        <div 
          onClick={() => navigate('/legal')}
          style={{ fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Terms of Service & Privacy Policy
        </div>
      </div>

    </div>
  );
};

export default Splash;
