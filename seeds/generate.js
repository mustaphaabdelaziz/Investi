if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");

const User = require("../models/users");
const Country = require("../models/country");
const algeria = require("./algeriaState");
const Invest = require("../models/investments");
const DBConnection = require("../database/connection");

const seedDB = async () => {
  await User.deleteMany({});
  await Country.deleteMany({});
  await Invest.deleteMany({});
  const country = new Country({
    country: algeria.country,
    code: algeria.code,
    flag: algeria.flag,
  });
  country.states = algeria.states;
  await country.save();
};
seedDB().then(() => {
  mongoose.connection.close();
});
