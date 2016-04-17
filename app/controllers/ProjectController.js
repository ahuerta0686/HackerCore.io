var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Project = mongoose.model('Project');

module.exports = function (app) {
	app.use('/api/project', router);
};

function postNew(request, response, next) {
	Project.findByDevpostSlug(request.body.slug)
	// Success
	.then(function (project) {
		var newProject = new Project(project);
		newProject.save(function (error) {
			if (error)
				return next(error);

			return response.json(project);
		});
	})
	// Error
	.catch(function (error) {
		// console.log(error);
		return response.status(500).json({error: true});
	});
};

function postUpdate(request, response, next) {
	Project.findOne({slug: request.body.slug})
	.exec(function (error, project) {
		if (error)
			return next(error);

		Project.findByDevpostSlug(request.body.slug)
		.then(function (devpostProject) {
			Object.assign(project, devpostProject);
			project.save(function (error, project) {
				if (error)
					return next(error);

				return response.json(project);
			});
		})
		.catch(function (error) {
			return response.status(500).json({error: true});
		});
	});
};

function getCount(request, response, next) {
	Project.count({}, function (error, count) {
		if (error)
			return next(error);

		return response.json({count: count});
	});
};

function getTags(request, response, next) {
	Project.find().exec(function (error, projects) {
		if (error)
			return next(error);

		var tags = {};
		projects.forEach(function (project) {
			var projectTags = [];
			project.tags.forEach(function (tag) {
				if (!tags[tag.text])
					tags[tag.text] = 0;

				tags[tag.text] += 1;
			});
		});

		return response.json(tags);
	});
};

router.post('/new', postNew);
router.post('/update', postUpdate);
router.get('/count', getCount);
router.get('/tags', getTags);
