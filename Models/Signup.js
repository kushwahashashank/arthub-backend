import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cart: [],
});

const User = mongoose.model("User", signupSchema);

export default User;
