const router = require('express').Router()
const { body } = require('express-validator')
const validateInputs = require('../middlewares/validateInputs')
const { isAuthenticated } = require('../middlewares/auth')
const {
	createExpense, deleteExpense, updateExpense,
	getExpenses
} = require('../controllers/expense.controller')


module.exports = () => {

	router.get('/expense/:entryId',
		isAuthenticated,
		getExpenses
	)
	router.post('/expense/create/:entryId',
		isAuthenticated,
		[
			body('title').not().isEmpty().withMessage('El titulo es requerido'),
			body('hasInvoice').not().isEmpty().withMessage('Tiene factura es requerido'),
			body('amount').not().isEmpty().withMessage('El monto es requerido'),
			validateInputs
		],
		createExpense
	)
	router.delete('/expense/delete/:expenseId',
		isAuthenticated,
		deleteExpense
	)
	router.put('/expense/update/:expenseId',
		isAuthenticated,
		[
			body('title').not().isEmpty().withMessage('El titulo es requerido'),
			body('hasInvoice').not().isEmpty().withMessage('Tiene factura es requerido'),
			body('amount').not().isEmpty().withMessage('El monto es requerido'),
			validateInputs
		],
		updateExpense
	)

	return router
}