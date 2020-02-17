import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSearchField, submitSearch } from '../../actions/navbar';
import { logout } from '../../actions/auth';
import whiteLogo from '../../assets/logo-white.png'
import { toggleShopCart } from '../../actions/shopCart';


const Navbar = ({ 
  auth: { 
    isAuthenticated, 
    loading 
  }, 
  logout, 
  setSearchField, 
  submitSearch, 
  toggleShopCart,
  history 
}) => {
  const handleToggleClick = () => {
    toggleShopCart();
  }

  const authLinks = (
    <Fragment>
    <Link to='/dashboard'>
      <img id='logo' src={whiteLogo} alt='Company logo'></img>
    </Link>
    <form onSubmit={(event) => onSubmit(event)}>
      <div id='search-container'>
        <i id='search-icon' className='fas fa-search' onClick={(event) =>   onSubmit(event)}>
        </i>
        <input 
          id='search'
          type='text'
          onChange={event => searchFieldChange(event)}>
        </input>
      </div>
    </form>
    <div className="top-right-nav">
      <Link to='/' onClick={logout}><i className="fas fa-sign-out-alt" id="top-right-icon"><div className="icon-text-top">Logg ut</div></i></Link>
      <i className="fas fa-shopping-cart" id="top-right-icon"><div className="icon-text-top" onClick={() => handleToggleClick()}>Handlekurv</div></i>
  </div>
  </Fragment>
);

const guestLinks = (
  <Fragment>
    <Link to='/'>
      <img id='logo' src={whiteLogo} alt='Company logo'></img>
    </Link>
    <form onSubmit={(event) => onSubmit(event)}>
      <div id='search-container'>
        <i id='search-icon' className='fas fa-search' onClick={(event) => onSubmit(event)}>
        </i>
        <input 
          id='search'
          type='text'
          onChange={event => searchFieldChange(event)}>
        </input>
      </div>
    </form>
    <div className="top-right-nav">
      <Link to='/login'><i className="fas fa-sign-in-alt" id="top-right-icon"><div className="icon-text-top">Logg inn</div></i></Link>
    <i className="fas fa-shopping-cart" id="top-right-icon"><div className="icon-text-top" onClick={() => handleToggleClick()}>Handlekurv</div></i>
    </div>
  </Fragment>
);

const searchFieldChange = function(event) {
  setSearchField(event.target.value);
};

const onSubmit = (event) => {
  event.preventDefault();
  submitSearch();
  history.push('/products');
};

  return (
    <nav className='navbar'>
      { !loading && (
        <Fragment>{ isAuthenticated ? authLinks 
        : guestLinks }
      </Fragment>)}
    </nav>
  )
}

Navbar.propTypes = {
  submitSearch: PropTypes.func.isRequired,
  setSearchField: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  toggleShopCart: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
  setSearchField: state.searchField,
  auth: state.auth,
  shopCart: state.shopCart
});

const mapDispatchToProps = {
  logout, 
  setSearchField, 
  submitSearch,
  toggleShopCart
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(withRouter(Navbar));


