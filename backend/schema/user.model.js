import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: [true, "Your email already exists!"],
      lowercase: true,
      match:[/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/, "Invalid Email!"]
    },
    password: {
      type: String,
      required: [true, "Password is required!"]
    },
    avatar: {
      type: String, // store image URL or path
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    age: {
      type: Number,
      default: null,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", ""],
      default: "",
    },
    address: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    zipCode: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
