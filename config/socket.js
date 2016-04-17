var mongoose = require('mongoose');

module.exports = function (io) {
	io.on('connection', function (socket) {
		socket.emit('welcome', {message: "Hello"});

		socket.on('dismiss notification', function (data) {
			var User = mongoose.model('User');
			User.findOne({username: data.username}).exec()
			.then(function (user) {
				user.dismissNotification(data.index);
			})
			.catch(function (error) {
				console.log(error);
			})
		});
	});
}