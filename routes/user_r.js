const express = require('express');
const user = require('../models/user');
const router = express.Router();
const user_m = require("../models/user");

router.get('/', async (req, res) => {
    try {
        const user = await user_m.find();
        res.json(user);
    } catch(err) {
        res.json({ message: err });
    }

});

router.post('/', async (req, res) => {
    console.log(req.body);
    const user = new user_m({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const saveUser = await user.save();
        res.json(saveUser);
    } catch(err) {
        res.json({ message: err });
    }
  
});

router.get('/:userId', async (req, res) => {
    try { 
        const user = await user_m.findById(req.params.userId);
        res.json(user);
    } catch(err) {
        res.json({ message: err });
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const removedUser = await user_m.remove({ _id: req.params.userId });
        res.json(removedUser);
    } catch(err) {
        res.json({ message: err });
    }
});

module.exports = router;