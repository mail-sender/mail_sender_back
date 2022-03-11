const account = require("../models/account");

module.exports = async (req, res, next) => {
    try {
      const _id = req.body.account_id;
      
  
      const sender = await account.findOne({ _id });
      if (!sender) {
          return res.json({ status: 'no_account', message: "account Not Found" });
        } else {
          req.body.sender = sender;
      }
      next();
    } catch (err) {
      return res.json({ status: 'no_account', error: err });
    }
  };