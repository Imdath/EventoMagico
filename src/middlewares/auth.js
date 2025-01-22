const jwt = require('jsonwebtoken')
const User = require('../models/users')

const accessControl = (allowedRoles = []) => {
	return async (req, res, next) => {
		try {
			const { token } = req.cookies
			if (!token) {
				return res.status(401).json({ message: 'Please Login!' })
			}

			const decodedMessage = jwt.verify(token, 'Evento@Magico$790')

			const { _id } = decodedMessage

			const user = await User.findById(_id)

			if (!user) {
				return res.stats(404).json({ message: 'User not registered!' })
			}

			if (!allowedRoles.includes(user.role)) {
				return res.status(401).json({ message: 'Access Denied!' })
			}

			req.user = user

			next()
		} catch (error) {
			res.status(400).json({ message: error.message })
		}
	}
}

module.exports = { accessControl }
