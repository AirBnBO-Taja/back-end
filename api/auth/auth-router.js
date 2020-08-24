const router = require("express").Router();

const bcrypjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("./auth-model");

router.post("/register", (req, res) => {
  
  const credentials = {name, email, password}

  credentials = req.body;

  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypjs.hashSync(credentials.password, rounds);
  credentials.password = hash;

  Users.add(credentials)
    .then((user) => {
      const token = makeJwt(user);
      res.status(201).json({ data: user, token });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  Users.findBy({ email: email })
    .then((user) => {
      if (user && bcrypjs.compareSync(password, user.password)) {
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
