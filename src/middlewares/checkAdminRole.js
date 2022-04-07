const { ROLE_ADMIN } = require("../constants/constants");

const checkAdminRole = async (req, res, next) => {
  const { roleId = 0 } = req.user.user;
  if (roleId === ROLE_ADMIN) {
    return next();
  }
  res.status(403).json({ ok: false, msg: "Access Forbidden" });
};

module.exports = { checkAdminRole };
