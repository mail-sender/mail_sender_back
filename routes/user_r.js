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
router.post('/', async (req, res) => {
    userFunc.addUser(req, res);
});

// 회원 > 수정
router.post('/modify', async (req, res) => {
    req.body.userId = "621b771ef7a28eb24dfc745f"; // session으로 _id 담아야함, 로그인 작업할 때 ㄱㄱ
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
router.delete('/:userId', async (req, res) => {
    userFunc.deleteUser(req, res);
});

module.exports = router;