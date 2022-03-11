const log = require('../config/logger');
const account_m = require("../models/account");
const common = require("../lib/common");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config').key;
const JWT_OPTIONS = require('../config').option;


// account > insert
exports.addAccount = function(req, res) {
    const account = new account_m({
        user_id: req.body.user_id,
        account_name: req.body.account_name,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        smtp_server: req.body.smtp_server,
        port: req.body.port,
        account_date: common.getCurrentDate(),
    });
    try {
        const saveAccount = account.save();
        res.json({ message: common.getErrorCode("insert_success") });
    } catch(err) {
        res.json({ message: err });
    }
}

// account > update 
exports.updateAccount = async function(req, res) {
    try {
        const updatedAccount = await account_m.updateOne(
            { 
                _id: req.params.accountId,
            },
            {
                $set: {
                    account_name: req.body.account_name,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    smtp_server: req.body.smtp_server,
                    port: req.body.port
                }
            }
        );
        res.json({ message: common.getErrorCode("update_success") });
    } catch(err) {
        res.json({ message: err });
    }
}

// account > delete
exports.deleteAccount = async function(req, res) {
    try {
        const removedAccount = await account_m.deleteOne({ _id: req.params.accountId });
        res.json({ message: common.getErrorCode("delete_success") });
    } catch(err) {
        res.json({ message: err });
    }
}

// account > load
exports.loadAccount = async function(req, res) {
    account_m.findOne({user_id: req.body.user_id}, (err, acct) => {
        res.json({ msg : acct })
    });
}
