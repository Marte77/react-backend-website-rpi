const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send({swag:'swag'})
})


module.exports = router