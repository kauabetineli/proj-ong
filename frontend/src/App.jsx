import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import ManageVoluntary from './pages/ManageVoluntary/ManageVoluntary.jsx';
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return children;
};

const ProtectedRouteAdmin = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const usuario = JSON.parse(localStorage.getItem('user'));

  if (!isAuthenticated || usuario.tipoUsuario !== 'ADMINISTRADOR') {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

function App() {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />

        <Route 
          path="/voluntarios" 
          element={
            <ProtectedRouteAdmin>
              <ManageVoluntary />
            </ProtectedRouteAdmin>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
}

export default App;