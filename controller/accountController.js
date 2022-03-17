const log = require('../config/logger');
const user_m = require("../models/user");
const { default: mongoose } = require('mongoose');


// account > insert
exports.addAccount = async function(req, res) {

    var account_info = {
        _id: mongoose.Types.ObjectId(),
        account_name: req.body.account_name,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        smtp_server: req.body.smtp_server,
        port: req.body.port
    };
    
    try {
        await user_m.findOneAndUpdate(
            { _id: req.body.user_id },
            {
                $push: { accounts: account_info }
            }, { new: true }
        ).then(function(msg) {
            console.log("msg: "+msg);
        });
        res.json({ message: "Account 추가 완료" });
        
    } catch(err) {
        res.json({ message: "Account 추가 실패: " + err });
    }
}

// account > update 
exports.updateAccount = async function(req, res) {

    var account_updates = {
        _id: req.body.account_id,
        account_name: req.body.account_name,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        smtp_server: req.body.smtp_server,
        port: req.body.port
    };

    try {
        await user_m.findOneAndUpdate(
            { "_id": req.body.user_id, "account._id": req.body.account_id },
            { $set: { accounts: account_updates} },
            { new: true }
        ).then(function(msg) {
            console.log("msg: "+msg);
        });
        res.json({ message: "Account 업데이트 성공" });
    } catch(err) {
        res.json({ message: "Account 업데이트 실패: catch: err: " + err });
    }
}

// account > delete
exports.deleteAccount = async function(req, res) {

    try {
        await user_m.findOneAndUpdate(
            { "_id": req.body.user_id },
            { $pull: {
                'accounts': { '_id': req.body.account_id }
            } },
            { new: true, multi: true }
        ).then(function(msg) {
            console.log("msg: "+msg);
        });
        res.json({ message: "Account 삭제 성공" });
    } catch(err) {
        res.json({ message: "Account 삭제 실패: catch: err: " + err });
    }
}

// account > load
exports.loadAccount = async function(req, res) {
    user_m.findOne({_id: req.body.user_id}, '-_id accounts.account_name', (err, acct) => {
        res.json({ msg : acct })
        console.log("loadAccount: acct: "+acct);
    });
}