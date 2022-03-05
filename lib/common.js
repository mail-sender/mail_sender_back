require("moment-timezone");
var moment = require('moment');

// 현재시간을 한국시간으로 변환
exports.getCurrentDate = function(){
    moment.tz.setDefault("Asia/Seoul");
    var date = moment().format('YYYY-MM-DD HH:mm:ss');
    return date;
}

// 오류코드
exports.getErrorCode = function(code){
    var message = "";
    switch(code) {
        case "insert_success" : {
            message = "추가되었습니다!";
            break;  
        }
        case "update_success" : {
            message = "수정되었습니다!";
            break;
        }
        case "delete_success" : {
            message = "삭제되었습니다!";
            break;
        }
        case "user_exist"  : {
            message = "이미 존재하는 회원입니다!";
            break;
        }
        case "account_exist" : {
            message = "이미 존재하는 계정입니다!";
            break;
        }
        case "user_login_fail" : {
            message = "아이디, 비밀번호를 잘못 입력하셨습니다. 다시 확인해주세요."
            break;
        }
        default : {
            message = "";
            break;
        }
    }

    return message;
}