const jwt = require("jsonwebtoken");
const token_key = require('../token').token

const verifyToken = (req,res,next) =>{
    const token = req.body.token || req.params.token || req.query.token || req.headers["x-access-token"]

    if(!token){
        return res.status(403).send({success:false, err:"lack of auth token"})
    }

    try{
        const decoded = jwt.verify(token,token_key)
        req.user_auth = decoded;
    }catch(err){
        return res.status(401).send({success:false, err:"invalid token"})
    }
    return next()
}
module.exports = verifyToken