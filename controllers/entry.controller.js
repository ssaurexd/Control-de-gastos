const { request, response } = require('express');
const Entry = require('../models/Entry')
const Expense = require('../models/Expense')


exports.getEntryById = async ( req = request, res = response ) => {

	const { entryId } = req.params
	const { user } = req
	
	try {
		
		const entry = await Entry.find({ user: user._id, _id: entryId })

		return res.json({
			ok: true,
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

exports.getEntrys = async ( req = request, res = response ) => {

	const { user } = req
	const { year } = req.params
	
	try {
		
		const entrys = await Entry.find({ user: user._id, year })

		return res.json({
			ok: true,
			entrys
		})
	} catch ( error ) {
		
		console.log('error', error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong!'
		})
	}
}

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
		
		const expenses = await Expense.find({ entry: entryId, user: user._id }).exec()
		const entry = await Entry.findOne({ _id: entryId, user: user._id })

		if( expenses.length > 0 && ( amount <= entry.amount ) ) {

			return res.status( 400 ).json({
				ok: false,
				msg: 'Para actualizar tu ingreso este debe ser mayor que el anterior'
			})
		}

		const newEntry = await Entry.findOneAndUpdate({ _id: entryId, user: user._id }, { $set: { amount } }, { new: true })

		return res.json({
			ok: true,
			msg: 'Ingreso actualizado',
			newEntry
		})
	} catch ( error ) {
		
		console.log('error', error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong!'
		})
	}
}