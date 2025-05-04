import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import LoginImage from '../../../assets/login_team.svg';

const LoginPage = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Mock de dados de usuário para autenticação
  const mockUsers = [
    { cpf: '11111111111', senha: '111111' },
    { cpf: '22222222222', senha: '222222' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validação simples (DEPOIS ADCIONAR A API)
    if (!cpf.trim() || !senha.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    const user = mockUsers.find(user => user.cpf === cpf && user.senha === senha);
    
    if (user) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } else {
      setError('CPF ou senha inválidos.');
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
          <label>CPF<input type="text"placeholder="Digite seu CPF"value={cpf} onChange={handleCpfChange} /></label>
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