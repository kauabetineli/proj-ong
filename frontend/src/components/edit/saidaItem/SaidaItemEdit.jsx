import './SaidaItemEdit.css';
import React, { useState } from 'react';
import Button from '../../button/Button.jsx';
import { useAuth } from '../../../AuthContext.jsx';

function SaidaItemEdit({ saida, onClose }) {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        id: saida.id || '',
        dataSaida: saida.dataSaida || '',
        produtos: saida.produtos || []
    });
    const [erro, setErro] = useState('');

    function handleEdit() {
        setIsEditing(true);
    }

    async function handleSave() {
        try {
            const response = await fetch(`http://localhost:8080/saidas/${saida.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            // window.location.reload();
            if (!response.ok) throw new Error('Erro ao atualizar a saída de itens');
            setIsEditing(false);
        } catch (err) {
            console.error('Erro ao salvar alterações:', err);
            setErro('Erro ao salvar alterações.');
        }
    }

    async function handleDelete() {
        if (!window.confirm('Tem certeza que deseja excluir esta saída de itens?')) return;
        try {
            const response = await fetch(`http://localhost:8080/saidas/${saida.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Erro ao excluir saída de itens');
            onClose();
            window.location.reload();
        } catch (err) {
            console.error('Erro ao excluir saída de itens:', err);
            setErro('Erro ao excluir saída de itens.');
        }
    }
    return (
        <div className="edit-container">
            <button className="close-button" onClick={onClose}>X</button>
            <h2>Editar Saída de Itens</h2>
            <div className="edit-card">
                <div className="edit-info">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {form.produtos.map((produto, index) => (
                                <tr key={index}>
                                    <td>{produto.produto.nome}</td>
                                    <td><input
                                        type="number"
                                        name="quantidade"
                                        min="1"
                                        value={produto.quantidade}
                                        onChange={(e) => {
                                            const updatedProdutos = form.produtos.map((p, i) => {
                                                if (i === index) {
                                                    return { ...p, quantidade: e.target.value };
                                                }
                                                return p;
                                            });
                                            setForm({ ...form, produtos: updatedProdutos });
                                        }}
                                        required
                                        disabled={!isEditing}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {erro && <div className="erro">{erro}</div>}

                    <div className="edit-actions">
                        {!isEditing ? (
                            <Button text="Editar" onClick={handleEdit} className="edit-btn" />) : (
                            <Button text="Salvar Alterações" onClick={handleSave} className="save-btn" />
                        )}
                        {(<Button text="Excluir" onClick={handleDelete} className="delete-btn" />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SaidaItemEdit;