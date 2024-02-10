const mongoose = require('mongoose');

// Schema for the User collection

const userSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  posts: {type: [String], default: [], required: true}
});


const User = mongoose.model('users', userSchema);

module.exports = {User};