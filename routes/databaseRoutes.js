const express = require('express')
const router = express.Router()

router.get('/teste',(req,res)=>{
    let a = maria("select * from UTILIZADORES;")
    a.then(ress => {
        console.log(ress);
        res.send({res:ress})
    }).catch(err => 
        res.send({err:true,res:err}
    ))
})


module.exports = router;