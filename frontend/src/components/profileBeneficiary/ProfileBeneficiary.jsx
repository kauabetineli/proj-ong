import React, { useState } from 'react';
import './ProfileBeneficiary.css';
import Button from '../button/Button.jsx';
import { escolaridade } from '../../enums/escolaridade.jsx';

function ProfileBeneficiary({ beneficiario, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    id: beneficiario.id || '',
    nome: beneficiario.nome || '',
    cpf: beneficiario.cpf || '',
    dataNascimento: beneficiario.dataNascimento || '',
    nomePai: beneficiario.nomePai || '',
    nomeMae: beneficiario.nomeMae || '',
    escolaridade: beneficiario.escolaridade || '',
    intolerancia: beneficiario.intolerancia || '',
    observacao: beneficiario.observacao || '',
    fotoPerfil: null
  });
  const [erro, setErro] = useState('');

  function handleEdit() {
    setIsEditing(true);
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === 'fotoPerfil') {
      setForm({ ...form, fotoPerfil: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  async function handleSave() {
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    try {
      const response = await fetch(`http://localhost:8080/beneficiarios`, {
        method: 'PATCH',
        body: data,
      });
      if (!response.ok) throw new Error('Erro ao atualizar beneficiário');
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      setErro('Erro ao salvar alterações.');
      console.error(err);
    }
  }

  async function handleDelete() {
    if (!window.confirm('Tem certeza que deseja excluir este beneficiário?')) return;
    try {
      const response = await fetch(`http://localhost:8080/beneficiarios/${beneficiario.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao excluir beneficiário');
      onClose();
      window.location.reload();
    } catch (err) {
      setErro('Erro ao excluir beneficiário.');
      console.error(err);
    }
  }

  return (
    <div className='profile-modal'>
      <div className="profile-container">
        <div className="profile-header">
            <h2>Perfil do Beneficiário</h2>
            <button className="close-button" onClick={onClose}>X</button>
          </div> 

        <div className="profile-card">

          <div className="profile-info">
            <label>Nome <input type="text" name="nome" value={form.nome} onChange={handleChange} readOnly={!isEditing} /></label>
            <label>CPF <input type="text" name="cpf" value={form.cpf} readOnly /></label>
            <label>Data de Nascimento <input type="date" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} readOnly={!isEditing} /></label>
            <label>Nome do Pai <input type="text" name="nomePai" value={form.nomePai} onChange={handleChange} readOnly={!isEditing} /></label>
            <label>Nome da Mãe <input type="text" name="nomeMae" value={form.nomeMae} onChange={handleChange} readOnly={!isEditing} /></label>
            <label>Escolaridade{isEditing ? ( 
              <select name="escolaridade" value={form.escolaridade} onChange={handleChange} required>
                  <option value="">Selecione...</option>
                  {escolaridade.map((item) => (
                    <option key={item} value={item}>
                      {item.replaceAll("_", " ")}
                    </option>))}
                </select>) : (
                  <input type="text" name="escolaridade" value={form.escolaridade} readOnly/>)}
                </label>
            <label>Intolerância <input type="text" name="intolerancia" value={form.intolerancia} onChange={handleChange} readOnly={!isEditing} /></label>
            <label>Observação <textarea name="observacao" value={form.observacao} onChange={handleChange} readOnly={!isEditing} /></label>
            {erro && <div className="erro">{erro}</div>}
            <div className="profile-actions">
              {!isEditing ? (
                <Button text="Editar" onClick={handleEdit} className="edit-btn" />
              ) : (
                <Button text="Salvar Alterações" onClick={handleSave} className="save-btn" />
              )}
              <Button text="Excluir" onClick={handleDelete} className="delete-btn" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBeneficiary;