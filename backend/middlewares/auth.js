const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

exports.Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.SignInAuth;
    const tokenCheck = jwt.verify(token, process.env.SECRET_KEY);

    const findUser = await User.findOne({ name: tokenCheck.name });

    if (findUser) {
      next();
    }
  } catch (err) {
    res.status(401).json("Token not matched or found");
  }
};
