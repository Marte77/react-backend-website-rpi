const {Sequelize, DataTypes} = require('sequelize')
const bd = require('./bd')

bd.sync()
var utilizador = bd.define('UTILIZADORES',{
    id_utilizador:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type:DataTypes.TEXT,
        allowNull: false,
    },
    password:{
        type:DataTypes.TEXT,
        allowNull: false,
    },
    data_criacao:{
        type:DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW
    }
},{
    tableName:'UTILIZADORES',
    timestamps: false,
    createdAt: false,
    updatedAt:false,
})



module.exports = utilizador