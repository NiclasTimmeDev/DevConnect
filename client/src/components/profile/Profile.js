import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "./../../store/actions/profile";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import Experience from "./Experience";
import Education from "./Education";
import Github from "./Github";

const Profile = props => {
  useEffect(() => {
    props.getProfileById(props.match.params.id);
  }, []);
  return (
    <Fragment>
      {!props.profile || props.profile.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {props.auth.isAuthenticated &&
          !props.auth.loading &&
          props.auth.user._id.toString() === props.match.params.id ? (
            <Link to="/edit-profile" className="btn btn-dark">
              Edit Profile
            </Link>
          ) : null}
          <div className="profile-grid my-1">
            <ProfileTop profile={props.profile.profile} />
            <ProfileAbout profile={props.profile.profile} />

            {props.profile.profile.experience.length > 0 && (
              <div className="profile-exp bg-white p-2">
                {props.profile.profile.experience.map(exp => {
                  return <Experience key={exp._id} experience={exp} />;
                })}
              </div>
            )}

            {props.profile.profile.education.length > 0 && (
              <div className="profile-exp bg-white p-2">
                {props.profile.profile.education.map(edu => {
                  return <Education key={edu._id} education={edu} />;
                })}
              </div>
            )}

            {props.profile.profile.githubusername && (
              <Github username={props.profile.profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth
  };
};

export default connect(mapStateToProps, { getProfileById })(Profile);
