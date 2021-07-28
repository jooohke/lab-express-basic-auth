const express = require("express");
const router = express.Router();
const User = require("../models/User.model")
const bcrypt = require("bcrypt")

const SALT = 10 

// SIGN UP PAGE
router.get("/auth/sign-up", (req,res,next) => {
    res.render("auth/signup.hbs")
})

router.post("/auth/sign-up", async (req,res,next) => {
    try {
        const user = req.body;

        if(!user.password || !user.username) {
            res.render("auth/signup.hbs",
            {errorMessage : "I'm gonna need some identification"}
            );
            console.log("I'm gonna need some identification");
            return;
        }

        const foundUser = await User.findOne({username: user.username});

        if (foundUser) {
            res.render("auth/signup.hbs", {
                errorMessage : "username taken"
            });
            console.log(user)
            return;
        }
        
        user.password = bcrypt.hashSync(user.password, SALT);
        User.create(user);
        res.redirect("/auth/sign-in")
    }
    catch (error) {next(error)}
})



// SIGN IN PAGE
router.get("/auth/sign-in", (req, res, next) => {
    res.render("auth/signin.hbs")
})



module.exports = router