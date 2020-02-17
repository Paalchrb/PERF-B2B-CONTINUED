import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItemToCart } from '../../actions/shopCart';
import { setAlert } from '../../actions/alert';
import ProductCard from '../products/ProductCard';

const DashboardRecentProducts = ({
  products,
  auth: { isAuthenticated 
  },
  addItemToCart
}) => {
  
  const handleClick = id => {
    if (isAuthenticated) {
      addItemToCart(id);
    }
  };

  const recentProductsMarkup = products.map((product, index) => (
    <ProductCard key={index} product={product} handleAddToCart={() => handleClick(product._id)} />
  ));

  return (
    <Fragment>
      {products.length > 0 ? (
        <div className="dashboard-products-container">
          <h3>Sist kjøpte</h3>
            <div className='product-card-container-dashboard'> 
              {recentProductsMarkup}
            </div>
        </div>
        ) : (
        <div className="dashboard-products-container">
          <h4>Det har ikke blitt gjort noen bestillinger</h4>
        </div>
        )
      }
    </Fragment>
  );
}


DashboardRecentProducts.propTypes = {
  auth: PropTypes.object.isRequired,
  addItemToCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  addItemToCart,
  setAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardRecentProducts);
