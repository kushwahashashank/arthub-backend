import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const DB = process.env.DATABASE;
const database = mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((err) => {
    console.log("Firse yaar");
    console.log(err);
  });
export default database;
