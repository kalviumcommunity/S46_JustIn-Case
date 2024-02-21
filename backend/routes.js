const cors = require("cors");
const express = require("express");
const app = express();
const { User, Post } = require("./schemas"); // Importing model from schemas.js

app.use(cors());
app.use(express.json());

// GET endpoint to fetch all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET endpoint to fetch all posts
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST endpoint to create a new user

app.post("/api/users", async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST endpoint to create a new post

app.post("/api/posts", async (req, res) => {
  const post = new Post(req.body);
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE endpoint to delete a user by userid

app.delete("/api/users/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    const deletedUser = await User.findOneAndDelete({ userid });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE endpoint to delete a post by postid

app.delete("/api/posts/:postid", async (req, res) => {
  const { postid } = req.params;
  try {
    const deletedPost = await Post.findOneAndDelete({ postid });
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT endpoint to update a user by userid

app.put("/api/users/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    const updatedUser = await User.findOneAndUpdate({ userid }, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT endpoint to update a post by postid

app.put("/api/posts/:postid", async (req, res) => {
  const { postid } = req.params;
  try {
    const updatedPost = await Post.findOneAndUpdate({ postid }, req.body, {
      new: true,
    });
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = app;
