const joi = require("joi");

const joiUserSignUp = joi.object({
  username: joi.string().min(3).max(25).required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(
      new RegExp("^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:'\"<>,./?]{6,30}$")
    )
    .required(),
});

const joiNewPost = joi.object({
  userid: joi.number().required(),
  content: joi.string().required(),
});

module.exports = { joiUserSignUp, joiNewPost };
