import bcrypt from "bcryptjs";
import express from "express";
import User from "../schema/user.model.js";
import jwt from "jsonwebtoken";
import userMiddleware from "../middleware/user.middleware.js";
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!password) {
    return res.send({
      success: false,
      message: "Password is required!",
    });
  }
  if (password.length < 8) {
    return res.send({
      success: false,
      message: "Password must be at least 8 characters long!",
    });
  }
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res.send({
        success: false,
        message: "Email already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    user = await User.create({ name, email, password: hashPass });

    res.send({
      success: true,
      message: "Account created successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    let message = Object.values(error.errors)[0].message;
    res.send({
      success: false,
      message: message || "Internal server error",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.send({
      success: false,
      message: "Email is required!"
    });
  }

  if (!password) {
    return res.send({
      success: false,
      message: "Password is required!"
    });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.send({
        success: false,
        message: "Email not registered!"
      });
    }
    let isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.send({
        success: false,
        message: "Invalid email or password!"
      });
    }
    console.log(user._id);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
    res.send({
      success: true,
      message: "Your account Login successfully!",
      user
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Internal server error"
    });
  }
});

router.post("/logout", userMiddleware, async (req, res) => {
  res.clearCookie("token");
  res.send({
    success: true,
    message: "Logged out successfully!"
  });
});

router.get("/profile", userMiddleware, (req, res) => {
  res.send({
    success: true,
    message: "User profile fetched successfully",
    user: req.user
  });
});


router.put("/profile", userMiddleware, (req, res) => { });

router.delete("/profile", userMiddleware, (req, res) => { });

export default router;
