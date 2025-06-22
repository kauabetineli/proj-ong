import './Profile.css';
import React, { useState } from 'react';
import ProfilePic from '../../assets/1111.png';
import Button from '../button/Button.jsx';
import { useAuth } from '../../AuthContext.jsx';

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

function Profile({ volunteer, onClose }) {
    const { user } = useAuth();
    const isUserLogged = user?.id === volunteer?.id;
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        id: volunteer.id || '',
        nome: volunteer.nome || '',
        dataNascimento: volunteer.dataNascimento || '',
        setor: volunteer.setor || volunteer.sector || '',
        endereco: volunteer.endereco || volunteer.address || '',
        tipoUsuario: volunteer.tipoUsuario || '',
        fotoPerfil: null,
        cpf: volunteer.cpf || ''
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
            const response = await fetch(`http://localhost:8080/usuarios`, {
                method: 'PATCH',
                body: data,
            });
            window.location.reload();
            if (!response.ok) throw new Error('Erro ao atualizar voluntário');
            setIsEditing(false);
        } catch (err) {
            console.error('Erro ao salvar alterações:', err);
            setErro('Erro ao salvar alterações.');
        }
    }

    async function handleDelete() {
        if (!window.confirm('Tem certeza que deseja excluir este voluntário?')) return;
        try {
            const response = await fetch(`http://localhost:8080/usuarios/${volunteer.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Erro ao excluir voluntário');
            onClose();
            window.location.reload();
        } catch (err) {
            console.error('Erro ao excluir voluntário:', err);
            setErro('Erro ao excluir voluntário.');
        }
    }
    return (
        <div className="profile-voluntary-container">
            <div className="profile-voluntary-header">
                <h2>Perfil</h2>
                <button className="close-button" onClick={onClose}>X</button>
                </div>

            <div className="profile-voluntary-card">
                <div className="profile-voluntary-picture">
                    <img src={volunteer.fotoPerfilBase64 ? `data:image/png;base64,${volunteer.fotoPerfilBase64}`
                        : (volunteer.foto_perfil ? volunteer.foto_perfil : ProfilePic)} alt="Foto de Perfil" />
                </div>
                <div className="profile-voluntary-info">
                    <label> Nome <input type="text" name="nome" value={form.nome} onChange={handleChange} readOnly={!isEditing} /> </label>
                    <label> Data de Nascimento <input type="text" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} readOnly={!isEditing} /> </label>
                    <label> CPF <input type="text" name="cpf" value={volunteer.cpf} readOnly/> </label> 
                    {/* <label> Setor <input type="text" name="setor" value={form.setor} onChange={handleChange} readOnly={!isEditing} /> </label> */}
                    <label>Setor{isEditing ? ( 
                        <select name="setor" value={form.setor} onChange={handleChange} required>
                            <option value="">Selecione...</option>
                            {setores.map((item) => (
                            <option key={item} value={item}>
                                {item.replaceAll("_", " ")}
                            </option>))}
                        </select>) : (
                            <input type="text" name="setor" value={form.setor} readOnly/>)}
                        </label>
                    <label> Endereço <input type="text" name="endereco" value={form.endereco} onChange={handleChange} readOnly={!isEditing} /> </label>
                    {isEditing && ( 
                        <label> Nova Foto de Perfil <input type="file" name="fotoPerfil" accept="image/*" onChange={handleChange} /> </label>
                        )}
                    {erro && <div className="erro">{erro}</div>}
                    <div className="profile-voluntary-actions">
                        {!isEditing ? (
                            <Button text="Editar" onClick={handleEdit} className="edit-btn" />) : (
                            <Button text="Salvar Alterações" onClick={handleSave} className="save-btn" />
                            )}
                        {!isUserLogged && (<Button text="Excluir" onClick={handleDelete} className="delete-btn" />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;