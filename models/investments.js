const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MediaSchema = require("./media");
/* 
سجل الاستثمار
    this model describe all the investemts of a user and 
    thier state(active, inactive...) and their time left
  
*/
const Investment = new Schema({
  user: {
    //the investor
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  packname: {
    //the pack used
    type: Schema.Types.ObjectId,
    ref: "Pack",
  },
  state: {
    //value = active, inactive or pending
    type: String,
    default: "Pending",
  },
  payment_picture: MediaSchema,
  paymentMethod: String, //card ,cash, credit...
  startDate: {
    //we get the timeleft
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Investment", Investment);
