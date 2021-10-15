const {Sequelize, DataTypes} = require('sequelize')
const bd = require('./bd')
const utilizador = require('./utilizador')

bd.sync()
var ficheiros = bd.define('FICHEIROS',{
    id_ficheiro:{
        primaryKey:true,
        autoIncrement:true,
        type: DataTypes.INTEGER
    },
    nome_ficheiro:{
        type:DataTypes.TEXT,
        allowNull: false,
    },
    tipo_ficheiro:{
        type:DataTypes.STRING(10),
        allowNull: false,
    },
    path:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    tamanho_em_mb:{
        allowNull:false,
        type:DataTypes.DOUBLE,
    }
},{
    tableName:'FICHEIROS',
    timestamps: false,
    createdAt: false,
    updatedAt:false,
})

ficheiros.belongsTo(utilizador,{foreignKey: {
    name:'fk_id_util', 
    allowNull: false,
    type: Sequelize.INTEGER 
    }
})


module.exports = ficheiros 