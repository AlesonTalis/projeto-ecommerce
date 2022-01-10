import React from 'react'

function Saldo() {
  return (
    <div className="saldo">
      <div className="saldo-large">
        <div className="saldo-block">
          <div className="saldo-category">
              <span>roupas</span>
          </div>
          <div className="saldo-detail">
              <span>calça masculina</span>
          </div>
          <div className="saldo-price">
              <span>R$</span>
              <span>99,90</span>
          </div>
          <div className="saldo-button">
              <a href="#" className="btn btn-rounded btn-primary">Comprar agora</a>
          </div>
        </div>
        <div className="saldo-block">
            <div className="saldo-image">
                
            </div>
        </div>
      </div>
      <div className="saldo-small">
        <div className="saldo-block">
          <div className="saldo-category">
              <span>roupas</span>
          </div>
          <div className="saldo-detail">
              <span>calça masculina</span>
          </div>
          <div className="saldo-price">
              <span>R$</span>
              <span>99,90</span>
          </div>
          <div className="saldo-button">
              <a href="#" className="btn btn-rounded btn-secondary">Comprar agora</a>
          </div>
      </div>
      <div className="saldo-block">
        <div className="saldo-image">
            
        </div>
      </div>
    </div>
  </div>
  )
}

export default Saldo
