var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

module.exports = function(app) {
	app.use('/api/user', router);
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

var postLogout = function (req, res) {
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

var getStatus = function (request, response, next) {
	if (request.user)
		return response.json({loggedIn: true});
	else
		return response.json({loggedIn: false});
};

var getNotifications = function (request, response, next) {
	return response.json(request.user.notifications);
};

var getMe = function (request, response, next) {
	return response.json(request.user);
};

function loggedIn(request, response, next) {
	if (request.user)
		return next();
	else
		return response.status(401).json({error: 'Not logged in'});
};

router.post('/login', postLogin);
router.post('/register', postRegister);
router.post('/logout', postLogout);
router.get('/status', getStatus);
router.get('/notifications', loggedIn, getNotifications);
router.get('/me', loggedIn, getMe);