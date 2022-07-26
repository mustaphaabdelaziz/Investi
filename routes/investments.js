const express = require("express");
const multer = require("multer");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { paymentPicture } = require("../cloudinary/index");
const upload = multer({ storage: paymentPicture });
const { isLoggedIn, isAuthor } = require("../middleware/middleware");
const {
  investsList,
  showUsersInvests,
  createInvest,
  showCreationForm,
  showUpdateForm,
  showInvest,
  updateInvest,
  deleteInvest,
} = require("../controllers/investments");
router
  .route("/")
  .get(isLoggedIn, catchAsync(investsList))
  .post(isLoggedIn, upload.single("picture"), catchAsync(createInvest));
router.route("/users").get(isLoggedIn, catchAsync(showUsersInvests));
router.route("/new").get(isLoggedIn, catchAsync(showCreationForm));
router
  .route("/:id")
  .get(isLoggedIn, isAuthor, catchAsync(showInvest))
  .put(isLoggedIn, isAuthor, catchAsync(updateInvest))
  .delete(isLoggedIn, isAuthor, catchAsync(deleteInvest));
router.route("/:id/edit").get(catchAsync(showUpdateForm));
module.exports = router;
