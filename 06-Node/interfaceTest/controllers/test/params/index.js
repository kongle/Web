module.exports = (req,res)=>{
    res.send({ getId: req.params.id });
};