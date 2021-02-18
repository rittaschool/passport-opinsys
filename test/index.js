const passport = require("passport"),
opinsys = require("../lib/index").Strategy,
express = require("express");


var app = express();
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new opinsys(
    {
        redirectURI: "http://localhost",
        secret: "Opinsys JWT Secret Here!",
        organization: "demo.opinsys.fi"
    },
    function(profile, done) {
        if(profile.username !== "opiskelija.ritta") {
            // User does not exists or other error

            // done(error, user)
            done("No user found", false)
        } else {
            // User exists.
            done(null, {username: profile.username,id: profile.id})
        }
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
   
passport.deserializeUser(function(id, done) {
    console.log("Deserialized user with id " + id)
});

app.get('/', passport.authenticate('opinsys', { failureRedirect: '/' }),
  function(req, res) {
      res.send("You are logged in!");
  }
);
app.listen(80,()=>{
    console.log("Passport-opinsys test express server now listening port 80!")
})
