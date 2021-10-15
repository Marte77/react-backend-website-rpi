const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const rotas = require('./routes/rotas')
const utilRoutes = require('./routes/utilizadorRoutes')
const fichRoutes = require('./routes/ficheirosRoutes')
const cors = require('cors')

app.set('port', 8080)

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://martinho.dynip.sapo.pt');
    res.header('Access-Control-Allow-Headers', 'x-access-token,Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}); 
app.use(cors())
//app.use('/',rotas)
app.use('/imagens/', fichRoutes)
app.use('/utilizadores/', utilRoutes)


app.listen(app.get('port'),()=>{
    console.log("Comecei. Port = "+app.get('port'))
    console.log("Para acessar API por fora usar a porta 1024")
})