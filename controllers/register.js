const mysql=require('mysql')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const session=require('express-session')

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"kevin"
})


const register=async(req,res)=>{

    console.log(req.body)
    const {name,email,password,password1}=req.body

    db.query("select * from kevin2 where email=?",[email],async(err,result)=>{
        if(err){
            console.log(err)
        }
        if(result.length>0){
             res.render('register',{
                message:'that email is already used'
            })

        }
        else if(password!==password1){
            return res.render('register',{
                message:'passwords not matching'
            })
        }
        else if(req.session.user){
            const hash=await bcrypt.hash(password,8)
            db.query("insert into kevin2(name,email,password,passord1)values(?,?,?,?)"[name,email,hash,password1],(err,result)=>{
            if(err)throw err
            
            else{
                console.log(result)
                res.render('login')
            }
            
        }) }
        else {
            console.log("Session Invalid");
            
           
        }
    })
   
    
   }
module.exports=register

   











