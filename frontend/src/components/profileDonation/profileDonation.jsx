import React, { useState } from "react";
import "./profileDonation.css";
import Button from "../button/Button.jsx";

function ProfileDonation({ doacao, produtos, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formDoacao, setForm] = useState({
    id: doacao.id || "",
    doador: doacao.doador || "",
    doadorId: doacao.idDoador || "",
    documento: doacao.documento || "",
    data: doacao.data || "",
    itens: doacao.itens.map(item => ({
      produtoId: item.produtoId,
      produtoNome: item.produtoNome,
      quantidade: item.quantidade
    }))
  });
  const [erro, setErro] = useState("");

  function handleEdit() {
    setIsEditing(true);
  }

  function handleItemChange(idx, field, value) {
    const newItens = [...formDoacao.itens];
    newItens[idx][field] = value;
    setForm({ ...formDoacao, itens: newItens });
  }

  function addItem() {
    setForm({
      ...formDoacao,
      itens: [...formDoacao.itens, { produtoId: "", quantidade: 1 }]
    });
  }

  function removeItem(idx) {
    setForm({
      ...formDoacao,
      itens: formDoacao.itens.filter((_, i) => i !== idx)
    });
  }

  async function handleSave() {
    setErro("");
    try {
      const modifiedDonation = {
        doadorId: Number(formDoacao.doadorId),
        itens: formDoacao.itens.map(item => ({
          produtoId: Number(item.produtoId),
          quantidade: Number(item.quantidade)
        }))
      };
      console.log("Enviando doação modificada:", modifiedDonation);
      const response = await fetch(`http://localhost:8080/doacoes/${formDoacao.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modifiedDonation)
      });
      if (!response.ok) throw new Error("Erro ao atualizar doação");
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      setErro("Erro ao salvar alterações.");
      console.error(err);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Tem certeza que deseja excluir esta doação?")) return;
    try {
      const response = await fetch(`http://localhost:8080/doacoes/${formDoacao.id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Erro ao excluir doação");
      onClose();
      window.location.reload();
    } catch (err) {
      setErro("Erro ao excluir doação.");
      console.error(err);
    }
  }

  return (
    <div className="donation-profile-container">
      <div className="profile-header">
        <h2>Perfil da Doação</h2>
        <button className="donation-close-button" onClick={onClose}>X</button>
      </div>
      <div className="donation-profile-card">
        <div className="donation-profile-info">
          <label>ID <input type="text" name="id" value={formDoacao.id} readOnly /></label>
          <label>Doador <input type="text" name="doador" value={formDoacao.doador} readOnly /></label>
          <label>Documento <input type="text" name="documento" value={formDoacao.documento} readOnly /></label>
          <label>Data <input type="text" name="data" value={new Date(formDoacao.data).toLocaleString()} readOnly /></label>
          <label>Itens</label>
          {isEditing ? (
            <div className="donation-items-edit-list">
              {formDoacao.itens.map((item, idx) => (
                <div key={idx} className="donation-item-edit-row">

                  <select value={item.produtoId} onChange={e => handleItemChange(idx, "produtoId", e.target.value)} required>
                    <option value="">Selecione o produto</option>
                    {produtos.map(prod => (
                      <option key={prod.id} value={prod.id}> {prod.nome} </option>
                    ))}
                  </select>

                  <input type="number" min={1} value={item.quantidade} onChange={e => handleItemChange(idx, "quantidade", e.target.value)} required placeholder="Quantidade" />
                  {formDoacao.itens.length > 1 && (
                    <button
                      type="button" className="remove-item-btn" onClick={() => removeItem(idx)} title="Remover item">
                      <svg width="22" height="22" fill="#e74c3c" viewBox="0 0 24 24">
                        <path d="M9 3v1H4v2h16V4h-5V3H9zm-3 6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9H6zm2 2h2v8H8v-8zm4 0h2v8h-2v-8z"/>
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="add-item-btn" onClick={addItem}>+ Adicionar item</button>
            </div>
          ) : (
            <table className="donation-items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {doacao.itens.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.nomeProduto}</td>
                    <td>{item.quantidade} {item.unidadeMedida?.toLowerCase()}(s)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

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
  );
}

export default ProfileDonation;