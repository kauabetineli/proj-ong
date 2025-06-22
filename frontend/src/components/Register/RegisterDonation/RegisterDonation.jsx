import React, { useState, useEffect } from "react";
import "./RegisterDonation.css";

function DonationModal({ onClose, onSuccess }) {
  const [doadorId, setDoadorId] = useState("");
  const [itens, setItens] = useState([{ produtoId: "", quantidade: 1 }]);
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState("");
  const [doadores, setDoadores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/produtos")
      .then(res => res.json())
      .then(data => setProdutos(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/doadores")
      .then(res => res.json())
      .then(data => setDoadores(data));
  }, []);

  const handleItemChange = (idx, field, value) => {
    const newItens = [...itens];
    newItens[idx][field] = value;
    setItens(newItens);
  };

function addItem() {
  setItens([...itens, { produtoId: "", quantidade: 1 }]);
}

function removeItem(idx) {
  setItens(itens.filter((_, i) => i !== idx));
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    const doacao = {
      doadorId: Number(doadorId),
      itens: itens.map(item => ({
        produtoId: Number(item.produtoId),
        quantidade: Number(item.quantidade)
      }))
    };
    try {
      const response = await fetch("http://localhost:8080/doacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doacao)
      });
      if (!response.ok) throw new Error("Erro ao cadastrar doação");
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setErro("Erro ao cadastrar doação. Verifique os dados.");
      console.error("Erro ao cadastrar doação:", err);
    }
  };
  
  return (
    <div className="register-donation-modal">
      <form onSubmit={handleSubmit}>
        <h2>Nova Doação</h2>
        <h3>Doador</h3>
        <select value={doadorId} onChange={e => setDoadorId(e.target.value)} required>
          <option value="">Selecione o doador</option>
          {doadores.map(doador => (
            <option key={doador.id} value={doador.id}>
              {doador.identificador}
            </option>
          ))}
        </select>

        <h3>Itens</h3>
        {itens.map((item, idp) => (
          <div key={idp}>
            <select value={item.produtoId} onChange={e => handleItemChange(idp, "produtoId", e.target.value)} required>
              <option value="">Selecione o produto</option>
              {produtos.map(prod => (
                <option key={prod.id} value={prod.id}>
                  {prod.nome}
                </option>
              ))}
            </select>
            
            <input type="number" min={1} value={item.quantidade} onChange={e => handleItemChange(idp, "quantidade", e.target.value)} required placeholder="Quantidade" />
            {itens.length > 1 && (<button type="button" className="remove-btn" onClick={() => removeItem(idp)}>
              <svg width="22" height="22" className="remove-icon" fill="#e74c3c" viewBox="0 0 24 24">
                <path d="M9 3v1H4v2h16V4h-5V3H9zm-3 6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9H6zm2 2h2v8H8v-8zm4 0h2v8h-2v-8z"/>
              </svg>
            </button> )} 

            </div>))}

        <button type="button" className="add-item-btn" onClick={addItem}> + Adicionar item</button>

        {erro && <div className="erro">{erro}</div>}

          <div className="register-donation-actions">
            <button type="submit" className="save-btn">Salvar</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
          </div>
      </form>
    </div>
  );
}

export default DonationModal;