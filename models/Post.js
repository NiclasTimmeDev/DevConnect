const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // tells Mongoose which model to use during population (when using populate())
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    String: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  likes: [
    {
      users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // tells Mongoose which model to use during population (when using populate())
      }
    }
  ],
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // tells Mongoose which model to use during population (when using populate())
      }
    }
  ],
  comments: [
    {
      users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // tells Mongoose which model to use during population (when using populate())
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        String: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
