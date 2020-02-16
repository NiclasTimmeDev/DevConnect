import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts } from "./../../store/actions/post";
import Spinner from "./../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = props => {
  useEffect(() => {
    props.getPosts();
  }, []);

  const posts = props.posts.map((post, i) => {
    return <PostItem key={post._id} post={post} />;
  });

  return !props.loading ? (
    <Fragment>
      <h1 className="large primary">
        <p className="lead">
          <i className="fas fa-user"></i> Welcome to the community
        </p>
      </h1>
      <PostForm />
      {posts}
    </Fragment>
  ) : (
    <Spinner />
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    posts: state.post.posts,
    loading: state.post.loading
  };
};

export default connect(mapStateToProps, { getPosts })(Posts);
