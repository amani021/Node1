// Server is for go and check

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/Auth");
const app = express();
app.use(cors());
app.use(express.json());

// Local database
// mongoose.connect("mongodb://localhost:27017/authDemo");

// If we need to save data in the online database
// mongoose.connect("mongodb+srv://user:password@.../authDemo");
mongoose.connect("mongodb+srv://amani-ahmad:0912amani@cluster0.rcinyw5.mongodb.net/authDemo");

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
    console.log("✅ Backend running on http://localhost:5000");
});