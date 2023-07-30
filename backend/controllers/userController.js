const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const fs = require("fs");

exports.registerUser = async (req, res) => {
  try {
    const userExists = await User.findOne({
      username: req.body.username,
    });

    if (userExists) {
      return res.status(422).json("User already exists");
    }

    let email = req.body.email;
    const exp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const myexp = /^[a-zA-Z]+[0-9]+@[a-z]+(?:\.[a-z]+)*$/;

    const testing = myexp.test(email);
    console.log(testing);

    if (!testing) {
      return res.status(400).json("Invalid email");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json("User Registered");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateUserPassword = async (req, res) => {
  try {
    const findUser = await User.findOne({ username: req.params.username });

    if (!findUser) {
      return res.status(404).json("User not found");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    updateUser = await User.updateOne(
      { username: req.params.username },
      { $set: { password: hashedPassword } }
    );
    res.status(200).json("Password Updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const findUser = await User.findOne({ username: req.params.username });

    if (!findUser) {
      return res.status(404).json("User not found");
    }

    const deleteUser = await User.deleteOne(
      { username: req.params.username },
      { new: true }
    );
    res.status(200).json(deleteUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.userSignIn = async (req, res) => {
  try {
    const findUser = await User.findOne({ username: req.body.username });

    if (!findUser) {
      return res.status(404).json("Invalid Credentials");
    }

    const passwordCheck = await bcrypt.compare(
      req.body.password,
      findUser.password
    );

    passwordCheck
      ? res.status(200).json("Signed In Successfully")
      : res.status(404).json("Invalid Credentials");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.userCheck = async (req, res) => {
  try {
    const findUser = await User.findOne({ username: req.params.username });

    if (findUser) {
      res.status(404).json("User already exists");
    } else {
      res.status(200).json("User doesn't exists");
    }
  } catch (err) {
    res.status(404).json("User not found");
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extention = parts[parts.length - 1];
    const newpath = path + "." + extention;
    fs.renameSync(path, newpath);

    // console.log(parts);
    // console.log(extention);
    // console.log(newpath);
    // console.log(path);

    const uploadImage = await User.updateOne(
      { username: req.body.username },
      {
        $push: { captionedImages: newpath },
      }
    );

    if (uploadImage) {
      res.status(200).json("Image Successfully Uploaded");
    }
  } catch (err) {
    res.status(500).json("Image upload failed");
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const getUser = await User.findOne({ username: req.params.username });

    if (getUser) {
      res.status(200).json(getUser);
    }
  } catch (err) {
    res.status(404).json("User not found");
  }
};
