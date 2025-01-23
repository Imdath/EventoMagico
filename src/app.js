const express = require('express')
const connectDB = require('./config/database')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRouter = require('./routes/auth')
const eventRouter = require('./routes/event')
const profileRouter = require('./routes/profile')
const registerRouter = require('./routes/register')

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/', authRouter)
app.use('/', eventRouter)
app.use('/', profileRouter)
app.use('/', registerRouter)

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
