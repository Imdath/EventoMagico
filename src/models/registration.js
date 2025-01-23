const mongoose = require('mongoose')

const registrationSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
			required: true
		},
		eventId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'events',
			required: true
		}
	},
	{ timestamps: true }
)

const RegistrationModel = mongoose.model('registrations', registrationSchema)

module.exports = RegistrationModel
