import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Leaf } from 'lucide-react';

const Header = () => {
  const { userType, toggleUserType } = useAppContext();

  return (
    <header className="header animate-fade-in">
      <div className="logo-container">
        {/* Placeholder for the logo image we generated */}
        <img 
          src="file:///C:/Users/rusha/.gemini/antigravity-ide/brain/a251ced1-3085-4b9c-aeb3-d76c5e4d5b82/foodbridge_logo_1789817367897.jpg" 
          alt="FoodBridge Logo" 
          className="logo-img" 
        />
        <h1 className="text-gradient-green">FoodBridge</h1>
      </div>
      
      <div className={`user-toggle ${userType === 'ngo' ? 'is-ngo' : ''}`} onClick={toggleUserType}>
        <div className="toggle-slider"></div>
        <div className={`toggle-option ${userType === 'donor' ? 'active' : ''}`}>Donor</div>
        <div className={`toggle-option ${userType === 'ngo' ? 'active' : ''}`}>NGO</div>
      </div>
    </header>
  );
};

export default Header;
