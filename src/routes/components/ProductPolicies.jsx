// src/components/ProductPolicies.jsx
import React from "react";
import "./ProductPolicies.css"; // Archivo de estilos para las políticas

const ProductPolicies = ({ policies }) => {
  return (
    <div className="policies-container">
      <h2 className="policies-title">Políticas de Uso</h2>
      <div className="policies-grid">
        {policies.map((policy, index) => (
          <div className="policy-item" key={index}>
            <h3 className="policy-title">{policy.title}</h3>
            <p className="policy-description">{policy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPolicies;
