import './Profile.css';
import React, { useState } from 'react';
import ProfilePic from '../../assets/1111.png';
import Button from '../button/Button.jsx';

    function Profile({onClose}) {
        const [userInfo] = useState(
        {
            // Mock para tester o componente
            name: 'Kael Batista Correia',
            role: 'Event Manager',
            cpf: '342.734.098-87',
            address: 'Rua das Oliveiras, 74, Salvador Centro',
            sector: 'Eventos'
        });

        function handlePasswordChange() {
            // Colocar a funcao da API para alterar a senha aqui
            let newPassword = document.querySelector('.new-password').value;
            if (newPassword) {
                console.log('Nova senha:', newPassword);
            } else {
                alert('Por favor, insira uma nova senha.');
            }
        }

        return (
            <div className="profile-container">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Meu Perfil</h2>
                <div className="profile-card">
                    <div className="profile-picture">
                        <img src={ProfilePic} alt="Foto de Perfil" />
                    </div>
                    <div className="profile-info">
                        <label>Nome<input type="text" value={userInfo.name} readOnly /></label>
                        <label>Senha<input className='new-password' type="password" placeholder='Digite sua nova senha' /></label>
                        <label>Cargo<input type="text" value={userInfo.role} readOnly /></label>
                        <label>CPF<input type="text" value={userInfo.cpf} readOnly /></label> 
                        <label>Setor<input type="text" value={userInfo.sector} readOnly /></label>
                        <label>Endereço<input type="text" value={userInfo.address} readOnly /></label>
                        <Button text='Alterar Senha' onClick={handlePasswordChange} className="changePassword-button"></Button>
                    </div>
                </div>
            </div>
        );
    }

    export default Profile;