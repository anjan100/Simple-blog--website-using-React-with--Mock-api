const express = require('express')
const app = express()
// const app = require('express')()

app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('home.ejs')
})

app.get('/about',(req,res)=>{
    res.render('./test/about.ejs')
})

app.listen(3000,()=>{
    console.log("Project starte node js")
})