const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.get("/search", async (req,res)=>{
  let { q } = req.query;

  const allListings = await Listing.find({
    title : { $regex : q, $options : "i"}
  });

  if (allListings.length === 0) {
    req.flash("error", `No results found for "${q}"`);
    return res.redirect("/listings");
  }

  res.render("listings/index.ejs", { allListings, activeCategory: null });
});

router.get("/category/:category", wrapAsync(async (req,res)=>{
  const {category} = req.params;
  const allListings = await Listing.find({ category });

  res.render("listings/index.ejs", {
     allListings,
     activeCategory: category
   });  
}));

router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
  isLoggedIn,
  upload.single("image"),   
  validateListing,          
  wrapAsync(listingController.createListing));

router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
  isLoggedIn, 
  isOwner, 
  upload.single("image"), 
  validateListing, 
  wrapAsync(listingController.updateListing)
)
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);

module.exports = router;