import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import familyImage from '../../../assets/family.svg';
import Profile from '../../profile/Profile';
import Navbar from '../../navbar/Navbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const handleProfileClick = () => {
    setIsProfileVisible(true);
  };

  const handleCloseProfile = () => {
    setIsProfileVisible(false);
  };

  return (
    <div className="dashboard-container">
      <Navbar handleLogout={handleLogout} handleProfileClick={handleProfileClick} />
      
      <div className="dashboard-content">
        <main className="main-content">
          <div className="welcome-image">
            <img src={familyImage} alt="Família" />
          </div>
          {isProfileVisible && <Profile onClose={handleCloseProfile} />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;