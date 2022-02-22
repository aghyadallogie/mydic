const jwt = require("jsonwebtoken");

exports.validateCookie = async (req, res, next) => {
  console.log(req.headers.cookie);
  console.log(req.headers.cookies);
  console.log(req.cookies);
  const { cookies } = req;
  if (!cookies.userId)
    return res.status(403).json({ errMsg: "not authenticated!" });

  console.log(cookies);
  // const decoded = jwt.verify()
  next();
};
