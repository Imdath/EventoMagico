const validator = require('validator')

const validateSignUpData = (req, res) => {
	const { firstName, lastName, email, password, age, gender } = req.body

	if (!firstName || !lastName) {
		return res.status(400).json({ message: 'Please enter your name!' })
	}
	if (!validator.isEmail(email)) {
		return res.status(400).json({ message: 'Invalid email!' })
	}
	if (!validator.isStrongPassword(password)) {
		return res.status(400).json({ message: 'Enter a strong password!' })
	}
	if (!age || age < 18) {
		return res.status(400).json({ message: 'Must be 18 years and above!' })
	}
	if (!gender) {
		return res.status(400).json({ message: 'Fill in all the details!' })
	}
}

module.exports = { validateSignUpData }
