const mongoose = require('mongoose')

const connectDB = async () => {
	await mongoose.connect(
		'mongodb+srv://Imdath:imdathmessi10@namastenode.icfn1.mongodb.net/eventoMagico'
	)
}

module.exports = connectDB
