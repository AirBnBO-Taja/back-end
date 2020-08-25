const router = require("express").Router();

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("./auth-model");

// router.post("/register", (req, res) => {
  
//   const {name, email, password} = req.body
//   const rounds = process.env.BCRYPT_ROUNDS || 8;
//   const hash = bcrypjs.hashSync(password, rounds);
//   password  = hash

//   Users.add(name, email, hash)
//     .then((user) => {
//       const token = makeJwt(user);
//       res.status(201).json({ data: user, token });
//     })
//     .catch((error) => {
//       res.status(500).json({ message: error.message });
//     });
// });
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

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  Users.findBy({ email: email })
    .then((user) => {
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = makeJwt(user);
        res
          .status(200)
          .json({ message: "Welcome to Air BnB Api", token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// router.post('/login', async (req, res, next) => {
// 	try {
// 		const { name, email, password } = req.body
// 		const user = await Users.findBy({ name }).first()

// 		if (!user) {
// 			return res.status(400).json({
// 				message: 'Invalid Credentials'
// 			})
// 		}
// 		const passwordValid = await bcrypt.compare(password, user.password)

// 		if (!passwordValid) {
// 			return res.status(400).json({
// 				message: 'Invalid Credentials'
// 			})
// 		}
// 		const payload = {
// 			userId: user.id,
// 			name: user.name,
// 			email: user.email,

// 		}
// 		const token = jwt.sign(payload, process.env.JWT_SECRET || 'silence, I will kill you')
// 		res.cookie('token', token)
// 		res.json({
// 			message: `Welcome ${user.name}!`,
// 			token: token
// 		})
// 	} catch (err) {
// 		next(err)
// 	}
// })


const makeJwt = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
    // role: user.role, // don't think I need roll
  };

  const secret = process.env.JWT_SECRET || "silence, I will kill you";

  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, secret, options);
};

module.exports = router;
