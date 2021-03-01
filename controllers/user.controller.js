const { request, response } = require('express');
const bcrypt = require('bcrypt')
const User = require('../models/User')
const setJWT = require('../helpers/setJWT')


exports.SignUp = async ( req = request, res = response ) => {

	const { email, password, name } = req.body

	try {
		
		let user = await User.findOne({ email })

		if( user ) {

			return res.status( 400 ).json({
				ok: false,
				msg: 'El correo ya está registrado.'
			})
		}

		user = new User({ email, password, name })
		user.encryptPassword( password )
		await user.save()

		const token = await setJWT(user._id,{
			name: user.name,
			email: user.email
		})

		res.json({
			ok: true,
			token
		})

	} catch ( error ) {
		
		console.log( error )

		res.status( 500 ).json({
			ok: false
		})
	}
}

exports.SignIn = async ( req = request, res = response ) => {

	const { email, password } = req.body

	try {
		
		const user = await User.findOne({ email, active: true })

		if( !user ) {

			return res.status( 400 ).json({
				ok: false,
				msg: 'El correo aún no está registrado.'
			})
		}

		/* Verificar contraseña */
		const passwordIsCorrect = bcrypt.compareSync( password, user.password )

		if( !passwordIsCorrect ) {

			return res.status( 400 ).json({
				ok: false,
				msg: 'Contraseña incorrecta.'
			})
		}
	
		const token = await setJWT(user._id,{
			name: user.name,
			email: user.email
		})

		res.json({
			ok: true,
			token
		})

	} catch ( error ) {
		
		console.log( error )

		res.status( 500 ).json({
			ok: false,
			msg: 'Oop! Something went wrong.'
		})
	}
}