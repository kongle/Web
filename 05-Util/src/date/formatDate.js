
/**
 * @description: 传入 YYYY-MM-DD 参数 自动格式转换
 * @param {*} date
 * @param {*} format
 * @return {*}
 */
function dateFormat( date, format ) {
    var days = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
    var o = {
        "M+" : date.getMonth()+1, // month
        "d+|D+" : date.getDate(),    // day
        "h+|H" : date.getHours(),   // hour
        'z+|Z' : days[ date.getDay() ], // day
        "m+" : date.getMinutes(), // minute
        "s+" : date.getSeconds(), // second
        "q+|Q" : Math.floor((date.getMonth()+3)/3),  // quarter
        "S" : date.getMilliseconds() // millisecond
    }
    if(/(y+)/i.test(format)) format=format.replace(RegExp.$1,
            (date.getFullYear()+"").substr(4- RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1,
                RegExp.$1.length==1? o[k] :
                        ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}

/**
 * @description: 未来时间点距离现在的时间; todo:剩余秒数
 * @param {*} time
 * @return {*}
 */
function getRemainTime( time ){
    var nowTime = +new Date();
    var inputTime = +new Date(time);
    var times = (inputTime - nowTime) / 1000;  // 剩余秒数
    var h = parseInt(times / 60 / 60 % 24);  // 不超过一天可以不余
    h = h < 10 ? '0' + h : h;
    var m = parseInt(times / 60 % 60);
    m = m < 10 ? '0' + m : m;
    var s = parseInt(times % 60);
    s = s < 10 ? '0' + s : s;

    return [ h, m, s ]
}

export default {
    dateFormat,
    getRemainTime
}



