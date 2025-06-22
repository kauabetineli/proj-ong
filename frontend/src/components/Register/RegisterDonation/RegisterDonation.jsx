import React, { useState, useEffect } from "react";
import "./RegisterDonation.css";

function DonationModal({ onClose }) {
  const [doadorId, setDoadorId] = useState("");
  const [itens, setItens] = useState([{ produtoId: "", quantidade: 1 }]);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/produtos")
      .then(res => res.json())
      .then(data => setProdutos(data));
  }, []);

  const handleItemChange = (idx, field, value) => {
    const newItens = [...itens];
    newItens[idx][field] = value;
    setItens(newItens);
  };

  const addItem = () => setItens([...itens, { produtoId: "", quantidade: 1 }]);
  const removeItem = idx => setItens(itens.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doacao = {
      doadorId: Number(doadorId),
      itens: itens.map(item => ({
        produtoId: Number(item.produtoId),
        quantidade: Number(item.quantidade)
      }))
    };
    await fetch("http://localhost:8080/doacoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doacao)
    });
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>Nova Doação</h2>
        <label>
          Doador ID:
          <input type="number" value={doadorId} onChange={e => setDoadorId(e.target.value)} required />
        </label>

        <h3>Itens</h3>
        {itens.map((item, idp) => (
          <div key={idp}>
            <select
              value={item.produtoId}
              onChange={e => handleItemChange(idp, "produtoId", e.target.value)}
              required
            >
              <option value="">Selecione o produto</option>
              {produtos.map(prod => (
                <option key={prod.id} value={prod.id}>
                  {prod.nome}
                </option>
              ))}
            </select>
            
            <input type="number" min={1} value={item.quantidade} onChange={e => handleItemChange(idp, "quantidade", e.target.value)} required placeholder="Quantidade" />
            {itens.length > 1 && (<button type="button" onClick={() => removeItem(idp)}> Remover </button> )} 

            </div>))}

        <button type="button" onClick={addItem}>Adicionar item</button>
        <div>
          <button type="submit">Salvar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default DonationModal;