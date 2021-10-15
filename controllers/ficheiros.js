const db = require('../models/bd')
const utilizador = require('../models/utilizador')
const ficheiros = require('../models/ficheiros')
const multer = require('multer')
const path = require('path')
const controllers = {}

//https://www.bacancytechnology.com/blog/file-upload-using-multer-with-nodejs-and-express
controllers.imageStorage = multer.diskStorage({
    destination: '/serverNodeJS/discos/discoSeagate1TB/Fotos/fotos_vindas_do_website',
    filename: (req,file,cb) =>{
        let data = new Date()
        let extname = path.extname(file.originalname)
        let nome = file.originalname.split(extname)[0]
        cb(null, nome + '_' + file.fieldname + '_' + data.toISOString() + extname)
    }
})
controllers.imageUpload = multer({ //isto serve de middleware para colocar limites nos uploads de imagens
    storage: controllers.imageStorage,
    limits:{
        fileSize: 10000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req,file,cb){
        return utilizador.findOne({
            where:{
                username:req.body.username
            }
        }).then(resultado =>{
            if(resultado === null)
                return cb(new Error('utilizador nao existe'))
            if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
                return cb(new Error('Not image or supported file. Supported files: png|jpg|jpeg'))
            }
            req.body.utilizador = resultado
            return cb(undefined,true)
        })
        
        
    }
})

controllers.get_numero_imagens = async(req,res)=>{

}

controllers.get_lista_imagens = async(req,res)=>{
    let {username} = req.params
    try {
        let user = await utilizador.findOne({
            where:{
                username:username
            }
        })
        if(user === null)
            throw new Error('User doesnt exist')
        let fichs = await ficheiros.findAll({
            where:{
                fk_id_util:user.id_utilizador
            }
        })
        if(fichs.length !==0 )
            res.send({success:true,ficheiros:fichs})
        else throw new Error('User doesnt have files')    
    } catch (error) {
        res.status(404).send({success:false, err:error.toString()})
        return
    }
}


module.exports = controllers