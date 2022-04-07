const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res
        .status(403)
        .json({ok:false, msg: "A token is required for authentication" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    const user = await jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    req.user = user;
  } catch (err) {
    res.status(401).json({ok:false, msg: "Invalid Token" });
  }
  return next();
};

module.exports = { verifyToken };