import React, { useState } from "react";
import "./profileDonation.css";
import Button from "../button/Button.jsx";

function ProfileDonation({ doacao, produtos, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
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
    const newItens = [...form.itens];
    newItens[idx][field] = value;
    setForm({ ...form, itens: newItens });
  }

  function addItem() {
    setForm({
      ...form,
      itens: [...form.itens, { produtoId: "", quantidade: 1 }]
    });
  }

  function removeItem(idx) {
    setForm({
      ...form,
      itens: form.itens.filter((_, i) => i !== idx)
    });
  }

  async function handleSave() {
    setErro("");
    try {
      const payload = {
        doadorId: Number(form.doadorId),
        itens: form.itens.map(item => ({
          produtoId: Number(item.produtoId),
          quantidade: Number(item.quantidade)
        }))
      };
      const response = await fetch(`http://localhost:8080/doacoes/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
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
      const response = await fetch(`http://localhost:8080/doacoes/${form.id}`, {
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
          <label>ID <input type="text" name="id" value={form.id} readOnly /></label>
          <label>Doador <input type="text" name="doador" value={form.doador} readOnly /></label>
          <label>Documento <input type="text" name="documento" value={form.documento} readOnly /></label>
          <label>Data <input type="text" name="data" value={new Date(form.data).toLocaleString()} readOnly /></label>
          <label>Itens</label>
          {isEditing ? (
            <div>
              {form.itens.map((item, idx) => (
                <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <select
                    value={item.produtoId}
                    onChange={e => handleItemChange(idx, "produtoId", e.target.value)}
                    required
                  >
                    <option value="">Selecione o produto</option>
                    {produtos.map(prod => (
                      <option key={prod.id} value={prod.id}>
                        {prod.nome}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min={1}
                    value={item.quantidade}
                    onChange={e => handleItemChange(idx, "quantidade", e.target.value)}
                    required
                    placeholder="Quantidade"
                  />
                  {form.itens.length > 1 && (
                    <button type="button" onClick={() => removeItem(idx)}>
                      Remover
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addItem}>Adicionar item</button>
            </div>
          ) : (
            <ul className="donation-items-list">
              {form.itens.map((item, idx) => (
                <li key={idx}>
                  {item.produtoNome || item.produtoId} - {item.quantidade}
                </li>
              ))}
            </ul>
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