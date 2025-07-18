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
      {/* <div className="search-bar-container">
        <select className="search-select" value={searchKey} onChange={(e) => setSearchKey(e.target.value)}>
          <option value="id">ID</option>
          <option value="quantidade">Quantidade</option>
        </select>
        <input className="search-input" type="text" placeholder="Digite o valor" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
        <button className="querry-button" onClick={handleSearch}> Pesquisar </button>
        <button className="clear-filter-button" onClick={handleClearFilter}> Limpar Filtro </button>
      </div> */}
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