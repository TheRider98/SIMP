const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");

const User = require("../models/User.js");
// const {
//   validateRegisterInput,
//   validateLoginInput,
// } = require("../util/validators");
const jwtCheck = require("../util/check-auth");

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// HANDLED BY AUTH0

// // register
// router.post("/register", async (req, res) => {
//   let { username, email, password, confirmPassword } = req.body;
//   const { valid, errors } = validateRegisterInput(
//     username,
//     email,
//     password,
//     confirmPassword
//   );
//   if (!valid) {
//     return res.status(400).json({ errors });
//   }
//   let finddup = await User.findOne({ username });
//   if (finddup) {
//     return res.status(400).json({
//       errors: {
//         username: "Username is taken",
//       },
//     });
//   }
//   finddup = await User.findOne({ email });
//   if (finddup) {
//     return res.status(400).json({
//       errors: {
//         email: "Email is already registered",
//       },
//     });
//   }
//   password = await bcrypt.hash(password, 12);
//   const user = new User({
//     username: username,
//     password: password,
//     email: email,
//   });
//   try {
//     const newUser = await user.save();
//     const token = generateToken(newUser);
//     res.status(201).json({
//       ...newUser._doc,
//       token,
//     });
//   } catch (err) {
//     res.status(400).json({ msg: err.message });
//   }
// });

// // login
// router.get("/login", async (req, res) => {
//   const { username, password } = req.body;
//   const { valid, errors } = validateLoginInput(username, password);
//   if (!valid) {
//     return res.status(400).json({ errors });
//   }
//   const user = await User.findOne({ username });
//   if (!user) {
//     return res.status(400).json({
//       errors: {
//         general: "User does not exist",
//       },
//     });
//   }
//   // match password: string, hash string
//   const match = await bcrypt.compare(password, user.password);
//   if (!match) {
//     return res.status(400).json({
//       errors: {
//         general: "Wrong Password",
//       },
//     });
//   }
//   const token = generateToken(user);

//   res.user = {
//     ...user._doc,
//     token,
//   };

//   res.json(res.user);
// });

// update user profile
router.patch("/:id", jwtCheck, getUser, async (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.name;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
    req.user.isVerified = false;
  }
  if (req.body.avatar != null) {
    req.user.avatar = req.body.avatar;
  }
  try {
    const updated = await res.user.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// get user profile
// exclude password only
router.get("/:id", jwtCheck, getUser, async (req, res) => {
  try {
    res.json(res.user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// get user profile middleware
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id).select("-password");
    if (user == null) {
      return res.status(404).json({ msg: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
  res.user = user;
  next();
}

// delete user
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// function generateToken(user) {
//   return jwt.sign(
//     {
//       id: user._id,
//       username: user.username,
//       email: user.email,
//     },
//     SECRET_KEY,
//     { expiresIn: "1h" }
//   );
// }
module.exports = router;
