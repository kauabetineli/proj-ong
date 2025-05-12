import './Profile.css';
import React from 'react';
import ProfilePic from '../../assets/1111.png';
import Button from '../button/Button.jsx';

function Profile({ volunteer, onClose }) {
    if (!volunteer) return null;

    function handlePasswordChange() {
        let newPassword = document.querySelector('.new-password').value;
        if (newPassword) {
            console.log('Nova senha:', newPassword);
        } else {
            alert('Por favor, insira uma nova senha.');
        }
    }

    console.log('Volunteer:', volunteer);

    return (
        <div className="profile-container">
            <button className="close-button" onClick={onClose}>X</button>
            <h2>Perfil</h2>
            <div className="profile-card">
                <div className="profile-picture">
                    <img src={volunteer.fotoPerfilBase64 ? `data:image/png;base64,${volunteer.fotoPerfilBase64}`
                        : (volunteer.foto_perfil ? volunteer.foto_perfil : ProfilePic)} alt="Foto de Perfil"/>
                </div>
                <div className="profile-info">
                    <label>Nome<input type="text" value={volunteer.nome || ''} readOnly /></label>
                    <label>Senha<input className='new-password' type="password" placeholder='Digite sua nova senha' /></label>
                    <label>Data de Nascimento
                    <input type="text" value={volunteer.dataNascimento} readOnly /></label>
                    <label>CPF<input type="text" value={volunteer.cpf || ''} readOnly /></label>
                    <label>Setor<input type="text" value={volunteer.setor || volunteer.sector || ''} readOnly /></label>
                    <label>Endereço<input type="text" value={volunteer.endereco || volunteer.address || ''} readOnly /></label>
                    <Button text='Alterar Senha' onClick={handlePasswordChange} className="changePassword-button" />
                </div>
            </div>
        </div>
    );
}

export default Profile;