import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { impactStats, logout } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full bg-canvas-cream min-h-screen pt-20 pb-12">
      <div className="relative w-full overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-40 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-20 -right-20 w-96 h-96 bg-honey-light/60 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin py-space-xl relative z-10">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-space-md mb-space-lg">
            <div className="flex items-center gap-space-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sage-surface text-primary rounded-full font-label-sm text-label-sm uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                Real-Time Telemetry
              </span>
              <span className="font-body-sm text-body-sm text-outline">· Public Transparency Ledger</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => navigate('/')}
                className="px-4 py-1.5 rounded-full font-label-md text-label-md transition-all text-outline hover:text-on-surface bg-surface-container-low hover:bg-surface-variant shadow-sm"
              >
                Back to Home
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="max-w-3xl mb-space-xl">
            <h1 className="font-display text-display text-on-surface mb-space-sm leading-tight">
              Measuring What Matters: <br/><span className="text-primary font-extrabold">Transparent Community</span> Food Rescue Data
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
              Every pound of rescued produce, every hotel buffet redistributed, and every mile walked by volunteers is recorded to guarantee trust, accountability, and measurable ecological resilience.
            </p>
          </div>

          {/* Key Metrics Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
            
            {/* Metric 1 */}
            <div className="relative bg-surface-white rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
              <div className="flex items-start justify-between mb-space-md">
                <span className="p-2.5 rounded-xl bg-sage-surface text-primary">
                  <span className="material-symbols-outlined text-[24px]">restaurant_menu</span>
                </span>
                <span className="inline-flex items-center text-primary font-label-sm text-label-sm bg-sage-surface px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span> +14.2%
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-display text-on-surface font-extrabold tracking-tight">{impactStats.mealsSaved.toLocaleString()}</span>
                <span className="font-label-lg text-label-lg text-on-surface mt-1">Meals Rescued & Delivered</span>
                <span className="font-caption text-caption text-outline mt-1">Directly fed local families & day shelters</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="relative bg-surface-white rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-tertiary-container"></div>
              <div className="flex items-start justify-between mb-space-md">
                <span className="p-2.5 rounded-xl bg-sage-surface text-primary">
                  <span className="material-symbols-outlined text-[24px]">co2</span>
                </span>
                <span className="inline-flex items-center text-primary font-label-sm text-label-sm bg-sage-surface px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px] mr-0.5">eco</span> Net Zero
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-display text-on-surface font-extrabold tracking-tight">{impactStats.co2Avoided.toLocaleString()}</span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">kg</span>
                </div>
                <span className="font-label-lg text-label-lg text-on-surface mt-1">GHG Emissions Prevented</span>
                <span className="font-caption text-caption text-outline mt-1">Methane equivalent diverted from landfills</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="relative bg-surface-white rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary-container"></div>
              <div className="flex items-start justify-between mb-space-md">
                <span className="p-2.5 rounded-xl bg-honey-light text-honey-deep">
                  <span className="material-symbols-outlined text-[24px]">scale</span>
                </span>
                <span className="inline-flex items-center text-honey-deep font-label-sm text-label-sm bg-honey-light px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px] mr-0.5">recycling</span> Organic
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-display text-on-surface font-extrabold tracking-tight">{impactStats.kgDiverted.toLocaleString()}</span>
                  <span className="font-headline-sm text-headline-sm text-secondary font-bold">kg</span>
                </div>
                <span className="font-label-lg text-label-lg text-on-surface mt-1">Food Waste Diverted</span>
                <span className="font-caption text-caption text-outline mt-1">Recovered edible food weight</span>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="relative bg-surface-white rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-surface-tint"></div>
              <div className="flex items-start justify-between mb-space-md">
                <span className="p-2.5 rounded-xl bg-sage-surface text-primary">
                  <span className="material-symbols-outlined text-[24px]">diversity_1</span>
                </span>
                <span className="inline-flex items-center text-primary font-label-sm text-label-sm bg-sage-surface px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px] mr-0.5">verified</span> Audited
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-display text-on-surface font-extrabold tracking-tight">{impactStats.activeDonors.toLocaleString()}</span>
                <span className="font-label-lg text-label-lg text-on-surface mt-1">Active Partner Kitchens</span>
                <span className="font-caption text-caption text-outline mt-1">Certified commercial donors operating</span>
              </div>
            </div>

          </div>

          {/* Visual Divider */}
          <hr className="border-border-subtle my-space-xl" />
          
          {/* Detailed Reports Section (Placeholder for chart) */}
          <div className="bg-surface-white rounded-2xl shadow-sm border border-border-subtle p-space-lg overflow-hidden relative">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Monthly Recovery Trends</h3>
            <p className="font-body-sm text-body-sm text-outline mb-space-lg">Aggregated food recovered per week across the regional network.</p>
            
            {/* Mock Chart Visualization */}
            <div className="h-64 flex items-end justify-between gap-2 border-b border-l border-border-subtle p-4 relative pt-10">
              
              {/* Y Axis labels mock */}
              <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between items-end text-xs text-outline py-4">
                <span>10k</span>
                <span>5k</span>
                <span>0</span>
              </div>

              {/* Bars */}
              <div className="w-full flex justify-around items-end h-full ml-6">
                <div className="w-12 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-md relative group h-[40%]">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-surface-container-high px-2 py-1 rounded text-xs">4,120</span>
                  <div className="absolute -bottom-6 w-full text-center text-xs text-outline">W1</div>
                </div>
                <div className="w-12 bg-primary/40 hover:bg-primary/60 transition-colors rounded-t-md relative group h-[60%]">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-surface-container-high px-2 py-1 rounded text-xs">6,200</span>
                  <div className="absolute -bottom-6 w-full text-center text-xs text-outline">W2</div>
                </div>
                <div className="w-12 bg-primary/60 hover:bg-primary/80 transition-colors rounded-t-md relative group h-[75%]">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-surface-container-high px-2 py-1 rounded text-xs">7,850</span>
                  <div className="absolute -bottom-6 w-full text-center text-xs text-outline">W3</div>
                </div>
                <div className="w-12 bg-primary hover:bg-tertiary transition-colors rounded-t-md relative group h-[95%]">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-surface-container-high px-2 py-1 rounded text-xs">9,810</span>
                  <div className="absolute -bottom-6 w-full text-center text-xs text-outline">W4</div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
