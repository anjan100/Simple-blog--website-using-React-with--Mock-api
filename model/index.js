// const { name } = require('ejs')
const {Sequelize,DataTypes} = require('sequelize')
const databaseConfig = require('../config/dbConfig')
const makeBlogTable = require('./blogModel')
const makeUserTable = require('./userModel')

const sequelize = new Sequelize(databaseConfig.db,databaseConfig.username,databaseConfig.password,{
    host : databaseConfig.host,
    port : databaseConfig.port,
    dialect :databaseConfig.dialect,
    operatorsAliases : false,
    pool:{
        max :5,
        min :0,
        acquire:3000,
        idle:10000
    }
})


sequelize.authenticate()
    .then(()=>{
        console.log("milyo hai un pss")
    })
    .catch((err)=>{
        console.log("error ayo",err)
    })

const db ={}
db.Sequelize=Sequelize
db.sequelize = sequelize

db.blogs = makeBlogTable(sequelize,DataTypes)
db.users = makeUserTable(sequelize,DataTypes)


db.sequelize.sync({force:false}).then(()=>{
    console.log("Synced done")
})

module.exports = db

// const me ={}
// me.name ="Manish"
// me.age = 22

// const me={
//     name: "Manish",
//     age: 22
// }