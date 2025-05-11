import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profileVisible, setProfileVisible] = useState(false);
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const openProfile = () => {
      console.log('Abrindo perfil');
    setProfileVisible(true);
  };

  const closeProfile = () => {
    setProfileVisible(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      profileVisible,
      openProfile,
      closeProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}