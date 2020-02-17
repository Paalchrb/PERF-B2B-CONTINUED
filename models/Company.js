const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
	orgNum: {
		type: String,
		required: true,
		unique: true,
	},
	companyName: {
		type: String,
		required: true,
	},
	address: {
		street: {
			type: String,
			required: true,
		},
		zipCode: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		}
	},
	companyContacts: {
		companyEmail: {
			type: String,
			required: true,
		},
		companyPhone: {
			type: String,
			required: true,
		} 
	},
	recentProducts: {
			type: [String],
	},
	recentOrders: {
		type: [String],
	},
	favoriteProducts: {
		type: [String]
	},
	accountNumber: {
		type: String
	},
	website: {
		type: String
	},
	aboutUs: {
		type: String
	},
	social: {
		youtube: {
			type: String
		},
		twitter: {
			type: String
		},
		facebook: {
			type: String
		},
		linkedin: {
			type: String
		},
		instagram: {
			type: String
		}
	}
});

module.exports = Company = mongoose.model('Company', CompanySchema);



