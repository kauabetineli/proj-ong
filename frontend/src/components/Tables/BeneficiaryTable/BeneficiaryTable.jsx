import React from 'react';
import './BeneficiaryTable.css';

const BeneficiaryTable = ({ data, onView }) => {
  return (
    <table className="beneficiary-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>CPF</th>
          <th>Data Nascimento</th>
          <th>Escolaridade</th>
          <th>Visualizar</th>
        </tr>
      </thead>
      <tbody>
        {data.map((beneficiary) => (
          <tr key={beneficiary.id}>
            <td>{beneficiary.id}</td>
            <td>{beneficiary.nome}</td>
            <td>{beneficiary.cpf}</td>
            <td>{beneficiary.dataNascimento}</td>
            <td>{beneficiary.escolaridade}</td>
            <td>
              <button className="view-button" onClick={() => onView(beneficiary.id)}>
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

export default BeneficiaryTable;