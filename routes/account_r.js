const express = require('express');
const router = express.Router();

const accountFunc = require("../controller/accountController.js");

// account > insert
router.post('/', async (req, res) => {
    accountFunc.addAccount(req, res);
});

// account > update 
router.post('/modify/:accountId', async (req, res) => {
    accountFunc.updateAccount(req, res);
});

// account > delete
router.delete('/delete/:accountId', async (req, res) => {
    accountFunc.deleteAccount(req, res);
});

module.exports = router;