import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/navbar/Navbar.jsx';
import Button from '../../../components/button/Button.jsx';
import DonationTable from '../../../components/Tables/DonationsTable/DonationTable.jsx';
import ProfileDonation from '../../../components/profileDonation/profileDonation.jsx';
import RegisterDonation from '../../../components/Register/RegisterDonation/RegisterDonation.jsx';
import './ManageDonations.css';
import Profile from '../../../components/profile/Profile.jsx';
import { useAuth } from '../../../AuthContext.jsx';

function ManageDonations() {
  const [searchKey, setSearchKey] = useState('id');
  const [searchValue, setSearchValue] = useState('');
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const { profileVisible, closeProfile, user } = useAuth();

  useEffect(() => {
    fetch('http://localhost:8080/doacoes')
      .then(res => res.json())
      .then(data => {
        setDonations(data);
        setFilteredDonations(data);
      })
      .catch(err => console.error('Erro ao buscar doações:', err));
    fetch('http://localhost:8080/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.error('Erro ao buscar produtos:', err));
  }, []);

  const handleNewRegister = () => {
    setRegisterModalOpen(true);
    
  };

  const handleSearch = () => {
    if (!searchValue) {
      setFilteredDonations(donations);
      return;
    }
    const filtered = donations.filter((d) => {
      if (searchKey === 'id') return String(d.id).includes(searchValue);
      if (searchKey === 'doador') return d.doador?.toLowerCase().includes(searchValue.toLowerCase());
      if (searchKey === 'documento') return d.documento?.toLowerCase().includes(searchValue.toLowerCase());
      return false;
    });
    setFilteredDonations(filtered);
  };

  const handleClearFilter = () => {
    setSearchValue('');
    setFilteredDonations(donations);
  };

  const handleView = (id) => {
    fetch(`http://localhost:8080/doacoes/${id}`)
      .then(res => res.json())
      .then(data => setSelectedDonation(data.value ? data.value : data))
      .catch(err => console.error('Erro ao buscar doação:', err));
  };

    const handleCloseDonationProfile = () => {
        setSelectedDonation(null);
   };


  return (
    <div>
      <Navbar />
      <div className="manage-donator-container">
        <h1 className="page-title">Gerenciamento de Doações</h1>

        <div className="action-buttons">
          <Button text="Nova Doação" onClick={handleNewRegister} />
        </div>

        <div className="search-bar-container">
          <select className="search-select" value={searchKey} onChange={e => setSearchKey(e.target.value)}>
            <option value="id">ID</option>
            <option value="doador">Doador</option>
            <option value="documento">Documento</option>
          </select>
          <input className="search-input" type="text" placeholder="Digite o valor" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
          <button className="querry-button" onClick={handleSearch}>Pesquisar</button>
          <button className="clear-filter-button" onClick={handleClearFilter}>Limpar Filtro</button>
        </div>

        <DonationTable data={filteredDonations} onView={handleView} />
        {filteredDonations.length === 0 && (
          <div className="no-results">Nenhuma doação encontrada.</div>
        )}
        {registerModalOpen && (
          <RegisterDonation
            produtos={produtos}
            onClose={() => setRegisterModalOpen(false)}
            onSuccess={() => {
              setRegisterModalOpen(false);
              fetch('http://localhost:8080/doacoes')
                .then(res => res.json())
                .then(data => {
                  setDonations(data);
                  setFilteredDonations(data);
                });
            }}
          />
        )}

        {selectedDonation && (
          <ProfileDonation doacao={selectedDonation} produtos={produtos} onClose={handleCloseDonationProfile} />
        )}

        {profileVisible && (
          <Profile volunteer={user} onClose={closeProfile} />
        )}

      </div>
    </div>
  );
}

export default ManageDonations;