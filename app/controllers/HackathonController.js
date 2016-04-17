var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Hackathon = mongoose.model('Hackathon'),
	Q = require('q'),
	rp = require('request-promise');

var googleApiKey = 'AIzaSyDUQnw4P70FMsSsepIcA2Y32pirhn5o2Dc';

module.exports = function (app) {
	app.use('/api/hackathon', router);
};

function postNew(request, response, next) {
	response.json({status: 'Job queued...'});

	var Project = mongoose.model('Project');
	Q.spread([
		Hackathon.findByDevpostSlug(request.body.slug),
		Project.findAllByHackathon(request.body.slug)
	],
	function (hackathon, projects) {
		var newHackathon = new Hackathon(hackathon);

		var promises = [];
		promises.push(newHackathon.save());
		projects.forEach(function (project) {
			var newProject = new Project(project);
			promises.push(newProject.save());
		});

		return Q.all(promises);
	})
	.then(function (result) {
		var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + googleApiKey + '&address=';
		var hackathon = result[0];
		if (hackathon.location.address)
			return rp(geocodeUrl + hackathon.location.address);
		else if (hackathon.location.name.length)
			return rp(geocodeUrl + hackathon.location.name);
		else
			request.user.pushNotification('Successfully retrieved hackathon and all of it\'s projects!', 'index');
	})
	.then(function (result) {
		Hackathon.findOne({slug: request.body.slug}).exec(function (error, hackathon) {
			if (error)
				return next(error);

			var jsonResult = JSON.parse(result);

			if (jsonResult.results[0]) {
				hackathon.location.lat = jsonResult.results[0].geometry.location.lat;
				hackathon.location.lng = jsonResult.results[0].geometry.location.lng;
			}
			return hackathon.save();
		});
		// return response.json({success: true});
	})
	.then(function (result) {
		request.user.pushNotification('Successfully retrieved hackathon and all of it\'s projects!', 'index');
	})
	.catch(function (error) {
		console.log(error);
		request.user.pushNotification('Unsuccessfully retrieved hackathon...', 'index');
		// return response.status(500).json({error: true});
	});
};

function postUpdate(request, response, next) {
	Hackathon.findOne({slug: request.body.slug})
	.exec(function (error, hackathon) {
		if (error)
			return next(error);

		Hackathon.findByDevpostSlug(request.body.slug)
		.then(function (devpostHackathon) {
			Object.assign(hackathon, devpostHackathon);
			hackathon.save(function (error, hackathon) {
				if (error)
					return next(error);

				return response.json(hackathon);
			});
		})
		.catch(function (error) {
			return response.status(500).json({error: true});
		});
	});
};

function postSearch(request, response, next) {
	var searchResults = [];
	Hackathon.searchByDevpostQuery(request.body.query)
	.then(function (results) {
		searchResults = results;
		var promises = [];

		searchResults.forEach(function (result) {
			promises.push(Hackathon.findOne({slug: result.slug}).exec());
		});

		return Q.all(promises);
	})
	.then(function (results) {		
		var finalResults = [];
		results.forEach(function (result, index) {
			if (!result)
				finalResults.push(searchResults[index]);
		});

		return response.json(finalResults);
	})
	.catch(function (error) {
		return response.status(500).json({error: true});
	});
};

function getCount(request, response, next) {
	Hackathon.count({}, function (error, count) {
		if (error)
			return next(error);

		return response.json({count: count});
	});
};

function getLocations(request, response, next) {
	var output = [];

	Hackathon.find().exec()
	.then(function (hackathons) {
		hackathons.forEach(function (hackathon) {
			output.push({
				lat: hackathon.location.lat,
				lng: hackathon.location.lng
			});
		});

		return response.json(output);
	})
	.catch(function (error) {
		return response.status(500).json({error: true});
	});
}

function loggedIn(request, response, next) {
	if (request.user)
		return next();
	else
		return response.json({error: 'Not logged in'});
}

router.post('/new', loggedIn, postNew);
router.post('/update', postUpdate);
router.post('/search', postSearch);
router.get('/count', getCount);
router.get('/locations', getLocations);