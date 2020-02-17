import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProductById } from '../../actions/product';

import Toolbar from '../layout/Toolbar';

const SinglePageProductView = ({ auth: { token, isAuthenticated }, product: { selectedProduct, loading, error }, getProductById, match  }) => {
  const productId = match.params.productId;

  useEffect(() => {
    (async function() {
      await getProductById(productId);
    })();
  }, [getProductById, isAuthenticated, productId]);

  if (error) {
    return <div>Oops, noe gikk galt</div>
  }

  if (loading) {
    return <div>Laster product</div>
  }

  if (!selectedProduct) {
    return <div>Fant ikke produkt</div>
  }

  const productMarkup = (
    <div key={selectedProduct._id}>
      {/* {isAuthenticated && <button>Edit</button>} */}
        <h2>Navn: {selectedProduct.productName}</h2>
        <div className="product-image-container">
          <img className="product-card-image" src={selectedProduct.productImage} alt='Product illustration'></img>
        </div>
        <div className="product-card-info">
          <div>
          <h4>Produktinformasjon: {selectedProduct.productDescription}</h4>
          </div>
          <div>Produkt-id: {selectedProduct._id.replace(/[^0-9.]+/g, "")}</div>
          <div>Pris: {selectedProduct.productPrice}</div>
          <div>Mva: {selectedProduct.productVat}</div>
          <div>Netto pris: {selectedProduct.productPrice * (1+ selectedProduct.productVat)}</div>
          </div>
        </div>
        
  )

  return (
    <div>
      {isAuthenticated && <Toolbar />}
      <div className='content-area'> 
      <h3>Produkt</h3>
      <div>{productMarkup}</div>
      </div>
    </div>
   )
}

SinglePageProductView.propTypes = {
  auth: PropTypes.object.isRequired,
  
};

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.product
});

const mapDispatchToProps = {
  getProductById
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePageProductView);
