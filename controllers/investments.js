const moment = require("moment");
const Invest = require("../models/investments");
const Pack = require("../models/packs");

module.exports.investsList = async (req, res) => {
  const invests = await Invest.find({});
  res.send(invests);
};
module.exports.createInvest = async (req, res) => {
  const { picture, packname } = req.body;
  const user = req.user.id;
  const invest = new Invest({ user, packname });
  (invest.payment_picture = {
    url: req.file.path,
    filename: req.file.filename,
  }),
    await invest.save();
  res.redirect("/investments/users");
};
module.exports.showCreationForm = async (req, res) => {
  const packs = await Pack.find({});
  res.render("investments/new", { packs });
};
module.exports.showUpdateForm = async (req, res) => {
  const { id } = req.params;
  const invest = await Invest.findById(id).populate(["packname"]);;
  const packs = await Pack.find({});
  if (!invest) {
    req.flash("error", "Cannot find that investment!");
    return res.redirect("/investments");
  }
  res.render("investments/edit", {
    invest,packs
  });
};
module.exports.showInvest = async (req, res) => {
  res.send("Show Invest");
};
module.exports.showUsersInvests = async (req, res) => {
  // const users = await Invest.find({}).populate({ path: "user" });
  const invests = await Invest.find({}).populate(["user", "packname"]);
  // res.send(invests);

  res.render("investments/usersInvest", { invests, moment });
};
module.exports.updateInvest = async (req, res) => {
  res.send("Update Invest");
};
module.exports.deleteInvest = async (req, res) => {
  const { id } = req.params;
  await Invest.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted investment!");
  res.redirect("/investments/users");
};
