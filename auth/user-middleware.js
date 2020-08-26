module.exports = {
  checkUser,
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
