import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addEducation } from "./../../store/actions/profile";

const AddEducation = props => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Fragment>
      <h1 class="large text-primary">Add An Experience</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any school that you have attended
      </p>
      <small>* = required field</small>
      <form
        class="form"
        onSubmit={e => {
          e.preventDefault();
          props.addEducation(formData, props.history);
        }}
      >
        <div class="form-group">
          <input
            type="text"
            onChange={e => {
              onChange(e);
            }}
            placeholder="* Degree"
            name="degree"
            value={formData.degree}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            onChange={e => {
              onChange(e);
            }}
            placeholder="* School name"
            name="school"
            value={formData.school}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            onChange={e => {
              onChange(e);
            }}
            placeholder="Field of Study"
            name="fieldofstudy"
            value={formData.fieldofstudy}
          />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={formData.date}
            onChange={e => {
              onChange(e);
            }}
          />
        </div>
        <div class="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={formData.current}
              checked={formData.current}
              onChange={() => {
                setFormData({
                  ...formData,
                  current: !toDateDisabled
                });
                toggleDisabled(!toDateDisabled);
              }}
            />
            Current Program
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            disabled={formData.current ? "disabled" : ""}
            onChange={e => {
              onChange(e);
            }}
            value={formData.to}
          />
        </div>
        <div class="form-group">
          <textarea
            value={formData.description}
            name="description"
            onChange={e => {
              onChange(e);
            }}
            cols="30"
            rows="5"
            placeholder="Program Description"
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(withRouter(AddEducation));
