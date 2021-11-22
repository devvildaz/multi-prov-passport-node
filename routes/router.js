const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const { Op } = require("sequelize");
const passport = require("passport");
require("../config/passport");
const User = require("../models/User");
const { validPassword, issueJWT } = require("../utils/passportUtils");

router.use(passport.initialize());
router.post("/register/local/", async (req, res) => {
  let reg = req.body;

  try {
    let user = await User.create(reg);
    return res.json({ success: true, id: user.id, username: user.username });
  } catch (err) {
    return res.status(400).json({ success: false, message: "User already exists" });
  }
});

router.post("/login/local", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        return res.status(400).json({ success: false, message: 'Error with Database' });
      } 

	  if(info){
		return res.status(400).json({ success: false, message: info.message });
	  }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({ success: true , token });
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Error with JSON Token' });
    }
  })(req, res, next);
});

module.exports = router;
