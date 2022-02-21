exports.validateCookie = async (req, res, next) => {
  const { cookies } = req;
  if (!cookies.userid)
    return res.status(403).json({ errMsg: "not authenticated!" });
  next();
};
