const user_m = require("../models/user");
const common = require("../lib/common");
const bcrypt = require("bcrypt");

// 회원 > 가입
exports.addUser = function(req, res) {
    user_m.findOne({email: req.body.email}, (err, user) => {
        if(user) {
           res.json({ message: "이미 존재하는 회원입니다."});
        } else { 
            const user = new user_m({
                name: req.body.name,
                email: req.body.email,
                password: this.bcryptPassword(req.body.password),
                join_date: common.getCurrentDate()
            });
            try {
                const saveUser = user.save();
                res.json(saveUser);
            } catch(err) {
                res.json({ message: err });
            }
        }
    });
}

// 회원 > 수정
exports.updateUser = async function(req, res) {
    try {
        const updatedUser = await user_m.updateOne(
            { 
                _id: req.body.userId,
            },
            {
                $set: {
                    name: req.body.name,
                    password: this.bcryptPassword(req.body.password)
                }
            }
        );
    } catch(err) {
        res.json({ message: err });
    }
}

// 회원 > 탈퇴
exports.deleteUser = async function(req, res) {
    try {
        const removedUser = await user_m.remove({ _id: req.params.userId });
    } catch(err) {
        res.json({ message: err });
    }
}

// 비밀번호 암호화
exports.bcryptPassword = function(password) {
    return bcrypt.hashSync(password, 10);
}

// 비밀번호 복호화
exports.encryptPassword = function(password) {
    const encryptedPw = bcrypt.hashSync(password, 10);
    const same = bcrypt.compareSync(password, encryptedPw);
    return same; 
}


