const { Schema, model } = require('mongoose')

const ListShopSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	products: {
		type: [{ title: String, price: Number }],
		required: false
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