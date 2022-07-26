const Pack = require("../models/packs");
module.exports.showCreationForm = (req, res) => {
  res.render("packs/new");
};
module.exports.createPack = async (req, res) => {
  const { pack } = req.body;
  const newPacks = new Pack({ ...pack });
  // console.log(newPacks)
  await newPacks.save();
  res.redirect("/packs");
};
module.exports.packList = async (req, res) => {
  const packs = await Pack.find({});
  res.render("packs/index", { packs });
};
module.exports.showPack = async (req, res) => {
  const { id } = req.params;
  res.send("Show Pack");
};
module.exports.showUpdateForm = async (req, res) => {
  res.send("Update Pack Form");
};
module.exports.updatePack = async (req, res) => {
  res.send("Update Pack");
};
module.exports.deletePack = async (req, res) => {
  res.send("Delete Pack");
};
