const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

app.engine('ejs', ejsMate);
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));
main().then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.get("/",(req,res) => {
    res.send("Hello I am root");
});
// Index Route Create
app.get("/listings",async(req,res) => {
     const allListing = await Listing.find({});
    res.render("index.ejs",{allListing});
});
// New listing route
app.get("/listings/new",(req,res) =>{
    res.render("new.ejs");
});
// Create Route Post
app.post("/listings",async(req,res) => {
    const newListing = new Listing(req.body);
    await newListing.save();
    // res.redirect(`/listings/${newListing._id}`);
    res.redirect("/listings");
    //console.log(newListing);
});
// Edit Route
app.get("/listings/:id/edit",async(req,res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("edit.ejs",{listing});
});

// Show Route Read
app.get("/listings/:id",async(req,res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("show.ejs",{listing});
});
// Update Route Put
app.put("/listings/:id",async(req,res) => {
    const {id} = req.params;
    let v = await Listing.findByIdAndUpdate(id,{... req.body});
    console.log(v);
    res.redirect(`/listings/`);
});
// Delete Route
app.delete("/listings/:id",async(req,res) => {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});
app.listen(3000, () => console.log('Server running on port 3000')); 





// app.get("/listings", async (req, res) => {
//     let sample = new Listing({
//         title: "Sample Listing",
//         description: "This is a sample listing description.",
//         image: "",
//         price: 100,
//         location: "Sample Location",
//         country: "Sample Country"
//     });
//     await sample.save();
//     console.log("saved");
//     res.send("sucess");
// });