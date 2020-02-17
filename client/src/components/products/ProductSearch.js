import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllProducts } from '../../actions/productSearch';
import { addItemToCart } from '../../actions/shopCart';
import Toolbar from '../layout/Toolbar';
import ProductCard from '../products/ProductCard';
import Spinner from '../layout/Spinner';

const ProductSearch = ({ auth: { isAuthenticated, loading }, products, getAllProducts, searchField, addItemToCart }) => {
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const handleClick = id => {
    if (isAuthenticated) {
      addItemToCart(id);
    }
  };

  const allProducts = products
  .filter(product => {
    return (
      product.productName.toLowerCase().includes(searchField.toLowerCase()) ||
      product.productSubhead.toLowerCase().includes(searchField.toLowerCase()) ||
      product.productDescription.toLowerCase().includes(searchField.toLowerCase())
    )
  })
  .map((product, index) => (
    <ProductCard key={index} product={product} handleAddToCart={() => handleClick(product._id)} />
  ));

  return (
    <div>
      { !loading ? (
        <Fragment>
          { isAuthenticated ? (
            <Fragment>
            <Toolbar/>
            <div className='content-area'>
            <div className='product-card-container'>
              {allProducts}
            </div>
          </div>
          </Fragment>
          ) : (
            <div className='content-area'>
          <div className='product-card-container'>
            {allProducts}
          </div>
        </div>
          )}
        </Fragment>
      ) : (
        <div className='content-area'>
          <Spinner />
        </div>
      )}
    </div>
  )
};

ProductSearch.propTypes = {
  products: PropTypes.array.isRequired,
  searchField: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  getAllProducts: PropTypes.func.isRequired,
  addItemToCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.productSearch.products,
  searchField: state.navbar.searchField,
  auth: state.auth
});

const mapDispatchToProps = {
  getAllProducts,
  addItemToCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSearch);