import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, Minus, Plus, Camera, Loader } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GoogleGenerativeAI } from '@google/generative-ai';

const FoodPostForm = () => {
  const { addPost } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const fileInputRef = useRef(null);
  
  const [foodType, setFoodType] = useState('Cooked meal');
  const [quantity, setQuantity] = useState(10);
  const [expiryHours, setExpiryHours] = useState(2);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsAnalyzing(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Missing Gemini API Key");
      }
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
          const base64Data = reader.result.split(',')[1];
          const prompt = "Analyze this food image. Return ONLY a valid JSON object with these keys: 'foodType' (string, choose exactly one from: 'Cooked meal', 'Raw ingredients', 'Packaged food', 'Baked goods'), 'quantity' (integer, estimated number of servings), 'expiryHours' (integer, estimated safe hours before expiry, e.g. 2 for cooked, 24 for raw, 168 for packaged). Do not include markdown formatting or backticks, just the raw JSON.";
          
          const imageParts = [{
            inlineData: {
              data: base64Data,
              mimeType: file.type
            }
          }];

          const result = await model.generateContent([prompt, ...imageParts]);
          let text = result.response.text();
          text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
          
          const data = JSON.parse(text);
          if (data.foodType) setFoodType(data.foodType);
          if (data.quantity) setQuantity(parseInt(data.quantity) || 10);
          if (data.expiryHours) setExpiryHours(parseInt(data.expiryHours) || 2);
        } catch (innerErr) {
          console.error("Parse Error:", innerErr);
          alert("Could not parse AI response.");
        } finally {
          setIsAnalyzing(false);
        }
      };
    } catch (err) {
      console.error(err);
      alert("AI Analysis failed: " + err.message);
      setIsAnalyzing(false);
    }
  };

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

      <div className="card text-center mb-4" style={{ backgroundColor: 'var(--color-accent)', color: 'white', cursor: 'pointer' }} onClick={() => fileInputRef.current?.click()}>
        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleImageUpload}
        />
        {isAnalyzing ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px' }}>
            <Loader className="animate-spin" size={32} />
            <span style={{ fontWeight: '500' }}>Gemini AI is analyzing food...</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px' }}>
            <Camera size={32} />
            <span style={{ fontWeight: '600' }}>AI Auto-Fill (Snap a Photo)</span>
            <span style={{ fontSize: '12px', opacity: 0.9 }}>Let Google Gemini estimate food type, quantity & expiry</span>
          </div>
        )}
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
            max="168" 
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
