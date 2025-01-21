const express = require('express')

const eventRouter = express.Router()

eventRouter.post('/event/create', adminAuth, (req, res) => {})

module.exports = eventRouter
