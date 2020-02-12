import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "./../../store/actions/profile";
import { Link, withRouter } from "react-router-dom";

const CreateProfile = props => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });

  const onSubmit = event => {
    const edit = props.profile ? true : false;
    event.preventDefault();
    console.log(formData);
    props.createProfile(formData, props.history, edit);
  };

  const [displaySocials, setSocials] = useState(false);

  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const fields = [
    {
      placeholder: "Company",
      name: "company",
      text: "Could be your own company or one you work for"
    },
    {
      placeholder: "Website",
      name: "website",
      text: "Could be your own or a company website"
    },
    {
      placeholder: "Location",
      name: "location",
      text: "City & state suggested (eg. Hamburg, Germany)"
    },
    {
      placeholder: "+ Skills",
      name: "skills",
      text: "Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
    },
    {
      placeholder: "Github Username",
      name: "githubusername",
      text:
        "If you want your latest repos and a Github link, include your username"
    }
  ];

  const formGroup = fields.map((field, i) => {
    return (
      <div className="form-group" key={i}>
        <input
          type="text"
          placeholder={field.placeholder}
          name={field.name}
          value={formData[field.name]}
          onChange={event => {
            onChange(event);
          }}
        />
        <small className="form-text">{field.text}</small>
      </div>
    );
  });

  const socialFields = [
    {
      className: "fab fa-twitter fa-2x",
      placeholder: "Twitter URL",
      name: "twitter"
    },
    {
      className: "fab fa-facebook fa-2x",
      placeholder: "Facebook URL",
      name: "facebook"
    },
    {
      className: "fab fa-youtube fa-2x",
      placeholder: "YouTube URL",
      name: "youtube"
    },
    {
      className: "fab fa-instagram fa-2x",
      placeholder: "Instagram URL",
      name: "instagram"
    },
    {
      className: "fab fa-linkedin fa-2x",
      placeholder: "LinkedIn URL",
      name: "linkedin"
    }
  ];

  const socialFormGroup = socialFields.map((field, i) => {
    return (
      <div className="form-group social-input" key={i}>
        <i className={field.className}></i>
        <input
          type="text"
          placeholder={field.placeholder}
          name={field.name}
          value={formData[field.name]}
          onChange={event => {
            onChange(event);
          }}
        />
      </div>
    );
  });

  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={event => {
          onSubmit(event);
        }}
      >
        <div className="form-group">
          <select
            name="status"
            value={formData.status}
            onChange={event => {
              onChange(event);
            }}
          >
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        {formGroup}
        <div className="form-group">
          <textarea
            onChange={event => {
              onChange(event);
            }}
            value={formData.bio}
            placeholder="A short bio of yourself"
            name="bio"
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              setSocials(!displaySocials);
            }}
          >
            Add Social Network Links
          </button>
        </div>

        {displaySocials && <Fragment>{socialFormGroup}</Fragment>}

        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile.profile
  };
};

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
