const express = require('express')
const connectDB = require('./config/database')
const app = express()
const cookieParser = require('cookie-parser')

const authRouter = require('./routes/auth')
const eventRouter = require('./routes/event')

app.use(express.json())
app.use(cookieParser())

app.use('/', authRouter)
app.use('/', eventRouter)

connectDB()
	.then(() => {
		console.log('Database connected successfully...')
		app.listen(3000, () => {
			console.log('Server is successfully listening on port 3000...')
		})
	})
	.catch(() => {
		console.error('Database connection failed!')
	})
