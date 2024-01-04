const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const campground = require("./model/campground");

//connect to mongodb

mongoose
  .connect("mongodb://127.0.0.1/yelp-camp")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((e) => console.log("error occured connecting to mongodb", e));

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extends: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/campground/new", (req, res) => {
  res.render("Campgrounds/new");
});
app.post("/campground", async (req, res) => {
  const { title, location } = req.body;
  const newCamp = await new campground({
    Title: title,
    Location: location,
  }).save();
  res.redirect(`/campground/${newCamp._id}`);
});
app.get("/campground/:id/edit", async (req, res) => {
  const { id } = req.params;
  const campg = await campground.findById(id).exec();
  res.render("Campgrounds/edit", { campg });
});
app.get("/campground", async (req, res) => {
  const Campgrounds = await campground.find({});
  res.render("Campgrounds/index", { Campgrounds });
});

app.get("/campground/:id", async (req, res) => {
  const { id } = req.params;
  const camp = await campground.findById(id).exec();
  res.render("Campgrounds/show", { camp });
});
app.put("/campground/:id", async (req, res) => {
  const { id } = req.params;
  const { title, location } = req.body;
  const updatedCamp = await campground.findByIdAndUpdate(id, {
    Title: title,
    Location: location,
  });
  res.redirect(`/campground/${updatedCamp._id}`);
});

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
