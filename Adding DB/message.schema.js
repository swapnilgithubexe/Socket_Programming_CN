// make the necessary imports here
// implement the below schema
import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  username: String,
  text: String,
  room: String,
  timestamp: Date
});

export const Message = mongoose.model("Message", messageSchema);





