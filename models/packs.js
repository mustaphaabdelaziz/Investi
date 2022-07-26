const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* 
this models describe the pack collection, each pack has:
 name and,
  % profit,
  validity period

*/
const Pack = new Schema({
  title: String,
  profit: Number,
  description: String,
  period: Number,
  type: String,
  state:Boolean,
});

module.exports = mongoose.model("Pack", Pack);
