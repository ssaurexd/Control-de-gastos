const router = require('express').Router()
const { body } = require('express-validator')
const validateInputs = require('../middlewares/validateInputs')
const { isAuthenticated } = require('../middlewares/auth')
const {
	setEntry, updateEntry
} = require('../controllers/entry.controller')


module.exports = () => {

	router.post('/create-entry',
		isAuthenticated,
		[
			body('amount').not().isEmpty().withMessage('La cantidad es requeridad'),
			body('month').not().isEmpty().withMessage('El mes es requerido'),
			body('year').not().isEmpty().withMessage('El año es requerido'),
			validateInputs
		],
		setEntry
	)

	router.put('/create-entry/:entryId', 
		isAuthenticated,
		[
			body('amount').not().isEmpty().withMessage('La cantidad es requeridad'),
			validateInputs
		],
		updateEntry
	)

	return router
}