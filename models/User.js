const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userContact: {
    firstName: {
			type: String,
			required: true
    },
		lastName: {
			type: String,
			required: true
		},
		userEmail: {
			type: String,
			required: true,
			unique: true
		},
		userPhone: {
			type: String,
			required: true
		}
	},
	password: {
		type: String,
		required: true
	},
	companyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Company'
	}
});

module.exports = User = mongoose.model('User', UserSchema);



