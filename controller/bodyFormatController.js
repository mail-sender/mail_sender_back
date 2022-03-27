const log = require('../config/logger');
const bodyFormat_m = require("../models/bodyFormat");
const user_m = require("../models/user");
const { default: mongoose } = require('mongoose');

// bodyFormat > insert
exports.addBodyFormat = async function(req, res) {
    var bodyFormat_info = {
        _id: mongoose.Types.ObjectId(),
        format_name: req.body.format_name,
        main_txt: req.body.main_txt
    };
    
    try {
        await user_m.findOneAndUpdate(
            { _id: req.body.user_id },
            {
                $push: { body_formats: bodyFormat_info }
            }, { new: true }
        ).then(function(msg) {
            console.log("msg: "+msg);
        });
        res.json({ message: "bodyFormat 추가 완료" });
    } catch(err) {
        res.json({ message: "bodyFormat 추가 실패: " + err });
    }
}

// bodyFormat > update 
exports.updateBodyFormat = async function(req, res) {
    var bodyFormat_updates = {
        _id: mongoose.Types.ObjectId(req.body.bodyformat_id), 
        format_name: req.body.format_name,
        main_txt: req.body.main_txt
    };
    try {
        await user_m.findOneAndUpdate(
            { "_id": req.body.user_id, "bodyformat._id": req.body.bodyformat_id },
            { $set: { body_formats: bodyFormat_updates} },
            { new: true }
        ).then(function(msg) {
            console.log("msg: "+msg);
        });
        res.json({ message: "bodyFormat 업데이트 성공" });
    } catch(err) {
        res.json({ message: "bodyFormat 업데이트 실패: catch: err: " + err });
    }
}

// bodyFormat > delete
exports.deleteBodyFormat = async function(req, res) {
    try {
        await user_m.findOneAndUpdate(
            { "_id": req.body.user_id },
            { $pull: {
                'body_formats': { '_id': req.body.bodyformat_id }
            } },
            { new: true, multi: true }
        ).then(function(msg) {
            console.log("msg: "+msg);
        });
        res.json({ message: "bodyFormat 삭제 성공" });
    } catch(err) {
        res.json({ message: "bodyFormat 삭제 실패: catch: err: " + err });
    }
}

// bodyFormat > load
exports.loadBodyFormat = async function(req, res) {
    user_m.findOne({ _id: req.body.user_id }, '-_id body_formats._id', (err, acct) => {
        res.json({ msg : acct })
        console.log("loadAccount: acct: "+acct);
    });
}