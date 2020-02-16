import React, { Fragment } from "react";
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

export default Spinner;
