require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const { User, Post } = require("./schemas"); // Importing model from schemas.js
const { joiNewPost, joiUserSignUp } = require("./joiSchema");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

const CreateToken = (user) => {
  const token = jwt.sign(
    { userid: user.userid, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  // Checking if token is present or not
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token is missing." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store decoded user information in the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

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
app.get("/api/posts", authenticate, async (req, res) => {
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
    const validation = await joiUserSignUp.validateAsync(req.body);
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

    const token = CreateToken(savedUser);

    res.status(201).json({ user: savedUser, token: token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST endpoint to verify the user  (Login)

app.post("/api/users/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (user.password != password) {
      return res.status(401).json({ message: "invalid Password" });
    }
    const token = CreateToken(user);

    res.status(200).json({ message: "Login Successful", user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST endpoint to create a new post and validate with JOI

app.post("/api/posts", authenticate, async (req, res) => {
  try {
    const validateData = await joiNewPost.validateAsync(req.body);
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
