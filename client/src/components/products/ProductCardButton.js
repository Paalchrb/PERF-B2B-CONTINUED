// import React, { Fragment } from 'react'
// import PropTypes from 'prop-types';
// import { Link, withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { addItemToCart } from '../../actions/shopCart';


// const ProductCardButton = ({ auth: { isAuthenticated, loading }, product }) => {

//   const handleClick = id => {
//     addItemToCart(token, id);
//   }

// const authButton = (
//     <div className="top-right-nav">
//       <Link to='/' ><i className="fas fa-sign-out-alt" id="top-right-icon"><div className="icon-text-top">Logg ut</div></i></Link>
//       <Link to='/shopcart'><i className="fas fa-shopping-cart" id="top-right-icon"><div className="icon-text-top">Handlekurv</div></i></Link>
//   </div>
// );

// const guestButton = (
//   <button 
//     className="product-order-button" 
//     onClick={productId._id}>
//       <i className="fas fa-shopping-cart" id="icon-order-button">
//       </i>Bestill
//   </button>

//   <div className="top-right-nav">
//     <Link to='/login'><i className="fas fa-sign-in-alt" id="top-right-icon"><div className="icon-text-top">Logg inn</div></i></Link>
    
//   </div>
// );

//   return (
//     <div>
//       { !loading && (
//         <Fragment>{ isAuthenticated ? authButton : guestButton }</Fragment>)}
//     </div>
//   )
// }


// ProductCardButton.propTypes = {
//   auth: PropTypes.object.isRequired

// }

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(
//   mapStateToProps,
//   { logout, setSearchField, submitSearch }
//   )(withRouter(ProductCardButton));


