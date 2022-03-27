const log = require('../config/logger');
const contact_m = require("../models/contact");
const { default: mongoose } = require('mongoose');
const { ObjectId } = require('bson');

// contact > insert
exports.addContactGroup = async function(req, res) {
    var group_info = {
        _id: ObjectId(),
        name: req.body.name
    }
    try {
        await contact_m.findOneAndUpdate(
            { 
                _id: ObjectId(req.body.contact_id) 
            },
            {
                $push: { 
                    groups : group_info 
                }
            }, 
            { new: true }
        ).then(function(msg) {
            console.log("msg: "+msg);
        });
        res.json({ message: "Contact group 추가 완료" });
    } catch(err) {
        res.json({ message: "Contact group 추가 실패: " + err });
    }
}

// contact > update 
exports.updateContactGroup = async function(req, res) {
    try {
        await contact_m.findOneAndUpdate(
            { 
                "_id": ObjectId(req.body.contact_id), 
                "groups" : { 
                    $elemMatch : { "_id" : ObjectId(req.body.group_id) } 
                }
            }, 
            { $set: 
                {
                    "groups.$.name" : req.body.name 
                }
            },
            { new: true }
        ).then(function(msg) {
            console.log("msg: "+msg);
        });
        res.json({ message: "contact > group 업데이트 성공" });
    } catch(err) {
        res.json({ message: "contact > group 업데이트 실패: catch: err: " + err });
    }
}

// contact > delete
exports.deleteContactGroup = async function(req, res) {
    try {
        await contact_m.findOneAndUpdate(
            { 
                "_id": ObjectId(req.body.contact_id),
                "groups" : { 
                    $elemMatch : { "_id" : ObjectId(req.body.group_id) } 
                }
            },
            { $pull: 
                {
                    "groups": {
                        "_id" : ObjectId(req.body.group_id)
                    }
                } 
            },
            { new: true }
        ).then(function(msg) {
            console.log("msg: "+msg);
        });
        res.json({ message: "contact > group 삭제 성공" });
    } catch(err) {
        res.json({ message: "contact > group 삭제 실패: catch: err: " + err });
    }
}

// contact > receiver > insert
exports.addContactGroupReceiver = async function(req, res) {
    try {
        await contact_m.findOneAndUpdate(
            { 
                "_id" : ObjectId(req.body.contact_id), 
                "groups" : { 
                    $elemMatch : { "_id" : ObjectId(req.body.group_id) } 
                }
            },
            {
                $push: { 
                    "groups.$.receivers" : {  
                        _id: ObjectId(),
                        email: req.body.email,
                        name: req.body.name 
                    },
                }
            }, { new: true }
        ).then(function(msg) {
            console.log("msg: "+msg);
        });
        res.json({ message: "Contact group > receivers 추가 완료" });
    } catch(err) {
        res.json({ message: "Contact group > receivers 추가 실패: " + err });
    }
}

// contact > receiver > update
exports.updateContactGroupReceiver = async function(req, res) {
    try {
        await contact_m.findOneAndUpdate(
            { 
                "_id" : ObjectId(req.body.contact_id), 
            },
            { $set: { 
                    "groups.$[idx0].receivers.$[idx1]": { 
                        _id : ObjectId(req.body.receiver_id),
                        email: req.body.email,
                        name: req.body.name, 
                    }
                } 
            }, 
            {
                arrayFilters: [
                    {
                        "idx0._id": ObjectId(req.body.group_id)
                    }, 
                    {
                        "idx1._id": ObjectId(req.body.receiver_id)
                    }
                ]
            }
        ).then(function(msg) {
            console.log("msg: "+msg);
        });
        res.json({ message: "contact > group > receivers 업데이트 성공" });
    } catch(err) {
        res.json({ message: "contact > group > receivers 업데이트 실패: catch: err: " + err });
    }
}

// contact > receiver > delete
exports.deleteContactGroupReceiver = async function(req, res) {
    try {
        await contact_m.findOneAndUpdate(
            { 
                "_id" : ObjectId(req.body.contact_id), 
            },
            { $pull: { 
                    "groups.$[idx0].receivers": {
                        _id : ObjectId(req.body.receiver_id),
                        email: req.body.email,
                        name: req.body.name, 
                    }
                } 
            }, 
            {
                arrayFilters: [
                    {
                        "idx0._id": ObjectId(req.body.group_id)
                    }, 
                    {
                        "idx1._id": ObjectId(req.body.receiver_id)
                    }
                ]
            }
        ).then(function(msg) {
            console.log("msg: "+msg);
        });
        res.json({ message: "contact > group > receivers 삭제 성공" });
    } catch(err) {
        res.json({ message: "contact > group > receivers 삭제 실패: catch: err: " + err });
    }
}

// contact > receiver > load
/*
exports.loadContactGroupReceiver = async function(req, res) {


}
*/