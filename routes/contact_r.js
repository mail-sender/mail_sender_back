const express = require('express');
const router = express.Router();

const contactFunc = require("../controller/contactController.js");

// contact > insert
router.post('/add', async (req, res) => {
    contactFunc.addContactGroup(req, res);
});

// contact > update 
router.put('/modify', async (req, res) => {
    contactFunc.updateContactGroup(req, res);
});

// contact > delete
router.delete('/delete', async (req, res) => {
    contactFunc.deleteContactGroup(req, res);
});

// contact > load
router.post('/load', async (req, res) => {
    contactFunc.loadContactGroup(req, res);
});

// contact > receiver > insert
router.post('/receiver/add', async (req, res) => {
    contactFunc.addContactGroupReceiver(req, res);
});

// contact > receiver > update 
router.put('/receiver/modify', async (req, res) => {
    contactFunc.updateContactGroupReceiver(req, res);
});

// contact > receiver > delete
router.delete('/receiver/delete', async (req, res) => {
    contactFunc.deleteContactGroupReceiver(req, res);
});

// contact > receiver > load
router.post('/receiver/load', async (req, res) => {
    contactFunc.loadContactGroupReceiver(req, res);
});


module.exports = router;