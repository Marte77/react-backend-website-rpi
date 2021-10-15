const db = require('../models/bd')
const utilizador = require('../models/utilizador')
const ficheiros = require('../models/ficheiros')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const controllers = {}
const token_key = require('../token').token

controllers.login = async(req,res) =>{ //post
    db.sync()
    let {username, password} = req.body
    try{
        if (!(username && password)) {
            res.status(400).send("All input is required");
            return;
        }
        let user = await utilizador.findOne({
            where:{
                username:username
            }
        })

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({
                id_util:user.id_utilizador,username:username
            },
            token_key,
            {
                expiresIn: '2h',
            })
            
            res.status(200).send({success:true, utilizador:user,token:token})
        }
    }catch(err){
        console.log(err)
        res.status(400).send({success:false,err:err})
    }
} 

controllers.criar = async(req,res) =>{//post
    db.sync()
    let {username, password} = req.body
    if (!(username && password)) {
        res.status(400).send("All input is required");
        return;
    }
    
    const hash = await bcrypt.hash(password, 10);
    try{
        let user = await utilizador.findOne({
            where:{
                username:username
            }
        })
        if(user !== null)
            throw new Error('user already exists')
        var newUser = await utilizador.create({
            username:username,
            password:hash
        })
    }catch(err){
        res.status(400).send({success:false, err:err})
        return
    }
    res.status(201).send({success:true, util:newUser})
}

module.exports = controllers