import React, { useState } from "react";
import "./DonatorProfile.css";
import Button from "../button/Button";

function DonatorProfile({ doador, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ ...doador });
  const [erro, setErro] = useState("");

  function handleEdit() {
    setIsEditing(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSave() {
    try {
      const url =
        doador.tipo === "FISICO"
          ? "http://localhost:8080/doadores/fisico"
          : "http://localhost:8080/doadores/juridico";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Erro ao atualizar doador");
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      setErro("Erro ao salvar alterações.");
      console.error(err);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Tem certeza que deseja excluir este doador?")) return;
    try {
      const response = await fetch(
        `http://localhost:8080/doadores/${doador.id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Erro ao excluir doador");
      onClose();
      window.location.reload();
    } catch (err) {
      setErro("Erro ao excluir doador.");
      console.error(err);
    }
  }

  return (
    <div className="donator-profile-modal">
      <div className="donator-profile-content">
        <h2>Perfil do Doador</h2>
        <button className="close-button" onClick={onClose}>X</button>

        <div className="profile-card">
          <div className="profile-info"> {doador.tipo === "FISICO" ? (<>
                <label>Nome <input type="text"  name="nome" value={form.nome || ""} onChange={handleChange} readOnly={!isEditing}/> </label>
                <label>CPF <input type="text" name="cpf" value={form.cpf || ""} onChange={handleChange} readOnly={!isEditing}/> </label></>
            ) : (<>
            <label>Razão Social <input type="text" name="razaoSocial" value={form.razaoSocial || ""} onChange={handleChange} readOnly={!isEditing}/> </label>
                <label>CNPJ <input type="text" name="cnpj" value={form.cnpj || ""} onChange={handleChange} readOnly={!isEditing} /> </label> </>
            )}
          </div>
          
          {erro && <div className="erro">{erro}</div>}
          <div className="profile-actions">
            {!isEditing ? (
              <Button text="Editar" onClick={handleEdit} className="edit-btn" />
            ) : (
              <Button text="Salvar Alterações" onClick={handleSave} className="save-btn"/>
            )}
            <Button text="Excluir" onClick={handleDelete} className="delete-btn" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonatorProfile;