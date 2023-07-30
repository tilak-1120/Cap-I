const router = require("express").Router();
const {
  registerUser,
  updateUserPassword,
  deleteUser,
  userSignIn,
  userCheck,
  uploadImage,
  getUserDetails,
} = require("../controllers/userController");

const upload = require("multer")({ dest: "uploads/" });
var type = upload.single("photo");

// New User
router.post("/register", registerUser);

// Update User Password
router.put("/updatepassword/:username", updateUserPassword);

// Delete User
router.delete("/deleteuser/:username", deleteUser);

// User Sign-in
router.post("/signin", userSignIn);

// Find User
router.get("/usercheck/:username", userCheck);

// Upload Image
router.post("/upload", type, uploadImage);

// Get User
router.get("/getuser/:username", getUserDetails);

module.exports = router;
