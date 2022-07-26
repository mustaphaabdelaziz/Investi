const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* 
    this document describe all the investemts of a user and 
    thier state(active, inactive...) and their time left
*/
const Withdraw = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Pack",
  },
  amount: Number,
  state: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Investment", Withdraw);
