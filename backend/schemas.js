const mongoose = require("mongoose");

// Schema for the users collection

const userSchema = new mongoose.Schema({
  userid: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, minlength: 6, required: true },
  posts: { type: [Number], default: [], required: true },
});

// Schema for the posts collection
const postSchema = new mongoose.Schema({
  postid: { type: Number, unique: true, required: true },
  userid: { type: Number, required: true },
  content: { type: String, required: true },
  likes_count: { type: Number, required: true, default: 0 },
  dislikes_count: { type: Number, required: true, default: 0 },
});

const User = mongoose.model("users", userSchema);
const Post = mongoose.model("posts", postSchema);

module.exports = { User, Post };
