const router = require("express").Router();

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model");

const {validation} = require('./user-middleware')

router.post('/register', async (req, res, next) => {
	try {
		const { name, email, password } = req.body
		const user = await Users.findBy({ name }).first()
		if (user) {
			return res.status(409).json({
				message: 'User already taken'
			})
		}
		const newUser = await Users.add({
      name,
      email,
			password: await bcryptjs.hash(password, process.env.NODE_ENV === 'production' ? 10 : 1)
		})
		res.status(201).json(newUser)
	} catch (err) {
		next(err)
	}
})

router.post('/login', validation, async (req, res, next) => {
	try {
		const { name, email, password } = req.body
		const user = await Users.findBy({ email }).first()

		if (!user) {
			return res.status(400).json({
				message: 'Invalid Credentials'
			})
		}
		const passwordValid = await bcryptjs.compare(password, user.password)

		if (!passwordValid) {
			return res.status(400).json({
				message: 'Invalid Credentials'
			})
		}
		const payload = {
			userId: user.id,
			name: user.name,
			email: user.email,

		}
		
		const token = jwt.sign(payload, process.env.JWT_SECRET || 'silence, I will kill you')
		res.cookie('token', token)
		res.json({
			message: `Welcome ${user.name}!`,
			token: token
		})
	} catch (err) {
		next(err)
	}
})

module.exports = router;