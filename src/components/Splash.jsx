import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ChefHat, HeartHandshake, Leaf, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Splash = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { userProfile, assignRole } = useAppContext();
  
  const [selectedRole, setSelectedRole] = useState(null); // 'donor' | 'ngo' | null
  const [nameInput, setNameInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleSelect = (role) => {
    if (userProfile) {
      // Already has a profile, just navigate
      navigate(role === 'donor' ? '/donor' : '/feed');
    } else {
      // Prompt for name first
      setSelectedRole(role);
    }
  };

  const handleOnboardSubmit = async (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    
    setIsSubmitting(true);
    await assignRole(nameInput.trim(), selectedRole);
    setIsSubmitting(false);
    
    navigate(selectedRole === 'donor' ? '/donor' : '/feed');
  };

  if (selectedRole) {
    return (
      <div className="animate-fade-in screen-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <button 
          onClick={() => setSelectedRole(null)} 
          style={{ background: 'none', border: 'none', alignSelf: 'flex-start', cursor: 'pointer', marginBottom: '24px' }}
        >
          <ArrowLeft color="var(--text-secondary)" />
        </button>

        <h2 style={{ color: 'var(--color-primary)' }}>
          {selectedRole === 'donor' ? 'Welcome, Donor!' : 'Welcome, Rescuer!'}
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          {selectedRole === 'donor' 
            ? 'What is the name of your restaurant or organization?' 
            : 'What is your name or the name of your NGO?'}
        </p>

        <form onSubmit={handleOnboardSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="e.g. Fresh Bites Cafe"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              required
              autoFocus
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ padding: '16px' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Joining...' : 'Get Started'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center', paddingTop: '48px', paddingBottom: '32px' }}>
        <img 
          src="/foodbridge_logo.jpg" 
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
        
        <div className="card" style={{ cursor: 'pointer', border: '2px solid transparent', transition: 'all 0.2s' }} onClick={() => handleRoleSelect('donor')}>
          <div className="flex-row" style={{ gap: '16px' }}>
            <div style={{ backgroundColor: 'rgba(31, 122, 84, 0.1)', padding: '12px', borderRadius: '50%', color: 'var(--color-primary)' }}>
              <ChefHat size={32} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 4px' }}>{t('iHaveFood')}</h3>
              <p className="caption" style={{ margin: 0 }}>{t('iHaveFoodDesc')}</p>
            </div>
            <ArrowRight color="var(--text-secondary)" />
          </div>
        </div>

        <div className="card" style={{ cursor: 'pointer', border: '2px solid transparent', transition: 'all 0.2s' }} onClick={() => handleRoleSelect('ngo')}>
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

      </div>

      {/* Impact Stats */}
      <div style={{ marginTop: '48px', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', color: 'var(--color-success)' }}>
          <Leaf size={24} />
        </div>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>{t('joinTheMovement')}</h3>
        <p className="caption">{t('movementDesc')}</p>
      </div>

    </div>
  );
};

export default Splash;
