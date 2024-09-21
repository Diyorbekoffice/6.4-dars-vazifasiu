import React from 'react';
import './index.css';

function Card({ user, onDelete }) {
  const { userName, email, nat, chec, desc } = user;

  return (
    <div className='card'>
      <div className="card-title">
        <h3>{userName}</h3>
        <p>Email: {email}</p>
        <p>Description: {desc}</p>
        <p>Languages: {chec.join(', ')}</p>
        <p>Nationality: {nat}</p>
        <button onClick={onDelete}>Uchirish</button>
      </div>
    </div>
  );
}

export default Card;
