const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET || "silence, I will kill you";

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err || decodedToken.role !== "client") {
        res.status(401).json({ warning: "No Access!" });
      } else {
        // token is good we can see the data inside the decodedToken
        req.jwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ you: "shall not pass!" });
  }
};
