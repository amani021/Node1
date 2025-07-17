const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_super_secret_key";

// Register - only touch Node not React
router.post("/register", async (req, res) => {
    const {username, email, password, role} = req.body; // Receive from react
    const existing = await User.findOne({username}) // username come from react

    // Check if username exists or not
    if (existing)
        return res.status(400).json({message: "User already exists"});
        
        const hashedPassword = await bcrypt.hash(password, 7);
        const user = new User({username, email, password:hashedPassword, role});
        await user.save(); // Save and send it to database
        res.status(201).json({message: "Added and saved"});
});

// Login
router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email}); // Check and try to find email
    if (!user) return res.status(400).json({message: "Invalid email"});

    const match = await bcrypt.compare(password, user.password); // password what a user entered, and user.password which encrypted in database
    if (!match) return res.status(400).json({message: "Invalid password"});
    const token = jwt.sign({email:user.email, role:user.role}, JWT_SECRET, {expiresIn:"1h"}); // Session time
    res.json({token});
});

module.exports = router;
