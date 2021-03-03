const { Schema, model } = require('mongoose')


const EntrySchema = new Schema({
	month: {
		type: Number,
		required: true,
		enum: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
	},
	year: {
		type: Number,
		required: true
	},
	amount: {
		type: Number,
		required: true,
		defualt: 0
	},
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	}
}, {
	timestamps: true
})

module.exports = model( 'Entry', EntrySchema )