var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

module.exports = function(app) {
	app.use('/api/users', router);
};

var postLogin = function (req, res, next) {
	passport.authenticate('local-login', function(err, user, info) {
		if (err) return next(err);

		if (!user) {
			return res.status(422).json({ status: 'FAIL', errors: info });
		}

		req.login(user, function(err) {
			if (err) return next(err);

			return res.send({ status: 'OK', 'user': user, 'info': info });
		})
		
	})(req, res, next);
};

var getLogout = function (req, res) {
	req.logout();
	return res.send({ status: 'OK' });
};

var postRegister = function (req, res, next) {
	passport.authenticate('local-register', function(err, user, info) {
		if (err) return next(err);

		if (!user) {
			console.log(user);
			return res.status(422).send({ status: 'FAIL' , errors: info });
		}

		req.login(user, function (err) {
			if (err)
				return next(err);

			return res.send({ status: 'OK', 'user': user, 'info': info});
		});
	})(req, res, next);
};

router.post('/login', postLogin);
router.post('/register', postRegister);
router.get('/logout', getLogout);