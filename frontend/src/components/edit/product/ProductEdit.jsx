import './ProductEdit.css';
import React, { useState } from 'react';
import Button from '../../button/Button.jsx';
import { useAuth } from '../../../AuthContext.jsx';
import { unidadeMedida, classificacao} from '../../../enums/products.jsx';

function ProductEdit({ product, onClose }) {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        id: product.id || '',
        nome: product.nome || '',
        classificacao: product.classificacao || '',
        unidadeMedida: product.unidadeMedida || ''
    });
    const [erro, setErro] = useState('');

    function handleEdit() {
        setIsEditing(true);
    }

    function handleChange(e) {
        const { name, value, files } = e.target;
        setForm({ ...form, [name]: value });
    }

    async function handleSave() {
        try {
            const response = await fetch(`http://localhost:8080/produtos`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            window.location.reload();
            if (!response.ok) throw new Error('Erro ao atualizar o produto');
            setIsEditing(false);
        } catch (err) {
            console.error('Erro ao salvar alterações:', err);
            setErro('Erro ao salvar alterações.');
        }
    }

    async function handleDelete() {
        if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;
        try {
            const response = await fetch(`http://localhost:8080/produtos/${product.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Erro ao excluir produto');
            onClose();
            window.location.reload();
        } catch (err) {
            console.error('Erro ao excluir produto:', err);
            setErro('Erro ao excluir produto.');
        }
    }
    return (
        <div className="edit-container">
            <button className="close-button" onClick={onClose}>X</button>
            <h2>Editar produto</h2>
            <div className="edit-card">
                <div className="edit-info">
                    <label> Nome <input type="text" name="nome" value={form.nome} onChange={handleChange} readOnly={!isEditing} /> </label>
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

export default ProductEdit;