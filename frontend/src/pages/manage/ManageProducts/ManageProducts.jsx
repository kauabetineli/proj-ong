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
        <button className="clear-filter-button" onClick={handleClearFilter}> Limpar Filtro </button>
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