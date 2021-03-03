const router = require('express').Router()
const users = require('./user.routes')
const entrys = require('./entry.routes')
const expenses = require('./expense.routes')
const listsShop = require('./listShop.routes')


module.exports = () => {

	router.use( users() )
	router.use( entrys() )
	router.use( expenses() )
	router.use( listsShop() )

	return router
}