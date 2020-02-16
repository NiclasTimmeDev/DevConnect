import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "./../../store/actions/post";

const CommentForm = props => {
  const [text, setText] = useState("");

  const onSubmit = event => {
    event.preventDefault();
    if (text !== "") {
      props.addComment(props.postId, { text });
      setText("");
    }
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Comment Something...</h3>
      </div>
      <form
        onSubmit={e => {
          onSubmit(e);
        }}
        className="form my-1"
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Write a comment"
          required
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
