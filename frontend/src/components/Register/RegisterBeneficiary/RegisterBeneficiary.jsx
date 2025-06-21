import React, { useState } from 'react';
import './RegisterBeneficiary.css';
import escolaridade from '../../../enums/escolaridade.jsx';

function RegisterBeneficiary({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    nomePai: '',
    nomeMae: '',
    escolaridade: '',
    intolerancia: '',
    observacao: '',
    fotoPerfil: null
  });
  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'fotoPerfil') {
      setForm({ ...form, fotoPerfil: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    try {
      const response = await fetch('http://localhost:8080/beneficiarios', {
        method: 'POST',
        body: data
      });
      if (!response.ok) throw new Error('Erro ao cadastrar beneficiário');
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      setErro('Erro ao cadastrar beneficiário. Verifique os dados.');
      console.error(err);
    }
  };

  return (
    <div className="register-beneficiario-modal">
      <div className="register-beneficiario-content">
        <h2>Cadastro de Beneficiário</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-row">
            <label>Nome:<input type="text" name="nome" value={form.nome} onChange={handleChange} required /></label>
            <label>Nome do pai:<input type="text" name="nomePai" value={form.nomePai} onChange={handleChange} /></label>
          </div>
          <div className="form-row">
            <label>CPF:<input type="text" name="cpf" value={form.cpf} onChange={handleChange} required /></label>
            <label>Nome da mãe:<input type="text" name="nomeMae" value={form.nomeMae} onChange={handleChange} /></label>
          </div>
          <div className="form-row">
            <label>Data nascimento:<input type="date" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} required /></label>
            <label>Observação:<textarea name="observacao" value={form.observacao} onChange={handleChange} /></label>
          </div>
          <div className="form-row">
            
            <label>
              Escolaridade: <select name="escolaridade" value={form.escolaridade} onChange={handleChange} required> <option value="">Selecione...</option>
                {escolaridade.map((item) => (
                  <option key={item} value={item}> {item.replaceAll("_", " ")} </option>
                ))} </select> 
                </label>

            <label>Intolerância:<input type="text" name="intolerancia" value={form.intolerancia} onChange={handleChange} /></label>
          </div>
          {erro && <div className="erro">{erro}</div>}
          <div className="register-beneficiario-actions">
            <button type="submit" className="register-btn">Cadastrar</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterBeneficiary;