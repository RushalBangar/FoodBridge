import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LOGO_URL = "https://lh3.googleusercontent.com/aida/AEtjO1Xz2bwctCCBTGIMQmH80qFSvboetyKJlhPjZS3OjgM3G-SeLVPzdIqO06PsEZ363WV4suji8GtJjqtnCmz-A4og5AXLm6-mdNuVHd7Gs_4EQtVieVhK9HK2RV9WBRKMpI4yo9LhW8GXgsaafPAIvIYvNxapD6ib6JnVuQ9e2u5k9QPADkIMWe4dVDjzKX9AJyAdVjaxbI4W1dJjthyzHRvjkJq5sasOJ7HvTfeM1yO7Ww";
const COMMUNITY_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBVofZH_Jh1ahK3T6wyLw6_mXuxTyKJMLJaZboWGdVIm-wvVRlZN_T7wXvPp0IUj1pbuTDmhdZ-YXFUB7XxjGkEYXQrmVH4ta6faTmfIW5K3bzJfiqKQCzC6twX5qXJ7IXa3R9_Zzev6uQDt-ADmiMesYEIc5PSKYzUSA1_RuddZbphmK87JZ5tQ6EQhg6uCVPVy6VEtZLb_pgOVq7rS1xdVDpRaMWU7Hj_a6-dtzr9";

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signupDone, setSignupDone] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const feedItems = [
    { category: 'bakery', status: 'claimed', time: '4m ago', location: 'Downtown Market', title: 'Fresh Bakery Bagels', desc: '12 artisanal loaves & sourdough bagels freshly packaged at closing time.', rescuer: 'Rescued by Alex M.', distance: '0.4 mi away', icon: 'volunteer_activism' },
    { category: 'prepared', status: 'available', time: 'Expires in 35m', location: 'Green Bistro', title: 'Organic Salad Bowls', desc: '8 units of pre-packaged quinoa green salad bowls with citrus dressing.', rescuer: null, distance: null, icon: 'storefront' },
    { category: 'prepared', status: 'claimed', time: '12m ago', location: 'North Convention', title: 'Catering Trays (Pasta & Veg)', desc: '4 heated chafing trays untouched from banquet luncheon, packaged warm.', rescuer: 'Eastside Shelter', distance: '1.8 mi away', icon: 'groups' },
  ];

  const filteredItems = activeFilter === 'all' ? feedItems : feedItems.filter(i => i.category === activeFilter);

  const goAuth = () => navigate('/login');

  return (
    <div className="bg-canvas-cream font-body-md text-body-md text-on-surface antialiased">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-glass-bg backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 max-w-7xl mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md shrink-0">
            <span className="flex items-center gap-space-sm cursor-pointer" onClick={() => navigate('/')}>
              <img alt="FoodBridge Logo" className="h-8 w-auto object-contain" src={LOGO_URL}/>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary tracking-tight">FoodBridge</span>
                <span className="hidden sm:inline-block font-caption text-caption text-outline -mt-1">No plate left empty</span>
              </div>
            </span>
            <div className="hidden xl:flex items-center gap-space-xs px-space-sm py-1 bg-sage-surface rounded-full shadow-[0_1px_3px_rgba(4,120,87,0.08)]">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-primary">12,480+ meals rescued</span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-space-xs p-1 bg-surface-container-lowest/60 rounded-full">
            <a className="px-space-md py-space-xs font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#how-it-works">How it Works</a>
            <a className="px-space-md py-space-xs font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#live-feed">Live Feed</a>
            <a className="px-space-md py-space-xs font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#impact">Impact</a>
            <a className="px-space-md py-space-xs font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#about">About Us</a>
          </nav>
          <div className="flex items-center gap-space-sm shrink-0">
            <span className="hidden sm:inline-flex items-center justify-center px-space-md py-2 font-label-md text-label-md text-primary bg-transparent hover:bg-sage-surface rounded-full transition-colors cursor-pointer" onClick={() => goAuth('/')}>Log In</span>
            <span className="inline-flex items-center justify-center px-space-md py-2 font-label-md text-label-md text-on-primary bg-primary hover:bg-tertiary rounded-full shadow-[0_2px_8px_rgba(4,120,87,0.25)] transition-all cursor-pointer" onClick={() => goAuth('/')}>Get Started</span>
            <button aria-label="Toggle Menu" className="lg:hidden p-2 text-on-surface hover:bg-surface-container-low rounded-lg transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} type="button">
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface-white px-margin-mobile py-space-lg shadow-[0_10px_25px_-5px_rgba(6,95,70,0.08)] flex flex-col gap-space-sm">
            <nav className="flex flex-col gap-space-xs">
              <a className="px-space-md py-2 font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors" href="#how-it-works">How it Works</a>
              <a className="px-space-md py-2 font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors" href="#live-feed">Live Feed</a>
              <a className="px-space-md py-2 font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors" href="#impact">Impact</a>
              <a className="px-space-md py-2 font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors" href="#about">About Us</a>
            </nav>
            <span className="w-full text-center py-2 font-label-md text-label-md text-primary bg-sage-surface rounded-full cursor-pointer" onClick={() => goAuth('/')}>Log In</span>
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="w-full pt-20 bg-canvas-cream min-h-screen">
        <div className="flex flex-col w-full">
          {/* Background Ambience */}
          <div className="relative w-full overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-primary-fixed/25 via-honey-light/20 to-transparent blur-3xl pointer-events-none -z-10 rounded-full"></div>
            <div className="absolute top-96 -left-32 w-80 h-80 bg-sage-surface/60 blur-3xl pointer-events-none -z-10 rounded-full"></div>
            <div className="absolute top-[800px] -right-32 w-96 h-96 bg-mint-soft/30 blur-3xl pointer-events-none -z-10 rounded-full"></div>

            {/* HERO */}
            <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin pt-6 pb-16 lg:pb-24">
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                {/* Logo with pulse */}
                <div className="relative group cursor-pointer mb-6">
                  <div className="absolute -inset-2.5 bg-primary/15 rounded-full blur-sm group-hover:bg-primary/25 transition-all animate-pulse"></div>
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-surface-white shadow-md flex items-center justify-center p-3.5">
                    <img alt="FoodBridge Logo" className="w-full h-full object-contain rounded-md transform transition-transform group-hover:scale-105" src={LOGO_URL}/>
                  </div>
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-primary text-on-primary items-center justify-center">
                      <span className="material-symbols-outlined text-[13px]" style={{fontVariationSettings: "'FILL' 1"}}>eco</span>
                    </span>
                  </span>
                </div>

                <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-sage-surface rounded-full shadow-sm mb-4">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="font-label-sm text-label-sm text-primary tracking-wide uppercase">Hyper-local Food Rescue Network</span>
                </div>
                <h1 className="font-display text-display text-on-surface tracking-tight mb-2">FoodBridge</h1>
                <p className="font-headline-lg text-headline-lg text-primary font-bold mb-4">No plate left empty.</p>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl text-balance mb-10">
                  Connecting surplus food from restaurants, bakeries, event venues, and caring neighbors directly to on-the-ground volunteers, families, and neighborhood pantries before it goes to waste.
                </p>

                {/* DUAL PATHWAY CARDS */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-space-lg text-left mb-8">
                  {/* Donor Card */}
                  <div className="relative group bg-surface-white rounded-xl p-space-lg md:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sage-surface/50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                    <div>
                      <div className="flex items-center justify-between gap-space-sm mb-5">
                        <div className="w-14 h-14 rounded-full bg-sage-surface flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-[30px]" style={{fontVariationSettings: "'FILL' 1"}}>skillet</span>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="px-2.5 py-1 bg-sage-surface text-primary rounded-full font-label-sm text-label-sm">⚡ Takes &lt; 15s</span>
                          <span className="font-caption text-caption text-outline">Zero paperwork</span>
                        </div>
                      </div>
                      <h2 className="font-headline-md text-headline-md text-on-surface mb-2">I have food to give</h2>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-6">Post surplus food in under 15 seconds. Volunteers get notified instantly and claim food before it spoils.</p>
                    </div>
                    <div className="pt-4 flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm bg-surface-container-low px-3 py-1.5 rounded-lg">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span>34 active drop-offs nearby ready for pickup</span>
                      </div>
                      <button onClick={() => goAuth('/')} className="w-full py-3.5 px-space-md rounded-full bg-primary hover:bg-tertiary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-sm transition-all group-hover:gap-3">
                        <span>Post Surplus Food</span>
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>

                  {/* Rescuer Card */}
                  <div className="relative group bg-surface-white rounded-xl p-space-lg md:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-honey-light/40 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                    <div>
                      <div className="flex items-center justify-between gap-space-sm mb-5">
                        <div className="w-14 h-14 rounded-full bg-honey-light flex items-center justify-center text-honey-deep group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-[30px]" style={{fontVariationSettings: "'FILL' 1"}}>volunteer_activism</span>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="px-2.5 py-1 bg-honey-light text-honey-deep rounded-full font-label-sm text-label-sm">📍 1.2 mi avg distance</span>
                          <span className="font-caption text-caption text-outline">Immediate claim</span>
                        </div>
                      </div>
                      <h2 className="font-headline-md text-headline-md text-on-surface mb-2">I can rescue food</h2>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-6">See what's available nearby and claim it. Support community food centers, neighborhood pantries, and families directly.</p>
                    </div>
                    <div className="pt-4 flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-secondary font-label-sm text-label-sm bg-honey-light/50 px-3 py-1.5 rounded-lg">
                        <span className="material-symbols-outlined text-[16px] text-honey-deep">schedule</span>
                        <span>18 listings waiting for immediate claim</span>
                      </div>
                      <button onClick={() => goAuth('/')} className="w-full py-3.5 px-space-md rounded-full bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-container font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-sm transition-all group-hover:gap-3">
                        <span>Browse Available Food</span>
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Login link */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md">
                  <span className="px-8 py-3 rounded-full bg-surface-white hover:bg-sage-surface text-primary font-label-lg text-label-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer" onClick={() => goAuth('/')}>
                    <span className="material-symbols-outlined text-[20px]">login</span>
                    <span>Already have an account? Log In</span>
                  </span>
                  <span className="font-caption text-caption text-outline hidden sm:inline">• Free for all community members</span>
                </div>
              </div>
            </section>

            {/* LIVE RESCUE TICKER */}
            <section id="live-feed" className="max-w-7xl mx-auto px-margin-mobile md:px-margin py-8">
              <div className="bg-surface-white rounded-xl p-space-md md:p-space-lg shadow-md">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sage-surface text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[22px]">radar</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">Live Food Rescue Activity</h3>
                        <span className="px-2 py-0.5 rounded-full bg-mint-soft text-primary font-label-sm text-label-sm animate-pulse">Live</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-outline">Real-time drops and claims happening right now across your local district</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0">
                    {[['all','All'],['prepared','Prepared Meals'],['bakery','Bakery & Bread'],['produce','Fresh Produce']].map(([key, label]) => (
                      <button key={key} className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-colors whitespace-nowrap ${activeFilter === key ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'}`} onClick={() => setActiveFilter(key)}>{label}</button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                  {filteredItems.map((item, i) => (
                    <div key={i} className="bg-surface-container-low rounded-lg p-space-md flex flex-col justify-between transition-all hover:bg-sage-surface">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          {item.status === 'claimed' ? (
                            <span className="px-2 py-0.5 rounded-full bg-honey-light text-honey-deep font-label-sm text-label-sm flex items-center gap-1">
                              <span className="material-symbols-outlined text-[13px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                              Claimed {item.time}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-sage-surface text-primary font-label-sm text-label-sm flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                              Available Now
                            </span>
                          )}
                          <span className="font-caption text-caption text-outline">{item.status === 'available' ? item.time : item.location}</span>
                        </div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">{item.title}</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">{item.desc}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-label-sm text-label-sm text-primary flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                          {item.rescuer || item.location}
                        </span>
                        {item.distance ? (
                          <span className="font-caption text-caption text-outline">{item.distance}</span>
                        ) : (
                          <span className="font-label-sm text-label-sm text-honey-deep hover:underline cursor-pointer" onClick={() => goAuth('/')}>Claim food →</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" className="max-w-7xl mx-auto px-margin-mobile md:px-margin py-12 lg:py-16">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider px-3 py-1 bg-sage-surface rounded-full">Streamlined Process</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2 mb-3">How FoodBridge Works</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Simple, rapid, and community-guided. Our technology eliminates waste in three friction-free steps.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                {[
                  { step: 1, icon: 'photo_camera', title: 'Snap & Post', desc: 'Take a photo of excess kitchen portions, tag dietary labels, and set your pickup window. Entire flow takes under 15 seconds.', badge: 'Fast mobile camera workflow', badgeIcon: 'timer', color: 'sage' },
                  { step: 2, icon: 'notifications_active', title: 'Instant Alert', desc: 'Nearby certified volunteers, shelters, and food runners get pinged instantly via smart geofencing to claim the bundle.', badge: '2.5 mile radius push broadcast', badgeIcon: 'near_me', color: 'honey' },
                  { step: 3, icon: 'task_alt', title: 'Zero Waste Delivery', desc: 'A simple QR handoff ensures safety, confirms receipt, and tracks your immediate carbon and meal alleviation metric.', badge: 'Contactless confirmation', badgeIcon: 'qr_code_scanner', color: 'sage' },
                ].map(s => (
                  <div key={s.step} className="bg-surface-white rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col">
                    <div className={`w-12 h-12 rounded-full ${s.color === 'honey' ? 'bg-honey-light text-honey-deep' : 'bg-sage-surface text-primary'} font-bold flex items-center justify-center font-headline-sm text-headline-sm mb-6`}>{s.step}</div>
                    <div className={`w-10 h-10 rounded-lg ${s.color === 'honey' ? 'bg-honey-light/60 text-honey-deep' : 'bg-surface-container-low text-primary'} flex items-center justify-center mb-4`}>
                      <span className="material-symbols-outlined text-[24px]">{s.icon}</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{s.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-4">{s.desc}</p>
                    <div className={`mt-auto pt-4 flex items-center gap-2 font-label-sm text-label-sm ${s.color === 'honey' ? 'text-honey-deep' : 'text-primary'}`}>
                      <span className="material-symbols-outlined text-[16px]">{s.badgeIcon}</span>
                      <span>{s.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* IMPACT */}
            <section id="impact" className="max-w-7xl mx-auto px-margin-mobile md:px-margin py-8">
              <div className="bg-primary text-on-primary rounded-xl p-space-lg md:p-12 shadow-xl">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="font-label-sm text-label-sm text-on-primary-container px-3 py-1 bg-tertiary-container rounded-full uppercase tracking-wider">Collective Impact</span>
                  <h2 className="font-headline-lg text-headline-lg text-on-primary mt-2 mb-2">Measuring What Matters</h2>
                  <p className="font-body-md text-body-md text-on-primary/80">Every recovered meal diverts greenhouse gases, saves water, and restores community dignity.</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 text-center">
                  {[
                    { value: '128.4k', label: 'Meals Rescued', sub: 'Direct to families & hubs', color: 'text-mint-soft' },
                    { value: '45.2t', label: 'CO2 Prevented', sub: 'Diverted from landfills', color: 'text-mint-soft' },
                    { value: '1,850+', label: 'Active Rescuers', sub: 'Across 42 zip codes', color: 'text-secondary-fixed' },
                    { value: '98%', label: 'Pickup Success Rate', sub: 'Under 45 minute avg', color: 'text-mint-soft' },
                  ].map((m, i) => (
                    <div key={i} className="bg-tertiary-container/40 p-5 rounded-lg">
                      <div className={`font-display text-display tracking-tight ${m.color} font-extrabold mb-1`}>{m.value}</div>
                      <div className="font-label-md text-label-md text-on-primary font-semibold">{m.label}</div>
                      <div className="font-caption text-caption text-on-primary/70 mt-1">{m.sub}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-on-primary/80">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-mint-soft">verified_user</span>
                    <span className="font-body-sm text-body-sm">Compliant with the Bill Emerson Good Samaritan Food Donation Act</span>
                  </div>
                  <div className="flex items-center gap-4 text-on-primary/70 font-label-sm text-label-sm">
                    <span>501(c)(3) Partner Network</span>
                    <span>•</span>
                    <span>ServSafe Certified Handlers</span>
                  </div>
                </div>
              </div>
            </section>

            {/* COMMUNITY */}
            <section id="about" className="max-w-7xl mx-auto px-margin-mobile md:px-margin py-12 lg:py-16">
              <div className="bg-surface-white rounded-xl overflow-hidden shadow-md grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[420px]">
                  <img className="w-full h-full object-cover" src={COMMUNITY_IMG} alt="Community food volunteer"/>
                  <div className="absolute bottom-4 left-4 bg-surface-white/95 backdrop-blur-md rounded-lg p-3 shadow-md flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sage-surface text-primary flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[20px]">heart_check</span>
                    </div>
                    <div>
                      <div className="font-label-md text-label-md text-on-surface">Community Pantry Network</div>
                      <div className="font-caption text-caption text-outline">100% free peer-to-peer distribution</div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-6 p-space-lg md:p-12 flex flex-col justify-center">
                  <div className="w-10 h-10 rounded-full bg-sage-surface text-primary flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-[24px]">groups</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface mb-3">Powered by Neighbors, Built for Everyone</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    Over a third of all food produced is discarded while families in the very same neighborhoods go hungry. FoodBridge replaces bureaucratic bottlenecks with rapid, direct human connection.
                  </p>
                  <div className="space-y-3 mb-8">
                    {[
                      ['Restaurants & Caterers:', 'Drastically reduce disposal fees and claim automated charitable tax logs.'],
                      ['Local Volunteers:', 'Claim single items or bulk deliveries on your walking or driving route.'],
                      ['Community Pantries:', 'Stock fresh, wholesome ingredients instead of relying solely on non-perishables.'],
                    ].map(([bold, text], i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">check_circle</span>
                        <span className="font-body-sm text-body-sm text-on-surface"><strong>{bold}</strong> {text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin pb-16">
              <div className="bg-surface-container-low rounded-xl p-space-lg md:p-12 shadow-sm text-center max-w-3xl mx-auto flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-sage-surface text-primary flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-[24px]">eco</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Join the movement</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-8">Together, we are building a movement to end food waste.</p>
                <form className="w-full max-w-md flex flex-col sm:flex-row gap-2 mb-4" onSubmit={(e) => { e.preventDefault(); setSignupDone(true); }}>
                  <input className="flex-1 px-space-md py-3 rounded-full bg-surface-white font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" placeholder="Enter your email for rescue alerts" required type="email"/>
                  <button className="px-6 py-3 rounded-full bg-primary hover:bg-tertiary text-on-primary font-label-md text-label-md transition-all shrink-0 shadow-sm" type="submit">Get Involved</button>
                </form>
                {signupDone && (
                  <div className="font-body-sm text-body-sm text-primary mb-4 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>Thank you! We have sent a welcome link to your inbox.</span>
                  </div>
                )}
                <div className="pt-4">
                  <span className="font-caption text-caption text-outline hover:text-primary underline transition-colors cursor-pointer" onClick={() => navigate('/legal')}>Terms of Service & Privacy Policy</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin py-space-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-space-lg mb-space-xl">
            <div className="md:col-span-1 flex flex-col gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <img alt="FoodBridge Logo" className="h-7 w-auto object-contain" src={LOGO_URL}/>
                <span className="font-headline-sm text-headline-sm text-primary">FoodBridge</span>
              </div>
              <p className="font-body-sm text-body-sm text-outline">Connecting abundant kitchen surpluses with local communities, shelters, and families in real-time. No plate left empty.</p>
            </div>
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-lg text-label-lg text-on-surface mb-space-xs">Rescue Food</span>
              <span className="font-body-sm text-body-sm text-outline hover:text-primary transition-colors cursor-pointer" onClick={() => goAuth('/')}>Register as Donor</span>
              <span className="font-body-sm text-body-sm text-outline hover:text-primary transition-colors cursor-pointer" onClick={() => goAuth('/')}>Claim Fresh Food</span>
              <a className="font-body-sm text-body-sm text-outline hover:text-primary transition-colors" href="#how-it-works">Pickup Guidelines</a>
            </div>
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-lg text-label-lg text-on-surface mb-space-xs">Community</span>
              <a className="font-body-sm text-body-sm text-outline hover:text-primary transition-colors" href="#about">Our Mission & Story</a>
              <a className="font-body-sm text-body-sm text-outline hover:text-primary transition-colors" href="#impact">Annual Impact Metrics</a>
              <a className="font-body-sm text-body-sm text-outline hover:text-primary transition-colors" href="#how-it-works">Volunteer Network</a>
            </div>
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-lg text-label-lg text-on-surface mb-space-xs">Transparency</span>
              <span className="font-body-sm text-body-sm text-outline hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/legal')}>Privacy Policy</span>
              <span className="font-body-sm text-body-sm text-outline hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/legal')}>Terms of Service</span>
            </div>
          </div>
          <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md text-center sm:text-left">
            <p className="font-caption text-caption text-outline">© 2024 FoodBridge Initiative. Grassroots hunger alleviation & zero waste movement.</p>
            <div className="flex items-center gap-space-md">
              <span className="font-caption text-caption text-outline hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/legal')}>Terms</span>
              <span className="font-caption text-caption text-outline hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/legal')}>Privacy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
