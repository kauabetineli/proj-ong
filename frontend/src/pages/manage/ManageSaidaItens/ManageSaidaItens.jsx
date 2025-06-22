import './ManageSaidaItens.css';
import Navbar from '../../../components/navbar/Navbar.jsx';
import Button from '../../../components/button/Button.jsx';
import SaidaItensTable from '../../../components/Tables/SaidaItensTable/SaidaItensTable.jsx';
import { useState, useEffect } from 'react';
import Profile from '../../../components/profile/Profile.jsx';
import SaidaItemEdit from '../../../components/edit/saidaItem/SaidaItemEdit.jsx';
import { useAuth } from '../../../AuthContext.jsx';
import RegisterSaidaItens from '../../../components/Register/RegisterSaidaItens/RegisterSaidaItens.jsx';

function ManageSaidaItens() {
  const [searchKey, setSearchKey] = useState('id');
  const [searchValue, setSearchValue] = useState('');
  const {profileVisible, closeProfile, user} = useAuth();
  const [saidaItem, setSaidaItem] = useState([]);
  const [selectedSaidaItem, setSelectedSaidaItem] = useState(null);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/saidas')
      .then(res => res.json())
      .then(data => setSaidaItem(data))
      .catch(err => console.error('Erro ao buscar saída de item:', err));
  }, []);

  const handleNewRegister = () => {
    setRegisterModalOpen(true);
    
  };

  const handleSearch = () => {
    if(searchValue) {
    fetch(`http://localhost:8080/saidas/busca?chave=${searchKey}&valor=${searchValue}`)
      .then(res => res.json())
      .then(data => setSaidaItem(data))
      .catch(err => console.error('Erro ao buscar saída de item:', err));
    }
  };

const handleView = (id) => {
  fetch(`http://localhost:8080/saidas/${id}`)
    .then(res => res.json())
    .then(data => {
      setSelectedSaidaItem(data.value ? data.value : data);
    })
    .catch(err => console.error('Erro ao buscar saída de item:', err));
};

  const handleClearFilter = () => {
  setSearchValue('');
  fetch('http://localhost:8080/saidas')
    .then(res => res.json())
    .then(data => setSaidaItem(data))
    .catch(err => console.error('Erro ao buscar saída de item:', err));
};

  const handleCloseSaidaItemEdit = () => {
    setSelectedSaidaItem(null);
  };

  return (
      <div>
    <Navbar />
    <div className="manage-saida-itens-container">
      <h1 className="page-title">Gerenciamento da Saída de Itens</h1>
      <div className="action-buttons">
        <Button text="Novo Cadastro" onClick={handleNewRegister} />
      </div>
      <div className="search-bar-container">
        <select className="search-select" value={searchKey} onChange={(e) => setSearchKey(e.target.value)}>
          <option value="id">ID</option>
          <option value="quantidade">Quantidade</option>
        </select>
        <input className="search-input" type="text" placeholder="Digite o valor" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
        <button className="querry-button" onClick={handleSearch}> Pesquisar </button>
        <button className="clear-filter-button" onClick={handleClearFilter}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/></svg>
        </button>
      </div>
      <SaidaItensTable data={saidaItem} onView={handleView} />
      {saidaItem.length === 0 && (
        <div className="no-results">Nenhuma saída de item encontrada.</div>
      )}

      {registerModalOpen && (
        <RegisterSaidaItens
          onClose={() => setRegisterModalOpen(false)}
          onSuccess={() => {
            setRegisterModalOpen(false);
            fetch('http://localhost:8080/saidas')
              .then(res => res.json())
              .then(data => setSaidaItem(data));
          }}
        />
      )}

      {selectedSaidaItem && (
        <SaidaItemEdit saida={selectedSaidaItem} onClose={handleCloseSaidaItemEdit} />
      )}

      {profileVisible && (
        <Profile volunteer={user} onClose={closeProfile}/>
      )}
    </div>
  </div>
  );
}

export default ManageSaidaItens