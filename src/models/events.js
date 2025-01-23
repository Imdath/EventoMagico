const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		date: {
			type: String,
			required: true
		},
		location: {
			type: String,
			required: true
		},
		regParticipants: {
			type: Number,
			default: 0
		},
		maxParticipants: {
			type: Number,
			required: true
		},
		category: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			required: true
		},
		photoUrl: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
)

const EventModel = mongoose.model('Events', eventSchema)

module.exports = EventModel
