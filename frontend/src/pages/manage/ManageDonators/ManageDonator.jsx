import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/navbar/Navbar.jsx';
import Button from '../../../components/button/Button.jsx';
import DonatorTable from '../../../components/Tables/DonatorTable/DonatorTable.jsx';
import DonatorProfile from '../../../components/profileDonator/DonatorProfile.jsx';
import RegisterDonator from '../../../components/Register/RegisterDonator/RegisterDonator.jsx';
import './ManageDonator.css';
import Profile from '../../../components/profile/Profile.jsx';
import { useAuth } from '../../../AuthContext.jsx';

function ManageDonator() {
  const [searchKey, setSearchKey] = useState('nome');
  const [searchValue, setSearchValue] = useState('');
  const [donators, setDonators] = useState([]);
  const [selectedDonator, setSelectedDonator] = useState(null);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const { profileVisible, closeProfile, user } = useAuth();

  useEffect(() => {
    fetch('http://localhost:8080/doadores')
      .then(res => res.json())
      .then(data => setDonators(data))
      .catch(err => console.error('Erro ao buscar doadores:', err));
  }, []);

  const handleNewRegister = () => {
    setRegisterModalOpen(true);
  };

  const handleSearch = () => {
    if (searchValue) {
      fetch(`http://localhost:8080/doadores/busca?chave=${searchKey}&valor=${searchValue}`)
        .then(res => res.json())
        .then(data => setDonators(data))
        .catch(err => console.error('Erro ao buscar doadores:', err));
    }
  };

  const handleView = (id) => {
    fetch(`http://localhost:8080/doadores/${id}`)
      .then(res => res.json())
      .then(data => setSelectedDonator(data.value ? data.value : data))
      .catch(err => console.error('Erro ao buscar doador:', err));
  };

  const handleClearFilter = () => {
    setSearchValue('');
    fetch('http://localhost:8080/doadores')
      .then(res => res.json())
      .then(data => setDonators(data))
      .catch(err => console.error('Erro ao buscar doadores:', err));
  };

  const handleCloseDonatorProfile = () => {
    setSelectedDonator(null);
  };

  return (
    <div>
      <Navbar />
      <div className="manage-donator-container">
        <h1 className="page-title">Gerenciamento de Doadores</h1>
        <div className="action-buttons">
          <Button text="Novo Cadastro" onClick={handleNewRegister} />
        </div>
        <div className="search-bar-container">
          <select className="search-select" value={searchKey} onChange={(e) => setSearchKey(e.target.value)}>
            <option value="nome">Nome</option>
            <option value="razaoSocial">Razão Social</option>
            <option value="cpf">CPF</option>
            <option value="cnpj">CNPJ</option>
          </select>
          <input className="search-input" type="text" placeholder="Digite o valor" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <button className="querry-button" onClick={handleSearch}>Pesquisar</button>
          <button className="clear-filter-button" onClick={handleClearFilter}>Limpar Filtro</button>
        </div>

        <DonatorTable data={donators} onView={handleView} />
        {donators.length === 0 && (
          <div className="no-results">Nenhum doador encontrado.</div>
        )}

        {registerModalOpen && (
          <RegisterDonator
            onClose={() => setRegisterModalOpen(false)}
            onSuccess={() => {
              setRegisterModalOpen(false);
              fetch('http://localhost:8080/doadores')
                .then(res => res.json())
                .then(data => setDonators(data));
            }}
          />
        )}

        {selectedDonator && (
          <DonatorProfile doador={selectedDonator} onClose={handleCloseDonatorProfile} />
        )}

        {profileVisible && (
        <Profile volunteer={user} onClose={closeProfile}/>
        )}
      </div>
    </div>
  );
}

export default ManageDonator;