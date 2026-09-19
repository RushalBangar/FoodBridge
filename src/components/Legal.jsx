import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Legal = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in screen-content">
      <div className="flex-row mb-4" style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
        <ArrowLeft size={20} color="var(--color-primary)" />
        <h2 style={{ margin: 0, color: 'var(--color-primary)' }}>Legal & Safety</h2>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3>Terms of Service (Food Safety Disclaimer)</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
          By using FoodBridge, Donors agree that all donated food has been stored and prepared in accordance with local health and safety regulations. Donors are protected under the Good Samaritan Food Donation Act, provided the food was donated in good faith and without gross negligence.
          <br /><br />
          NGOs and Rescuers agree to inspect all food upon pickup and transport it using appropriate temperature controls. FoodBridge acts strictly as a communication platform and assumes no liability for the quality, safety, or consumption of the food listed.
        </p>
      </div>

      <div className="card">
        <h3>Privacy Policy</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
          FoodBridge collects your location data (via GPS) strictly to calculate the distance between Donors and Rescuers. This data is not tracked continuously, and your exact coordinates are never shared with third parties.
          <br /><br />
          Your Email and Restaurant/NGO Name are stored securely on our servers to verify identities and maintain trust within our network. You may delete your account and all associated data at any time.
        </p>
      </div>
    </div>
  );
};
