var express= require('express');
var superagent = require('superagent');
var router = express.Router();


router.use('/peijianDS',(req,res,next)=>{
    console.log(req.query,'////////',req.body)
    req.body={'taskId':'2c905cc760056b840160056e10990001','partId':'2c905cc760056b840160056e11210006'};
    res.render('./pc/peijianDS',{dataList:req.body});
});

router.get('/mapMak',(req,res,next)=>{
    res.render('./mapForOther/mapMak',{dataList:req.body});
})
router.get('/relitu',(req,res,next)=>{
    res.render('./mapForOther/relitu',{dataList:req.body});
})
router.get('/getQmap',(req,res,next)=>{
    res.render('./mapForOther/mapQ.html',{dataList:req.body});

})
module.exports = router;