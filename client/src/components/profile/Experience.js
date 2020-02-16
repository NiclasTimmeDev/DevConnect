import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Experience = props => {
  return (
    <div>
      <h2 className="text-primary">Experience</h2>
      <h3 class="text-dark">{props.experience.company}</h3>
      <p>
        <Moment format="YYY/MM/DD">{props.experience.from}</Moment> -{" "}
        {props.experience.to ? (
          <Moment format="YYY/MM/DD">{props.experience.to}</Moment>
        ) : (
          " Now"
        )}
      </p>
      {props.experience.title && (
        <p>
          <strong>Position: </strong> {props.experience.title}
        </p>
      )}
      {props.experience.description && (
        <p>
          <strong>Description: </strong>
          {props.experience.description}
        </p>
      )}
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default Experience;
