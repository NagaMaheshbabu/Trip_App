const { default: mongoose } = require("mongoose");
const campground = require("../model/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

console.log(descriptors);

//connect to mongodb

mongoose
  .connect("mongodb://127.0.0.1/yelp-camp")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((e) => console.log("error occured connecting to mongodb", e));

const simple = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
const seedsDB = async () => {
  await campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const ran = Math.floor(Math.random() * 1000);
    await new campground({
      Location: `${cities[ran].city}, ${cities[ran].state}`,
      Title: `${simple(descriptors)} ${simple(places)}`,
    }).save();
  }
};
seedsDB();
