const { validationResult } = require("express-validator");

const validateErrors = (req, res, next) => {
  const errors = validationResult(req);
  const errorsArr = errors.array();
  if (!errors.isEmpty()) {
    for (key in errorsArr) {
      delete errorsArr[key].location;
      delete errorsArr[key].value;
    }
    return res.status(422).json({ ok: false, errors: errorsArr });
  }
  next();
};

module.exports = {
  validateErrors,
};
