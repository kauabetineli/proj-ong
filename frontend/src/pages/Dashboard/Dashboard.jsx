import React from 'react';
import './Dashboard.css';
import familyImage from '../../assets/family.svg';
import Profile from '../../components/profile/Profile';
import Navbar from '../../components/navbar/Navbar';
import { useAuth } from '../../AuthContext.jsx';

const Dashboard = () => {
  const { profileVisible, closeProfile, user } = useAuth();

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <main className="main-content">
          <div className="welcome-image">
            <img src={familyImage} alt="Família" />
          </div>
          {profileVisible && <Profile volunteer={user} onClose={closeProfile} />}
          
        </main>
      </div>
    </div>
  );
};

export default Dashboard;