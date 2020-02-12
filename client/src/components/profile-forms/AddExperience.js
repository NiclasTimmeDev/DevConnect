import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addExperience } from "./../../store/actions/profile";

const AddExperience = props => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
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
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        class="form"
        onSubmit={e => {
          e.preventDefault();
          props.addExperience(formData, props.history);
        }}
      >
        <div class="form-group">
          <input
            type="text"
            onChange={e => {
              onChange(e);
            }}
            placeholder="* Job Title"
            name="title"
            value={formData.title}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            onChange={e => {
              onChange(e);
            }}
            placeholder="* Company"
            name="company"
            value={formData.company}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            onChange={e => {
              onChange(e);
            }}
            placeholder="Location"
            name="location"
            value={formData.location}
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
            Current Job
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
            placeholder="Job Description"
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(withRouter(AddExperience));
