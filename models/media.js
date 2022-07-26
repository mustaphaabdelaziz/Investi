const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MediaSchema = new Schema({
  url: String,
  filename: String,
});
module.exports = MediaSchema;