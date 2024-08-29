require('dotenv').config()
const express = require('express')
const { blogs } = require('./model/index')
const app = express()
// const app = require('express')()
// const multer = require('./middleware/multerConfig').multer
// const storage =require('./middleware/multerConfig').storage
const {multer,storage} = require('./middleware/multerConfig')
const upload = multer({storage : storage})

app.set('view engine','ejs')
require("./model/index")
//if diff tech react/node //app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    const data = {
        name : "Manish Basnet", 
        age : 22, 
        location : 'itahari'
    }
    const nepal = {
        continent : 'asia', 
    }
    res.render("home.ejs",{
        haha : data, 
        hehe : nepal
    })
})

app.get('/create',(req,res)=>{
    res.render('create.ejs')
})

app.post("/create", upload.single('image'),async (req,res)=>{
    console.log(req.body)
    // const title= req.body.title
    const {title,subtitle,description}= req.body
    await blogs.create({
        title :title,
        subtitle :subtitle,
        description : description
    })
    res.send("Blog added Successfullllllly")
})


app.get('/about',(req,res)=>{
    res.render('./test/about')
})
app.use(express.static('public/css/'))
app.listen(3000,()=>{
    console.log("Project starte node js")
})