import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import ManageStock from './pages/manage/ManageStock/ManageStock.jsx';
import ManageProducts from './pages/manage/ManageProducts/ManageProducts.jsx';
import ManageVoluntary from './pages/manage/ManageVoluntary/ManageVoluntary.jsx';
import ManageBeneficiary from './pages/manage/ManageBeneficiary/ManageBeneficiary.jsx';
import ManageDonator from './pages/manage/ManageDonators/ManageDonator.jsx';

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
          path="/estoque" 
          element={
            <ProtectedRoute>
              <ManageStock />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/produtos" 
          element={
            <ProtectedRoute>
              <ManageProducts />
            </ProtectedRoute>
          } 
        />

        <Route
          path="/beneficiarios"
          element={
            <ProtectedRoute>
              <ManageBeneficiary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doadores"
          element={
            <ProtectedRoute>
              <ManageDonator />
            </ProtectedRoute>
          }
        />
        
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