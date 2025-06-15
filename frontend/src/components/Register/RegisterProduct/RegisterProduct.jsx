import React, { useState } from 'react';
import './RegisterProduct.css';
import { unidadeMedida, classificacao} from '../../../enums/products';

function RegisterProduct({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    nome: '',
    unidadeMedida: 'UNIDADE',
    classificacao: 'ALIMENTICIO'
  });

  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await fetch('http://localhost:8080/produtos', {
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
    <div className="register-product-modal">
      <div className="register-product-content">
        <h2>Cadastrar Produto</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>Nome:<input type="text" name="nome" value={form.nome} onChange={handleChange} required /></label>

          <label>Tipo de Medida:<select name="unidadeMedida" value={form.unidadeMedida} onChange={handleChange} required>
              {unidadeMedida.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select></label>

          <label>Classificação:<select name="classificacao" value={form.classificacao} onChange={handleChange} required>
              {classificacao.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select></label>

          {erro && <div className="erro">{erro}</div>}

          <div className="register-product-actions">
            <button type="submit" className="register-btn">Salvar</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterProduct;