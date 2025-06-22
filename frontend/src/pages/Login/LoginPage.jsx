import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import LoginImage from '../../assets/login_team.svg';
import {useAuth} from '../../AuthContext.jsx';

const LoginPage = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {login} = useAuth();

const handleLogin = async (e) => {
  e.preventDefault();

  if (!cpf.trim() || !senha.trim()) {
    setError('Por favor, preencha todos os campos.');
    return;
  }

  try {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cpf, senha })
    });

    if (response.ok) {
      const userData = await response.json();
      login(userData);
      navigate('/dashboard');
    } else {
      setError('CPF ou senha inválidos.');
    }
  } catch (err) {
    console.error(err);
    setError('Erro ao conectar com o servidor.');
  }
};

  const handleCpfChange = (e) => {
    // Permite apenas números e limita a 11 dígitos
    const value = e.target.value.replace(/\D/g, '').slice(0, 11);
    setCpf(value);
  };

  const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return <div className="error-message">{message}</div>;
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">ONGaniza</h1>  
        <h2 className="login-title">Software de Gestão para ONG</h2>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
          <label>CPF<input type="text" className="input-cpf" placeholder="Digite seu CPF"value={cpf} onChange={handleCpfChange} /></label>
          </div>
          
          <div className="form-group">
            <label>Senha<input type="password" d="senha" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)}/></label>
          </div>
          
          <button type="submit" className="login-button">Entrar</button>
        </form>

        <ErrorMessage class name="error-message" message={error} />
        
        <div className="team-image">
            <img src={LoginImage} alt="Team" className="team-image" />
        </div>
      </div>
    
    </div>
  );
};

export default LoginPage;

