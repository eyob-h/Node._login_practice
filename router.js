//router
var express = require("express");
var router = express.Router();

const cred = {
    username: "Mr. X",
    email: "a@b.com",
    password: "123"
}

//login user
router.post('/login',(req,res) =>{
    if(req.body.email==cred.email && req.body.password == cred.password){
        req.session.user = req.body.email;
        req.session.username = cred.username;
        console.log(req.session.user);
        console.log(req.session.username);
        res.redirect('/route/dashboard');
        // res.end("LOGIN SUCCESSFUL");
    }else{
        res.end("INVALID CRED");
        //Praise be to God, I debugged it. Turns out, i had forgotten to give name="password" in the form 
        console.log(req.body.email);
        console.log(cred.email);
        console.log(req.body.password);
        console.log(cred.password);
    }
})

// route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{username:req.session.username})
        console.log(req.session.username)
    }else{
        res.send("Unauthorized User Detected!");
    }
})

module.exports = router;

//logout route
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base',{title:"Express",logout:"Logged Out Successfully"})
        }
    })
})