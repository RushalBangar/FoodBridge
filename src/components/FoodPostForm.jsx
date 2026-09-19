import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FoodPostForm = () => {
  const { addPost } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [foodType, setFoodType] = useState('Cooked meal');
  const [quantity, setQuantity] = useState(10);
  const [expiryHours, setExpiryHours] = useState(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expiresAt = new Date(Date.now() + expiryHours * 60 * 60 * 1000).toISOString();
    
    addPost({
      foodType,
      quantity: `${quantity} servings`,
      expiresAt,
      status: 'available'
    });
    navigate('/donor');
  };

  return (
    <div className="animate-fade-in screen-content">
      <div className="flex-row mb-4" style={{ cursor: 'pointer' }} onClick={() => navigate('/donor')}>
        <ArrowLeft size={20} color="var(--color-primary)" />
        <h2 style={{ margin: 0, color: 'var(--color-primary)' }}>{t('postSurplusFood')}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* Food Type Chips */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>{t('whatKind')}</label>
          <div className="chip-group">
            {['Cooked meal', 'Raw ingredients', 'Packaged food', 'Baked goods'].map(type => (
              <div 
                key={type}
                className={`chip ${foodType === type ? 'active' : ''}`}
                onClick={() => setFoodType(type)}
              >
                {type}
              </div>
            ))}
          </div>
        </div>

        {/* Quantity Stepper */}
        <div className="card flex-between" style={{ marginBottom: '24px' }}>
          <div style={{ fontWeight: '500' }}>{t('quantity')}</div>
          <div className="flex-row" style={{ gap: '16px' }}>
            <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 5))} className="btn btn-outline" style={{ padding: '8px' }}>
              <Minus size={16} />
            </button>
            <span style={{ fontSize: '18px', fontWeight: '600', minWidth: '40px', textAlign: 'center' }}>
              {quantity}
            </span>
            <button type="button" onClick={() => setQuantity(quantity + 5)} className="btn btn-outline" style={{ padding: '8px' }}>
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Expiry Slider */}
        <div className="card" style={{ marginBottom: '32px' }}>
          <div className="flex-between mb-2">
            <span style={{ fontWeight: '500' }}>{t('whenDoesItExpire')}</span>
            <span style={{ color: 'var(--color-accent)', fontWeight: '600' }}>{expiryHours} hrs</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="24" 
            value={expiryHours}
            onChange={(e) => setExpiryHours(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--color-primary)' }}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px' }}>
          {t('publishListing')}
        </button>
      </form>
    </div>
  );
};

export default FoodPostForm;
