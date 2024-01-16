const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	secondName: { type: String, required: true },
	isBusy: { type: Boolean, default: false },
	email: { type: String, lowercase: true, minLength: 7 },
	createdAt: {
		type: Date,
		immutable: true,
		default: () => Date.now()
	}
});

module.exports = mongoose.model('Member', memberSchema);
