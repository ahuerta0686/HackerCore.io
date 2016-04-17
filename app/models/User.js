var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt');

var UserSchema = new Schema({
	username: String,
	password: String,
	notifications: [{
		message: String,
		state: String
	}]
});

UserSchema.set('toJSON', {
	transform: function (doc, ret, options) {
		var retJSON = {
			_id: ret._id,
			username: ret.username,
			notifications: ret.notifications
		};
		return retJSON;
	}
});

UserSchema.methods.pushNotification = function (message, state) {
	var user = this;

	user.notifications.unshift({
		message: message,
		state: state
	});

	return user.save();
};

UserSchema.methods.dismissNotification = function (index) {
	var user = this;

	user.notifications.splice(index, 1);

	return user.save();
};

UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', UserSchema);