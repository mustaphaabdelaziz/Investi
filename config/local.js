const i18next = require("./i18next");
const User = require("../models/users");
const moment = require("moment");
module.exports.locals = (req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.user = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.bgColor = "bg-dark";
  res.locals.textColor = "text-dark";
  res.locals.currentLng = () => {
    // return req.cookies.lang;
    return i18next.language.toUpperCase();
  };
  res.locals.t = (key) => {
    return i18next.t(key);
  };
  res.locals.getNbrOfDays = (nbrDays) => {
    // console.log("nbrDays: ", nbrDays);
    return nbrDays > 1 ? nbrDays + " days" : nbrDays + " day";
  };
  res.locals.calculatePercentage = (date, period) => {
    // console.log(date);
    // console.log(period);
    // console.log(
    //   Math.round(Math.abs(((moment(invest.startDate).add(invest.packname.period,'days')).diff(moment(),"days"))*100 / period))
    // );
    return Math.round(
      Math.abs((moment(date).diff(moment(), "days") * 100) / period)
    );
  };
  res.locals.updateUserLng = async (lng, userType) => {
    res.cookie("lang", lng);
    if (userType === "user")
      req.user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: { preferedLng: lng } },
        { new: true }
      );
  };
  next();
};
