var express =require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/users.js');
var passport = require ('passport');
var jwt = require('express-jwt');
var auth = jwt({ secret: 'SECRET', userProperty: 'payload' });
var local = require ('../config/passport.js');

/*
router.route('/listings/get')

	.get(function(req, res) {
		Listing.find(function(err, listings) {
			if (err)
				res.send(err);

			res.json(listings);
		});
});
*/
router.route('/logout')
  .get(function(req, res) {
    req.logout();
    res.redirect('/');
  })
router.route('/view', passport.authenticate('local'))
  .get(function(req,res) {
    res.json({ message : 'user page'});

});

router.route('/register')

	.post(function(req, res, next) {
    if(!req.body.username){
      return res.status(400).json({ message: 'no username' });
    }
    if(!req.body.password){
      return res.status(400).json({ message: 'no password' });
    }

    if(!req.body.username || !req.body.password){
      return res.status(400).json({ message: 'Please fill out all fields' });
    }

    var user = new User();
    user.username = req.body.username;
    user.setPassword(req.body.password)

    user.save(function(err){
      if(err){ return next(err); }

      return res.json({token: user.generateJWT()})

    });
});
router.route('/login')
  .post(function(req, res, next) {
    if(!req.body.username || !req.body.password){
      return res.status(400).json({ message: 'Please fill out all fields' });
    }
    passport.authenticate('local', function(err, user, info){
      if(err){ return next(err); }
      if (user){
        return res.json({token: user.generateJWT()});
      } else {
        return res.status(401).json(info);
      }
    })(req, res, next);
  });

/*
router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({ message: 'Please fill out all fields' });
  }

  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password)

  user.save(function(err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})

  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message:'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});
*/

module.exports = router;
