const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const path = require("path");
const campground = require('./model/campground');


//connect to mongodb

mongoose.connect('mongodb://127.0.0.1/yelp-camp').then(()=>{
  console.log('connected to mongodb');
})
.catch(e=>console.log('error occured connecting to mongodb',e));

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render('index');
});
app.get('/campground',(req,res)=>{
 const newOne = new campground({
    Title:"Nile Forest",
    Price:"200",
    Description:"Its really good to have fun!",
    Location:"America"

  })
  newOne.save();
  res.send('done')
})

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
