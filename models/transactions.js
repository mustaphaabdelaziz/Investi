const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Transaction = new Schema({
  packname: {
    type: Schema.Types.ObjectId,
    ref: "Pack",
  },
  profit: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Transaction", Transaction);
