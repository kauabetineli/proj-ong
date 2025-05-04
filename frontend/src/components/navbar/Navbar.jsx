import { Link, Navigate } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';


function Navbar({ handleLogout, handleProfileClick }) {
  const navigate = useNavigate();
  return (
        <header className="top-navbar">
        <div className="nav-left">
        <div className="nav-item active" onClick={() => navigate('/dashboard')}>INÍCIO</div>         
          <div className="nav-item dropdown">
            <span className="dropdown-title">GERENCIAR <span className="dropdown-arrow">▼</span></span>
            <div className="dropdown-content">
              <a href="#">BENEFICIÁRIOS</a>
              <a href="#">DOAÇÕES</a>
              <a href="#">DOADORES</a>
              <a href="#">ESTOQUE</a>
              <Link to="/voluntarios">VOLUNTÁRIOS</Link>
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
  );
}

export default Navbar;