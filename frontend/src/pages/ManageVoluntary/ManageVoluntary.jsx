import './ManageVoluntary.css';
import Navbar from '../../components/navbar/Navbar';
import Button from '../../components/button/Button';
import VolunteerTable from '../../components/VolunteerTable/VolunteerTable';
import { useState, useEffect } from 'react';
import Profile from '../../components/profile/Profile';
import { useAuth } from '../../AuthContext.jsx';
import RegisterVolunteer from '../../components/RegisterVolunteer/RegisterVolunteer.jsx';

function ManageVoluntary() {
  const [searchKey, setSearchKey] = useState('id');
  const [searchValue, setSearchValue] = useState('');
  const { profileVisible, closeProfile, user } = useAuth();
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/usuarios')
      .then(res => res.json())
      .then(data => setVolunteers(data))
      .catch(err => console.error('Erro ao buscar voluntários:', err));
  }, []);

  const handleNewRegister = () => {
    setRegisterModalOpen(true);
    
  };

  const handleSearch = () => {
    if(searchValue) {
    fetch(`http://localhost:8080/usuarios/busca?chave=${searchKey}&valor=${searchValue}`)
      .then(res => res.json())
      .then(data => setVolunteers(data))
      .catch(err => console.error('Erro ao buscar voluntários:', err));
    }
  };

const handleView = (id) => {
  fetch(`http://localhost:8080/usuarios/${id}`)
    .then(res => res.json())
    .then(data => {
      setSelectedVolunteer(data.value ? data.value : data);
    })
    .catch(err => console.error('Erro ao buscar voluntário:', err));
};

  const handleClearFilter = () => {
  setSearchValue('');
  fetch('http://localhost:8080/usuarios')
    .then(res => res.json())
    .then(data => setVolunteers(data))
    .catch(err => console.error('Erro ao buscar voluntários:', err));
};

  const handleCloseVolunteerProfile = () => {
    setSelectedVolunteer(null);
  };

  return (
      <div>
    <Navbar />
    <div className="manage-voluntary-container">
      <h1 className="page-title">Gerenciamento de Voluntários</h1>
      <div className="action-buttons">
        <Button text="Novo Cadastro" onClick={handleNewRegister} />
      </div>
      <div className="search-bar-container">
        <select className="search-select" value={searchKey} onChange={(e) => setSearchKey(e.target.value)}>
          <option value="id">ID</option>
          <option value="cpf">CPF</option>
          <option value="nome">Nome</option>
          <option value="setor">Setor</option>
        </select>
        <input className="search-input" type="text" placeholder="Digite o valor" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
        <button className="querry-button" onClick={handleSearch}> Pesquisar </button>
        <button className="clear-filter-button" onClick={handleClearFilter}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/></svg>
        </button>
      </div>
      <VolunteerTable data={volunteers} onView={handleView} />
      {volunteers.length === 0 && (
        <div className="no-results">Nenhum voluntário encontrado.</div>
      )}

      {registerModalOpen && (
        <RegisterVolunteer
          onClose={() => setRegisterModalOpen(false)}
          onSuccess={() => {
            setRegisterModalOpen(false);
            fetch('http://localhost:8080/usuarios')
              .then(res => res.json())
              .then(data => setVolunteers(data));
          }}
        />
      )}

      {selectedVolunteer && (
        <Profile volunteer={selectedVolunteer} onClose={handleCloseVolunteerProfile} />
      )}

      {profileVisible && (
        <Profile volunteer={user} onClose={closeProfile} />
      )}
    </div>
  </div>
  );
}

export default ManageVoluntary;