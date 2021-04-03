module.exports = (req,res)=>{
       res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-type');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
        res.header('Access-Control-Max-Age',1728000);//预请求缓存20天
        next();  
};