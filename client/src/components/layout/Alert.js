import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = props => {
  const theAlert =
    props.alerts !== null && props.alerts.length > 0
      ? props.alerts.map(alert => {
          return (
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
              {alert.msg}
            </div>
          );
        })
      : null;

  return <Fragment>{theAlert}</Fragment>;
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
