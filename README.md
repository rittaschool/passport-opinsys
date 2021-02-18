# passport-opinsys

[Passport](http://passportjs.org/) strategy for authenticating with [opinsys](https://api.opinsys.fi/v3/sso/developers)

This module lets you authenticate using opinsys SSO in your Node.js
applications.  By plugging into Passport, opinsys authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

[![npm](https://img.shields.io/npm/v/passport-opinsys.svg)](https://www.npmjs.com/package/passport-opinsys)

## Install

```bash
$ npm install passport-opinsys
```

## Usage

#### Configure Strategy

The opinsys authentication strategy authenticates users using the opinsys SSO.  The strategy requires a `verify` callback, which accepts the user json (more info on [opinsys API documentation](https://api.opinsys.fi/v3/sso/developers)) and calls `done` providing a user.

```js
passport.use(new OpinsysStrategy (
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
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'opinsys'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
app.post('/login', 
  passport.authenticate('opinsys', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
```

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2021-2021 Roni Äikäs <[http://raikas.xyz/](http://raikas.xyz/)>

