const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const utilizador = require('../models/utilizador')

//https://www.bacancytechnology.com/blog/file-upload-using-multer-with-nodejs-and-express
const imageStorage = multer.diskStorage({
    destination: '/serverNodeJS/discos/discoSeagate1TB/Fotos/fotos_vindas_do_website',
    filename: (req,file,cb) =>{
        console.log('boas')
        let data = new Date()
        let extname = path.extname(file.originalname)
        let nome = file.originalname.split(extname)[0]
        cb(null, nome+ '_' + file.fieldname + '_' + data.toISOString()+ extname)
    }
})
const imageUpload = multer({ //isto serve de middleware para colocar limites nos uploads de imagens e outros filtros
    storage: imageStorage,
    limits:{
        fileSize: 10000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req,file,cb){
        console.log('VA LA POR FAVOR')
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            return cb(new Error('Not image or supported file. Supported files: png|jpg|jpeg'))
        }
        cb(undefined,true)
    }
})


router.get('/',(req,res)=>{
    res.send('gangsta sawg')
})
module.exports = router