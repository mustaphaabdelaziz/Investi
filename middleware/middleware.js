const Invest = require("../models/investments");
const Pack = require("../models/packs");
module.exports.errorPage = (err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (statusCode === 404 && !err.message) err.message = "Page Not Found";
  else if (statusCode === 403 && !err.message) err.message = "Forbiden";
  else if (statusCode === 500 && !err.message)
    err.message = "Internal Server Error";
  else if (!err.message) err.message = "Somthing Went Wrong";
  res.status(statusCode).render("errorHandling/error", {
    err,
    statusCode,
  });
};
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/users/login");
  }
  next();
};
module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const invest = await Invest.findById(id);
  if (!invest.user._id.equals(req.user._id)) {
    // console.log("is the same user");
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/investments/${id}`);
  }
  next();
};
