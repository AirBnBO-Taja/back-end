module.exports = {
  checkUser,
  validation,
};

function checkUser(user) {
  return (req, res, next) => {
    if (req.decodedToken === !null) {
      next();
    } else {
      res.status(403).json({ message: "You are not authorized" });
    }
  };
}

function validation(req, res, next) {
	if (req.body && req.body.email && req.body.password) {
		next()
	} else {
		res.status(400).json({ message: 'Username or password not entered' })
	}
}
