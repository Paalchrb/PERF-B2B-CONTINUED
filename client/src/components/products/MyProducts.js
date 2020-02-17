import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProductsByCompanyId } from '../../actions/myProducts';
import Toolbar from '../layout/Toolbar';



const MyProducts = ({ auth:{ token }, products, getProductsByCompanyId, searchField}) => {
  useEffect(() => {
    getProductsByCompanyId(token);
  }, [getProductsByCompanyId, token]);

  const productsByCompanyId = products.products.map(product => (
  
    <div key={product._id} className='product-card grow'>
      <div className="product-image-container">
        <img className="product-card-image" src={product.productImage} alt='Product illustration' />
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
        <button className="product-order-button"><i className="fas fa-edit" id="icon-order-button"></i>Rediger</button>
    </div>
  ))

  return (
    
    <Fragment>
      <Toolbar/>
      <div className='content-area'>
        <div className='product-card-container'>
          {productsByCompanyId}
        </div>
      </div>
    </Fragment>
  )
};

MyProducts.propTypes = {
  getProductsByCompanyId: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  searchField: state.navbar.searchField,
  products: state.myProducts,
});

const mapDispatchToProps = {
  getProductsByCompanyId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProducts);