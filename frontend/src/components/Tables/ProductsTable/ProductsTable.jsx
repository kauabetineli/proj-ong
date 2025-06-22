import React from 'react';
import './ProductsTable.css';

const ProductsTable = ({ data, onView }) => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Tipo de medida</th>
          <th>Classificação</th>
          <th>Visualizar</th>
        </tr>
      </thead>
      <tbody>
        {data.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.nome}</td>
            <td>{product.unidadeMedida}</td>
            <td>{product.classificacao}</td>
            <td>
              <button className="view-button" onClick={() => onView(product.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168z"/>
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;