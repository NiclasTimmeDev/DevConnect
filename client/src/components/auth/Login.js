import React, { Fragment, useState } from "react";
import validator from "validator";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { login } from "./../../store/actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Login = props => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const handleInputChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = async event => {
    event.preventDefault();
    const isEmail = validator.isEmail(email);
    if (isEmail) {
      props.login(email, password);
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Login</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Log in to your account
      </p>
      <form
        className="form"
        onSubmit={event => {
          onSubmit(event);
        }}
      >
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={event => {
              handleInputChange(event);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            minLength="6"
            onChange={event => {
              handleInputChange(event);
            }}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
