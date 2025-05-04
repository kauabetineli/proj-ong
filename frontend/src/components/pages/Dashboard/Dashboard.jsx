import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import familyImage from '../../../assets/family.svg';
import Profile from '../../profile/Profile';

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
      <header className="top-navbar">
        <div className="nav-left">
          <div className="nav-item active">INÍCIO</div>
          
          <div className="nav-item dropdown">
            <span className="dropdown-title">GERENCIAR <span className="dropdown-arrow">▼</span></span>
            <div className="dropdown-content">
              <a href="#">BENEFICIÁRIOS</a>
              <a href="#">DOAÇÕES</a>
              <a href="#">DOADORES</a>
              <a href="#">ESTOQUE</a>
              <a href="#">VOLUNTÁRIOS</a>
              <a href="#">PRODUTOS</a>
            </div>
          </div>
          
          <div className="nav-item dropdown">
            <span className="dropdown-title">RELATÓRIO <span className="dropdown-arrow">▼</span></span>
            <div className="dropdown-content">
              <a href="#">DOAÇÕES</a>
            </div>
          </div>
        </div>
        
        <div className="nav-right">
          <div className="nav-item" onClick={handleProfileClick}>MEU PERFIL</div>
          <div className="nav-item logout" onClick={handleLogout}>SAIR</div>
        </div>
      </header>
      
      <div className="dashboard-content">
        <main className="main-content">
          <div className="welcome-image">
            <img src={familyImage} alt="Família" />
            {isProfileVisible && <Profile onClose={handleCloseProfile} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;