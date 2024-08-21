// const { name } = require('ejs')
const {Sequelize,DataTypes} = require('sequelize')

const sequelize = new Sequelize('haha','root','',{
    host : '127.0.0.1',
    port : 3306,
    dialect :'mysql',
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