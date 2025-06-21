import './ManageBeneficiary.css';
import Navbar from '../../../components/navbar/Navbar.jsx';
import Button from '../../../components/button/Button.jsx';
import BeneficiaryTable from '../../../components/Tables/BeneficiaryTable/BeneficiaryTable.jsx';
import ProfileBeneficiary from '../../../components/profileBeneficiary/ProfileBeneficiary.jsx';
import RegisterBeneficiary from '../../../components/Register/RegisterBeneficiary/RegisterBeneficiary.jsx';
import { useState, useEffect } from 'react';
import Profile from '../../../components/profile/Profile.jsx';
import { useAuth } from '../../../AuthContext.jsx';

function ManageBeneficiary() {
  const [searchKey, setSearchKey] = useState('id');
  const [searchValue, setSearchValue] = useState('');
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const { profileVisible, closeProfile, user } = useAuth();

  useEffect(() => {
    fetch('http://localhost:8080/beneficiarios')
      .then(res => res.json())
      .then(data => setBeneficiaries(data))
      .catch(err => console.error('Erro ao buscar beneficiários:', err));
  }, []);

  const handleNewRegister = () => {
    setRegisterModalOpen(true);
  };

  const handleSearch = () => {
    if (searchValue) {
      fetch(`http://localhost:8080/beneficiarios/busca?chave=${searchKey}&valor=${searchValue}`)
        .then(res => res.json())
        .then(data => setBeneficiaries(data))
        .catch(err => console.error('Erro ao buscar beneficiários:', err));
    }
  };

  const handleView = (id) => {
    fetch(`http://localhost:8080/beneficiarios/${id}`)
      .then(res => res.json())
      .then(data => setSelectedBeneficiary(data.value ? data.value : data))
      .catch(err => console.error('Erro ao buscar beneficiário:', err));
  };

  const handleClearFilter = () => {
    setSearchValue('');
    fetch('http://localhost:8080/beneficiarios')
      .then(res => res.json())
      .then(data => setBeneficiaries(data))
      .catch(err => console.error('Erro ao buscar beneficiários:', err));
  };

  const handleCloseBeneficiaryProfile = () => {
    setSelectedBeneficiary(null);
  };

  return (
    <div>
      <Navbar />
      <div className="manage-beneficiary-container">
        <h1 className="page-title">Gerenciamento de Beneficiários</h1>
        <div className="action-buttons">
          <Button text="Novo Cadastro" onClick={handleNewRegister} />
        </div>
        <div className="search-bar-container">
          <select className="search-select" value={searchKey} onChange={(e) => setSearchKey(e.target.value)}>
            <option value="id">ID</option>
            <option value="cpf">CPF</option>
            <option value="nome">Nome</option>
            <option value="escolaridade">Escolaridade</option>
          </select>
          <input className="search-input" type="text" placeholder="Digite o valor" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <button className="querry-button" onClick={handleSearch}>Pesquisar</button>
          <button className="clear-filter-button" onClick={handleClearFilter}>Limpar Filtro</button>
        </div>
        <BeneficiaryTable data={beneficiaries} onView={handleView} />
        {beneficiaries.length === 0 && (
          <div className="no-results">Nenhum beneficiário encontrado.</div>
        )}

        {registerModalOpen && (
          <RegisterBeneficiary
            onClose={() => setRegisterModalOpen(false)}
            onSuccess={() => {
              setRegisterModalOpen(false);
              fetch('http://localhost:8080/beneficiarios')
                .then(res => res.json())
                .then(data => setBeneficiaries(data));
            }}
          />
        )}

        {selectedBeneficiary && (
          <ProfileBeneficiary beneficiario={selectedBeneficiary} onClose={handleCloseBeneficiaryProfile} />
        )}

        {profileVisible && (
        <Profile volunteer={user} onClose={closeProfile}/>
      )}
      </div>
    </div>
  );
}

export default ManageBeneficiary;