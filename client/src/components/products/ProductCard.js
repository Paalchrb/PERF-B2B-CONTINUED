import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({
  product,
  handleAddToCart
}) => {

  const [showAlert, toggleAlert] = useState(false);

  const triggerAlert = () => {
    toggleAlert(true);
    setTimeout(function () {
      toggleAlert(false);
    }, 2000);
  }


  const handleClick = () => {
    handleAddToCart();
    triggerAlert();
  };

  return (
      <div key={product._id} className='product-card grow'>
        <div className="product-image-container">
        <Link to={`/products/${product._id}`}>
          <img className="product-card-image" src={product.productImage} alt='Product illustration'/>
        </Link>
        </div>

        <div className="product-card-info">
          <div className="product-card-text">
            <h4>{product.productName}</h4>
            <h6>{product.productSubhead}</h6>
          </div>
          
          <div className="product-card-price-container">
            <div className="product-card-price">
              {product.productPrice},-

            </div>
          
          <div className="product-card-vat">(eks mva på {product.productVat * 100}%)</div>
          </div>
          
        </div>
        
          <button onClick={() => handleClick()} className="product-order-button"><i className="fas fa-shopping-cart" id="icon-order-button"></i>Bestill</button>
          {showAlert && <div className='alert green'><i className='fas fa-check-circle' id='alert-success-icon'></i> Lagt i handlekurv</div>}
      </div>
  )
  
}

export default ProductCard;
