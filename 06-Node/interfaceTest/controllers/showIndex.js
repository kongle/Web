var math = require("../models/math");

exports.showIndex = function(req,res){
    res.render("showIndex",{data:math.calc()})
}