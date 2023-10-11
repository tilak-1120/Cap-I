const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Validator error");
        }
      },
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    captionedImages: [
      {
        path: {
          type: String,
          default: "../uploads/default.jpg",
        },
        caption: {
          type: String,
          default: "Dummy Caption",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
