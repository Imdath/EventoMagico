const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true
		},
		password: {
			type: String,
			required: true
		},
		age: {
			type: Number,
			required: true,
			min: 18
		},
		gender: {
			type: String,
			required: true
		},
		role: {
			type: String,
			required: true,
			default: 'user'
		}
	},
	{ timestamps: true }
)

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel
