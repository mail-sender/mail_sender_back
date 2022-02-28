require("moment-timezone");
var moment = require('moment');

// 현재시간을 한국시간으로 변환
exports.getCurrentDate = function(){
    moment.tz.setDefault("Asia/Seoul");
    var date = moment().format('YYYY-MM-DD HH:mm:ss');
    return date;
}