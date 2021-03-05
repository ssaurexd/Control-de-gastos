const router = require('express').Router()
const { body } = require('express-validator')
const validateInputs = require('../middlewares/validateInputs')
const { isAuthenticated } = require('../middlewares/auth')
const {
	SignIn, SignUp
} = require('../controllers/user.controller')


module.exports = () => {

	router.post('/user/signup',
		[
			body('email')
				.not().isEmpty().withMessage('El email es obligatorio')
				.isEmail().withMessage('Ingresa un email valido'),
			body('password')
				.not().isEmpty().withMessage('La contraseña es obligatoria'),
			body('name')
				.not().isEmpty().withMessage('El nombre es obligatorio').escape(),
			validateInputs
		], 
		SignUp
	)
	router.post('/user/signin', 
		[
			body('email')
				.not().isEmpty().withMessage('El email es obligatorio')
				.isEmail().withMessage('Ingresa un email valido'),
			body('password')
				.not().isEmpty().withMessage('La contraseña es obligatoria'),
			validateInputs
		],
		SignIn
	)

	return router
}