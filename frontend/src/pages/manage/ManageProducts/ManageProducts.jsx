import './ManageProducts.css';
import Navbar from '../../../components/navbar/Navbar.jsx';
import Button from '../../../components/button/Button.jsx';
import ProductsTable from '../../../components/Tables/ProductsTable/ProductsTable.jsx';
import { useState, useEffect } from 'react';
import ProductEdit from '../../../components/edit/product/ProductEdit.jsx';
import { useAuth } from '../../../AuthContext.jsx';
import RegisterProduct from '../../../components/Register/RegisterProduct/RegisterProduct.jsx';
import Profile from '../../../components/profile/Profile.jsx';

function ManageProducts() {
  const [searchKey, setSearchKey] = useState('id');
  const [searchValue, setSearchValue] = useState('');
  const {profileVisible, closeProfile, user} = useAuth();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProducts] = useState(null);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const handleNewRegister = () => {
    setRegisterModalOpen(true);
  };

  useEffect(() => {
    fetch('http://localhost:8080/produtos')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Erro ao buscar os produtos:', err));
  }, []);

  const handleSearch = () => {
    if(searchValue) {
    fetch(`http://localhost:8080/produtos/busca?chave=${searchKey}&valor=${searchValue}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Erro ao buscar os produtos:', err));
    }
  };

const handleView = (id) => {
  fetch(`http://localhost:8080/produtos/${id}`)
    .then(res => res.json())
    .then(data => {
      setSelectedProducts(data.value ? data.value : data);
    })
    .catch(err => console.error('Erro ao buscar os produtos:', err));
};

  const handleClearFilter = () => {
  setSearchValue('');
  fetch('http://localhost:8080/produtos')
    .then(res => res.json())
    .then(data => setProducts(data))
    .catch(err => console.error('Erro ao buscar os produtos:', err));
};

  const handleCloseProductEdit = () => {
    setSelectedProducts(null);
  };

  return (
      <div>
    <Navbar />
    <div className="manage-products-container">
      <h1 className="page-title">Gerenciamento de Produtos</h1>
      <div className="action-buttons">
        <Button text="Novo Cadastro" onClick={handleNewRegister} />
      </div>
      <div className="search-bar-container">
        <select className="search-select" value={searchKey} onChange={(e) => setSearchKey(e.target.value)}>
          <option value="id">ID</option>
          <option value="nome">Nome</option>
          <option value="unidadeMedida">Tipo de medida</option>
          <option value="classificacao">Classificação</option>
        </select>
        <input className="search-input" type="text" placeholder="Digite o valor" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
        <button className="querry-button" onClick={handleSearch}> Pesquisar </button>
        <button className="clear-filter-button" onClick={handleClearFilter}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/></svg>
        </button>
      </div>
      <ProductsTable data={products} onView={handleView} />
      {products.length === 0 && (
        <div className="no-results">Nenhum produto encontrado.</div>
      )}

      {registerModalOpen && (
        <RegisterProduct
          onClose={() => setRegisterModalOpen(false)}
          onSuccess={() => {
            setRegisterModalOpen(false);
            fetch('http://localhost:8080/produtos')
              .then(res => res.json())
              .then(data => setProducts(data));
          }}
        />
      )}

      {selectedProduct && (
        <ProductEdit product={selectedProduct} onClose={handleCloseProductEdit} />
      )}

      {profileVisible && (
        <Profile volunteer={user} onClose={closeProfile}/>
      )}
    </div>
  </div>
  );
}

export default ManageProducts;