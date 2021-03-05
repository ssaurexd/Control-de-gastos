const { request, response } = require('express');
const ListShop = require('../models/ListShop')


exports.getListsShop = async ( req = request, res = response ) => {

	const { entryId } = req.params

	try {
		
		const listsShop = await ListShop.find({ entry: entryId })

		return res.json({
			ok: true,
			listsShop
		})
	} catch ( error ) {

		console.log('error', error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong!'
		})
	}
}

exports.createListShop = async ( req = request, res = response ) => {

	const { entryId } = req.params
	const { title, products } = req.params 

	try {
		
		const listShop = new ListShop({ entry: entryId, title, products })
		
		await listShop.save()

		return res.json({
			ok: true,
			listShop
		})
	} catch ( error ) {

		console.log('error', error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong!'
		})
	}
}