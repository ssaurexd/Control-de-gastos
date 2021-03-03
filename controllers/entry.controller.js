const { request, response } = require('express');
const Entry = require('../models/Entry')


exports.setEntry = async ( req = request, res = response ) => {

	const { user } = req
	const { month, year, amount } = req.body

	try {
		
		await Entry.create({ month, year, amount, user: user._id })
	} catch ( error ) {
		
		console.log('error', error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong!'
		})
	}

	return res.json({
		ok: true,
		msg: 'Tu ingreso se ha creado correctamente'
	})
}

exports.updateEntry = async ( req = request, res = response ) => {

	const { amount } = req.body
	const { entryId } = req.params
	const { user } = req
	
	try {	
		
		const entry =  await Entry.findOneAndUpdate({ _id: entryId, user: user._id }, { amount }, { new: true })
		
		return res.json({
			ok: true,
			msg: 'Ingreso actualizado',
			entry
		})
	} catch ( error ) {
		
		console.log('error', error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong!'
		})
	}
}