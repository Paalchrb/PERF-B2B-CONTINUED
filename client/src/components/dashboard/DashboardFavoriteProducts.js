import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItemToCart } from '../../actions/shopCart';
import ProductCard from '../products/ProductCard';

const DashboardFavoriteProducts = ({
  products, 
  auth: {
    isAuthenticated
  },
  addItemToCart
}) => {

  
  // let handleSingleViewChange = id => {
  //   getProductById(id);
  // }
  // onClick={() => handleSingleViewChange(product._id)}
  // let routePath = '/products/'

  const handleClick = id => {
    if (isAuthenticated) {
      addItemToCart(id);
    }
  };


  const productsMarkup = products.map((product, index) => (
    <ProductCard key={index} product={product} handleAddToCart={() => handleClick(product._id)} />
  ));

  return (
    <Fragment>
      {products.length > 0 ? (<div className="dashboard-products-container">
        <h3>Favorittprodukter</h3>
      <div className='product-card-container-dashboard'>
        {productsMarkup}
      </div>
      </div>) : (
        <div className="dashboard-products-container">
          <h4>Du har ikke valgt noen favoritter</h4>
        </div>
      )}
    </Fragment>
  );
}


DashboardFavoriteProducts.propTypes = {
  auth: PropTypes.object.isRequired,
  addItemToCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  addItemToCart
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardFavoriteProducts);
