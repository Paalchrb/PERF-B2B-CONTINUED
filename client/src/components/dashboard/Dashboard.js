import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import DashboardCompanyInfo from './DashboardCompanyInfo';
import DashboardFavoriteProducts from './DashboardFavoriteProducts';
import DashboardRecentProducts from './DashboardRecentProducts';
import DashboardRecentOrders from './DashboardRecentOrders';
import Toolbar from '../layout/Toolbar';

import { 
  getCurrentCompany,
  getRecentProducts,
  getRecentOrders,
  getFavoriteProducts,
} from '../../actions/dashboard';


const Dashboard = ({
  auth: {
    user,
    isAuthenticated
  },
  dashboard,
  getCurrentCompany,
  getRecentProducts,
  getFavoriteProducts,
  getRecentOrders
}) => {
  useEffect(() => {
    (async function() {
      await getCurrentCompany();
      await getRecentProducts();
      await getFavoriteProducts();
      await getRecentOrders();
    })();
  }, [getCurrentCompany, getRecentProducts, getFavoriteProducts, getRecentOrders]);
  
  if(!isAuthenticated) {
    return (
      <div className='content-area'>
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      {dashboard === null || dashboard.loading ? (
        <div className='content-area'>
          <Spinner />
        </div>
      ) : (
        <Fragment>
          <Toolbar/>
          <div className='content-area'>
            <DashboardCompanyInfo company={dashboard.company} user={user} />   
            {/* <div className="action-buttons">
              <div><i className="fas fa-search"></i><h4>Finn produkt</h4></div>
              <div><i className="fas fa-plus"></i><h4>Legg til produkt</h4></div>
              <div><i className="fas fa-box"></i><h4>Endre produkt</h4></div>
              <div><i className="fas fa-th"></i><h4>Se mine produkter</h4></div>
              </div>  */}

            <DashboardFavoriteProducts products={dashboard.favoriteProducts}/>
            <DashboardRecentProducts products={dashboard.recentProducts}/>
            <DashboardRecentOrders orders={dashboard.recentOrders}/>
          </div>
        </Fragment>
        )}
        <Link to='/orders'>Orderview</Link>
    </div>
  );
};
    

Dashboard.propTypes = {
  getCurrentCompany: PropTypes.func.isRequired,
  getRecentProducts: PropTypes.func.isRequired,
  getRecentOrders: PropTypes.func.isRequired,
  getFavoriteProducts: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  dashboard: state.dashboard,
  auth: state.auth
});
 
const mapDispatchToProps = {
  getCurrentCompany,
  getRecentProducts,
  getFavoriteProducts,
  getRecentOrders 
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
