const express = require('express')
const { accessControl } = require('../middlewares/auth')
const Event = require('../models/events')
const { validateEventCreation } = require('../utils/validation')

const eventRouter = express.Router()

eventRouter.post(
	'/event/create',
	accessControl(['admin']),
	async (req, res) => {
		try {
			const validationResult = validateEventCreation(req, res)

			if (validationResult) return

			const event = new Event({
				...req.body
			})

			await event.save()

			res.json({ message: 'Event created!' })
		} catch (error) {
			res.status(400).json({ message: error.message })
		}
	}
)

eventRouter.get(
	'/events',
	accessControl(['admin', 'user']),
	async (req, res) => {
		try {
			const events = await Event.find()
			res.send({ data: events, message: 'Fetched events!' })
		} catch (error) {
			res.status(400).json({ message: error.message })
		}
	}
)

eventRouter.delete('/event/:id', accessControl(['admin']), async (req, res) => {
	try {
		const { id } = req.params

		const event = await Event.findById(id)

		if (!event) {
			return res.status(404).json({ message: 'No event found' })
		}

		await Event.findByIdAndDelete(id)

		res.json({ message: 'Event deleted!' })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

eventRouter.patch('/event/:id', accessControl(['admin']), async (req, res) => {
	try {
		const { id } = req.params

		const event = await Event.findById(id)

		if (!event) {
			return res.status(404).json({ message: 'No event found' })
		}

		Object.keys(req.body).forEach((field) => (event[field] = req.body[field]))

		await event.save()

		res.json({ message: 'Event updated!' })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

module.exports = eventRouter
