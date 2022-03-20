const express = require('express');
const router = express.Router();

const bodyFormatFunc = require("../controller/bodyFormatController.js");

// bodyFormat > insert
router.post('/add', async (req, res) => {
    bodyFormatFunc.addBodyFormat(req, res);
});

// bodyFormat > update 
router.put('/modify', async (req, res) => {
    bodyFormatFunc.updateBodyFormat(req, res);
});

// bodyFormat > delete
router.delete('/delete', async (req, res) => {
    bodyFormatFunc.deleteBodyFormat(req, res);
});

// bodyFormat > load
router.post('/load', async (req, res) => {
    bodyFormatFunc.loadBodyFormat(req, res);
});


module.exports = router;