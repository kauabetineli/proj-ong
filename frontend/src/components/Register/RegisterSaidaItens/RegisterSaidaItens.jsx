import React, { useState } from 'react';
import './RegisterSaidaItens.css';
import RegisterItem from './RegisterItem.jsx';

function RegisterSaidaItens({ onClose, onSuccess }) {
  const [productOpen, setProductOpen] = useState(false);
  const [form, setForm] = useState({
    dataSaida: new Date().toISOString(),
    produtos: []
  });

  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    if (productOpen)
      return;
    e.preventDefault();
    setErro('');
    console.debug(form);
    try {
      const response = await fetch('http://localhost:8080/saidas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      if (!response.ok) {
        throw new Error('Erro ao cadastrar produto');
      }
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err);
      setErro('Erro ao cadastrar produto. Verifique os dados.');
    }
  };

  return (
    <div className="register-saida-itens-modal">
      <div className="register-saida-itens-content">
        <h2>Cadastrar Saída de Itens</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <button type="button" className="register-btn" onClick={() => {setProductOpen(true)}}>Adicionar produto</button>

          <table className="product-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {form.produtos.map((produto, index) => (
                <tr key={index}>
                  <td>{produto.produto.nome}</td>
                  <td>{produto.quantidade}</td>
                  <td><button className="excluir-btn" onClick={() => {
                    setForm(prevForm => ({
                      ...prevForm,
                      produtos: prevForm.produtos.filter((_, index2) => index2 !== index)
                    }));
                  }}>X</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          {erro && <div className="erro">{erro}</div>}

          <div className="register-saida-itens-actions">
            <button type="submit" className="register-btn">Salvar</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
          </div>
        </form>
        {productOpen && (
          <RegisterItem
            form={form}
            setForm={setForm}
            setProductOpen={setProductOpen}
          />
        )}
      </div>
    </div>
  );
}

export default RegisterSaidaItens;