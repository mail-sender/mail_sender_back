const express = require('express');
const router = express.Router();

const auth = require("../middleware/authentication");
const acct = require("../middleware/account");
const mailFunc = require("../controller/mailController.js");




// mail > send
router.post('/send', acct, async (req, res) => {
    mailFunc.sendMail(req, res);
});


// Auth
/*
router.post('/', auth, acct, async (req, res) => {
    mailFunc.sendMail(req, res);
});
*/

module.exports = router;