const { request, response } = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/User')


exports.isAuthenticated = async ( req = request, res = response, next ) => {

	const token = req.header('x-token')

	if( !token ) {

		return res.status( 401 ).json({
			ok: false,
			msg: 'Token inexistente'
		})
	}

	try {
		
		const { uid } = jwt.verify( token, process.env.JWT_SEED )
		const user = await User.findById({ _id: uid })

		req.user = user
	} catch ( error ) {
		
		console.log( error )
		if( error.message === 'jwt expired' ) {

			return res.status( 401 ).json({
				ok: false,
				msg: 'La sesión expiró',
				expiredAt: error.expiredAt
			})
		}

		return res.status( 501 ).json({
			ok: false,
			msg: 'Token no valido.'
		})
	}

	next()
}

exports.isAuthenticatedAndAdmin = async ( req = request, res = response, next ) => {

	const token = req.header('x-token')
	
	if( !token ) {

		return res.status( 401 ).json({
			ok: false,
			msg: 'Token inexistente'
		})
	}
	
	try {
		
		const role = 'admin'
		const { uid } = jwt.verify( token, process.env.JWT_SEED )
		const user = await User.findOne({ _id: uid, role })

		if( !user ) {

			return res.status( 401 ).json({
				ok: false,
				msg: 'Sin permisos'
			})
		}

		req.user = user
	} catch ( error ) {

		console.log( error )
		
		return res.status( 501 ).json({
			ok: false,
			msg: 'Token no valido.'
		})
	}

	next()
}