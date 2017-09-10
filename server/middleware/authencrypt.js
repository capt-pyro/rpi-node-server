const auth = require('basic-auth')
var CryptoJS = require('crypto-js');

var authencrypt = (req, res, next) => {
    var encryptedUser = auth(req);
    var name = CryptoJS.AES.decrypt(encryptedUser.name.toString(),'qwerty').toString(CryptoJS.enc.Utf8);
    var pass = CryptoJS.AES.decrypt(encryptedUser.pass.toString(),'qwerty').toString(CryptoJS.enc.Utf8);
    if(name == 'edgeserver' && pass == 'Crafty20**'){
      next();
    }
    else{
      res.statusCode = 401
      //res.setHeader('WWW-Authenticate', 'Basic realm="example"')
      res.end('Access denied')
    }
};

module.exports = {authencrypt}
