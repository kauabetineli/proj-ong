import React from 'react';
import './StockTable.css';

const StockTable = ({ data }) => {
  return (
    <table className="stock-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Tipo de medida</th>
          <th>Classificação</th>
          <th>Quantidade</th>
        </tr>
      </thead>
      <tbody>
        {data.map((product) => (
          <tr key={product.produto.id}>
            <td>{product.produto.id}</td>
            <td>{product.produto.nome}</td>
            <td>{product.produto.unidadeMedida}</td>
            <td>{product.produto.classificacao}</td>
            <td>{product.quantidade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StockTable;