const router = require('express').Router()
const { body } = require('express-validator')
const validateInputs = require('../middlewares/validateInputs')
const { isAuthenticated } = require('../middlewares/auth')
const {
	getListsShop
} = require('../controllers/listShop.controller')


module.exports = () => {

	router.get('/listshop/:entryId', 
		isAuthenticated,
		getListsShop
	)
	
	router.post('/listshop/create/:entryId', 
		isAuthenticated,
		getListsShop
	)

	return router
}