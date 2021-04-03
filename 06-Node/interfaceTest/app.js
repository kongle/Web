let express = require("express");
let url = require("url");
let fs = require("fs");
let path = require("path");
let util = require("util");
let body = require("body-parser");

let routers = require('./controllers/test/index');
let expressRouter = require('./controllers/test/routes/index');
let app = express();

app.use(body.urlencoded({    
    extended:true,   //扩展模式
    limit:200        //限制数据大小 byte
}));

routers.router(app);


app.use('/express',expressRouter)


// 静态文件处理必须放在后面
app.use(express.static("./public/ftp"))
app.listen(8000);