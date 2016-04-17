var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    devpost = require('devpost-scraper'),
    Q = require('q');

var ProjectSchema = new Schema({
    title: String,
    tagline: String,
    slug: { type: String, unique: true },
    slides: [{
        imageUrl: String,
        caption: String
    }],
    body: String,
    tags: [{
        text: String,
        recognized: Boolean
    }],
    links: [{
        text: String,
        url: String
    }],
    event: [{
        imageUrl: String,
        title: String,
        slug: String
    }],
    winnings: [ String ],
    team: [{
        avatarUrl: String,
        username: String,
        fullName: String
    }],
    numMembers: Number,
    numLikes: Number,
    numComments: Number
});

ProjectSchema.statics.findByDevpostSlug = function (slug) {
    var deferred = Q.defer();

    devpost.project.findBySlug(slug)
    .then(function (project) {
        deferred.resolve(project);
    })
    .catch(function (error) {
        deferred.reject(error);
    });

    return deferred.promise;
};

ProjectSchema.statics.findAllByHackathon = function (hackathon) {
    var deferred = Q.defer();

    devpost.hackathon.projects.all(hackathon)
    .then(function (projects) {
        var promises = [];

        projects.forEach(function (project) {
            promises.push(devpost.project.findBySlug(project.slug));
        });

        return Q.all(promises);
    })
    .then(function (projects) {
        deferred.resolve(projects);
    })
    .catch(function (error) {
        deferred.reject(error);
    });

    return deferred.promise;
};

mongoose.model('Project', ProjectSchema);