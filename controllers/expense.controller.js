const { request, response } = require('express');
const Expense = require('../models/Expense')
const Entry = require('../models/Entry')


exports.createExpense = async ( req = request, res = response ) => {

	const { title, amount, invoice, hasInvoice } = req.body
	const { user } = req
	const { entryId } = req.params

	try {
		
		const expense = new Expense({
			title,
			amount: parseInt( amount ),
			hasInvoice,
			invoice: hasInvoice ? invoice : '',
			entry: entryId,
			user: user._id
		})
		const entry = await Entry.findOne({ _id: entryId, user: user._id })

		if( entry.amount < expense.amount ) {

			return res.status( 400 ).json({
				ok: false,
				msg: 'Fondos insuficientes',
				entryAmount: entry.amount
			})
		}

		const total = entry.amount - expense.amount

		await expense.save()
		await entry.updateOne({ $set: { amount: total }})
	} catch ( error ) {

		console.log('error', error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong!'
		})
	}

	return res.json({
		ok: true,
		msg: 'Egreso creado'
	})
}

exports.getExpenses = async ( req = request, res = response ) => {
	
	const { entryId } = req.params 
	const { user } = req

	try {
		
		const expenses = await Expense.find({ entry: entryId, user: user._id })
									  .select(['-entry', '-user', '-updatedAt', '-__v'])								
									  .exec()
		
		return res.json({
			ok: true,
			expenses
		})
	} catch ( error ) {
		
		console.log('error', error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong!'
		})
	}
}

exports.updateExpense = async ( req = request, res = response ) => {

	const { title, amount, invoice, hasInvoice } = req.body
	const { expenseId } = req.params
	const { user } = req

	try {
		
		const expense = await Expense.findOne({ _id: expenseId, user: user._id })
		const entry = await Entry.findOne({ _id: expense.entry, user: user._id })
		let total = entry.amount

		if( expense.amount !==  parseInt( amount ) ) {

			if( entry.amount < parseInt( amount ) ) {

				return res.status( 400 ).json({
					ok: false,
					msg: 'Fondos insuficientes',
					entryAmount: entry.amount
				})
			} else {
				
				if( expense.amount > parseInt( amount ) ) {
					
					const diference = expense.amount - parseInt( amount )

					total = entry.amount + diference
					await entry.updateOne({ $set: { amount: total } }, { new: true })
				} else {
					
					const diference = parseInt( amount ) - expense.amount

					total = entry.amount - diference
					await entry.updateOne({ $set: { amount: total } }, { new: true })
				}
			}
		}
		
		await expense.updateOne({ $set: {
			title,
			amount: parseInt( amount ),
			hasInvoice,
			invoice: hasInvoice ? invoice : ''
		}})

		return res.json({
			ok: true,
			msg: 'Egreso actualizado',
			newEntryAmount: total
		})
	} catch (error) {
		
		console.log('error', error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong!'
		})
	}
}

exports.deleteExpense = async ( req = request, res = response ) => {

	const { expenseId } = req.params
	const { user } = req

	try {
		
		/* TODO: Eliminar factura */
		const expense = await Expense.findOneAndDelete({ _id: expenseId, user: user._id })
		const entry = await Entry.findOne({ _id: expense.entry, user: user._id })
		const total = entry.amount + expense.amount

		await entry.updateOne({ $set: { amount: total }})

		return res.json({
			ok: true,
			msg: 'Egreso eliminado',
			newEntryAmount: entry.amount
		})
	} catch ( error ) {
		
		console.log('error', error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong!'
		})
	}
}