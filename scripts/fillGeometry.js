   
require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('../models/listing');
const fetch = require('node-fetch');

mongoose.connect("mongodb://127.0.0.1:27017/wanderLust", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const fillGeometry = async () => {
  const listings = await Listing.find({});
  for (let listing of listings) {
    if (!listing.geometry || !listing.geometry.coordinates || listing.geometry.coordinates.length !== 2) {
      try {
        const response = await fetch(`https://api.maptiler.com/geocoding/${encodeURIComponent(listing.location)}.json?key=${process.env.MAPTILER_KEY}`);
        const geoData = await response.json();
        if (geoData.features.length > 0) {
          listing.geometry = {
            type: "Point",
            coordinates: geoData.features[0].geometry.coordinates
          };
          await listing.save();
          console.log(`Updated geometry for: ${listing.title}`);
        } else {
          console.log(`No coordinates found for: ${listing.title}`);
        }
      } catch (err) {
        console.log(`Error updating ${listing.title}: `, err);
      }
    } else {
      console.log(`Already has geometry: ${listing.title}`);
    }
  }
  mongoose.connection.close();
};

fillGeometry();
