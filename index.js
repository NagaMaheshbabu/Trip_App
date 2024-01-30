const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const path = require("path");
const ejsmate = require("ejs-mate");
const methodOverride = require("method-override");
const campground = require("./model/campground");
const catchAsync = require("./util/catchAsync");

//connect to mongodb

mongoose
  .connect("mongodb://127.0.0.1/yelp-camp")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((e) => console.log("error occured connecting to mongodb", e));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.engine("ejs", ejsmate);
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//index page
app.get("/", (req, res) => {
  res.render("index");
});
//render new campground page
app.get("/campground/new", (req, res) => {
  res.render("Campgrounds/new");
});
//new campground
app.post(
  "/campground",
  catchAsync(async (req, res) => {
    const { title, location, Image, description, price } = req.body;
    const newCamp = await new campground({
      Title: title,
      Location: location,
      image: Image,
      Description: description,
      Price: price,
    }).save();
    res.redirect(`/campground/${newCamp._id}`);
  })
);

//edit
app.get(
  "/campground/:id/edit",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campg = await campground.findById(id).exec();
    res.render("Campgrounds/edit", { campg });
  })
);
//All Campgrounds
app.get(
  "/campground",
  catchAsync(async (req, res) => {
    const Campgrounds = await campground.find({});
    res.render("Campgrounds/index", { Campgrounds });
  })
);
//show
app.get(
  "/campground/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const camp = await campground.findById(id).exec();
    res.render("Campgrounds/show", { camp });
  })
);

//update
app.put(
  "/campground/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const { title, location, image, description, price } = req.body;
    const updatedCamp = await campground.findByIdAndUpdate(id, {
      Title: title,
      Location: location,
      Image: image,
      Description: description,
      Price: price,
    });
    res.redirect(`/campground/${updatedCamp._id}`);
  })
);
//delete
app.delete(
  "/campground/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await campground.findByIdAndDelete(id);
    res.redirect("/campground");
  })
);

//middleware
app.use((err, req, res, next) => {
  res.send("error occured!");
});
app.listen(3000, () => {
  console.log("Listening at port 3000");
});
