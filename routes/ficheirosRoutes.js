const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path')
const fichContr = require('../controllers/ficheiros');
const utilizador = require('../models/utilizador');
const ficheiros = require('../models/ficheiros');
const middlewarejwt = require('./middleware')
router.post('/upload_uma_img',fichContr.imageUpload.single('image'),async (req,res)=>{
    let file = req.file
    let body = req.body
    let idutil = body.utilizador.dataValues.id_utilizador
    
    let ficheiro = await ficheiros.create({
        nome_ficheiro:file.filename,
        tipo_ficheiro:path.extname(file.originalname),
        path:file.path,
        tamanho_em_mb:(file.size/1024/1024),
        fk_id_util:idutil
    })

    res.status(201 ).send({success:true, fich:ficheiro})
},(error,req,res,next)=>{
    res.status(400).send({success:false, err:error.message})
})

router.post('/uploadBulkImg',middlewarejwt,fichContr.imageUpload.array('images',20),async (req,res)=>{
    let idutil = req.body.utilizador.dataValues.id_utilizador
    let ficharray = new Array()
    for(let fich of req.files){
        ficharray.push(
            await ficheiros.create({
                nome_ficheiro:fich.filename,
                tipo_ficheiro:path.extname(fich.originalname),
                path:fich.path,
                tamanho_em_mb:(fich.size/1024/1024),
                fk_id_util:idutil
            }))
    }
    res.status(201).send({success:true, fich:ficharray})


}, (error, req, res, next) => {
    res.status(400).send({ success:false, err: error.message })
})

router.get('/lista_imagens/:username'/*,middlewarejwt*/,fichContr.get_lista_imagens)

router.use([middlewarejwt,express.static('/serverNodeJS/discos/discoSeagate1TB/Fotos/fotos_vindas_do_website')])


module.exports=router


