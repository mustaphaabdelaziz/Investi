const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
// const { isLoggedIn, isAuthor } = require("../middleware/middleware");
const {
  packList,
  showCreationForm,
  createPack,
  showPack,
  showUpdateForm,
  updatePack,
  deletePack,
} = require("../controllers/packs");
router.route("/").get(catchAsync(packList)).post(catchAsync(createPack));
router.route("/new").get(catchAsync(showCreationForm));
router
  .route("/:id")
  .get(catchAsync(showPack))
  .put(catchAsync(updatePack))
  .delete(catchAsync(deletePack));
router.route("/:id/edit").get(catchAsync(showUpdateForm));
module.exports = router;
