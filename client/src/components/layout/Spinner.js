import React, { Fragment } from "react";
import PropTypes from "prop-types";
import SpinKit from "./../../img/spinner.gif";

const Spinner = props => {
  return (
    <Fragment>
      <img
        src={SpinKit}
        alt="Loading-Spinner"
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </Fragment>
  );
};

Spinner.propTypes = {};

export default Spinner;
