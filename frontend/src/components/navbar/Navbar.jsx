import { Link, Navigate } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext.jsx';


function Navbar() {
  const navigate = useNavigate();
  const { logout, openProfile, user } = useAuth();
  return (
        <header className="top-navbar">
        <div className="nav-left">
        <div className="nav-item active" onClick={() => navigate('/dashboard')}>INÍCIO</div>         
          <div className="nav-item dropdown">
            <span className="dropdown-title">GERENCIAR <span className="dropdown-arrow">▼</span></span>
            <div className="dropdown-content">
              <Link to="/beneficiarios">BENEFICIÁRIOS</Link>
              <a href="/doacoes">DOAÇÕES</a>
              <Link to="/doadores">DOADORES</Link>
              <Link to="/produtos">PRODUTOS</Link>
              <Link to="/estoque">ESTOQUE</Link>
              <Link to="/saida-itens">SAÍDA DE ITENS</Link>
            {user?.tipoUsuario === 'ADMINISTRADOR' && (
              <Link to="/voluntarios">VOLUNTÁRIOS</Link>
            )}
            </div>
          </div>
          
          {/* <div className="nav-item dropdown">
            <span className="dropdown-title">RELATÓRIO <span className="dropdown-arrow">▼</span></span>
            <div className="dropdown-content">
              <a href="#">DOAÇÕES</a>
            </div>
          </div> */}
        </div>
        
        <div className="nav-right">
          <div className="nav-item" onClick={openProfile}>MEU PERFIL</div>
          <div className="nav-item logout" onClick={logout}>SAIR</div>
        </div>
      </header>
  );
}

export default Navbar;