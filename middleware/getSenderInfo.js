const user_m = require("../models/user");

module.exports = async (req, res, next) => {
  // mail 발송 전 user_id, account_id 이용해서 sender 정보 로드하기.
    try {
      const user_id = req.body.user_id;
      const account_id = req.body.account_id;
      var index = account_id-1;

      console.log("user_id: "+user_id);
      console.log("account_id: "+account_id);
  
      var results = await user_m.findOne({ _id: user_id });
      var element = results.accounts[index];

      if (!element) {
          return res.json({ status: 'no_account', message: "account Not Found" });
        } else {
          req.body.sender = element;
      }
      next();
    } catch (err) {
      return res.json({ status: 'no_account', error: err });
    }
  };