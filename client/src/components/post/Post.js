import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "./../layout/Spinner";
import { getPost } from "./../../store/actions/post";
import PostItem from "./../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { Link } from "react-router-dom";

const Post = props => {
  useEffect(() => {
    props.getPost(props.match.params.id);
  }, []);

  // const comments = props.post.post.comments.map(comment => {
  //   return (
  //     <CommentItem
  //       key={comment._id}
  //       comment={comment}
  //       postId={props.match.params.id}
  //     />
  //   );
  // });

  return props.post.loading || props.post.post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back to Posts
      </Link>
      <PostItem showActions={false} post={props.post.post} />
      <CommentForm postId={props.match.params.id} />
      <div className="comments">
        {props.post.post.comments.map(comment => {
          return (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={props.match.params.id}
            />
          );
        })}
      </div>

      {/* <div className="comments">{comments}</div> */}
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    post: state.post
  };
};

export default connect(mapStateToProps, { getPost })(Post);
