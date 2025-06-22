import React, { useState, useEffect } from 'react';
import './RegisterSaidaItens.css';

function RegisterItem({ form, setForm, setProductOpen }) {
  const [erro, setErro] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState({
    produto: {
      id: 0,
      nome: ''
    },
    quantidade: 0
  });

  useEffect(() => {
    fetch('http://localhost:8080/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.error('Erro ao buscar produto:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!produto.produto.nome || produto.quantidade <= 0) {
      setErro('Preencha todos os campos corretamente.');
      return;
    }
    setForm(prevForm => ({
      ...prevForm,
      produtos: [...prevForm.produtos, produto]
    }));
    setProduto({ produto: { id: 0, nome: '' }, quantidade: 0 });
    setProductOpen(false)
  };

  const setChangeProduto = (e) => {
    const selectedNome = e.target.value;
    const selectedProduto = produtos.find(p => p.nome === selectedNome);
    if (selectedProduto) {
      setProduto(prev => ({ ...prev, produto: { id: selectedProduto.id, nome: selectedNome } }));
    }
  };

  return (
    <div className="register-saida-itens-modal">
      <div className="register-saida-itens-content">
        <h2>Cadastrar Saída de Itens</h2>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <label>Produto:<select name="nome" value={produto.produto.nome} onChange={setChangeProduto} required>
            <option value="">Selecione um produto</option>
            {produtos.length > 0 ? (
              produtos.map(p => (
                <option key={p.id} value={p.nome}>{p.nome}</option>
              ))
            ) : (
              <option disabled>Carregando...</option>
            )}
          </select></label>

          <label>Quantidade:<input
            type="number"
            name="quantidade"
            min="1"
            value={produto.quantidade}
            onChange={(e) => { setProduto({ ...produto, quantidade: e.target.value }); }}
            required />
          </label>

          {erro && <div className="erro">{erro}</div>}

          <div className="register-saida-itens-actions">
            <button type="submit" className="register-btn">Salvar</button>
            <button type="button" className="cancel-btn" onClick={() => { setProduto({ produto: { id: 0, nome: '' }, quantidade: 0 }); setProductOpen(false) }}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterItem;