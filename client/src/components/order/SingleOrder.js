import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrderById } from '../../actions/order';
import { format } from 'date-fns';
import Toolbar from '../layout/Toolbar';
import Spinner from '../layout/Spinner';

const SingleOrder = ({ auth: { isAuthenticated }, order: { selectedOrder, loading }, getOrderById, match  }) => {
  const orderId = match.params.orderId;

  useEffect(() => {
    (async function() {
      await getOrderById(orderId);
    })();
  }, [getOrderById, isAuthenticated, orderId]);

  let orderDateFormatted = '';
  let orderLineMarkup = [];

  if (selectedOrder && !loading) {
    const { orderDate } = selectedOrder;
    orderDateFormatted = format(new Date(orderDate), 'dd/MM/yyyy');

    orderLineMarkup = selectedOrder.orderLines.map(orderLine => {
      return (
        <div key={orderLine._id} className="order-line-container">
          <div>{orderLine.productName}</div>
          <div>{orderLine.quantity}</div>
          <div>{orderLine.productPrice}</div>
          <div>{orderLine.productVat * 100}%</div>
          <div>{orderLine.orderLineTotal}</div>
        </div>
      )
    });
  };

  
  return (selectedOrder && !loading ? (
    <Fragment>
      <Toolbar />
      <div className='content-area'>
        <div className="single-order-container">

        <div className="order-date"><i className="fas fa-calendar-alt" id="order-icons"></i>{orderDateFormatted}</div>
        <h3 id="order-heading">Produkter</h3>
        <div className="order-line-tags">
          <div>Vare</div>
          <div>Antall</div>
          <div>Pris (eks MVA)</div>
          <div>MVA</div>
          <div>Ordrelinje sum</div>
        </div>
        <div>{orderLineMarkup}</div>

        <div className="single-order-total">
          {/* {
            selectedOrder.orderLineTotal.reduce((acc, orderLines) => {
              return acc + 
            }, 0)
          },-

          } */}

         {/*  <div className="cart-subtotal-tag">Subtotal</div>
          <div className="cart-subtotal-sum">{selectedOrder.orderLines.reduce((acc, line) => {
            return acc + line.productPrice * +line.quantity;
          }),0},-</div> */}
        </div>

        <div className="order-contact">
        <div className="order-seller">
          <h3 id="order-heading">Selger</h3>
          <div><i className="fas fa-industry" id="order-icons"></i>{selectedOrder.seller.companyName}</div>
          <div><i className="fas fa-sitemap" id="order-icons"></i>{selectedOrder.seller.orgNum}</div>
          <div><i className="fas fa-map-marker-alt" id="order-icons"></i>{selectedOrder.seller.address.street}, {selectedOrder.seller.address.zipcode} {selectedOrder.seller.address.city}, {selectedOrder.seller.address.country}</div>
        </div>

        <div className="order-buyer">
        <h3 id="order-heading">Kjøper</h3>
          <div>
            <h4 id="order-heading">Kontaktinfo</h4>
            <div><i className="fas fa-user" id="order-icons"></i>{selectedOrder.buyerContact.firstName} {selectedOrder.buyerContact.lastName}</div>
            <div><i className="fas fa-envelope" id="order-icons"></i>{selectedOrder.buyerContact.userEmail}</div>
            <div><i className="fas fa-phone" id="order-icons"></i>{selectedOrder.buyerContact.userPhone}</div>
          </div>

          <div>
            <h4 id="order-heading">Selskapsinfo</h4>
            <div><i className="fas fa-industry" id="order-icons"></i>{selectedOrder.buyer.companyName}</div>
            <div><i className="fas fa-sitemap" id="order-icons"></i>{selectedOrder.buyer.orgNum}</div>
            <div><i className="fas fa-map-marker-alt" id="order-icons"></i>{selectedOrder.buyer.address.street}, {selectedOrder.buyer.address.zipcode} {selectedOrder.buyer.address.city}, {selectedOrder.buyer.address.country}</div>

          </div>
          
          

        </div>


        </div>

        </div>
        
      </div>
    </Fragment>
    ) : (
      <div className='content-area'>
        <Spinner />
      </div>
    )
  );
}

SingleOrder.propTypes = {
  auth: PropTypes.object.isRequired,
  
};

const mapStateToProps = state => ({
  auth: state.auth,
  order: state.order
});

const mapDispatchToProps = {
  getOrderById
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);
