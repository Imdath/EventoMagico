const express = require('express')
const { accessControl } = require('../middlewares/auth')
const Event = require('../models/events')
const Registration = require('../models/registration')

const registerRouter = express.Router()

registerRouter.post(
	'/event/register/:id',
	accessControl(['admin', 'user']),
	async (req, res) => {
		try {
			const user = req.user
			const { id } = req.params

			const event = await Event.findById(id)

			if (!event) {
				return res.status(404).json({ message: 'Event not found!' })
			}

			const existingRegistration = await Registration.findOne({
				userId: user._id,
				eventId: event._id
			})

			if (existingRegistration) {
				return res.status(400).json({ message: 'Event already registered!' })
			}

			const registration = await Registration({
				userId: user._id,
				eventId: event._id
			})
			await registration.save()

			event.regParticipants += 1
			await event.save()

			res.json({ message: 'Event registered!' })
		} catch (error) {
			res.status(400).json({ message: error.message })
		}
	}
)

registerRouter.get(
	'/registrations',
	accessControl(['admin', 'user']),
	async (req, res) => {
		try {
			const { _id } = req.user

			const registrations = await Registration.find({ userId: _id })
				.populate('userId', 'firstName lastName email age gender')
				.populate('eventId', 'name date location category photoUrl')

			res.json({ data: registrations, message: 'Registrations fetched!' })
		} catch (error) {
			res.status(400).json({ message: error.message })
		}
	}
)

module.exports = registerRouter
