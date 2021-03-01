const router = require('express').Router()


module.exports = () => {

	router.get('/', ( req, res ) => {
		res.send('Hola mundo')
	})

	return router
}