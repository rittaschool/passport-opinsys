const 
    util = require("util"),
    Strategy = require("passport-strategy"),
    nJwt = require("njwt");


function OpinsysStrategy(options = {}, verify) {
    if (typeof options == 'function') {
        verify = options;
        options = {};
    }
    if (!verify) { throw new TypeError('OpinsysStrategy requires a verify callback'); }
    
    if(!options.secret || !options.redirectURI) {
        throw new Error("No options.secret or options.redirectURI")
    }

    this._verify = verify;
    this.options = options;
    Strategy.call(this);
    this.name = 'opinsys';
}

OpinsysStrategy.prototype.authenticate = function(req) {
    if(!req.query || !req.query.jwt) {
        this.redirect("https://api.opinsys.fi/v3/sso?return_to="+this.options.redirectURI+(this.options.organization?"&organisation="+this.options.organization:""))
        return;
    }

    

    let fail = this.fail;
    let error = this.error;
    let success = this.success;
    let verify = this._verify;
    function verified(err, user, info) {
        if (err) { return error(err); }
        if (!user) { return fail(info); }
        success(user, info);
    }

    nJwt.verify(req.query.jwt,this.options.secret,function(err,verifiedJwt){
        if(err){
            fail("JWT invalid")
        } else{
            verify(verifiedJwt.body, verified);
        }
    });
}

util.inherits(OpinsysStrategy, Strategy);

module.exports = OpinsysStrategy;