var strategies = {
    isNoEmpty: function (value, errorMsg) {
        if (value === '') {
            return errorMsg;
        }
    },
    isNoSpace: function (value, errorMsg) {
        if (value.trim() === '') {
            return errorMsg;
        }
    },
    minLength: function (value, length, errorMsg) {
        if (value.trim().length < length) {
            return errorMsg;
        }
    },
    maxLength: function (value, length, errorMsg) {
        if (value.length > length) {
            return errorMsg;
        }
    },
    isMobile: function (value, errorMsg) {
        if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[7]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)) {
            return errorMsg;
        }                
    }
}

// 验证类
var Validator = function() {
    this.cache = [];
}

Validator.prototype.add = function(dom, rules) {
    var self = this;
    for(var i = 0, rule; rule = rules[i++];) {
        (function(rule) {
           var strategyAry = rule.strategy.split(':');
           var errorMsg = rule.errorMsg;

           self.cache.push(function() {
                var strategy = strategyAry.shift();
                strategyAry.unshift(dom.value);
                strategyAry.push(errorMsg);
                return strategies[strategy].apply(dom, strategyAry);
           })
           
        })(rule)
    }
};

Validator.prototype.start = function() {
    for(var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
        var errorMsg = validatorFunc();
        if (errorMsg) {
            return errorMsg;
        }
    }
};


var validataFunc = function() {
    var validator = new Validator();
    
    validator.add(registerForm.userName, [{
        strategy: 'isNoEmpty',
        errorMsg: '用户名不可为空'
    }, {
        strategy: 'isNoSpace',
        errorMsg: '不允许以空白字符命名'
    }, {
        strategy: 'minLength:2',
        errorMsg: '用户名长度不能小于2位'
    }]);

    validator.add(registerForm.password, [ {
        strategy: 'minLength:6',
        errorMsg: '密码长度不能小于6位'
    }]);

    validator.add(registerForm.phoneNumber, [{
        strategy: 'isMobile',
        errorMsg: '请输入正确的手机号码格式'
    }]);

    var errorMsg = validator.start();

    return errorMsg;
}


    var errorMsg = validataFunc();
   
    console.log(errorMsg);
       
