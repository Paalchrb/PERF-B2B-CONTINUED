import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => {
  if(alert.alertType === 'danger') {
    return (
      <div key={alert.id} className='alert red'>
        <i className='fas fa-exclamation-triangle' id='alert-danger-icon'></i> {alert.msg}
      </div>
    )
  } else {
    return (
      <div key={alert.id} className='alert green'>
        <i className='fas fa-check-circle' id='alert-success-icon'></i> {alert.msg}
      </div>
    )
  }
});

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
