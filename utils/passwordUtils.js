const crypto = require('crypto');
function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, 'cat', 10000, 64, 'sha512').toString('hex');

    return {
      salt: salt,
      hash: genHash
    };
}

function validPassword(password, hash) {
    var hashVerify = crypto.pbkdf2Sync(password, 'cat', 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

modules.exports.validPassword = validPassword;
modules.exports.genPassword = genPassword;
