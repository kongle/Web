module.exports = (req,res)=>{
    res.sendFile(path.resolve(__dirname, './public/ftp/1.html'));
};