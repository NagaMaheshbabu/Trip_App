const mongoose = require("mongoose");
const schema = mongoose.Schema;

const campgroundSchema = new schema({
  Title: String,
  Price: Number,
  image:String,
  Description: String,
  Location: String,
});

module.exports = mongoose.model("Campground", campgroundSchema);
