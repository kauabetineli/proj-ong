import './ManageStock.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/navbar/Navbar.jsx';
import Button from '../../../components/button/Button.jsx';
import StockTable from '../../../components/Tables/StockTable/StockTable.jsx';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../AuthContext.jsx';
import Profile from '../../../components/profile/Profile.jsx';

function ManageStock() {
  const [searchKey, setSearchKey] = useState('id');
  const [searchValue, setSearchValue] = useState('');
  const {profileVisible, closeProfile, user} = useAuth();
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/estoque')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Erro ao buscar no estoque:', err));
  }, []);

  const handleSearch = () => {
    if(searchValue) {
    fetch(`http://localhost:8080/estoque/busca?chave=${searchKey}&valor=${searchValue}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Erro ao buscar no estoque:', err));
    }
  };

  const handleClearFilter = () => {
    setSearchValue('');
    fetch('http://localhost:8080/estoque')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Erro ao buscar no estoque:', err));
  };

  return (
      <div>
    <Navbar />
    <div className="manage-stocks-container">
      <h1 className="page-title">Gerenciamento de Estoque</h1>
      <div className="action-buttons">
        <Button text="Novo Saída de itens" onClick={() => {navigate('/saida-itens')}} />
      </div>
      <div className="search-bar-container">
        <select className="search-select" value={searchKey} onChange={(e) => setSearchKey(e.target.value)}>
          <option value="id">ID</option>
          <option value="nome">Nome</option>
          {/* <option value="unidadeMedida">Tipo de medida</option> */}
          {/* <option value="quantidade">Quantidade</option> */}
          {/* <option value="classificacao">Classificação</option> */}
        </select>
        <input className="search-input" type="text" placeholder="Digite o valor" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
        <button className="querry-button" onClick={handleSearch}> Pesquisar </button>
        <button className="clear-filter-button" onClick={handleClearFilter}>
          Limpar Filtro
        </button>
      </div>
      <StockTable data={products} />
      {products.length === 0 && (
        <div className="no-results">Nenhum produto encontrado.</div>
      )}

      {profileVisible && (
        <Profile volunteer={user} onClose={closeProfile}/>
      )}
    </div>
  </div>
  );
}

export default ManageStock;