const express = require('express');
const router = express.Router();

const contactFunc = require("../controller/contactController.js");

// contact > insert
router.post('/add', async (req, res) => {
    contactFunc.addContact(req, res);
});

// contact > update 
router.put('/modify', async (req, res) => {
    contactFunc.updateContact(req, res);
});

// contact > delete
router.delete('/delete', async (req, res) => {
    contactFunc.deleteContact(req, res);
});

// contact > load
router.post('/load', async (req, res) => {
    contactFunc.loadContact(req, res);
});


module.exports = router;