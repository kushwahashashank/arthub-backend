import express from "express";
import database from "./Config/connecton.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import {
  Login,
  Logout,
  Register,
  isAuthenticated,
} from "./Middlewares/Authentication.js";
import { UdateCart } from "./Middlewares/Cart.js";
import { Contact, NewsSignin } from "./Middlewares/Contact.js";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/isauthenticated", isAuthenticated);
app.get("/logout", Logout);
app.post("/register", Register);
app.post("/login", Login);
app.post("/sendmessage", Contact);
app.post("/newssignin", NewsSignin);

app.put("/updatecart", UdateCart);

app.listen(port, () => {
  console.log("Server is Runnung at port no", port);
});
