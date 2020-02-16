import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = props => {
  return (
    <div class="profile-about bg-light p-2">
      {props.profile.bio && (
        <Fragment>
          {" "}
          <h2 class="text-primary">
            {" "}
            <span>{props.profile.user.name}</span>'s Bio
          </h2>
          <p>{props.profile.bio}</p>
          <div class="line"></div>
        </Fragment>
      )}

      {
        <Fragment>
          <h2 class="text-primary">Skill Set</h2>
          <div class="skills">
            {props.profile.skills.map((skill, i) => {
              return (
                <div key={i} className="p-1">
                  <i className="fas fa-check"></i> {skill}
                </div>
              );
            })}
          </div>
        </Fragment>
      }
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
