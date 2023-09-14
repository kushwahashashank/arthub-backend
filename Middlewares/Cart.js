import User from "../Models/Signup.js";

export const UdateCart = async (req, res) => {
  const { email, cart } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    await User.updateOne(
      { email },
      {
        $set: {
          cart,
        },
      }
    );
    res.sendStatus(201);
  } else {
    res.sendStatus(202);
  }
};


