import './ManageVoluntary.css';
import Navbar from '../../navbar/Navbar';
import Button from '../../button/Button';
import VolunteerTable from '../../VolunteerTable/VolunteerTable';
import { useState } from 'react';

function ManageVoluntary() {
  const [searchKey, setSearchKey] = useState('id');
  const [searchValue, setSearchValue] = useState('');
  const [volunteers, setVolunteers] = useState([
    { id: 1, nome: 'João Silva', cpf: '123.456.789-00', endereco: 'Rua A, 123', setor: 'Eventos' },
    { id: 2, nome: 'Maria Oliveira', cpf: '987.654.321-00', endereco: 'Rua B, 456', setor: 'Logística' },
    { id: 3, nome: 'Carlos Souza', cpf: '111.222.333-44', endereco: 'Rua C, 789', setor: 'Administrativo' },
    { id: 4, nome: 'Ana Paula', cpf: '555.666.777-88', endereco: 'Rua D, 101', setor: 'Eventos' },
    { id: 5, nome: 'Pedro Santos', cpf: '999.888.777-66', endereco: 'Rua E, 202', setor: 'Cozinha' },
  ]);

  const handleNewRegister = () => {
    console.log('Novo Cadastro');
  };

  const handleSearch = () => {
    console.log(`Pesquisar por ${searchKey}: ${searchValue}`);
  };

  const handleView = (id) => {
    console.log(`Visualizar voluntário com ID: ${id}`);
  };
  return (
    <div>
      <Navbar />
      <div className="manage-voluntary-container">
        <h1 className="page-title">Gerenciamento de Voluntários</h1>
        <div className="action-buttons">
          <Button text="Novo Cadastro" onClick={handleNewRegister} />
          <Button text="Pesquisar" onClick={handleSearch} />
        </div>
        <div className="search-container">
          <label>
            Pesquisar por:
            <select value={searchKey} onChange={(e) => setSearchKey(e.target.value)}>
              <option value="id">ID</option>
              <option value="cpf">CPF</option>
              <option value="nome">Nome</option>
              <option value="setor">Setor</option>
            </select>
          </label>
          <input
            type="text"
            placeholder="Digite o valor"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <VolunteerTable data={volunteers} onView={handleView} />
      </div>
    </div>
  );
}

export default ManageVoluntary;