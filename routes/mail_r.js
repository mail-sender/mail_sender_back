const express = require('express');
const router = express.Router();

const auth = require("../middleware/authentication");

router.post('/', auth, async (req, res) => {
    // authentication success
    // send mail here

    res.json({ status: 'auth_success' });
});

module.exports = router;