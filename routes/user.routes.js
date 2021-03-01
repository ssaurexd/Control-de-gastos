const router = require('express').Router()
const { body } = require('express-validator')
const validateInputs = require('../middlewares/validateInputs')
const { isAuthenticated } = require('../middlewares/auth')
const {
	SignIn, SignUp
} = require('../controllers/user.controller')


module.exports = () => {

	router.post('/users/signup',
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
	router.post('/users/signin', 
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

	/* Rutas de usuario con autenticacion
	-------------------------------------------------- */
	
	/* End of Rutas de usuario con autenticacion
	-------------------------------------------------- */

	return router
}