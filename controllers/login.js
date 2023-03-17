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


const login=async(req,res)=>{
const {email,password}=req.body
db.query("select *from kevin2 where email=?",[email],async(err,result)=>{
    if(err){
        console.log(err)
    }
    if(result<=0||await bcrypt.compare(password,result[0].password)){
        return res.status(404).render('',{
            msg:"please enter your email and password"
        })
    }
    else
    {
        
            req.session.user = req.body.email;
            
            console.log("Session data", req.session.user);
        const id=result[0]
        const token=jwt.sign({id:id},process.env.jwt_secret,
            {expiresIn:new Date(Date.now()+process.env.jwt_expires*24*60*60*1000),
            httpOnly:true})
        const expirecookieoption={expires:process.env.jwt_cookie_expires,
            httpOnly:true}
        res.cookie("user registered",token,expirecookieoption)
        res.status(200).redirect('/questions')
    }
})
}
module.exports=login