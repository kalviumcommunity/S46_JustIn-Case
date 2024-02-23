const mongoose = require("mongoose");

// Schema for the users collection

const userSchema = new mongoose.Schema({
  userid: { type: Number, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  posts: { type: [Number], default: [], required: true },
});

// Schema for the posts collection
const postSchema = new mongoose.Schema({
  post_id: { type: Number, required: true },
  user_id: { type: Number, required: true },
  content: { type: String, required: true },
  likes_count: { type: Number, required: true, default: 0 },
  dislikes_count: { type: Number, required: true, default: 0 },
});

const User = mongoose.model("users", userSchema);
const Post = mongoose.model("posts", postSchema);

module.exports = { User, Post };


