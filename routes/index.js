const router = require('express').Router()
const users = require('./user.routes')


module.exports = () => {

	router.use( users() )

	return router
}