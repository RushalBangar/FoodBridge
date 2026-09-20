import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Splash = () => {
  const navigate = useNavigate();
  const { userProfile, signUp, logIn } = useAppContext();
  
  const [selectedRole, setSelectedRole] = useState('donor'); // 'donor' | 'ngo'
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
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
      } else {
        // Since the design doesn't have a name field, we'll use the email prefix
        const defaultName = emailInput.split('@')[0];
        await signUp(emailInput, passwordInput, defaultName, selectedRole);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-canvas-cream min-h-screen pt-12 pb-24">
      <div className="flex flex-col w-full relative">
        {/* Interactive & Radial Background Ambience */}
        <div className="relative w-full overflow-hidden py-space-lg md:py-space-xl">
          <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-mint-soft/30 blur-3xl pointer-events-none -z-10"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-honey-light/40 blur-3xl pointer-events-none -z-10"></div>
          
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
            
            {/* Nav area to go back */}
            <div className="mb-8">
              <button onClick={() => navigate('/')} className="flex items-center gap-2 text-outline hover:text-primary transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
                <span className="font-label-md text-label-md">Back to Home</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-stretch">
              {/* Left Column: Auth Form */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="bg-surface-white rounded-xl shadow-xl p-space-lg sm:p-space-xl backdrop-blur-sm border border-border-subtle">
                  <div className="flex items-center justify-between gap-space-md mb-space-lg">
                    <div className="flex items-center gap-space-sm">
                      <img alt="FoodBridge Emblem" className="w-12 h-12 object-contain rounded-lg shadow-sm" src="https://lh3.googleusercontent.com/aida/AEtjO1Xz2bwctCCBTGIMQmH80qFSvboetyKJlhPjZS3OjgM3G-SeLVPzdIqO06PsEZ363WV4suji8GtJjqtnCmz-A4og5AXLm6-mdNuVHd7Gs_4EQtVieVhK9HK2RV9WBRKMpI4yo9LhW8GXgsaafPAIvIYvNxapD6ib6JnVuQ9e2u5k9QPADkIMWe4dVDjzKX9AJyAdVjaxbI4W1dJjthyzHRvjkJq5sasOJ7HvTfeM1yO7Ww"/>
                      <div className="flex flex-col">
                        <span className="font-headline-sm text-headline-sm text-primary tracking-tight">FoodBridge Portal</span>
                        <span className="font-caption text-caption text-outline">Civic Food Recovery Network</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-xs px-space-sm py-1 bg-sage-surface rounded-full shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      <span className="font-label-sm text-label-sm text-primary">Live Dispatch Active</span>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="mb-space-lg p-space-sm bg-error-container text-on-error-container rounded-lg font-body-sm text-body-sm flex items-start gap-space-xs">
                      <span className="material-symbols-outlined text-[18px]">error</span>
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="flex bg-surface-container-low p-1 rounded-full mb-space-lg">
                    <button 
                      onClick={() => setIsLoginMode(true)}
                      className={`flex-1 py-2 rounded-full font-label-lg text-label-lg transition-all text-center ${isLoginMode ? 'text-on-primary bg-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                      type="button"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => setIsLoginMode(false)}
                      className={`flex-1 py-2 rounded-full font-label-lg text-label-lg transition-all text-center ${!isLoginMode ? 'text-on-primary bg-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                      type="button"
                    >
                      Create Account
                    </button>
                  </div>

                  {!isLoginMode && (
                    <div className="mb-space-lg animate-fade-in">
                      <span className="block font-label-md text-label-md text-on-surface mb-space-xs">Select your ecosystem role</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                        <button 
                          onClick={() => setSelectedRole('donor')}
                          className={`role-btn text-left p-space-md rounded-lg transition-all shadow-sm border-2 ${selectedRole === 'donor' ? 'bg-surface-container-low border-primary/20 text-on-surface' : 'bg-surface-container-lowest border-transparent text-outline hover:bg-surface-container-low'}`} 
                          type="button"
                        >
                          <div className="flex items-center gap-space-sm mb-1">
                            <span className="w-8 h-8 rounded-full bg-sage-surface flex items-center justify-center text-primary">
                              <span className="material-symbols-outlined text-[18px]">storefront</span>
                            </span>
                            <span className={`font-label-lg text-label-lg ${selectedRole === 'donor' ? 'text-primary' : 'text-outline'}`}>Food Donor</span>
                          </div>
                          <p className="font-caption text-caption text-outline">Restaurants, caterers, grocery hubs, and urban bakeries</p>
                        </button>
                        
                        <button 
                          onClick={() => setSelectedRole('ngo')}
                          className={`role-btn text-left p-space-md rounded-lg transition-all shadow-sm border-2 ${selectedRole === 'ngo' ? 'bg-surface-container-low border-secondary/20 text-on-surface' : 'bg-surface-container-lowest border-transparent text-outline hover:bg-surface-container-low'}`}
                          type="button"
                        >
                          <div className="flex items-center gap-space-sm mb-1">
                            <span className="w-8 h-8 rounded-full bg-honey-light flex items-center justify-center text-honey-deep">
                              <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
                            </span>
                            <span className={`font-label-lg text-label-lg ${selectedRole === 'ngo' ? 'text-secondary' : 'text-outline'}`}>Food Rescuer</span>
                          </div>
                          <p className="font-caption text-caption text-outline">Pantries, shelters, 501(c)(3) mutual aid, volunteers</p>
                        </button>
                      </div>
                    </div>
                  )}

                  <form className="flex flex-col gap-space-md" onSubmit={handleAuthSubmit}>
                    <div className="flex flex-col gap-space-xs">
                      <label className="font-label-md text-label-md text-on-surface" htmlFor="work-email">Work or Organization Email</label>
                      <div className="relative">
                        <span className="material-symbols-outlined text-[20px] text-outline absolute left-space-md top-1/2 -translate-y-1/2 pointer-events-none">mail</span>
                        <input 
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          className="w-full pl-11 pr-space-md py-3 rounded-lg bg-surface-container-lowest text-body-md font-body-md text-on-surface placeholder:text-outline/60 shadow-sm border border-transparent focus:outline-none focus:border-primary focus:bg-surface-white transition-all" 
                          id="work-email" 
                          placeholder="name@kitchen-rescue.org" 
                          required 
                          type="email"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-space-xs">
                      <div className="flex items-center justify-between">
                        <label className="font-label-md text-label-md text-on-surface" htmlFor="account-password">Password</label>
                        {isLoginMode && (
                          <a className="font-caption text-caption text-primary hover:text-tertiary transition-colors font-semibold" href="#">Forgot password?</a>
                        )}
                      </div>
                      <div className="relative">
                        <span className="material-symbols-outlined text-[20px] text-outline absolute left-space-md top-1/2 -translate-y-1/2 pointer-events-none">lock</span>
                        <input 
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          className="w-full pl-11 pr-11 py-3 rounded-lg bg-surface-container-lowest text-body-md font-body-md text-on-surface placeholder:text-outline/60 shadow-sm border border-transparent focus:outline-none focus:border-primary focus:bg-surface-white transition-all" 
                          id="account-password" 
                          placeholder="••••••••••••" 
                          required 
                          minLength={6}
                          type={showPassword ? "text" : "password"}
                        />
                        <button 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-space-md top-1/2 -translate-y-1/2 text-outline hover:text-on-surface" 
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {showPassword ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-space-xs">
                      <label className="flex items-center gap-space-xs cursor-pointer select-none">
                        <input className="w-4 h-4 rounded text-primary border-outline focus:ring-primary accent-primary" type="checkbox" defaultChecked />
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Remember this workstation</span>
                      </label>
                      <span className="font-caption text-caption text-outline">Session protected</span>
                    </div>

                    <button 
                      disabled={isSubmitting}
                      className="w-full mt-space-xs py-3.5 px-space-lg rounded-full bg-primary hover:bg-tertiary disabled:bg-primary/50 text-on-primary font-label-lg text-label-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-space-sm" 
                      type="submit"
                    >
                      <span>{isSubmitting ? 'Processing...' : (isLoginMode ? 'Authorize & Continue' : 'Register Organization Account')}</span>
                      {!isSubmitting && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
                    </button>
                  </form>

                  <div className="relative my-space-lg">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full bg-surface-container-high h-[1px]"></div>
                    </div>
                    <div className="relative flex justify-center text-center">
                      <span className="bg-surface-white px-space-md font-caption text-caption text-outline">or connect using institutional identity</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-space-sm">
                    <button className="flex-1 py-2.5 px-space-md rounded-lg bg-surface-container-low hover:bg-sage-surface text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-sm shadow-sm transition-all" type="button">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" fill="#4285F4"></path>
                        <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"></path>
                        <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" fill="#FBBC05"></path>
                        <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
                      </svg>
                      <span>Google Workspace</span>
                    </button>
                    <button className="flex-1 py-2.5 px-space-md rounded-lg bg-surface-container-low hover:bg-sage-surface text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-sm shadow-sm transition-all" type="button">
                      <svg className="w-4 h-4 fill-current text-on-surface" viewBox="0 0 170 170">
                        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.66-7.85-11.91-14.42-6-9.28-10.74-19.8-14.23-31.55-3.48-11.75-5.22-23.01-5.22-33.78 0-14.07 3.52-25.75 10.56-35.03 7.04-9.28 15.75-14.02 26.13-14.22 4.93 0 10.23 1.34 15.91 4.02 5.68 2.68 9.53 4.09 11.55 4.23 1.55-.14 5.62-1.63 12.22-4.47 6.6-2.84 12.23-4.06 16.89-3.66 12.63.95 22.42 5.65 29.37 14.11-10.99 6.64-16.35 15.82-16.08 27.53.31 9.09 3.86 16.73 10.66 22.92 6.79 6.18 14.87 9.87 24.23 11.07-2.12 6.33-4.57 12.44-7.36 18.32zM119.22 33.15c0-7.3 2.66-14.18 7.99-20.65 5.33-6.47 11.91-10.67 19.74-12.6 1.07 8.35-1.12 16.03-6.57 23.04-5.46 7.02-12.25 11.05-20.37 12.09-.27-.63-.79-1.26-.79-1.88z"></path>
                      </svg>
                      <span>Apple ID</span>
                    </button>
                  </div>

                  <button className="w-full mt-space-xs py-2.5 px-space-md rounded-lg bg-surface-container-high/60 hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-sm shadow-sm transition-all" type="button">
                    <span className="material-symbols-outlined text-[18px] text-primary">domain</span>
                    <span>Single Sign-On (SSO) for 501(c)(3) Organizations</span>
                  </button>

                  <div className="mt-space-lg pt-space-md bg-sage-surface/50 rounded-lg p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm">
                    <div className="flex items-center gap-space-xs text-primary">
                      <span className="material-symbols-outlined text-[20px]">verified_user</span>
                      <span className="font-label-sm text-label-sm text-primary">Bill Emerson Good Samaritan Act Protected</span>
                    </div>
                    <div className="flex items-center gap-space-xs text-outline">
                      <span className="material-symbols-outlined text-[18px]">lock</span>
                      <span className="font-caption text-caption">256-bit Encrypted Logistics</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Impact */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-space-lg">
                <div className="bg-primary text-on-primary rounded-xl shadow-xl p-space-lg sm:p-space-xl flex flex-col justify-between relative overflow-hidden h-full">
                  <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary-container/40 rounded-full blur-2xl pointer-events-none"></div>
                  <div>
                    <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-white/15 text-on-primary font-label-sm text-label-sm mb-space-md">
                      <span className="material-symbols-outlined text-[16px] text-mint-soft">eco</span>
                      <span>Regional Impact Metric</span>
                    </div>
                    <span className="block font-display text-[48px] leading-tight font-extrabold tracking-tight text-white mb-space-xs">
                      128,000+
                    </span>
                    <p className="font-headline-sm text-headline-sm text-mint-soft mb-space-md">
                      Nutritious meals redirected from landfills to community pantries.
                    </p>
                    <p className="font-body-md text-body-md text-white/80">
                      FoodBridge’s verified dispatch network connects commercial surplus directly with hyper-local emergency kitchens within minutes of preparation.
                    </p>
                  </div>
                  
                  <div className="mt-space-lg pt-space-lg bg-surface-white/10 rounded-lg p-space-md">
                    <div className="flex items-center gap-space-sm mb-space-xs">
                      <div className="w-10 h-10 rounded-full bg-honey-light flex items-center justify-center text-honey-deep font-bold font-label-lg text-label-lg">
                        SC
                      </div>
                      <div>
                        <h4 className="font-label-lg text-label-lg text-white">Chef S. Campbell</h4>
                        <p className="font-caption text-caption text-white/70">Harbor View Bistro & Catering</p>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-white/90 italic">
                      “Logging end-of-service trays takes 30 seconds. By 11:30 PM, volunteer drivers have safely placed 90 warm entrees into family shelters.”
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-space-md">
                  <div className="bg-surface-white p-space-md rounded-xl shadow-md flex flex-col justify-between">
                    <div className="w-8 h-8 rounded-full bg-sage-surface flex items-center justify-center text-primary mb-space-xs">
                      <span className="material-symbols-outlined text-[18px]">timer</span>
                    </div>
                    <span className="font-headline-sm text-[20px] font-semibold text-primary">18 Mins</span>
                    <span className="font-caption text-[12px] text-outline leading-tight">Average surplus match to pickup time</span>
                  </div>
                  <div className="bg-surface-white p-space-md rounded-xl shadow-md flex flex-col justify-between">
                    <div className="w-8 h-8 rounded-full bg-honey-light flex items-center justify-center text-honey-deep mb-space-xs">
                      <span className="material-symbols-outlined text-[18px]">health_and_safety</span>
                    </div>
                    <span className="font-headline-sm text-[20px] font-semibold text-honey-deep">100% Safe</span>
                    <span className="font-caption text-[12px] text-outline leading-tight">Inspected cold-chain log compliance</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
