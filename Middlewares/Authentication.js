import User from "../Models/Signup.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const KEY = process.env.SECRET_KEY;

//Check if user is login or not
export const isAuthenticated = async (req, res) => {
  const token = JSON.parse(req.body.token);
  if (token) {
    const decoded = jwt.verify(token, KEY);
    const user_decoded = await User.findById(decoded._id);
    if (user_decoded) {
      res.status(200);
      res.send(user_decoded);
    } else {
      res.sendStatus(202);
    }
  } else {
    console.log("inv");
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
    res.status(201);
    var v = {
      user: user,
      token: token,
    };
    res.send(v);
  } else {
    res.sendStatus(202);
  }
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
    res.status(200);
    var v = {
      user: user,
      token: token,
    };
    res.send(v);
  } else {
    res.sendStatus(203);
  }
};
