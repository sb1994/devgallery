const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const asyncHandler = require("express-async-handler");
const router = express.Router();

//protective middlewate
const { protect } = require("../../middleware/auth");
//generate jwt function
const createToken = require("../../utils/createToken");

router.get("/test", protect, async (req, res) => {
  res.json({ msg: "Hello" });
});

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    let { email, password } = req.body;
    //find the user by email
    const user = await User.findOne({ email });

    //if the user exist we then check the password

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        //payload for the token
        const payload = {
          _id: user.id,
        };

        const token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: 3600 * 1000 * 1000 * 20,
        });
        //login
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token,
        });
      } else {
        res.status(401);
        throw new Error("Invalid password");
      }
    } else {
      res.status(401);
      throw new Error("Invalid email");
    }
  })
);
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    let { email, password, name } = req.body;
    //find the user by email
    const userExists = await User.findOne({ email });

    //if the user exist we then check the password

    if (userExists) {
      res.status(401);
      throw new Error("User email already exists");
    } else {
      //check if the password was sent in the request
      if (!password) {
        res.status(401);
        throw new Error("Password not defined");
      } else {
        //create the new user
        const newUser = new User({
          email,
          password,
          name,
          profile_pic:
            "https://toppng.com/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png",
        });
        //create the hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newUser.password, salt);
        console.log(hashedPassword);
        newUser.password = hashedPassword;
        const savedUser = await newUser.save();
        res
          .json({
            _id: savedUser._id,
            name: savedUser.name,
            profile: savedUser.profile_pic,
            email: savedUser.email,
            isAdmin: savedUser.isAdmin,
            profile_pic: savedUser.profile_pic,
            token: createToken(savedUser._id),
          })
          .status(200);
        // user.password = hashedPassword;
      }
    }
  })
);

module.exports = router;
