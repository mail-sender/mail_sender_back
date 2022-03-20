const log = require('../config/logger');
const contact_m = require("../models/contact");
const { default: mongoose } = require('mongoose');

// contact > insert
exports.addContact = async function(req, res) {
    contact_m.findOne({_id: mongoose.Types.ObjectId(req.body.user_id) }, (err, contact) => {
        if(contact) {
          
        } else {
            const contact = new contact_m({
                _id: mongoose.Types.ObjectId(req.body.user_id),
            });
            try {
                const saveContact = contact.save();
                res.json({ message: "Contact _id 추가 완료" });
            } catch(err) {
                res.json({ message: err });
            }
        }
    });

    var group_info = {
        _id: mongoose.Types.ObjectId(),
        name: req.body.name
    }

    try {
        await contact_m.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.body.user_id) },
            {
                $push: { 
                    group: group_info 
                }
            }, { new: true }
        ).then(function(msg) {
            console.log("msg: "+msg);
        });
        res.json({ message: "Contact 추가 완료" });
    } catch(err) {
        res.json({ message: "Contact 추가 실패: " + err });
    }
}

// contact > update 
exports.updateContact = async function(req, res) {
    var group_info = {
        _id: mongoose.Types.ObjectId(req.body.group_id),
        name: req.body.name
    }
    try {
        await contact_m.findOneAndUpdate(
            { "_id": mongoose.Types.ObjectId(req.body.user_id), "groups._id" : mongoose.Types.ObjectId(req.body.group_id) }, 
            { $set: { group : group_info } },
            { new: true }
        ).then(function(msg) {
            console.log("msg: "+msg);
        });
        res.json({ message: "contact > group 업데이트 성공" });
    } catch(err) {
        res.json({ message: "contact > group  업데이트 실패: catch: err: " + err });
    }
}

// contact > delete
exports.deleteContact = async function(req, res) {
    try {
        await contact_m.findOneAndUpdate(
            { "_id": mongoose.Types.ObjectId(req.body.user_id) },
            { $pull: {
                'group': { '_id': mongoose.Types.ObjectId(req.body.group_id) }
            } },
            { new: true, multi: true }
        ).then(function(msg) {
            console.log("msg: "+msg);
        });
        res.json({ message: "contact > group 삭제 성공" });
    } catch(err) {
        res.json({ message: "contact > group 삭제 실패: catch: err: " + err });
    }
}