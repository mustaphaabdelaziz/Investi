const User = require("../models/users");
// const Event = require("../../models/event/event");
const Country = require("../models/country");
const moment = require("moment");
const i18next = require("../config/i18next");
// ===========================================================================
module.exports.showUserForm = async (req, res) => {
  const user = await User.findById(req.params.id);
  // console.log(user)
  res.render("users/editProfile", { user });
};
module.exports.showProfile = async (req, res) => {
  console.log(req.params.id);
  const user = await User.findById(req.params.id);
  console.log(req.params.id);
  const events = await Event.find({ "author.id": req.params.id }).sort({
    "period.start": -1,
  });
  console.log(req.params.id);
  // const speakEvents = await Event.find({ speakers: { $in: [req.params.id] } })
  //   .sort({ "period.start": -1 })
  const speakEvents = await Event.find({}).sort({ "period.start": -1 });
  // res.send(speakEvents)
  res.render("users/profile", { user, events, speakEvents, moment });
};
// ===============================================
module.exports.showLoginForm = async (req, res) => {
  const algeria = await Country.find({});
  const states = algeria[0].states;
  res.render("users/login", { states });
};
module.exports.register = async (req, res) => {
  const { user } = req.body;
  //  ES1

  try {
    const { password } = req.body.user;
    const username = (user.firstname + "_" + user.lastname).toLowerCase();
    const createdUser = new User({
      ...user,
    });
    createdUser.username = username;

    createdUser.pictures = [
      {
        url: req.file.path,
        filename: req.file.filename,
      },
    ];
    var str = createdUser.firstname;
    // make the name start with a capitalized letter
    createdUser.firstname = str.charAt(0).toUpperCase() + str.slice(1);
    str = createdUser.lastname;
    createdUser.lastname = str.charAt(0).toUpperCase() + str.slice(1);
    str = createdUser.job;
    createdUser.job = str.charAt(0).toUpperCase() + str.slice(1);
    createdUser.email = createdUser.email.toLowerCase();
    createdUser.userType = "user";
    createdUser.socialMedia = {
      portfolio: "#",
      facebook: "https://www.facebook.com/",
      linkedin: "https://www.facebook.com/",
      twitter: "https://www.twitter.com/",
      instagram: "https://www.instagram.com/",
      youtube: "https://www.youtube.com/",
    };
    const registeredUser = await User.register(createdUser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Investi");
      res.redirect("/");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};

// =============== Login ==============================
module.exports.login = (req, res) => {
  const preferedLng = req.user.preferedLng;
  i18next.changeLanguage(preferedLng).then((t) => {
    t("hello_message");
  });
  req.flash("success", `${i18next.t("welcome_back")} ${req.user.fullname}`);

  // console.log(res.locals);
  const redirectUrl = req.session.returnTo || "/";
  delete req.session.returnTo;

  // console.log("is Authenticated: ", req.isAuthenticated());
  // console.log(res.locals.currentUser);
  // console.log(res.locals.user);
  // console.log(req.user);
  res.redirect(redirectUrl);
};
// ======================= Logout ==============
module.exports.logout = (req, res) => {
  // logout requere a callback function and a get request to work 
  req.logout(() => {
    req.flash("success", `${i18next.t("goodbye")}`);
    res.redirect("login");
  });
};
module.exports.updateUser = async (req, res) => {
  const { user, socialMedia } = req.body;
  //  const currentUser = req.user._id;
  const newUser = new User({ ...user });
  newUser.socialMedia = { ...socialMedia };

  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      socialMedia: socialMedia,
      ...user,
    },
    { new: true }
  );
  res.redirect(`/user/${updatedUser._id}/profile`);
  // res.send(updatedUser);
};
module.exports.deleteUser = async (req, res) => {
  const { userid } = req.params;
  await User.findByIdAndDelete(userid);
  req.logout();
  req.flash("success", "Goodbey");
  res.redirect("/events");
};
module.exports.follow = async (req, res) => {
  // get the currentUser
  const { userId } = req.body;
  // get the following userid
  const { follwedUserId } = req.body;
  let fUser, cUser, nbrFollowers;
  if (req.body.follow) {
    // add the followed user to the following list of the currentUser
    cUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { followings: follwedUserId } },
      { new: true }
    );
    // add the currentUser to the followers list of the followed user
    fUser = await User.findByIdAndUpdate(
      follwedUserId,
      { $addToSet: { followers: userId } },
      { new: true }
    );
    nbrFollowers = fUser.followers.length;
  } else {
    // if he unfollows him
    // remove him from the following list
    cUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { followings: { $in: [follwedUserId] } } },
      { new: true }
    );

    fUser = await User.findByIdAndUpdate(
      follwedUserId,
      { $pull: { followers: { $in: [userId] } } },
      { new: true }
    );
    nbrFollowers = fUser.followers.length;
  }
  res.send({
    status: true,
    message: "followed",
    nbrFollowers,
  });
};
