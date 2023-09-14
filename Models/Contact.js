import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  status: Boolean,
});

const Message = mongoose.model("Message", contactSchema);

export default Message;
