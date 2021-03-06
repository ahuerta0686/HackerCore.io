var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	devpost = require('devpost-scraper'),
	Q = require('q');

var HackathonSchema = new Schema({
	title: String,
	body: String,
	slug: { type: String, unique: true },
	location: {
		name: String,
		address: String,
		lat: Number,
		lng: Number
	},
    judges: [{
    	avatarUrl: String,
    	name: String,
    	title: String 
    }],
    judgingCriteria: [{
    	criteria: String,
    	description: String
    }],
    prizeCashValue: Number,
    prizes: [{
    	challenge: String,
    	winnings: String
    }],
    submissionTime: {
    	open: String,
    	close: String
    }
});

HackathonSchema.statics.findByDevpostSlug = function (slug) {
	var deferred = Q.defer();

	devpost.hackathon.findBySlug(slug)
	.then(function (hackathon) {
		deferred.resolve(hackathon);
	})
	.catch(function (error) {
		deferred.reject(error);
	});

	return deferred.promise;
};

HackathonSchema.statics.searchByDevpostQuery = function (query) {
	var deferred = Q.defer();

	devpost.hackathon.search(query)
	.then(function (results) {
		deferred.resolve(results);
	})
	.catch(function (error) {
		deferred.reject(results);
	});

	return deferred.promise;
};

mongoose.model('Hackathon', HackathonSchema);