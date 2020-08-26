const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // add code here to verify users are logged in
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET || "big secret";
  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ you: "cannot pass" });
      } else {
        req.decodedToken = decodedToken;

        next();
      }
    });
  } else {
    res.status(402).json({ message: "Please provide login credentials" });
  }
};
