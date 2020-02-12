import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "./../../store/actions/auth";

const Navbar = props => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <span className="hide-sm">Dashboard</span>{" "}
          <i className="fas fa-user"></i>
        </Link>
        <Link to="" onClick={props.logout}>
          <span className="hide-sm">Logout</span>{" "}
          <i className="fas fa-sign-out-alt"></i>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <Link to="">
        <h1>
          <i className="fas fa-code"></i> DevConnector
        </h1>
      </Link>

      {!props.auth.loading && (
        <Fragment>
          {props.auth.isAuthenticated ? authLinks : guestLinks}
        </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
