
let ejs = require('ejs');

exports.router =  app=> {
    //跨域设置
    // app.all('*', require('./crossOrigin/index.js'));

    app.get('/', (req, res) => {
        res.send({ a: "index" })
    });

    app.get('/get', require('./get/index.js'));

    // 动态匹配参数
    app.get('/get/:id',  require('./params/index.js'));

    // jsonp测试
    app.get('/jsonp', require('./jsonp/index.js'));

    // 重定向
    app.get('/redirect', require('./redirect/index.js'));

    // 文件下载
    app.get('/download', require('./download/index.js'));

    // 普通post数据
    app.post('/post', require('./post/index.js'))

    // 文件上传 form-data
    app.post('/file', require('./file/index.js'))

    
    // 其他res方法
    // sendFle(必须绝对路径)
    app.get('/sendFile', require('./sendFile/index.js'))
    // 发送状态码
    app.get('/sendStatus', require('./sendStatus/index.js'))


    app.get('/ssr', ( req,res )=> {
        res.send(ejs.renderFile('./controllers/test/ssr/index.html', { arr: [3,4,5,6,8,9] }))
    })
}