import React, { Fragment } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const DashboardRecentOrders = ({
  orders, 
}) => {

  let routePath = '/orders/';

  
  const recentOrdersMarkup = orders.map(order => (order && (
  
      <div className="recent-order-table-row" key={order._id}>
        <Link to={routePath+order._id}>
     
        <div>{orders.indexOf(order) + 1}</div>
      </Link>
      <Link to={routePath+order._id}>
        <div>{format(new Date(order.orderDate), 'MM/dd/yyyy')}</div>
        </Link>
        <Link to={routePath+order._id}>
          <div>{order.buyerContact.firstName} {order.buyerContact.lastName}
          </div>
        </Link>
        <Link to={routePath+order._id}>
          <div>{order.buyerContact.userEmail}</div>
        </Link>
        <Link to={routePath+order._id}>
          <div>{order.buyerContact.userPhone}</div>
        </Link>
  
      </div>
    
  )));

  return (
    <Fragment>
    {orders.length > 0 ? (
      <div className="recent-orders-card">
      <h3>Siste ordre</h3>
      <div className="recent-order-table-row-headers">
        <div>Nr.
        </div>
        <div>Dato</div>
        <div>Kontaktperson</div>
        <div>Email</div>
        <div>Telefon</div>
      </div>
        {recentOrdersMarkup}
    </div>
    ) : (
      <div className='recent-orders-card'>
        <h4>Det har ikke blitt gjort noen bestillinger</h4>
      </div>
    )}
   
      
      
    </Fragment>
  );
}
export default DashboardRecentOrders;
