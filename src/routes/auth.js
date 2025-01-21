const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validateSignUpData } = require('../utils/validation')
const User = require('../models/users')
const authRouter = express.Router()

authRouter.post('/admin/create', async (req, res) => {
	try {
		validateSignUpData(req, res)
		const { password } = req.body

		const hashedPassword = await bcrypt.hash(password, 10)

		const user = new User({
			...req.body,
			role: 'admin',
			password: hashedPassword
		})

		await user.save()
		res.json({ message: 'Admin created successfully!' })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

authRouter.post('/signup', async (req, res) => {
	try {
		validateSignUpData(req, res)
		const { password } = req.body

		const hashedPassword = await bcrypt.hash(password, 10)

		const user = new User({
			...req.body,
			role: 'user',
			password: hashedPassword
		})

		await user.save()

		res.json({ message: 'User created successfully!' })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

authRouter.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })

		if (!user) {
			return res.status(401).json({ message: 'Invalid Credentials!' })
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)

		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid Credentials!' })
		}

		const token = jwt.sign({ _id: user._id }, 'Evento@Magico$790', {
			expiresIn: '7d'
		})

		res.cookie('token', token, {
			expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 7)
		})

		res.json({ data: user, message: 'Login Successful!' })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

module.exports = authRouter
