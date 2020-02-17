import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleToolbar } from '../../actions/toolbar';


const Toolbar = ({toggleToolbar, toolbar: { toolbar } }) => {
  const handleClick = event => {
    event.preventDefault();
    toggleToolbar();
  };  

  return (
    <Fragment>
      {toolbar ? (
        <nav className="toolbar">
        <div id="toolbar-menu-close">
          <i onClick={event => handleClick(event)} className="fas fa-angle-left grow" id="icon"></i>
        </div>
        <div id="toolbar-top">
        <Link to='/dashboard'><i className="fas fa-desktop grow" id="icon"><div className="icon-text">Dashbord</div></i></Link>
        <Link to='/products'><i className="fas fa-search grow" id="icon"><div className="icon-text">Finn produkt</div></i></Link>
        <Link to='/myproducts'><i className="fas fa-th grow" id="icon"><div className="icon-text">Mine produkter</div></i></Link>
        <i className="fas fa-list grow" id="icon"><div className="icon-text">Mine ordre</div></i>
        
        </div>
      </nav>
      ) : (
        <nav className="toolbar-small">
        <div id="toolbar-menu-open">
          <i onClick={event => handleClick(event)} className="fas fa-bars grow" id="icon"></i>
        </div>
        <div id="toolbar-top">
        <Link to='/dashboard'><i className="fas fa-desktop grow" id="icon"><div className="icon-text"></div></i></Link>
        <Link to='/products'><i className="fas fa-search grow" id="icon"><div className="icon-text"></div></i></Link>
        <Link to='/myproducts'><i className="fas fa-th grow" id="icon"></i></Link>
        <i className="fas fa-list grow" id="icon"></i>
        
        </div>
      </nav>
      )}

      </Fragment>
  );
};

Toolbar.propTypes = {
  toggleToolbar: PropTypes.func.isRequired,
  toolbar: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  toolbar: state.toolbar,
  
});

export default connect(
  mapStateToProps,
  { toggleToolbar }  
  )(Toolbar);

