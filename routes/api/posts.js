const express = require("express");
const Profile = require("./../../models/Profile");
const Post = require("./../../models/Post");
const User = require("./../../models/User");
const { check, validationResult } = require("express-validator");
const auth = require("./../../middleware/auth");
const request = require("request");
const config = require("config");

const router = new express.Router();

//@route    POST /api/posts
//@desc     create a post
//@access   private
/*
___
FUNCTIONALITY
1. Do auth ach check middleware
2. find user by if from req.user, which is provided by auth middleware. Also, do not send the password
3. create new instance of post model object with the respective values from the req
4. save post and send it to the client
*/
router.post(
  "/",
  [
    //1:
    auth,
    check("text", "Text is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      //2:
      const user = await User.findById(req.user._id).select("-password");
      //3:
      const newPost = new Post({
        text: req.body.text,
        user: user._id,
        name: user.name,
        avatar: user.avatar
      });
      //4:
      const post = await newPost.save();
      res.status(201).send(post);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("server error");
    }
  }
);

//@route    GET /api/posts
//@desc     fetch all posts
//@access   private
/*
___
FUNCTIONALITY
1. get all posts and sort them so that the latest will be on top (this is done by date: -1)
2. send all posts to client
*/
router.get("/", auth, async (req, res) => {
  try {
    //1:
    const posts = await Post.find().sort({ date: -1 });
    //2:
    res.status(200).send(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("server error");
  }
});
//@route    GET /api/posts/:post_id
//@desc     fetch single posts
//@access   private
/*
___
FUNCTIONALITY
1. get the post by the id that is provided
2. return error if post does not exist
3. send post to client
*/
router.get("/:post_id", auth, async (req, res) => {
  try {
    //1:
    const post = await Post.findById(req.params.post_id);
    //2:
    if (!post) {
      return res.status(404).send("post not found");
    }
    //3:
    res.status(200).send(post);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res.status(400).send("Profile not found");
    }
    res.status(500).send("server error");
  }
});

//@route    DELETE /api/posts/:post_id
//@desc     delete single posts
//@access   private
/*
___
FUNCTIONALITY
1. get the post by the id that is provided
2. return error if post does not exist
3. send post to client
4. If creatpr of the post (post.user) and the person trying to delete it (rew.user._id) do not match, deletion should be denied
5. Delete post
*/
router.delete("/:post_id", auth, async (req, res) => {
  try {
    //1:
    const post = await Post.findById(req.params.post_id);

    //2:
    if (!post) {
      return res.status(404).send("post not found");
    }

    //4;
    if (post.user.toString() !== req.user._id) {
      return res.status(401).send("not authorized");
    }

    //5:
    await Post.deleteOne({ _id: req.params.post_id });
    res.status(200).send("post deleted");
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res.status(400).send("Post not found");
    }
    res.status(500).send("server error");
  }
});

//@route    PUT /api/posts/like/:post_id
//@desc     like a post
//@access   private
/*
___
FUNCTIONALITY
1. get the post by the id that is provided
2. return error if post does not exist
3.  Check if the post is already liked. some() will return true, if one entry in the array fullfils the condition. 
3. (ctd.) Here, it is checked if the id of the user from the token (i.e., re.user._id) is already in the likes
3. (ctd.) If so, the user has already liked the post and should be able to do so again
4. Put new like on top of the likes array
*/
router.put("/like/:post_id", auth, async (req, res) => {
  try {
    //1:
    const post = await Post.findById(req.params.post_id);

    //2:
    if (!post) {
      return res.status(404).send("post not found");
    }

    //3:
    const postAlreadyLiked = post.likes.some(
      like => like.user.toString() === req.user._id
    );
    if (postAlreadyLiked) {
      return res.status(400).send("post already liked");
    }

    //4:
    post.likes.unshift({ user: req.user._id });

    await post.save();
    res.status(200).send(post.likes);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res.status(400).send("Post not found");
    }
    res.status(500).send("server error");
  }
});
//@route    PUT /api/posts/like/:post_id
//@desc     unlike a post
//@access   private
/*
___
FUNCTIONALITY
1. get the post by the id that is provided
2. return error if post does not exist
3.  Check if the post is liked. some() will return true, if one entry in the array fullfils the condition. 
3. (ctd.) Here, it is checked if the id of the user from the token (i.e., re.user._id) is already in the likes
3. (ctd.) If not, the user has not liked the post and should not be able to unlike it
4. Filter through all likes and return new array where the one tha should be unliked is deleted. Then set the likes array to the updated array
*/
router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    //1:
    const post = await Post.findById(req.params.post_id);

    //2:
    if (!post) {
      return res.status(404).send("post not found");
    }

    //3:
    const postNotLiked = !post.likes.some(
      like => like.user.toString() === req.user._id
    );
    if (postNotLiked) {
      return res.status(400).send("Post has not been liked");
    }

    //4;
    const newLikesArray = post.likes.filter(
      like => like.user.toString() !== req.user._id
    );
    post.likes = newLikesArray;

    await post.save();
    res.status(200).send(post.likes);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res.status(400).send("Post not found");
    }
    res.status(500).send("server error");
  }
});

//@route    POST /api/posts/comment/:id
//@desc     comment on a post
//@access   private
/*
___
FUNCTIONALITY
1. Do auth and check middleware
2. find user by if from req.user, which is provided by auth middleware. Also, do not send the password.
3 Find post from parameters in url
4. create new comment Object & put it on top of the likes array
5. save post and send it to the client
*/
router.post(
  "/comment/:post_id",
  [
    //1:
    auth,
    check("text", "Text is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      //2:
      const user = await User.findById(req.user._id).select("-password");

      //3:
      const post = await Post.findById(req.params.post_id);
      if (!post) {
        res.status(400).send("post not found");
      }

      //4:
      const newComment = {
        text: req.body.text,
        user: user._id,
        name: user.name,
        avatar: user.avatar
      };
      post.comments.unshift(newComment);

      //5:
      await post.save();
      res.status(201).send(post.comments);
    } catch (e) {
      console.error(e.message);
      if (e.kind === "ObjectId") {
        return res.status(400).send("Post not found");
      }
      res.status(500).send("server error");
    }
  }
);

//@route    DELETE /api/posts/comment/:post_id/:comment_id
//@desc     delete a comment
//@access   private
/*
___
FUNCTIONALITY
1. Find post from parameters in url
2. If creatpr of the post (post.user) and the person trying to delete the comment (req.user._id) do not match, deletion should be denied
3. Filter through existing comments array and return a new array where the one with the comment_id from the url is not included. Then, set the comments array equal to the new array
4. save new post and send comments to client

*/

router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    //1:
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(400).send("post not found");
    }

    //2:
    if (post.user.toString() !== req.user._id) {
      return res.status(401).send("not authorized");
    }

    //3:
    const newCommentsArray = post.comments.filter(comment => {
      return comment._id.toString() !== req.params.comment_id;
    });
    post.comments = newCommentsArray;

    //4:
    await post.save();
    res.status(200).send(post.comments);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res.status(400).send("Post not found");
    }
    res.status(500).send("server error");
  }
});

module.exports = router;
