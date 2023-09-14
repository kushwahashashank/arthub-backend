import mongoose from "mongoose";

const newsLetter = new mongoose.Schema({
  name: String,
  email: String,
});
const NewsLetter = mongoose.model("newsletter", newsLetter);
export default NewsLetter;
