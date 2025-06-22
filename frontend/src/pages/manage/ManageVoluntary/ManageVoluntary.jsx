import './ManageVoluntary.css';
import Navbar from '../../../components/navbar/Navbar.jsx';
import Button from '../../../components/button/Button.jsx';
import VolunteerTable from '../../../components/Tables/VolunteerTable/VolunteerTable.jsx';
import { useState, useEffect } from 'react';
import Profile from '../../../components/profile/Profile.jsx';
import { useAuth } from '../../../AuthContext.jsx';
import RegisterVolunteer from '../../../components/Register/RegisterVolunteer/RegisterVolunteer.jsx';

function ManageVoluntary() {
  const [searchKey, setSearchKey] = useState('id');
  const [searchValue, setSearchValue] = useState('');
  const {profileVisible, closeProfile, user} = useAuth();
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
      console.log('Voluntário selecionado:', data);
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
        <button className="clear-filter-button" onClick={handleClearFilter}> Limpar Filtro </button>
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
        <Profile volunteer={user} onClose={closeProfile}/>
      )}
    </div>
  </div>
  );
}

export default ManageVoluntary;