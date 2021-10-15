const {Sequelize} = require('sequelize')

const bd = new Sequelize(
    'base_dados_website',
    process.env.base_dados_mariadb_login, 
    process.env.base_dados_mariadb_pw, {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
})

async function f(){
    try {
        await bd.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
f()

module.exports = bd;