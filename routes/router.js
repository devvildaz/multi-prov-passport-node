const express = require("express");
const router = express.Router();
const db = require('../models/index');
const { Op } = require('sequelize');
const passUtils = require('../utils/passportUtils');
const dayjs = require("dayjs");
const passport = require('passport');
router.get('/info', async (req,res) => {
  res.send('hello');
})

router.post('/user/', async (req,res) => {
  try {
    let created_user = await db.AppUser.create({ 
      name: req.body['username'], 
      password: req.body['password'],
      email: req.body['email'],
      issuer: req.body['issuer']
    });
    created_user.save();
    return res.json({ success: true, id: created_user.id, username: created_user.name })
  } catch (err) {
    return res.status(400).json({
      success: false, message: err.message, errors: err.errors.map((item) => item.message)
    })
  }
});

router.post('/user/login', async (req,res) => {
  
  try{
    const user_target = (await db.AppUser.findAll({
      where: {
        [Op.or] :  { name: req.body['identifier'], email: req.body['identifier'] }
      }
    }))[0];
    

    if(!( user_target && passUtils.validPassword(user_target.password, req.body['password']) )) { 
      throw Error("invalid user and/or password")
    };
  
    let token = passUtils.issueJWT(user_target);

    res.cookie('jwt', token ,{
      httpOnly: false,
      expires: dayjs().add(1, "day").toDate()
    });

    res.status(200).json({
      success: true,
      message: 'user is valid',
    });
  } catch (e){
    res.status(403).json({
      success: false,
      message: e.message 
    })
  }
});

router.get('/user/profile', passport.authenticate('jwt', { session : false }) , (req, res) => {
  res.json(req.user);
});


module.exports = router;
