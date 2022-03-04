const jwt = require("jsonwebtoken");

exports.validateCookie = async (req, res, next) => {
  if (!req.cookies.token_cookie)
    return res.status(403).json({ errMsg: "not authenticated!" });

  const verifiedUser = jwt.verify(req.cookies.token_cookie, process.env.JWT_SECRET)
  req.verifiedUser = verifiedUser;
  next();
};
