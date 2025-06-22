import React, { useState } from 'react';
import './RegisterVolunteer.css';

const setores = [
  'ADMINISTRATIVO',
  'COORDENACAO',
  'LOGISTICA',
  'EVENTOS',
  'COZINHA',
  'APOIO',
  'FINANCEIRO',
  'PEDAGOGICO',
];

const tiposUsuario = [
  'VOLUNTARIO',
  'ADMINISTRADOR'
];

function RegisterVolunteer({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    senha: '',
    endereco: '',
    setor: '',
    tipoUsuario: 'VOLUNTARIO',
    dataNascimento: '',
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
    //setErro('');

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const response = await fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        body: data
      });
      if (!response.ok) {
        throw new Error('Erro ao cadastrar voluntário');
      }
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      console.error('Erro ao cadastrar voluntário:', err);
      setErro('Erro ao cadastrar voluntário. Verifique os dados.');
    }
  };

  return (
    <div className="register-volunteer-modal">
      <div className="register-volunteer-content">
        <h2>Cadastrar Voluntário</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="register-volunteer-columns">
          <div className="register-volunteer-col">
          <label>Nome:<input type="text" name="nome" value={form.nome} onChange={handleChange} required /></label>
          <label>CPF:<input type="text" name="cpf" value={form.cpf} onChange={handleChange} required /></label>
          <label>Senha:<input type="password" name="senha" value={form.senha} onChange={handleChange} required /></label>
          <label>Endereço:<input type="text" name="endereco" value={form.endereco} onChange={handleChange} required /></label>
          </div>

          <div className="register-volunteer-col">
            <label>Setor:<select name="setor" value={form.setor} onChange={handleChange} required>
                <option value="">Selecione...</option>
                {setores.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
                </select></label>

            <label>Tipo de Usuário:<select name="tipoUsuario" value={form.tipoUsuario} onChange={handleChange} required>
                {tiposUsuario.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select></label>
              
            <label>Data de Nascimento:<input type="date" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} required /></label>
            <label>Foto de Perfil:<input type="file" name="fotoPerfil" accept="image/*" onChange={handleChange} /></label>
          </div>
        </div>
          {erro && <div className="erro">{erro}</div>}

          <div className="register-volunteer-actions">
            <button type="submit" className="register-btn">Salvar</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterVolunteer;