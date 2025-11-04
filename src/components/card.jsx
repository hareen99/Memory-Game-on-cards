import React from "react";
import "../styles/Card.css";

function Card({ card, handleClick }) {
  return (
    <div className="card" onClick={() => handleClick(card.id)}>
      <img src={card.image} alt={card.name} />
      <p>{card.name.toUpperCase()}</p>
    </div>
  );
}

export default Card;
