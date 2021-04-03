let formidable = require("formidable");
let fs = require("fs");
let path = require("path");


module.exports = (req,res)=>{
    var form = new formidable.IncomingForm();
    form.uploadDir = './public/upload';

    form.parse(req, function (err, fields, files) {
        if (err || !files.uploadFile || !files.uploadFile.name) {
            res.end("请上传文件");
        }
        // console.log(files);

        var extname = path.extname(files.uploadFile.name);
        fs.rename(files.uploadFile.path, files.uploadFile.path + extname, function (data) { });
        // console.log("上传了: " + files.uploadFile.name);

        res.write('received upload:\n\n');
        res.end(util.inspect({ fields: fields, files: files }));
    });
};