const mongoose = require("mongoose");
const schema = mongoose.Schema;

const campgroundSchema = new schema({
  Title: String,
  Price: String,
  Description: String,
  Location: String,
});

module.exports = mongoose.model("Campground", campgroundSchema);
