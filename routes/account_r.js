const express = require('express');
const router = express.Router();

const accountFunc = require("../controller/accountController.js");

// account > insert
router.post('/add', async (req, res) => {
    accountFunc.addAccount(req, res);
});

// account > update 
router.put('/modify', async (req, res) => {
    accountFunc.updateAccount(req, res);
});

// account > delete
router.delete('/delete', async (req, res) => {
    accountFunc.deleteAccount(req, res);
});

// account > load
router.post('/load', async (req, res) => {
    accountFunc.loadAccount(req, res);
});


module.exports = router;