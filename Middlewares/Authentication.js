import User from "../Models/Signup.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const KEY = process.env.SECRET_KEY;

//Check if user is login or not
export const isAuthenticated = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    // console.log(token);
    const decoded = jwt.verify(token, KEY);
    const user_decoded = await User.findById(decoded._id);
    if (user_decoded) {
      res.status(200);
      res.send(user_decoded);
    } else {
      res.sendStatus(202);
    }
  } else {
    res.sendStatus(202);
  }
};

// Register a new user
export const Register = async (req, res) => {
  const { name, email, password, cart } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    const hashedpassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedpassword,
      cart,
    });
    const token = jwt.sign({ _id: user._id }, KEY);
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
    });
    res.status(201);
    res.send(user);
  } else {
    res.sendStatus(202);
  }
};

//Logout User
export const Logout = async (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.sendStatus(200);
};

// Login user
export const Login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res.sendStatus(202);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const token = jwt.sign({ _id: user._id }, KEY);
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
    });
    res.status(200);
    res.send(user);
  } else {
    res.sendStatus(203);
  }
};
