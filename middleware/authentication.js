const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = require('../config').key;

module.exports = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    const _id = jwt.verify(token, JWT_SECRET);

    const user = await User.findOne({ _id });
    if (!user) {
        return res.json({ status: 'auth_failed', message: "User Not Found" });
      }

    if (user) {
        req.token = token;
        req.user = user;
    }
    next();
  } catch (err) {
    return res.json({ status: 'auth_failed', error: err });
  }
};