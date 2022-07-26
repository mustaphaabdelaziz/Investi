const express = require("express");
const passport = require("passport");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const { profilePictures } = require("../cloudinary");

const upload = multer({ storage: profilePictures });
const { isLoggedIn } = require("../middleware/middleware");
const {
  login,
  register,
  showUserForm,
  showProfile,
  showLoginForm,
  logout,
  updateUser,
  deleteUser,
  follow,
} = require("../controllers/users");
router.route("/register").post(upload.single("picture"), catchAsync(register));
router
  .route("/login")
  .get(showLoginForm)
  .post(
    passport.authenticate("local-user", {
      failureFlash: true,
      failureRedirect: "/user/login",
    }),
    login
  );
// router.route.("/auth/facebook")
router.route("/logout").get(logout);
router
  .route("/:id")
  .get(catchAsync(showUserForm))
  .put(upload.single("picture"), catchAsync(updateUser))
  .delete(catchAsync(deleteUser));
router.route("/:id/profile").get(catchAsync(showProfile));
router.route("/:id/follow").post(catchAsync(follow));
module.exports = router;
