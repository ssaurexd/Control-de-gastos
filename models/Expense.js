const { Schema, model } = require('mongoose')

const ExpenseSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	invoice: {
		type: String,
		required: false
	},
	hasInvoice: {
		type: Boolean,
		default: false
	},
	entry: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Entry'
	}
}, {
	timestamps: true
})

module.exports = model( 'ListShop', ListShopSchema )