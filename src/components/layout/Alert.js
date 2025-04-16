// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

// const Alert = ({ alerts }) => (
//   <div className='alert-wrapper'>
//     {alerts.map((alert) => (
//       <div key={alert.id} className={`alert alert-${alert.alertType}`}>
//         {alert.msg}
//       </div>
//     ))}
//   </div>
// );

// Alert.propTypes = {
//   alerts: PropTypes.array.isRequired,
// };

// const mapStateToProps = (state) => ({
//   alerts: state.alert,
// });
// export default connect(mapStateToProps)(Alert);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = ({ alerts }) => {
  useEffect(() => {
    alerts.forEach((alert) => {
      switch (alert.alertType) {
        case 'danger':
          toast.warning(alert.msg, { toastId: alert.id });
          break;
        case 'success':
          toast.success(alert.msg, { toastId: alert.id });
          break;
        case 'error':
          toast.error(alert.msg, { toastId: alert.id });
          break;

        default:
          toast.info(alert.msg, { toastId: alert.id });
          break;
      }
    });
  }, [alerts]);

  return <ToastContainer position='top-right' autoClose={5000} />;
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
