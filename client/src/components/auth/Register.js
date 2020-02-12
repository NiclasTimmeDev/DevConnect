import React, { Fragment, useState } from "react";
import validator from "validator";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import setAlert from "./../../store/actions/alert";
import { register } from "./../../store/actions/auth";
import PropTypes from "prop-types";
import * as registerActions from "./../../store/actions/auth";

const Register = props => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const handleInputChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = async event => {
    console.log(name);
    event.preventDefault();
    const isEmail = validator.isEmail(email);
    const isPasswordMatch = password === password2;
    const validPasswordCharacters =
      !password.includes("passwor") && !password.includes("123456");
    if (isEmail && isPasswordMatch && validPasswordCharacters) {
      props.register(name, email, password);
    } else {
      if (!isEmail) {
        props.setAlert("Please enter a valid E-Mail Adresse", "danger");
      }
      if (!isPasswordMatch) {
        props.setAlert("Please enter matching passwords", "danger");
      }
      if (!validPasswordCharacters) {
        props.setAlert(
          'Your password must not include "123456" or "password"',
          "danger"
        );
      }
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form
        className="form"
        onSubmit={event => {
          onSubmit(event);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={event => {
              handleInputChange(event);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={event => {
              handleInputChange(event);
            }}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={event => {
              handleInputChange(event);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={event => {
              handleInputChange(event);
            }}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
