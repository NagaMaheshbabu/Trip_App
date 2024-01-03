const { default: mongoose } = require("mongoose");
const campground = require("../model/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

//connect to mongodb

mongoose
  .connect("mongodb://127.0.0.1/yelp-camp")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((e) => console.log("error occured connecting to mongodb", e));

const seedsDB = async () => {
  await campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const ran = Math.floor(Math.random() * 1000);
    await new campground({
      Location: `${cities[ran].city}, ${cities[ran].state}`,
    }).save();
  }
};
seedsDB();
