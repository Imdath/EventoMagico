const express = require('express')
const { accessControl } = require('../middlewares/auth')
const User = require('../models/users')
const profileRouter = express.Router()

profileRouter.get(
	'/profile/view',
	accessControl(['admin', 'user']),
	async (req, res) => {
		try {
			const user = req.user

			res.json({ data: user, message: 'Fetched User!' })
		} catch (error) {
			res.status(400).json({ message: error.message })
		}
	}
)

profileRouter.get('/users', accessControl(['admin']), async (req, res) => {
	try {
		const users = await User.find({ role: 'user' })
		res.json({ data: users, message: 'Fetched Users!' })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

module.exports = profileRouter
