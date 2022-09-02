import React from 'react';

function CreditCard() {
  return (
    <div className="card">
      <div className="card__front card__part">
        <span className="card__label">Platinum</span>
        <p className="card_numer">**** **** **** 6258</p>
        <div className="card__space-75">
          <span className="card__label">Card holder</span>
          <p className="card__info">Ariel Mota</p>
        </div>
        <div className="card__space-25">
          <span className="card__label">Expires</span>
          <p className="card__info">10/25</p>
        </div>
      </div>
      <div className="card__back card__part">
        <div className="card__black-line"></div>
        <div className="card__back-content">
          <div className="card__secret">
            <p className="card__secret--last">420</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreditCard;
