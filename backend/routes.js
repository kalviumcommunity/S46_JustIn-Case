const cors = require("cors");
const express = require("express");
const app = express();
const { User, Post } = require("./schemas"); // Importing model from schemas.js
const { joiNewPost, joiUserSignUp } = require("./joiSchema");

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

// POST endpoint to create a new user and validate with JOI(Signup)

app.post("/api/users", async (req, res) => {
  try {
    const validation = await joiUserSignUp.validateAsync(req.body)
        // To make sure the new user has the greatest value for the userid property
    const maxUserId = await User.findOne(
      {},
      { userid: 1 },
      { sort: { userid: -1 } }
    );
    const nextUserId = maxUserId ? maxUserId.userid + 1 : 0;

    req.body.userid = nextUserId;

    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST endpoint to verify the user  (Login)

app.post("/api/users/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const doesExist = await User.findOne({ username: username });
    
    if (doesExist.password != password) {
      return res.status(401).json({ message: "invalid Password" });
    }
    res.status(200).json({ message: "Login Successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST endpoint to create a new post and validate with JOI

app.post("/api/posts", async (req, res) => {
  try {
    const validateData = await joiNewPost.validateAsync(req.body)
    // To make sure the new post has the greatest value for the postid property
    const maxPostId = await Post.findOne(
      {},
      { postid: 1 },
      { sort: { postid: -1 } }
    );
    const nextPostId = maxPostId ? maxPostId.postid + 1 : 0;

    req.body.postid = nextPostId;

    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
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
