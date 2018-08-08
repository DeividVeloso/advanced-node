const Buffer = require("safe-buffer").Buffer;
const Keygrip = require("keygrip");
const keys = require("../../config/keys");
const keygrip = new Keygrip([keys.cookieKey]);

module.exports = user => {
  const sessionObject = {
    passport: {
      user: user._id.toString() //É preciso porque o _id é um obejto transformo em string
    }
  };

  const session = Buffer.from(JSON.stringify(sessionObject)).toString("base64"); //Session

  const sig = keygrip.sign("session=" + session); //Session.sig

  return {
    session,
    sig
  };
};
