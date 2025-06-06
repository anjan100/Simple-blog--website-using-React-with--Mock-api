require('dotenv').config()
const express = require('express')
const { blogs,sequelize, users } = require('./model/index')
const app = express()
// const app = require('express')()
// const multer = require('./middleware/multerConfig').multer
// const storage =require('./middleware/multerConfig').storage
const {multer,storage} = require('./middleware/multerConfig')
const upload = multer({storage : storage})
const bcrypt =require('bcrypt')

app.set('view engine','ejs')
require("./model/index")
//if diff tech react/node //app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",async (req,res)=>{
    const datas = await blogs.findAll() // select * from blogs returns array 
   
    res.render("home",{blogs : datas})
 })
// app.get('/',(req,res)=>{
//     const data = {
//         name : "Manish Basnet", 
//         age : 22, 
//         location : 'itahari'
//     }
//     const nepal = {
//         continent : 'asia', 
//     }
//     res.render("home.ejs",{
//         haha : data, 
//         hehe : nepal
//     })
    
// })

app.get("/blog/:id",async (req,res)=>{
    const id = req.params.id
    // console.log(id)
    const blog = await blogs.findByPk(id) //return object

    res.render("singleBlog.ejs",{blog : blog})
})

app.get("/delete/:id",async (req,res)=>{
    const id =req.params.id
   await blogs.destroy({
        where :{
            id : id
        }
    })
    // res.send("Blog Deleted")
    res.redirect("/")
})


app.get('/create',(req,res)=>{
    res.render('create.ejs')
})

app.post("/create", upload.single('image'),async (req,res)=>{
    // console.log(req.body)
    // const title= req.body.title
    const filename =req.file.filename
    const {title,subtitle,description}= req.body
    await blogs.create({
        title :title,
        subtitle :subtitle,
        description : description,
        image : filename
    })
    res.send("Blog added Successfullllllly")
})


app.get('/about',(req,res)=>{
    res.render('./test/about')
})

app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/register",async (req,res)=>{
    const {username,email,password} = req.body
    await users.create({
        username , 
        email, 
        password : bcrypt.hashSync(password,8)
    })
    res.redirect("/login")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.post("/login",async (req,res)=>{
    const {email,password} = req.body
    // check whether that email exist or not in users table 
   const data = await users.findAll({
        where : {
            email : email
        }
    })
    if(data.length ==0){
        res.send("No user with that email")
    }else{
        // now check password 
       const isMatched =  bcrypt.compareSync(password,data[0].password)
       if(isMatched){
        res.send("Logged in success")
       }else{
        res.send("Invalid password")
       }
    }
    
})

app.use(express.static('public/css/'))
app.use(express.static('./storage/'))
app.listen(3000,()=>{
    console.log("Project starte node js")
})