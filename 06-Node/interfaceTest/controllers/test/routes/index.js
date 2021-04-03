let express = require("express");
let router = express.Router();
router.get('/',(req,res)=>{
    res.send('index')
})
router.get('/a',(req,res)=>{
    res.send('a')
})
router.get('/:id',(req,res)=>{
    res.send( req.params)
})
router.get('/:id/edit',(req,res)=>{
    res.send('edit')
})

module.exports = router;
