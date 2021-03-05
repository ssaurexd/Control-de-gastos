const router = require('express').Router()
const { body } = require('express-validator')
const validateInputs = require('../middlewares/validateInputs')
const { isAuthenticated } = require('../middlewares/auth')
const {
	setEntry, updateEntry, getEntrys,
	getEntryById
} = require('../controllers/entry.controller')


module.exports = () => {

	router.get('/entry/:year', 
		isAuthenticated,
		getEntrys
	)
	
	router.get('/entry/:entryId', 
		isAuthenticated,
		getEntryById
	)
	
	router.post('/entry/create',
		isAuthenticated,
		[
			body('amount').not().isEmpty().withMessage('La cantidad es requeridad'),
			body('month').not().isEmpty().withMessage('El mes es requerido'),
			body('year').not().isEmpty().withMessage('El año es requerido'),
			validateInputs
		],
		setEntry
	)

	router.put('/entry/update/:entryId', 
		isAuthenticated,
		[
			body('amount').not().isEmpty().withMessage('La cantidad es requeridad'),
			validateInputs
		],
		updateEntry
	)

	return router
}