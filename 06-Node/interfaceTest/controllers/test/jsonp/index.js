

module.exports = (req,res)=>{
    let data = { data: 'jsonp' };
    res.send(`${req.query.cb}(${JSON.stringify(data)})`)
    // res.jsonp(data);
};