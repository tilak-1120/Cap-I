const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const fs = require("fs");
const jwt = require("jsonwebtoken");

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

    const normalexp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com$/;
    const extexp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+(\.co\.in|\.ac\.in)$/;

    const testing = normalexp.test(email);
    const testing1 = extexp.test(email);
    // console.log(testing);
    // console.log(testing1);

    if (!testing && !testing1) {
      return res.status(400).json("Invalid email");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      const user = await newUser.save();
      res.status(200).json("User Registered");
    }
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

    const comparePassword = await bcrypt.compare(
      req.body.password,
      findUser.password
    );

    if (!comparePassword) {
      return res.status(403).json("Password doesn't match");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newpassword, salt);

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

    if (passwordCheck) {
      const token = await jwt.sign(
        { name: findUser.name },
        process.env.SECRET_KEY
      );

      res.cookie("SignInAuth", token, {
        expires: new Date(Date.now() + 1800000),
        httpOnly: true,
      });

      res.status(200).json("Signed In Successfully");
    } else {
      res.status(404).json("Invalid Credentials");
    }
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
    // console.log(req.file);
    // console.log(req.body.caption);

    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extention = parts[parts.length - 1];
    const newpath = path + "." + extention;
    fs.renameSync(path, newpath);

    // console.log(parts);
    // console.log(extention);
    // console.log(newpath);
    // console.log(path);

    const data = { path: newpath, caption: req.body.caption.slice(8, -6) };
    console.log(req.body.caption.slice(8, -6));

    const uploadImage = await User.updateOne(
      { username: req.body.username },
      // {
      //   captionedImages: [
      //     { $push: { path: newpath } },
      //     { $push: { caption: req.body.caption } },
      //   ],
      // }
      { $push: { captionedImages: data } }
    );

    // Define the URL of your Flask app
    // const flaskAppURL = "http://localhost:5000/upload"; // Replace with the actual URL if necessary

    // Send the image to your Flask app
    // const formData = new FormData();
    // formData.append("image", fs.createReadStream(newpath));
    // const response = await axios.post(flaskAppURL, formData, {
    //   headers: {
    //     ...formData.getHeaders(), // Include proper headers for file upload
    //   },
    // });

    // Handle the response from your Flask app
    // const caption = response.data.caption;

    // Update the user's document with the generated caption
    // const uploadImage = await User.updateOne(
    //   { username: req.body.username },
    //   { $push: { captionedImages: data, captions: caption } }
    // );

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

exports.getAllUsers = async (req, res) => {
  try {
    const getUsers = await User.find();
    res.status(200).json(getUsers.length);
  } catch (err) {
    res.status(500).json("Database is empty");
  }
};
