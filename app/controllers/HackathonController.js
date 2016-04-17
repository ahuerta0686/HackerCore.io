var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Hackathon = mongoose.model('Hackathon'),
	Q = require('q');

module.exports = function (app) {
	app.use('/api/hackathon', router);
};

function postNew(request, response, next) {
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
		return response.json({success: true});
	})
	.catch(function (error) {
		console.log(error);
		return response.status(500).json({error: true});
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

router.post('/new', postNew);
router.post('/update', postUpdate);