var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt');

var UserSchema = new Schema({
	username: String,
	password: String
});

UserSchema.set('toJSON', {
	transform: function (doc, ret, options) {
		var retJSON = {
			_id: ret._id,
			username: ret.username
		};
		return retJSON;
	}
});

UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', UserSchema);