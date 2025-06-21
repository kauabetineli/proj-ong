import React, { useState } from 'react';
import './RegisterDonator.css';

function RegisterDonator({ onClose, onSuccess }) {
  const [tipo, setTipo] = useState('FISICO');
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    razaoSocial: '',
    cnpj: '',
  });
  const [erro, setErro] = useState('');

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
    setForm({
      nome: '',
      cpf: '',
      razaoSocial: '',
      cnpj: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const url = tipo === 'FISICO'
        ? 'http://localhost:8080/doadores/fisico'
        : 'http://localhost:8080/doadores/juridico';
      const body = tipo === 'FISICO'
        ? {
            nome: form.nome,
            cpf: form.cpf,
          }
        : {
            razaoSocial: form.razaoSocial,
            cnpj: form.cnpj,
          };
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!response.ok) throw new Error('Erro ao cadastrar doador');
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      setErro('Erro ao cadastrar doador. Verifique os dados.');
      console.error(err);
    }
  };

  return (
    <div className="register-donator-modal">
      <div className="register-donator-content">
        <h2>Cadastrar Doador</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Tipo:
              <select name="tipo" value={tipo} onChange={handleTipoChange} required>
                <option value="FISICO">Pessoa Física</option>
                <option value="JURIDICO">Pessoa Jurídica</option>
              </select></label>
          </div>

          {tipo === 'FISICO' ? (<>
              <div className="form-row">
                <label>Nome:<input type="text" name="nome" value={form.nome} onChange={handleChange} required /></label>
                <label>CPF:<input type="text" name="cpf" value={form.cpf} onChange={handleChange} required /></label>
              </div>
            </>
          ) : (
            <>
              <div className="form-row">
                <label>Razão Social:<input type="text" name="razaoSocial" value={form.razaoSocial} onChange={handleChange} required /></label>
                <label>CNPJ:<input type="text" name="cnpj" value={form.cnpj} onChange={handleChange} required /></label>
              </div>
            </>
          )}

          {erro && <div className="erro">{erro}</div>}

          <div className="register-donator-actions">
            <button type="submit" className="register-btn">Cadastrar</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default RegisterDonator;