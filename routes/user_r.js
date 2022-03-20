const express = require('express');
const router = express.Router();

const user_m = require("../models/user");
const userFunc = require("../controller/userController.js");

router.get('/', async (req, res) => {
    try {
        const user = await user_m.find();
        res.json(user);
    } catch(err) {
        res.json({ message: err });
    }
});

// 회원 > 가입
router.post('/signup', async (req, res) => {
    userFunc.addUser(req, res);
});

// 회원 > 수정
router.put('/modify/:userId', async (req, res) => {
    userFunc.updateUser(req, res);
});

// 회원 > 수정페이지
/*
router.get('/modify', async (req, res) => {
    try { 
        const user = await user_m.findById(req.params.userId);
        res.json(user);
    } catch(err) {
        res.json({ message: err });
    }
});
*/

// 회원 > 탈퇴
router.delete('/delete/:userId', async (req, res) => {
    userFunc.deleteUser(req, res);
});

// 회원 > 로그인
router.post('/login', async (req, res) => {
    userFunc.login(req, res);
});

// 회원 > 로그아웃
router.post('/logout', async (req, res) => {
    return res.cookie("x_auth", "").json({ status: 'logout_success' });
});


module.exports = router;