零代码生成测试服务器RESTFUL风格API工具

安装依赖
```
    cnpm i json-server -g
```

添加json文件 db.json (一个对象是一个接口，路径是属性名,内容必须是数组或者对象)
```
    {
    "comment": [
        {
            "id": 1,
            "a": 1,
            "b": 2
        },
        {
            "id": 2,
            "c": 3,
            "d": 4
        }
    ]
}
```

监听json文件
```
    json-server --watch db.json
```

按照提示打开浏览器 访问  http://localhost:3000/comment访问



