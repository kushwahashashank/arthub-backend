import Message from "../Models/Contact.js";
import NewsLetter from "../Models/Newsletter.js";
// Contact a new user
export const Contact = async (req, res) => {
  const { name, email, message, status } = req.body;
  let message_res = await Message.create({
    name,
    email,
    message,
    status,
  });
  if (message_res) {
    res.sendStatus(201);
  } else {
    res.sendStatus(202);
  }
};

// NewsLetter
export const NewsSignin = async (req, res) => {
  const { name, email } = req.body;
  let user_res = await NewsLetter.create({
    name,
    email,
  });
  if (user_res) {
    res.sendStatus(201);
  } else {
    res.sendStatus(202);
  }
};
