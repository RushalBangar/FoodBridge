import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { impactStats } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in screen-content">
      <div className="flex-row mb-2" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <ArrowLeft size={20} color="var(--color-primary)" />
        <h2 style={{ margin: 0, color: 'var(--color-primary)' }}>{t('impactDashboard')}</h2>
      </div>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
        {t('movementText')}
      </p>

      <div style={{ display: 'grid', gap: '16px' }}>
        <div className="card text-center" style={{ marginBottom: 0 }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('mealsSaved')}</div>
          <div style={{ fontSize: '36px', fontWeight: '500', color: 'var(--color-primary)', marginTop: '8px' }}>
            {impactStats.mealsSaved.toLocaleString()}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="card text-center" style={{ marginBottom: 0 }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '13px', textTransform: 'uppercase' }}>{t('kgDiverted')}</div>
            <div style={{ fontSize: '24px', fontWeight: '500', color: 'var(--color-accent)', marginTop: '8px' }}>
              {impactStats.kgDiverted.toLocaleString()}
            </div>
          </div>
          
          <div className="card text-center" style={{ marginBottom: 0 }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '13px', textTransform: 'uppercase' }}>{t('activeDonors')}</div>
            <div style={{ fontSize: '24px', fontWeight: '500', color: 'var(--color-secondary)', marginTop: '8px' }}>
              {impactStats.activeDonors}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mock Bar Chart Area */}
      <div className="card mt-4" style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '12px', padding: '24px 16px 16px', borderBottom: '1px solid var(--border-color)' }}>
         <div style={{ flex: 1, backgroundColor: 'var(--color-primary)', opacity: 0.4, height: '40%', borderRadius: '4px 4px 0 0' }}></div>
         <div style={{ flex: 1, backgroundColor: 'var(--color-primary)', opacity: 0.6, height: '60%', borderRadius: '4px 4px 0 0' }}></div>
         <div style={{ flex: 1, backgroundColor: 'var(--color-primary)', opacity: 0.8, height: '80%', borderRadius: '4px 4px 0 0' }}></div>
         <div style={{ flex: 1, backgroundColor: 'var(--color-primary)', height: '100%', borderRadius: '4px 4px 0 0' }}></div>
      </div>
      <p className="text-center caption mt-2">{t('foodRescuedThisWeek')}</p>
      
      {/* Hidden button to demonstrate Sentry Error Tracking to Judges */}
      <button 
        style={{ opacity: 0.1, position: 'absolute', bottom: 10, right: 10 }}
        onClick={() => {
          throw new Error("Sentry Test Error: The Judges clicked the secret button!");
        }}
      >
        Force Error
      </button>

    </div>
  );
};

export default Dashboard;
