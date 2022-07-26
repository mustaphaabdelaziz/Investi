// ================ this is a Base Schema for all other users Type =================
const mongoose = require("mongoose");
const opts = {
  toJSON: {
    virtuals: true,
  },
};
//  This strategy integrates Mongoose with the passport-local strategy.
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
const MediaSchema = require("./media");
const accountSchema = {
  accountNumber: String,
  sold: Number,
};
const User = new Schema(
  {
    firstname: String,
    lastname: String,
    job: String,
    birthday: String,
    phone: String,
    accounts: {
      bank_Account: accountSchema,
      ccp_Account: accountSchema,
      card_Account: accountSchema,
    },
    gender: String,
    country: {
      type: String,
      default: "Algeria",
    },
    city: String,
    pictureID: [MediaSchema],
    userType: [String], // a user could be an admin or normal user
    transactions: {
      _id: Schema.Types.ObjectId,
      amount: Number,
      state: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  },
  opts
);
// creating a virtual field named fullname and it's made of firstname and lastname
// this virtual property is not stored in the mongo DB
User.virtual("fullname").get(function () {
  return this.firstname + " " + this.lastname;
});
User.virtual("address").get(function () {
  return this.country + ", " + this.city;
});
User.index({
  lastname: "text",
  firstname: "text",
});
// this gonna add a password field to the user schema.

User.plugin(passportLocalMongoose, {
  usernameField: "email",
});
module.exports = mongoose.model("User", User);
