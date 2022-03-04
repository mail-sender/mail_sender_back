const log = require('../config/logger');
const user_m = require("../models/user");
const common = require("../lib/common");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config').key;
const JWT_OPTIONS = require('../config').option;


// 회원 > 가입
exports.addUser = function(req, res) {
    user_m.findOne({email: req.body.email}, (err, user) => {
        if(user) {
            log.debug("존재하는 회원입니다."+req.body.email);
            log.debug("user: "+user);
           res.json({ message: "이미 존재하는 회원입니다."});
        } else {
            const user = new user_m({
                name: req.body.name,
                email: req.body.email,
                password: this.bcryptPassword(req.body.password),
                join_date: common.getCurrentDate()
            });
            try {
                log.debug("try");
                const saveUser = user.save();
                console.log(saveUser);
                res.json(saveUser);
            } catch(err) {
                log.debug("catch");
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

// 회원 > 로그인
exports.login = async function(req, res) {
    user_m.findOne({email: req.body.email}, (err, user) => {
        if (!user) {
            return res.json({ status: 'login_failed', message: 'Invalid username/password' })
        }
    
        // 암호화
        if (bcrypt.compare(req.body.password, user.password)) {
            // 로그인 성공
            const token = jwt.sign(
                {
                    _id: user._id,
                    username: user.username
                }, JWT_SECRET, JWT_OPTIONS
            )
    
            return res
            .cookie("x_auth", token, {
                maxAge: 1000 * 60 * 60 * 24 * 1, // 1일간 유지
                httpOnly: true,
            })
            .json({ status: 'login_success', data: token })
        }
        res.json({ status: 'login_failed', message: 'Invalid username/password' })
    });
}

// 비밀번호 암호화
exports.bcryptPassword = function(password) {
    return bcrypt.hashSync(password, 10);
}

