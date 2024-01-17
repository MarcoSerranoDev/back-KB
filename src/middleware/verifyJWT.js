const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Bad token" });

  const token = authHeader.split(" ")[1];
  // console.log(token);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // console.log(err);
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded.username;
    req.roles = decoded.roles;
    next();
  });
};

module.exports = verifyJWT;
