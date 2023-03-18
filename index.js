const express=require('express')
const mysql=require('mysql')
const dotenv=require('dotenv')
const hbs=require("hbs")
const path=require('path')
const cookie=require('cookie-parser')
const bcryptjs=require('bcryptjs')
const logger=require('morgan')
const session=require('express-session')
const port=4700

dotenv.config({path:"./.env"})
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"kevin"
})

const app=express()
app.use(cookie())
app.use(session({
    secret:"kenya",
    resave:false,
    saveUninitialized:true
}))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extend:false}))
//app.set('view engine','hbs')

const public=path.join(__dirname,'./public')
app.use(express.static(public))
//app.use(express.static('view/image'))

app.use('/questions',require('./routes/api/questions'))
app.use('/auth',require('./controllers/auth'))
//app.use('/answers',require("./routes/api/answers"))

//const hash=bcrypt.hash(password,8)
app.get('/app',(req,res)=>{
   res.send("welcome")

})
app.get('/register',(req,res)=>{
    res.send("opening registration page")
    res.render("register")
 })
 app.get('/login',(req,res)=>{
    session=req.body.session
    if(session.userid){
        res.send("opening login page")
     res.render("login")

    }
    
     
 })
app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`server running on ${port}`)
    }
})